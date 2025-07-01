import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useContent } from '../context/ContentContext';
import { format } from 'date-fns';

const { 
  FiBrain, 
  FiHeart, 
  FiTrendingUp, 
  FiStar, 
  FiSearch, 
  FiRefreshCw,
  FiLoader,
  FiAlertCircle
} = FiIcons;

const InsightsDatabase = () => {
  const { state, refreshAllData } = useContent();
  const [selectedType, setSelectedType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const insightTypes = [
    { id: 'all', label: 'All Insights', icon: FiBrain },
    { id: 'emotional_breakthrough', label: 'Emotional Breakthroughs', icon: FiHeart },
    { id: 'core_belief', label: 'Core Beliefs', icon: FiStar },
    { id: 'pattern', label: 'Patterns', icon: FiTrendingUp }
  ];

  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshAllData();
    setRefreshing(false);
  };

  const filteredInsights = state.insights.filter(insight => {
    if (!insight) return false;
    
    const matchesType = selectedType === 'all' || insight.type === selectedType;
    const matchesSearch = insight.content && insight.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getInsightIcon = (type) => {
    switch (type) {
      case 'emotional_breakthrough': return FiHeart;
      case 'core_belief': return FiStar;
      case 'pattern': return FiTrendingUp;
      default: return FiBrain;
    }
  };

  const getInsightColor = (type) => {
    switch (type) {
      case 'emotional_breakthrough': return 'from-red-500 to-pink-500';
      case 'core_belief': return 'from-yellow-500 to-orange-500';
      case 'pattern': return 'from-green-500 to-teal-500';
      default: return 'from-blue-500 to-purple-500';
    }
  };

  const getConfidenceColor = (confidence) => {
    const conf = typeof confidence === 'number' ? confidence : parseFloat(confidence) || 0;
    if (conf >= 0.9) return 'text-green-600 bg-green-100';
    if (conf >= 0.7) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  if (state.loading.insights && state.insights.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <SafeIcon icon={FiLoader} className="text-4xl text-primary-600 mx-auto mb-4 animate-spin" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Loading Insights</h3>
            <p className="text-gray-600">Fetching your extracted insights from the database...</p>
          </div>
        </div>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <SafeIcon icon={FiAlertCircle} className="text-4xl text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Insights</h3>
            <p className="text-gray-600 mb-4">{state.error}</p>
            <button
              onClick={handleRefresh}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="text-center space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-center flex-1">
              <h1 className="text-3xl font-bold text-gray-900">Insights Database</h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover patterns and emotional breakthroughs from your content
              </p>
            </div>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <SafeIcon 
                icon={FiRefreshCw} 
                className={`text-sm ${refreshing ? 'animate-spin' : ''}`} 
              />
              <span className="text-sm">Refresh</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {insightTypes.slice(1).map((type, index) => {
            const count = state.insights.filter(i => i.type === type.id).length;
            return (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 border border-gray-200"
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${getInsightColor(type.id)}`}>
                    <SafeIcon icon={type.icon} className="text-white text-xl" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{count}</p>
                    <p className="text-sm text-gray-600">{type.label}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-wrap gap-2">
              {insightTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all ${
                    selectedType === type.id
                      ? 'bg-primary-50 border-primary-200 text-primary-700'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <SafeIcon icon={type.icon} className="text-sm" />
                  <span className="text-sm font-medium">{type.label}</span>
                </button>
              ))}
            </div>
            <div className="relative">
              <SafeIcon 
                icon={FiSearch} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
              />
              <input
                type="text"
                placeholder="Search insights..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Insights List */}
        {filteredInsights.length > 0 ? (
          <div className="space-y-4">
            {filteredInsights.map((insight, index) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${getInsightColor(insight.type)} flex-shrink-0`}>
                    <SafeIcon icon={getInsightIcon(insight.type)} className="text-white text-lg" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {insight.content}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getConfidenceColor(insight.confidence)}`}>
                          {Math.round((insight.confidence || 0) * 100)}% confidence
                        </span>
                      </div>
                    </div>
                    
                    {insight.context && (
                      <p className="text-gray-600 mb-3 italic">
                        "{insight.context}"
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span className="capitalize">
                        {insight.type ? insight.type.replace('_', ' ') : 'Insight'}
                      </span>
                      <span>
                        {insight.created_at 
                          ? format(new Date(insight.created_at), 'MMM d, yyyy h:mm a')
                          : 'No date'
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <SafeIcon icon={FiBrain} className="text-4xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No insights found</h3>
            <p className="text-gray-600">
              {searchTerm || selectedType !== 'all'
                ? 'Try adjusting your filters or search term'
                : 'Upload a transcript to extract your first insights'
              }
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default InsightsDatabase;