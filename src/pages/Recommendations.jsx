import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useContent } from '../context/ContentContext';
import ContentRecommendations from '../components/ContentRecommendations';

const { 
  FiLightbulb, 
  FiTarget, 
  FiTrendingUp, 
  FiZap,
  FiClock,
  FiHeart,
  FiShare2,
  FiEye,
  FiRefreshCw,
  FiDownload,
  FiSettings
} = FiIcons;

const Recommendations = () => {
  const { state } = useContent();
  const [loading, setLoading] = useState(false);
  const [timeframe, setTimeframe] = useState('week');

  const handleRefreshRecommendations = async () => {
    setLoading(true);
    // Simulate API call to refresh recommendations
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
  };

  const handleExportRecommendations = () => {
    // Export recommendations as PDF or CSV
    const data = {
      timestamp: new Date().toISOString(),
      recommendations: 'AI-generated recommendations data...'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { 
      type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `content-recommendations-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const quickStats = [
    {
      icon: FiTarget,
      value: '12',
      label: 'Active Recommendations',
      color: 'from-blue-500 to-blue-600',
      description: 'Personalized suggestions ready to implement'
    },
    {
      icon: FiTrendingUp,
      value: '+156%',
      label: 'Potential Engagement Boost',
      color: 'from-green-500 to-green-600',
      description: 'Expected improvement from following recommendations'
    },
    {
      icon: FiZap,
      value: '94%',
      label: 'Recommendation Accuracy',
      color: 'from-purple-500 to-purple-600',
      description: 'Historical success rate of our AI suggestions'
    },
    {
      icon: FiClock,
      value: '2.5hrs',
      label: 'Time Savings/Week',
      color: 'from-orange-500 to-orange-600',
      description: 'Estimated time saved by automation'
    }
  ];

  const impactMetrics = [
    {
      metric: 'Content Quality Score',
      current: '8.7/10',
      potential: '9.4/10',
      improvement: '+8%',
      icon: FiHeart,
      color: 'text-red-600'
    },
    {
      metric: 'Audience Reach',
      current: '12.4K',
      potential: '18.9K',
      improvement: '+52%',
      icon: FiEye,
      color: 'text-blue-600'
    },
    {
      metric: 'Engagement Rate',
      current: '6.2%',
      potential: '9.8%',
      improvement: '+58%',
      icon: FiShare2,
      color: 'text-green-600'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
              <SafeIcon icon={FiLightbulb} className="text-white text-2xl" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">AI Content Recommendations</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get personalized, data-driven suggestions to optimize your content strategy and maximize engagement
          </p>
          
          {/* Header Actions */}
          <div className="flex items-center justify-center space-x-4 mt-6">
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
            </select>
            
            <button
              onClick={handleRefreshRecommendations}
              disabled={loading}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors"
            >
              <SafeIcon 
                icon={FiRefreshCw} 
                className={`text-sm ${loading ? 'animate-spin' : ''}`} 
              />
              <span>{loading ? 'Updating...' : 'Refresh'}</span>
            </button>
            
            <button
              onClick={handleExportRecommendations}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <SafeIcon icon={FiDownload} className="text-sm" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <SafeIcon icon={stat.icon} className="text-white text-xl" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm font-medium text-gray-700">{stat.label}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Impact Forecast */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Impact Forecast</h3>
              <p className="text-sm text-gray-600">Projected improvements from implementing recommendations</p>
            </div>
            <SafeIcon icon={FiSettings} className="text-gray-400" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {impactMetrics.map((metric, index) => (
              <div key={metric.metric} className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-3">
                  <SafeIcon icon={metric.icon} className={`text-xl ${metric.color}`} />
                  <h4 className="font-medium text-gray-900">{metric.metric}</h4>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Current:</span>
                    <span className="font-medium text-gray-900">{metric.current}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Potential:</span>
                    <span className="font-medium text-gray-900">{metric.potential}</span>
                  </div>
                  <div className="pt-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {metric.improvement} improvement
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Main Recommendations Component */}
        <ContentRecommendations 
          insights={state.insights} 
          performanceData={state.generatedContent}
        />

        {/* Implementation Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl p-6 border border-primary-200"
        >
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <SafeIcon icon={FiLightbulb} className="text-white text-xl" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Implementation Tips</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                <div className="space-y-2">
                  <p><strong>Start Small:</strong> Implement 1-2 high-priority recommendations first</p>
                  <p><strong>Track Results:</strong> Monitor metrics for 1-2 weeks before adding more changes</p>
                </div>
                <div className="space-y-2">
                  <p><strong>Test & Learn:</strong> A/B test different approaches when possible</p>
                  <p><strong>Stay Consistent:</strong> Maintain changes for at least 30 days to see full impact</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Recommendations;