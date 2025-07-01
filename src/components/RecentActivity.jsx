import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useContent } from '../context/ContentContext';
import { format } from 'date-fns';

const { FiFileText, FiEdit3, FiBrain, FiShare2, FiClock } = FiIcons;

const RecentActivity = () => {
  const { state } = useContent();

  const activities = [
    {
      type: 'transcript',
      title: 'New transcript uploaded',
      description: 'livestream-session-042.txt processed',
      icon: FiFileText,
      time: new Date(Date.now() - 1000 * 60 * 30),
      color: 'blue'
    },
    {
      type: 'content',
      title: 'Blog post generated',
      description: '"Finding Clarity in Chaos: A Personal Journey"',
      icon: FiEdit3,
      time: new Date(Date.now() - 1000 * 60 * 45),
      color: 'green'
    },
    {
      type: 'insight',
      title: 'New insight extracted',
      description: 'Pattern: Breakthrough moments occur during vulnerability',
      icon: FiBrain,
      time: new Date(Date.now() - 1000 * 60 * 60),
      color: 'purple'
    },
    {
      type: 'publish',
      title: 'Content published',
      description: 'WordPress post scheduled for tomorrow',
      icon: FiShare2,
      time: new Date(Date.now() - 1000 * 60 * 90),
      color: 'orange'
    }
  ];

  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600'
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <SafeIcon icon={FiClock} className="text-gray-400" />
      </div>

      <div className="space-y-4">
        {activities.length > 0 ? (
          activities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className={`p-2 rounded-lg ${colorClasses[activity.color]}`}>
                <SafeIcon icon={activity.icon} className="text-sm" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                <p className="text-sm text-gray-600 truncate">{activity.description}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {format(activity.time, 'MMM d, h:mm a')}
                </p>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <SafeIcon icon={FiClock} className="text-3xl mx-auto mb-3 opacity-50" />
            <p>No recent activity</p>
            <p className="text-sm">Upload a transcript to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentActivity;