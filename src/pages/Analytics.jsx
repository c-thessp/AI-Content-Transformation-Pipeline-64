import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useContent } from '../context/ContentContext';
import ReactECharts from 'echarts-for-react';

const { FiBarChart3, FiTrendingUp, FiTarget, FiZap } = FiIcons;

const Analytics = () => {
  const { state } = useContent();

  // Chart options
  const contentTypeChartOption = {
    title: {
      text: 'Content Distribution',
      left: 'center',
      textStyle: { fontSize: 16, fontWeight: 'bold' }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    series: [
      {
        name: 'Content Type',
        type: 'pie',
        radius: '60%',
        data: [
          { value: 12, name: 'Blog Posts' },
          { value: 25, name: 'Social Posts' },
          { value: 8, name: 'Book Chapters' },
          { value: 15, name: 'Other' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  const insightTrendsOption = {
    title: {
      text: 'Insight Extraction Trends',
      left: 'center',
      textStyle: { fontSize: 16, fontWeight: 'bold' }
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Insights',
        data: [12, 19, 15, 23, 18, 25],
        type: 'line',
        smooth: true,
        lineStyle: {
          color: '#3b82f6'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(59, 130, 246, 0.3)' },
              { offset: 1, color: 'rgba(59, 130, 246, 0.1)' }
            ]
          }
        }
      }
    ]
  };

  const performanceMetrics = [
    {
      title: 'Processing Speed',
      value: '2.3 min',
      change: '-15%',
      icon: FiZap,
      color: 'green'
    },
    {
      title: 'Content Quality',
      value: '94%',
      change: '+8%',
      icon: FiTarget,
      color: 'blue'
    },
    {
      title: 'Insight Accuracy',
      value: '89%',
      change: '+12%',
      icon: FiTrendingUp,
      color: 'purple'
    },
    {
      title: 'Engagement Rate',
      value: '76%',
      change: '+23%',
      icon: FiBarChart3,
      color: 'orange'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Analytics Dashboard</h1>
          <p className="text-lg text-gray-600">
            Track the performance of your content transformation pipeline
          </p>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {performanceMetrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <SafeIcon icon={metric.icon} className="text-2xl text-primary-600" />
                <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                  metric.change.startsWith('+') ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'
                }`}>
                  {metric.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</h3>
              <p className="text-sm text-gray-600">{metric.title}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 border border-gray-200"
          >
            <ReactECharts option={contentTypeChartOption} style={{ height: '300px' }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-6 border border-gray-200"
          >
            <ReactECharts option={insightTrendsOption} style={{ height: '300px' }} />
          </motion.div>
        </div>

        {/* Recent Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Performing Content</h3>
          <div className="space-y-4">
            {[
              { title: 'Finding Clarity in Chaos', type: 'Blog Post', engagement: '94%', views: '2.3k' },
              { title: 'The Vulnerability Paradox', type: 'Chapter', engagement: '87%', views: '1.8k' },
              { title: 'Growth Through Discomfort', type: 'Social Post', engagement: '92%', views: '3.1k' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{item.engagement} engagement</p>
                  <p className="text-sm text-gray-600">{item.views} views</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Analytics;