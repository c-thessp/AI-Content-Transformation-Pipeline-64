import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiUpload, FiSettings, FiBrain, FiBarChart3, FiArrowRight } = FiIcons;

const QuickActions = () => {
  const actions = [
    {
      title: 'Upload Transcript',
      description: 'Transform new content',
      icon: FiUpload,
      path: '/upload',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'View Insights',
      description: 'Explore patterns',
      icon: FiBrain,
      path: '/insights',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Setup Integrations',
      description: 'Connect platforms',
      icon: FiSettings,
      path: '/integrations',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'View Analytics',
      description: 'Track performance',
      icon: FiBarChart3,
      path: '/analytics',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
      
      <div className="space-y-3">
        {actions.map((action, index) => (
          <motion.div
            key={action.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              to={action.path}
              className="group flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${action.color}`}>
                  <SafeIcon icon={action.icon} className="text-white text-sm" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{action.title}</p>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </div>
              </div>
              <SafeIcon 
                icon={FiArrowRight} 
                className="text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" 
              />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;