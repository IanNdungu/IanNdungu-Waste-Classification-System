
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, getCurrentSession, getUser, loginUser } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

type UserRole = 'admin' | 'operator';
type ApprovalStatus = 'pending' | 'approved' | 'rejected';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  userRole: UserRole | null;
  userName: string | null;
  approvalStatus: ApprovalStatus | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [approvalStatus, setApprovalStatus] = useState<ApprovalStatus | null>(null);
  const { toast } = useToast();

  // Load session on initial render
  useEffect(() => {
    console.log('AuthProvider: Setting up auth state change listener');
    
    // Set up auth state change listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, session ? 'session exists' : 'no session');
        
        if (event === 'SIGNED_IN' && session) {
          setUser(session.user);
          setSession(session);
          
          // Get user profile from users table (defer this call)
          setTimeout(async () => {
            try {
              console.log('Fetching user profile for:', session.user.id);
              const { data: userProfile, error } = await supabase
                .from('users')
                .select('username, role, full_name, approval_status')
                .eq('id', session.user.id)
                .maybeSingle();
                
              if (error) {
                console.error('Error fetching user profile:', error);
                toast({
                  title: "Profile Error",
                  description: "Could not load your user profile.",
                  variant: "destructive",
                });
                await supabase.auth.signOut();
                setIsAuthenticated(false);
                return;
              }
                
              if (userProfile) {
                console.log('User profile found:', userProfile);
                // Only set authenticated if user is approved
                if (userProfile.approval_status === 'approved') {
                  console.log('User is approved, setting authenticated');
                  setIsAuthenticated(true);
                  setUserRole(userProfile.role as UserRole);
                  setUserName(userProfile.username);
                } else if (userProfile.approval_status === 'pending') {
                  // Show pending approval message
                  console.log('User is pending approval');
                  toast({
                    title: "Account Pending Approval",
                    description: "Your account is awaiting admin approval. You'll be notified when approved.",
                    duration: 6000,
                  });
                  // Sign out the user since they're not approved yet
                  await supabase.auth.signOut();
                  setIsAuthenticated(false);
                } else if (userProfile.approval_status === 'rejected') {
                  // Show rejection message
                  console.log('User is rejected');
                  toast({
                    title: "Account Access Denied",
                    description: "Your account registration was declined. Please contact an administrator.",
                    variant: "destructive",
                    duration: 6000,
                  });
                  // Sign out the user since they're rejected
                  await supabase.auth.signOut();
                  setIsAuthenticated(false);
                }
                
                setApprovalStatus(userProfile.approval_status as ApprovalStatus);
              } else {
                // No profile found
                console.log('No user profile found');
                setIsAuthenticated(false);
                toast({
                  title: "Account Error",
                  description: "Your user profile could not be found.",
                  variant: "destructive",
                });
                // Sign out the user
                await supabase.auth.signOut();
              }
            } catch (err) {
              console.error('Error in auth state change handler:', err);
            }
          }, 0);
        } else if (event === 'SIGNED_OUT') {
          console.log('User signed out');
          setSession(null);
          setIsAuthenticated(false);
          setUser(null);
          setUserRole(null);
          setUserName(null);
          setApprovalStatus(null);
        }
      }
    );
    
    // THEN check for existing session
    const checkSession = async () => {
      try {
        console.log('Checking for existing session');
        const session = await getCurrentSession();
        if (session) {
          console.log('Existing session found, user id:', session.user.id);
          setUser(session.user);
          setSession(session);
          
          // Get user profile from users table
          const { data: userProfile, error } = await supabase
            .from('users')
            .select('username, role, full_name, approval_status')
            .eq('id', session.user.id)
            .maybeSingle();
          
          if (error) {
            console.error('Error fetching user profile from existing session:', error);
            await supabase.auth.signOut();
            return;
          }
            
          if (userProfile) {
            // Only set authenticated if user is approved
            if (userProfile.approval_status === 'approved') {
              console.log('Existing user is approved, setting authenticated');
              setIsAuthenticated(true);
              setUserRole(userProfile.role as UserRole);
              setUserName(userProfile.username);
              setApprovalStatus(userProfile.approval_status as ApprovalStatus);
            } else {
              // Not approved, so sign them out
              console.log('Existing user is not approved, signing out');
              await supabase.auth.signOut();
            }
          } else {
            // No profile found
            console.log('No profile found for existing session');
            await supabase.auth.signOut();
          }
        } else {
          console.log('No existing session found');
        }
      } catch (error) {
        console.error('Error checking auth session:', error);
      }
    };
    
    checkSession();
    
    return () => {
      subscription?.unsubscribe();
    };
  }, [toast]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log('Attempting login in AuthContext for:', email);
      
      const result = await loginUser(email, password);
      
      if (!result.success) {
        console.error('Login failed:', result.error);
        toast({
          title: "Login Failed",
          description: result.error || "Invalid credentials",
          variant: "destructive",
        });
        return false;
      }
      
      // Success - the auth listener will handle the session
      toast({
        title: "Login Successful",
        description: `Welcome back, ${result.username}!`,
      });
      
      return true;
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: "An unexpected error occurred during login",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = async () => {
    try {
      console.log('Logging out user');
      await supabase.auth.signOut();
      setIsAuthenticated(false);
      setUser(null);
      setSession(null);
      setUserRole(null);
      setUserName(null);
      setApprovalStatus(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      userRole, 
      userName, 
      approvalStatus,
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
