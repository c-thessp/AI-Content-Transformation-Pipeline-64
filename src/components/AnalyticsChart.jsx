import React from 'react';
import ReactECharts from 'echarts-for-react';
import { motion } from 'framer-motion';

const AnalyticsChart = ({ title, option, height = '300px', loading = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      {loading ? (
        <div className="flex items-center justify-center" style={{ height }}>
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary-600 border-t-transparent"></div>
        </div>
      ) : (
        <ReactECharts option={option} style={{ height }} />
      )}
    </motion.div>
  );
};

export default AnalyticsChart;