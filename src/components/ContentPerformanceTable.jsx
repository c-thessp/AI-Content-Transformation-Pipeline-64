import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { format } from 'date-fns';

const { FiTrendingUp, FiTrendingDown, FiEye, FiHeart, FiShare2, FiMessageSquare, FiArrowUp, FiArrowDown } = FiIcons;

const ContentPerformanceTable = ({ data = [] }) => {
  const [sortBy, setSortBy] = useState('engagement');
  const [sortOrder, setSortOrder] = useState('desc');

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    }
    return aValue < bValue ? 1 : -1;
  });

  const getEngagementColor = (rate) => {
    if (rate >= 90) return 'text-green-600 bg-green-100';
    if (rate >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getTrendIcon = (trend) => {
    return trend > 0 ? FiTrendingUp : FiTrendingDown;
  };

  const getTrendColor = (trend) => {
    return trend > 0 ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Content Performance</h3>
        <p className="text-sm text-gray-600 mt-1">Track engagement and reach across all content</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Content
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                onClick={() => handleSort('views')}
              >
                <div className="flex items-center space-x-1">
                  <span>Views</span>
                  {sortBy === 'views' && (
                    <SafeIcon icon={sortOrder === 'asc' ? FiArrowUp : FiArrowDown} className="text-xs" />
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                onClick={() => handleSort('engagement')}
              >
                <div className="flex items-center space-x-1">
                  <span>Engagement</span>
                  {sortBy === 'engagement' && (
                    <SafeIcon icon={sortOrder === 'asc' ? FiArrowUp : FiArrowDown} className="text-xs" />
                  )}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Interactions
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trend
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Published
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.map((item, index) => (
              <motion.tr
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-gray-50"
              >
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900 line-clamp-2">
                      {item.title}
                    </p>
                    <p className="text-sm text-gray-600 capitalize">
                      {item.type.replace('_', ' ')}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <SafeIcon icon={FiEye} className="text-gray-400 text-sm" />
                    <span className="text-sm font-medium text-gray-900">
                      {item.views.toLocaleString()}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getEngagementColor(item.engagement)}`}>
                    {item.engagement}%
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <SafeIcon icon={FiHeart} className="text-red-400 text-sm" />
                      <span className="text-sm text-gray-600">{item.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <SafeIcon icon={FiShare2} className="text-blue-400 text-sm" />
                      <span className="text-sm text-gray-600">{item.shares}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <SafeIcon icon={FiMessageSquare} className="text-green-400 text-sm" />
                      <span className="text-sm text-gray-600">{item.comments}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className={`flex items-center space-x-1 ${getTrendColor(item.trend)}`}>
                    <SafeIcon icon={getTrendIcon(item.trend)} className="text-sm" />
                    <span className="text-sm font-medium">
                      {Math.abs(item.trend)}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600">
                    {format(new Date(item.publishedAt), 'MMM d, yyyy')}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContentPerformanceTable;