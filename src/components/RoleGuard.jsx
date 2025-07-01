import React from 'react';
import { useRole } from '../context/RoleContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiLock, FiAlertCircle } = FiIcons;

const RoleGuard = ({ 
  permission, 
  role, 
  fallback = null, 
  showMessage = true,
  children 
}) => {
  const { hasPermission, currentUserRole, roles } = useRole();

  // Check permission-based access
  if (permission && !hasPermission(permission)) {
    if (!showMessage) return fallback;
    
    return (
      <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg border border-gray-200">
        <div className="text-center">
          <SafeIcon icon={FiLock} className="text-4xl text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Access Restricted</h3>
          <p className="text-gray-600">
            You don't have permission to view this content.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Required permission: <code className="bg-gray-100 px-2 py-1 rounded">{permission}</code>
          </p>
        </div>
      </div>
    );
  }

  // Check role-based access
  if (role) {
    const currentRoleLevel = roles[currentUserRole]?.level || 0;
    const requiredRoleLevel = roles[role]?.level || 0;

    if (currentRoleLevel < requiredRoleLevel) {
      if (!showMessage) return fallback;
      
      return (
        <div className="flex items-center justify-center p-8 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="text-center">
            <SafeIcon icon={FiAlertCircle} className="text-4xl text-yellow-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Insufficient Role</h3>
            <p className="text-gray-600">
              You need <strong>{roles[role]?.name}</strong> role or higher to access this content.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Current role: <span className="font-medium">{roles[currentUserRole]?.name}</span>
            </p>
          </div>
        </div>
      );
    }
  }

  return children;
};

export default RoleGuard;