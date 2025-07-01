import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { format, addDays } from 'date-fns';

const { 
  FiLightbulb, FiClock, FiTarget, FiTrendingUp, FiUsers, FiCalendar, FiEdit3, 
  FiShare2, FiBarChart3, FiZap, FiChevronRight, FiStar, FiHeart, FiEye 
} = FiIcons;

const ContentRecommendations = ({ insights = [], performanceData = [] }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [timeframe, setTimeframe] = useState('week');

  const categories = [
    { id: 'all', label: 'All Recommendations', icon: FiLightbulb },
    { id: 'timing', label: 'Optimal Timing', icon: FiClock },
    { id: 'content', label: 'Content Strategy', icon: FiEdit3 },
    { id: 'engagement', label: 'Engagement', icon: FiHeart },
    { id: 'distribution', label: 'Distribution', icon: FiShare2 }
  ];

  // Generate AI-powered recommendations
  const generateRecommendations = () => {
    const baseRecommendations = [
      {
        id: 1,
        category: 'timing',
        type: 'optimal_time',
        priority: 'high',
        title: 'Peak Engagement Window',
        description: 'Your audience is most active on Tuesdays and Thursdays between 2-4 PM EST',
        action: 'Schedule your next high-value content during these windows',
        impact: '+34% engagement potential',
        confidence: 92,
        icon: FiClock,
        color: 'blue',
        implementable: true,
        timeToImplement: '5 minutes',
        expectedResults: ['Higher engagement rates', 'Increased reach', 'Better visibility']
      },
      {
        id: 2,
        category: 'content',
        type: 'content_gap',
        priority: 'high',
        title: 'Emotional Vulnerability Content',
        description: 'Content featuring personal vulnerability generates 67% more engagement',
        action: 'Create more authentic, personal stories about challenges and breakthroughs',
        impact: '+67% engagement boost',
        confidence: 89,
        icon: FiHeart,
        color: 'red',
        implementable: true,
        timeToImplement: '30 minutes',
        expectedResults: ['Deeper audience connection', 'Higher share rates', 'Increased comments']
      },
      {
        id: 3,
        category: 'engagement',
        type: 'interaction_strategy',
        priority: 'medium',
        title: 'Question-Based Content',
        description: 'Posts ending with thought-provoking questions receive 45% more comments',
        action: 'End each post with an engaging question to spark discussion',
        impact: '+45% comment increase',
        confidence: 85,
        icon: FiUsers,
        color: 'green',
        implementable: true,
        timeToImplement: '2 minutes',
        expectedResults: ['More comments', 'Active discussions', 'Community building']
      },
      {
        id: 4,
        category: 'distribution',
        type: 'platform_optimization',
        priority: 'medium',
        title: 'Cross-Platform Adaptation',
        description: 'Your LinkedIn content performs 3x better than Twitter for professional insights',
        action: 'Prioritize LinkedIn for career and business-related content',
        impact: '+200% professional reach',
        confidence: 91,
        icon: FiShare2,
        color: 'purple',
        implementable: true,
        timeToImplement: '10 minutes',
        expectedResults: ['Better platform fit', 'Higher engagement', 'Professional network growth']
      },
      {
        id: 5,
        category: 'content',
        type: 'format_optimization',
        priority: 'high',
        title: 'Video Content Opportunity',
        description: 'Your written content could generate 5x more engagement as short-form videos',
        action: 'Convert top-performing blog insights into 60-second video summaries',
        impact: '+400% engagement potential',
        confidence: 88,
        icon: FiZap,
        color: 'orange',
        implementable: true,
        timeToImplement: '45 minutes',
        expectedResults: ['Higher engagement', 'Broader reach', 'Multi-format presence']
      },
      {
        id: 6,
        category: 'timing',
        type: 'content_frequency',
        priority: 'medium',
        title: 'Posting Frequency Optimization',
        description: 'Your audience engagement drops after 3 days without new content',
        action: 'Maintain consistent posting every 2-3 days for optimal engagement',
        impact: '+25% audience retention',
        confidence: 82,
        icon: FiCalendar,
        color: 'indigo',
        implementable: true,
        timeToImplement: '15 minutes',
        expectedResults: ['Better audience retention', 'Consistent growth', 'Algorithm favor']
      }
    ];

    return baseRecommendations;
  };

  const recommendations = generateRecommendations();
  const filteredRecommendations = activeCategory === 'all' 
    ? recommendations 
    : recommendations.filter(rec => rec.category === activeCategory);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-700 bg-red-100 border-red-200';
      case 'medium': return 'text-yellow-700 bg-yellow-100 border-yellow-200';
      case 'low': return 'text-green-700 bg-green-100 border-green-200';
      default: return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600',
      red: 'from-red-500 to-red-600',
      green: 'from-green-500 to-green-600',
      purple: 'from-purple-500 to-purple-600',
      orange: 'from-orange-500 to-orange-600',
      indigo: 'from-indigo-500 to-indigo-600'
    };
    return colors[color] || colors.blue;
  };

  const upcomingOpportunities = [
    {
      date: addDays(new Date(), 1),
      type: 'optimal_posting',
      title: 'High Engagement Window',
      description: 'Tomorrow 2:00 PM - Perfect time for your vulnerability content'
    },
    {
      date: addDays(new Date(), 3),
      type: 'content_trend',
      title: 'Trending Topic Opportunity',
      description: 'Mental health awareness trending - align your content'
    },
    {
      date: addDays(new Date(), 7),
      type: 'milestone',
      title: 'Weekly Content Review',
      description: 'Analyze this week\'s performance and adjust strategy'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Content Recommendations</h2>
          <p className="text-gray-600">AI-powered insights to optimize your content strategy</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-3">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
          </select>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all ${
              activeCategory === category.id
                ? 'bg-primary-50 border-primary-200 text-primary-700'
                : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
            }`}
          >
            <SafeIcon icon={category.icon} className="text-sm" />
            <span className="text-sm font-medium">{category.label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Recommendations */}
        <div className="xl:col-span-2 space-y-4">
          {filteredRecommendations.map((recommendation, index) => (
            <motion.div
              key={recommendation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${getColorClasses(recommendation.color)} flex-shrink-0`}>
                  <SafeIcon icon={recommendation.icon} className="text-white text-lg" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {recommendation.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border capitalize ${getPriorityColor(recommendation.priority)}`}>
                        {recommendation.priority} priority
                      </span>
                      <span className="text-xs text-gray-500">
                        {recommendation.confidence}% confidence
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3">
                    {recommendation.description}
                  </p>
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <p className="text-sm font-medium text-gray-900 mb-1">Recommended Action:</p>
                    <p className="text-sm text-gray-700">{recommendation.action}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-sm">
                        <span className="text-gray-500">Expected Impact:</span>
                        <span className="font-medium text-green-600 ml-1">{recommendation.impact}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-500">Time:</span>
                        <span className="font-medium text-gray-900 ml-1">{recommendation.timeToImplement}</span>
                      </div>
                    </div>
                    <button className="flex items-center space-x-1 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium">
                      <span>Implement</span>
                      <SafeIcon icon={FiChevronRight} className="text-xs" />
                    </button>
                  </div>
                  {recommendation.expectedResults && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm font-medium text-gray-900 mb-2">Expected Results:</p>
                      <div className="flex flex-wrap gap-2">
                        {recommendation.expectedResults.map((result, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
                          >
                            {result}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Optimization Potential</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Engagement Boost</span>
                <span className="text-lg font-bold text-green-600">+156%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Reach Improvement</span>
                <span className="text-lg font-bold text-blue-600">+89%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Time Savings</span>
                <span className="text-lg font-bold text-purple-600">2.5hrs/week</span>
              </div>
            </div>
          </div>

          {/* Upcoming Opportunities */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Opportunities</h3>
            <div className="space-y-3">
              {upcomingOpportunities.map((opportunity, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">
                      {opportunity.title}
                    </span>
                    <span className="text-xs text-gray-500">
                      {format(opportunity.date, 'MMM d')}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">{opportunity.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Trends */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">This Week's Trends</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiTrendingUp} className="text-green-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Engagement Up</p>
                  <p className="text-xs text-gray-600">+23% from last week</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiEye} className="text-blue-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Reach Growing</p>
                  <p className="text-xs text-gray-600">+15% new audience</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiStar} className="text-yellow-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Quality Score</p>
                  <p className="text-xs text-gray-600">9.2/10 average</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentRecommendations;