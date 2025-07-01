import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useContent } from '../context/ContentContext';
import StatsCard from '../components/StatsCard';
import RecentActivity from '../components/RecentActivity';
import QuickActions from '../components/QuickActions';

const { FiUpload, FiFileText, FiBrain, FiTrendingUp, FiZap, FiTarget } = FiIcons;

const Dashboard = () => {
  const { state } = useContent();

  const stats = [
    {
      title: 'Total Transcripts',
      value: state.analytics.totalTranscripts,
      icon: FiFileText,
      color: 'blue',
      change: '+12%'
    },
    {
      title: 'Generated Content',
      value: state.analytics.totalContent,
      icon: FiZap,
      color: 'green',
      change: '+28%'
    },
    {
      title: 'Insights Extracted',
      value: state.analytics.totalInsights,
      icon: FiBrain,
      color: 'purple',
      change: '+15%'
    },
    {
      title: 'Content Performance',
      value: '94%',
      icon: FiTrendingUp,
      color: 'orange',
      change: '+8%'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
            AI Content Transformation Pipeline
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your livestream transcripts into emotionally-rich content across multiple platforms
          </p>
        </div>

        {/* Quick Start */}
        {state.analytics.totalTranscripts === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl p-8 text-white text-center"
          >
            <SafeIcon icon={FiTarget} className="text-4xl mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Ready to Transform Your Content?</h2>
            <p className="text-primary-100 mb-6">
              Upload your first transcript to see the magic happen
            </p>
            <Link
              to="/upload"
              className="inline-flex items-center space-x-2 bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
            >
              <SafeIcon icon={FiUpload} />
              <span>Upload Transcript</span>
            </Link>
          </motion.div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <StatsCard {...stat} />
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <RecentActivity />
          </div>
          <div>
            <QuickActions />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;