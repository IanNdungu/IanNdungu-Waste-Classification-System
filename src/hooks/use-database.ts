
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { User } from '@/types';

// Hook for users table operations
export const useUsers = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const getUsers = async (): Promise<User[]> => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('username', { ascending: true });

      if (error) {
        throw error;
      }

      return data.map(user => ({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        assignedBelt: user.assigned_belt,
        lastLogin: user.last_login ? new Date(user.last_login) : undefined,
        status: user.status,
        approvalStatus: user.approval_status
      }));
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch users',
        variant: 'destructive',
      });
      return [];
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (user: Omit<User, 'id'>): Promise<boolean> => {
    try {
      setLoading(true);
      // First create auth user
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: user.email,
        password: 'tempPassword123', // This would typically come from the form
        email_confirm: true
      });

      if (authError) throw authError;

      // Then create user profile
      const { error: profileError } = await supabase.from('users').insert({
        id: authData.user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        assigned_belt: user.assignedBelt,
        status: user.status,
        approval_status: user.approvalStatus // Make sure we're using the provided approval status
      });

      if (profileError) throw profileError;

      toast({
        title: 'Success',
        description: 'User added successfully',
      });
      return true;
    } catch (error) {
      console.error('Error adding user:', error);
      toast({
        title: 'Error',
        description: 'Failed to add user',
        variant: 'destructive',
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (id: string, updates: Partial<Omit<User, 'id'>>): Promise<boolean> => {
    try {
      setLoading(true);
      const updateData: any = {};
      
      if (updates.username !== undefined) updateData.username = updates.username;
      if (updates.email !== undefined) updateData.email = updates.email;
      if (updates.role !== undefined) updateData.role = updates.role;
      if (updates.assignedBelt !== undefined) updateData.assigned_belt = updates.assignedBelt;
      if (updates.status !== undefined) updateData.status = updates.status;
      if (updates.approvalStatus !== undefined) updateData.approval_status = updates.approvalStatus;
      
      const { error } = await supabase
        .from('users')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'User updated successfully',
      });
      return true;
    } catch (error) {
      console.error('Error updating user:', error);
      toast({
        title: 'Error',
        description: 'Failed to update user',
        variant: 'destructive',
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    getUsers,
    addUser,
    updateUser
  };
};

// More hooks for other tables can be added here
