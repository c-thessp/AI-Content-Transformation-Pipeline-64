import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiTrendingUp, FiTarget, FiZap, FiClock, FiAlertCircle, FiCheckCircle } = FiIcons;

const PredictiveInsights = ({ insights = [] }) => {
  const defaultInsights = [
    {
      id: 1,
      type: 'opportunity',
      title: 'Optimal Posting Time',
      description: 'Your audience is most active on Tuesdays at 2 PM. Consider scheduling content during this window.',
      confidence: 87,
      impact: 'high',
      icon: FiClock,
      color: 'blue'
    },
    {
      id: 2,
      type: 'prediction',
      title: 'Content Performance Forecast',
      description: 'Blog posts about emotional breakthroughs are predicted to perform 34% better this month.',
      confidence: 92,
      impact: 'high',
      icon: FiTrendingUp,
      color: 'green'
    },
    {
      id: 3,
      type: 'recommendation',
      title: 'Content Gap Analysis',
      description: 'You have fewer social posts compared to blog content. Diversifying could increase reach by 25%.',
      confidence: 78,
      impact: 'medium',
      icon: FiTarget,
      color: 'purple'
    },
    {
      id: 4,
      type: 'alert',
      title: 'Engagement Drop Alert',
      description: 'Recent content engagement is 15% below average. Consider revisiting successful content themes.',
      confidence: 85,
      impact: 'medium',
      icon: FiAlertCircle,
      color: 'orange'
    }
  ];

  const insightsData = insights.length > 0 ? insights : defaultInsights;

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'high': return 'text-red-700 bg-red-100';
      case 'medium': return 'text-yellow-700 bg-yellow-100';
      case 'low': return 'text-green-700 bg-green-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'opportunity': return FiZap;
      case 'prediction': return FiTrendingUp;
      case 'recommendation': return FiTarget;
      case 'alert': return FiAlertCircle;
      default: return FiCheckCircle;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'opportunity': return 'from-yellow-500 to-orange-500';
      case 'prediction': return 'from-green-500 to-teal-500';
      case 'recommendation': return 'from-blue-500 to-indigo-500';
      case 'alert': return 'from-red-500 to-pink-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">AI-Powered Insights</h3>
          <p className="text-sm text-gray-600">Predictive analytics and recommendations</p>
        </div>
        <SafeIcon icon={FiZap} className="text-yellow-500 text-xl" />
      </div>

      <div className="space-y-4">
        {insightsData.map((insight, index) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
          >
            <div className="flex items-start space-x-4">
              <div className={`p-2 rounded-lg bg-gradient-to-br ${getTypeColor(insight.type)} flex-shrink-0`}>
                <SafeIcon icon={getTypeIcon(insight.type)} className="text-white text-sm" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-gray-900">
                    {insight.title}
                  </h4>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${getImpactColor(insight.impact)}`}>
                      {insight.impact} impact
                    </span>
                    <span className="text-xs text-gray-500">
                      {insight.confidence}% confidence
                    </span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 leading-relaxed">
                  {insight.description}
                </p>
                
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-full bg-gray-200 rounded-full h-1.5 max-w-20">
                      <div 
                        className="bg-primary-600 h-1.5 rounded-full transition-all"
                        style={{ width: `${insight.confidence}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500">confidence</span>
                  </div>
                  
                  <button className="text-xs text-primary-600 hover:text-primary-700 font-medium">
                    Learn more
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PredictiveInsights;