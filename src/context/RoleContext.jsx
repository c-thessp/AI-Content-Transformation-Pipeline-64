import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import supabase from '../lib/supabase';

const RoleContext = createContext();

// Define role hierarchy and permissions
const ROLES = {
  SUPER_ADMIN: {
    name: 'Super Admin',
    level: 100,
    permissions: ['*'], // All permissions
    description: 'Full system access and user management'
  },
  ADMIN: {
    name: 'Admin',
    level: 80,
    permissions: [
      'users.read',
      'users.create',
      'users.update',
      'users.delete',
      'content.read',
      'content.create',
      'content.update',
      'content.delete',
      'analytics.read',
      'integrations.read',
      'integrations.update',
      'insights.read',
      'recommendations.read'
    ],
    description: 'User management and content oversight'
  },
  EDITOR: {
    name: 'Editor',
    level: 60,
    permissions: [
      'content.read',
      'content.create',
      'content.update',
      'content.delete',
      'analytics.read',
      'insights.read',
      'recommendations.read',
      'integrations.read'
    ],
    description: 'Content creation and management'
  },
  CONTRIBUTOR: {
    name: 'Contributor',
    level: 40,
    permissions: [
      'content.read',
      'content.create',
      'content.update',
      'analytics.read',
      'insights.read',
      'recommendations.read'
    ],
    description: 'Content creation with limited editing'
  },
  VIEWER: {
    name: 'Viewer',
    level: 20,
    permissions: [
      'content.read',
      'analytics.read',
      'insights.read'
    ],
    description: 'Read-only access to content and analytics'
  }
};

const initialState = {
  currentUserRole: 'VIEWER',
  users: [],
  loading: {
    users: false,
    roleUpdate: false
  },
  error: null
};

export const RoleProvider = ({ children }) => {
  const [state, setState] = useState(initialState);
  const { user, isAuthenticated } = useAuth();

  // Fetch current user's role
  const fetchUserRole = async () => {
    if (!user?.id) return;

    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        throw error;
      }

      const userRole = data?.role || 'VIEWER';
      setState(prev => ({
        ...prev,
        currentUserRole: userRole
      }));
    } catch (error) {
      console.error('Error fetching user role:', error);
      // Default to VIEWER if there's an error
      setState(prev => ({
        ...prev,
        currentUserRole: 'VIEWER'
      }));
    }
  };

  // Fetch all users (admin only)
  const fetchUsers = async () => {
    if (!hasPermission('users.read')) return;

    setState(prev => ({
      ...prev,
      loading: { ...prev.loading, users: true }
    }));

    try {
      const { data, error } = await supabase
        .from('users')
        .select(`
          *,
          user_roles (
            role,
            assigned_at,
            assigned_by
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setState(prev => ({
        ...prev,
        users: data || [],
        loading: { ...prev.loading, users: false }
      }));
    } catch (error) {
      console.error('Error fetching users:', error);
      setState(prev => ({
        ...prev,
        error: error.message,
        loading: { ...prev.loading, users: false }
      }));
    }
  };

  // Update user role
  const updateUserRole = async (userId, newRole) => {
    if (!hasPermission('users.update')) {
      throw new Error('Insufficient permissions to update user roles');
    }

    setState(prev => ({
      ...prev,
      loading: { ...prev.loading, roleUpdate: true }
    }));

    try {
      const { error } = await supabase
        .from('user_roles')
        .upsert({
          user_id: userId,
          role: newRole,
          assigned_by: user.id,
          assigned_at: new Date().toISOString()
        });

      if (error) throw error;

      // Refresh users list
      await fetchUsers();

      setState(prev => ({
        ...prev,
        loading: { ...prev.loading, roleUpdate: false }
      }));

      return { success: true };
    } catch (error) {
      console.error('Error updating user role:', error);
      setState(prev => ({
        ...prev,
        error: error.message,
        loading: { ...prev.loading, roleUpdate: false }
      }));
      throw error;
    }
  };

  // Create new user
  const createUser = async (userData) => {
    if (!hasPermission('users.create')) {
      throw new Error('Insufficient permissions to create users');
    }

    try {
      const { data, error } = await supabase
        .from('users')
        .insert([{
          email: userData.email,
          name: userData.name,
          created_at: new Date().toISOString(),
          created_by: user.id
        }])
        .select()
        .single();

      if (error) throw error;

      // Assign default role
      await updateUserRole(data.id, userData.role || 'VIEWER');

      return { success: true, user: data };
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  };

  // Delete user
  const deleteUser = async (userId) => {
    if (!hasPermission('users.delete')) {
      throw new Error('Insufficient permissions to delete users');
    }

    try {
      // Delete user role first
      await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId);

      // Delete user
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', userId);

      if (error) throw error;

      // Refresh users list
      await fetchUsers();

      return { success: true };
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  };

  // Check if current user has permission
  const hasPermission = (permission) => {
    const role = ROLES[state.currentUserRole];
    if (!role) return false;

    // Super admin has all permissions
    if (role.permissions.includes('*')) return true;

    // Check specific permission
    return role.permissions.includes(permission);
  };

  // Check if current user can manage another user
  const canManageUser = (targetUserRole) => {
    const currentRole = ROLES[state.currentUserRole];
    const targetRole = ROLES[targetUserRole];
    
    if (!currentRole || !targetRole) return false;
    
    // Can only manage users with lower or equal role level
    return currentRole.level >= targetRole.level;
  };

  // Get available roles for assignment
  const getAssignableRoles = () => {
    const currentRole = ROLES[state.currentUserRole];
    if (!currentRole) return [];

    return Object.entries(ROLES)
      .filter(([_, role]) => role.level <= currentRole.level)
      .map(([key, role]) => ({
        key,
        ...role
      }));
  };

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      fetchUserRole();
    }
  }, [isAuthenticated, user?.id]);

  const value = {
    ...state,
    roles: ROLES,
    hasPermission,
    canManageUser,
    getAssignableRoles,
    fetchUsers,
    updateUserRole,
    createUser,
    deleteUser,
    refreshUserRole: fetchUserRole
  };

  return (
    <RoleContext.Provider value={value}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};