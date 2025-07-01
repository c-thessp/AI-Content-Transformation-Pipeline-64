import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useContent } from '../context/ContentContext';
import { format } from 'date-fns';

const { FiBook, FiEdit3, FiShare2, FiEye, FiDownload, FiFilter, FiSearch } = FiIcons;

const ContentLibrary = () => {
  const { state } = useContent();
  const [selectedType, setSelectedType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const contentTypes = [
    { id: 'all', label: 'All Content', icon: FiBook },
    { id: 'blog_post', label: 'Blog Posts', icon: FiEdit3 },
    { id: 'social_post', label: 'Social Posts', icon: FiShare2 },
    { id: 'book_chapter', label: 'Book Chapters', icon: FiBook }
  ];

  const filteredContent = state.generatedContent.filter(item => {
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Content Library</h1>
            <p className="text-gray-600 mt-2">
              Manage your AI-generated content across all platforms
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <span className="text-sm text-gray-500">
              {filteredContent.length} items
            </span>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-wrap gap-2">
              {contentTypes.map((type) => (
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
              <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Content Grid */}
        {filteredContent.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredContent.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <SafeIcon 
                      icon={contentTypes.find(t => t.id === item.type)?.icon || FiBook} 
                      className="text-primary-600" 
                    />
                    <span className="text-sm font-medium text-gray-600 capitalize">
                      {item.type.replace('_', ' ')}
                    </span>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </div>

                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {item.title}
                </h3>
                
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {item.content}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>{format(new Date(item.createdAt), 'MMM d, yyyy')}</span>
                  {item.insights && (
                    <span>{item.insights.length} insights</span>
                  )}
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 flex items-center justify-center space-x-1 py-2 px-3 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors">
                    <SafeIcon icon={FiEye} className="text-sm" />
                    <span className="text-sm">View</span>
                  </button>
                  <button className="flex items-center justify-center p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                    <SafeIcon icon={FiDownload} className="text-sm" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <SafeIcon icon={FiBook} className="text-4xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No content found</h3>
            <p className="text-gray-600">
              {searchTerm || selectedType !== 'all' 
                ? 'Try adjusting your filters or search term'
                : 'Upload a transcript to generate your first content'
              }
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ContentLibrary;