
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

// Use the credentials from the Supabase project
const supabaseUrl = "https://dgywgvwuthzwfblaredm.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRneXdndnd1dGh6d2ZibGFyZWRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1MDMyMTQsImV4cCI6MjA1OTA3OTIxNH0.81U8sduqtajTTul3hMxIkiTqQv77gICCrVF0DbXAcIw";

// Create the Supabase client with proper configuration for authentication
export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      storage: localStorage,
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    }
  }
);

// Helper functions for common operations
export const getUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
      console.error('Error getting user:', error);
      return null;
    }
    return user;
  } catch (error) {
    console.error('Unexpected error in getUser:', error);
    return null;
  }
};

export const getCurrentSession = async () => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) {
      console.error('Error getting session:', error);
      return null;
    }
    return session;
  } catch (error) {
    console.error('Unexpected error in getCurrentSession:', error);
    return null;
  }
};

/**
 * Gets a user profile from the users table
 */
export const getUserProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('username, role, full_name, approval_status')
      .eq('id', userId)
      .maybeSingle();
      
    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Unexpected error in getUserProfile:', error);
    return null;
  }
};

/**
 * Signs up a new user and creates their profile in the users table
 */
export const signUpUser = async (email: string, password: string, userData: {
  username: string;
  role: 'admin' | 'operator';
  full_name: string;
  assigned_belt?: string;
}) => {
  try {
    console.log('Creating new user:', email, userData.username);
    // First, create the auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: userData.username,
          full_name: userData.full_name,
        }
      }
    });

    if (authError) {
      console.error('Auth error during signup:', authError);
      throw authError;
    }
    
    if (!authData.user) {
      console.error('No user data returned from auth signup');
      throw new Error("Failed to create user");
    }

    // Then create user profile in the users table
    const { error: profileError } = await supabase.from('users').insert({
      id: authData.user.id,
      username: userData.username,
      email: email,
      role: userData.role,
      full_name: userData.full_name,
      assigned_belt: userData.assigned_belt || null,
      status: 'active',
      approval_status: 'pending' // New users start as pending
    });

    if (profileError) {
      console.error('Profile error during signup:', profileError);
      throw profileError;
    }

    console.log('User created successfully:', authData.user.id);
    return { success: true, user: authData.user };
  } catch (error) {
    console.error('Error creating user:', error);
    return { success: false, error };
  }
};

// For admin users only - create a new user (requires admin privileges)
export const createUserWithRole = async (email: string, password: string, userData: {
  username: string;
  role: 'admin' | 'operator';
  full_name: string;
  assigned_belt?: string;
}) => {
  try {
    console.log('Admin creating new user:', email);
    // Note: This operation requires RLS policies that allow the current user to insert into the users table
    
    // First create the auth user using the normal signup flow
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin, // Redirect back to our app after email verification
        data: {
          username: userData.username,
          full_name: userData.full_name,
        }
      }
    });
    
    if (authError) {
      console.error('Auth error during admin user creation:', authError);
      throw authError;
    }
    
    if (!authData.user) {
      console.error('No user data returned from auth signup by admin');
      throw new Error("Failed to create user");
    }

    // Then create user profile in the users table
    const { error: profileError } = await supabase.from('users').insert({
      id: authData.user.id,
      username: userData.username,
      email: email,
      role: userData.role,
      full_name: userData.full_name,
      assigned_belt: userData.assigned_belt || null,
      status: 'active',
      approval_status: 'approved' // Users created by admins are automatically approved
    });

    if (profileError) {
      console.error('Profile error during admin user creation:', profileError);
      throw profileError;
    }

    console.log('User created by admin successfully:', authData.user.id);
    return { success: true, user: authData.user, message: "User created successfully. They will need to verify their email." };
  } catch (error) {
    console.error('Error creating user by admin:', error);
    return { success: false, error };
  }
};

/**
 * Login a user and check their approval status
 */
export const loginUser = async (email: string, password: string) => {
  try {
    console.log('Attempting to login:', email);
    
    // Sign in the user
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) {
      console.error('Error signing in:', error);
      return { success: false, error: error.message };
    }
    
    if (!data.user) {
      return { success: false, error: "Invalid credentials" };
    }
    
    // Get the user's profile to check approval status
    const profile = await getUserProfile(data.user.id);
    
    if (!profile) {
      // No profile found, sign out
      await supabase.auth.signOut();
      return { success: false, error: "User profile not found" };
    }
    
    // Check if the user is approved
    if (profile.approval_status !== 'approved') {
      // Not approved, sign out
      await supabase.auth.signOut();
      
      if (profile.approval_status === 'pending') {
        return { success: false, error: "Account pending approval" };
      } else {
        return { success: false, error: "Account access denied" };
      }
    }
    
    // Update last login timestamp
    const now = new Date().toISOString();
    await supabase
      .from('users')
      .update({ last_login: now })
      .eq('id', data.user.id);
    
    return { 
      success: true, 
      user: data.user, 
      session: data.session,
      role: profile.role,
      username: profile.username
    };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: "An unexpected error occurred" };
  }
};
