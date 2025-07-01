import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';

const MetricCard = ({ title, value, change, icon, color, trend, subtitle }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600 text-blue-600 bg-blue-50',
    green: 'from-green-500 to-green-600 text-green-600 bg-green-50',
    purple: 'from-purple-500 to-purple-600 text-purple-600 bg-purple-50',
    orange: 'from-orange-500 to-orange-600 text-orange-600 bg-orange-50',
    red: 'from-red-500 to-red-600 text-red-600 bg-red-50',
    indigo: 'from-indigo-500 to-indigo-600 text-indigo-600 bg-indigo-50'
  };

  const getChangeColor = (changeValue) => {
    if (changeValue.startsWith('+')) return 'text-green-600 bg-green-100';
    if (changeValue.startsWith('-')) return 'text-red-600 bg-red-100';
    return 'text-gray-600 bg-gray-100';
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
        <div className={`p-3 rounded-lg bg-gradient-to-br ${colorClasses[color]}`}>
          <SafeIcon icon={icon} className="text-xl text-white" />
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        {change && (
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getChangeColor(change)}`}>
            {change}
          </span>
        )}
        {trend && (
          <div className="flex items-center space-x-1">
            <div className="flex space-x-1">
              {trend.map((point, index) => (
                <div
                  key={index}
                  className={`w-1 bg-${color}-400 rounded-full`}
                  style={{ height: `${point * 20}px` }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MetricCard;