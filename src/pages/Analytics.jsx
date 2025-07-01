import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useContent } from '../context/ContentContext';
import MetricCard from '../components/MetricCard';
import AnalyticsChart from '../components/AnalyticsChart';
import ContentPerformanceTable from '../components/ContentPerformanceTable';
import PredictiveInsights from '../components/PredictiveInsights';

const { 
  FiBarChart3, FiTrendingUp, FiTarget, FiZap, FiEye, FiHeart, 
  FiShare2, FiUsers, FiDownload 
} = FiIcons;

const Analytics = () => {
  const { state } = useContent();
  const [timeRange, setTimeRange] = useState('30d');
  const [loading, setLoading] = useState(false);

  // Mock data for demonstration
  const performanceData = [
    {
      id: 1,
      title: 'Finding Clarity in Chaos: A Personal Journey',
      type: 'blog_post',
      views: 2340,
      engagement: 94,
      likes: 156,
      shares: 43,
      comments: 28,
      trend: 15,
      publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2)
    },
    {
      id: 2,
      title: 'The Vulnerability Paradox',
      type: 'book_chapter',
      views: 1820,
      engagement: 87,
      likes: 134,
      shares: 32,
      comments: 19,
      trend: -8,
      publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5)
    },
    {
      id: 3,
      title: 'Growth Through Discomfort',
      type: 'social_post',
      views: 3100,
      engagement: 92,
      likes: 287,
      shares: 78,
      comments: 45,
      trend: 23,
      publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1)
    }
  ];

  const metrics = [
    {
      title: 'Total Views',
      value: '47.2K',
      change: '+15.3%',
      icon: FiEye,
      color: 'blue',
      subtitle: 'Last 30 days'
    },
    {
      title: 'Avg. Engagement',
      value: '91.2%',
      change: '+8.7%',
      icon: FiHeart,
      color: 'red',
      subtitle: 'Above industry avg'
    },
    {
      title: 'Content Velocity',
      value: '2.3 min',
      change: '-12%',
      icon: FiZap,
      color: 'green',
      subtitle: 'Processing time'
    },
    {
      title: 'Reach Growth',
      value: '+34.5%',
      change: '+5.2%',
      icon: FiTrendingUp,
      color: 'purple',
      subtitle: 'Month over month'
    },
    {
      title: 'Active Audience',
      value: '12.8K',
      change: '+18.9%',
      icon: FiUsers,
      color: 'indigo',
      subtitle: 'Unique readers'
    },
    {
      title: 'Content Score',
      value: '9.1/10',
      change: '+0.3',
      icon: FiTarget,
      color: 'orange',
      subtitle: 'Quality rating'
    }
  ];

  // Chart configurations
  const engagementTrendOption = {
    title: {
      text: 'Engagement Trends',
      left: 'center',
      textStyle: { fontSize: 16, fontWeight: 'bold' }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' }
    },
    legend: {
      data: ['Views', 'Engagement Rate', 'Shares'],
      bottom: 10
    },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
    },
    yAxis: [
      { type: 'value', name: 'Views' },
      { type: 'value', name: 'Rate (%)', min: 0, max: 100 }
    ],
    series: [
      {
        name: 'Views',
        type: 'bar',
        data: [1200, 1900, 1500, 2300, 1800, 2500, 2100],
        itemStyle: { color: '#3b82f6' }
      },
      {
        name: 'Engagement Rate',
        type: 'line',
        yAxisIndex: 1,
        data: [85, 92, 88, 94, 89, 96, 91],
        smooth: true,
        itemStyle: { color: '#ef4444' }
      },
      {
        name: 'Shares',
        type: 'line',
        data: [45, 78, 62, 89, 73, 95, 82],
        smooth: true,
        itemStyle: { color: '#10b981' }
      }
    ]
  };

  const contentDistributionOption = {
    title: {
      text: 'Content Distribution',
      left: 'center',
      textStyle: { fontSize: 16, fontWeight: 'bold' }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    series: [{
      name: 'Content Type',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '18',
          fontWeight: 'bold'
        }
      },
      labelLine: { show: false },
      data: [
        { value: 35, name: 'Blog Posts', itemStyle: { color: '#3b82f6' } },
        { value: 28, name: 'Social Posts', itemStyle: { color: '#ef4444' } },
        { value: 22, name: 'Book Chapters', itemStyle: { color: '#10b981' } },
        { value: 15, name: 'Other', itemStyle: { color: '#f59e0b' } }
      ]
    }]
  };

  const audienceInsightsOption = {
    title: {
      text: 'Audience Engagement Patterns',
      left: 'center',
      textStyle: { fontSize: 16, fontWeight: 'bold' }
    },
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: { type: 'value' },
    series: [{
      name: 'Engagement',
      type: 'line',
      data: [78, 92, 85, 89, 95, 73, 68],
      smooth: true,
      areaStyle: {
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(59,130,246,0.3)' },
            { offset: 1, color: 'rgba(59,130,246,0.1)' }
          ]
        }
      },
      lineStyle: { color: '#3b82f6' }
    }]
  };

  const timeRanges = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 3 months' },
    { value: '1y', label: 'Last year' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Advanced Analytics</h1>
            <p className="text-lg text-gray-600">
              Deep insights into your content performance and audience behavior
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {timeRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
            
            <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
              <SafeIcon icon={FiDownload} className="text-sm" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <MetricCard {...metric} />
            </motion.div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnalyticsChart
            title="Engagement Trends"
            option={engagementTrendOption}
            height="350px"
            loading={loading}
          />
          <AnalyticsChart
            title="Content Distribution"
            option={contentDistributionOption}
            height="350px"
            loading={loading}
          />
        </div>

        {/* Full Width Chart */}
        <AnalyticsChart
          title="Audience Engagement Patterns"
          option={audienceInsightsOption}
          height="300px"
          loading={loading}
        />

        {/* Content Performance and Insights */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <ContentPerformanceTable data={performanceData} />
          </div>
          <div>
            <PredictiveInsights />
          </div>
        </div>

        {/* Additional Insights */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">94.2%</div>
              <div className="text-sm text-gray-600">Content Quality Score</div>
              <div className="text-xs text-green-600 mt-1">+8.3% from last month</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">2.3 min</div>
              <div className="text-sm text-gray-600">Avg. Processing Time</div>
              <div className="text-xs text-green-600 mt-1">-15% improvement</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">87.5%</div>
              <div className="text-sm text-gray-600">Audience Satisfaction</div>
              <div className="text-xs text-green-600 mt-1">+12% increase</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Analytics;