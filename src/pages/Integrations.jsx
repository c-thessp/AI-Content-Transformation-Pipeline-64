import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useContent } from '../context/ContentContext';
import toast from 'react-hot-toast';

const { FiSettings, FiCheck, FiX, FiExternalLink, FiKey, FiGlobe, FiBrain, FiShare2, FiBook } = FiIcons;

const Integrations = () => {
  const { state, dispatch } = useContent();
  const [activeTab, setActiveTab] = useState('claude');

  const integrations = [
    {
      id: 'claude',
      name: 'Claude AI',
      description: 'AI-powered content generation and insight extraction',
      icon: FiBrain,
      color: 'from-orange-500 to-red-500',
      fields: [
        { key: 'apiKey', label: 'API Key', type: 'password', required: true }
      ]
    },
    {
      id: 'wordpress',
      name: 'WordPress',
      description: 'Automatically publish blog posts to your WordPress site',
      icon: FiGlobe,
      color: 'from-blue-600 to-blue-700',
      fields: [
        { key: 'url', label: 'Site URL', type: 'url', required: true },
        { key: 'username', label: 'Username', type: 'text', required: true },
        { key: 'password', label: 'Application Password', type: 'password', required: true }
      ]
    },
    {
      id: 'buffer',
      name: 'Buffer',
      description: 'Schedule and publish social media content',
      icon: FiShare2,
      color: 'from-blue-400 to-blue-500',
      fields: [
        { key: 'accessToken', label: 'Access Token', type: 'password', required: true }
      ]
    },
    {
      id: 'notion',
      name: 'Notion',
      description: 'Save insights and content to your Notion workspace',
      icon: FiBook,
      color: 'from-gray-700 to-gray-800',
      fields: [
        { key: 'token', label: 'Integration Token', type: 'password', required: true }
      ]
    }
  ];

  const [formData, setFormData] = useState({});

  const handleInputChange = (integrationId, field, value) => {
    setFormData(prev => ({
      ...prev,
      [integrationId]: {
        ...prev[integrationId],
        [field]: value
      }
    }));
  };

  const handleConnect = (integrationId) => {
    const integration = integrations.find(i => i.id === integrationId);
    const data = formData[integrationId] || {};
    
    // Validate required fields
    const missingFields = integration.fields
      .filter(field => field.required && !data[field.key])
      .map(field => field.label);

    if (missingFields.length > 0) {
      toast.error(`Please fill in: ${missingFields.join(', ')}`);
      return;
    }

    // Update integration status
    dispatch({
      type: 'UPDATE_INTEGRATION',
      payload: {
        type: integrationId,
        config: {
          connected: true,
          ...data
        }
      }
    });

    toast.success(`${integration.name} connected successfully!`);
  };

  const handleDisconnect = (integrationId) => {
    const integration = integrations.find(i => i.id === integrationId);
    
    dispatch({
      type: 'UPDATE_INTEGRATION',
      payload: {
        type: integrationId,
        config: {
          connected: false
        }
      }
    });

    setFormData(prev => ({
      ...prev,
      [integrationId]: {}
    }));

    toast.success(`${integration.name} disconnected`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Integrations</h1>
          <p className="text-lg text-gray-600">
            Connect your favorite platforms to automate content distribution
          </p>
        </div>

        {/* Integration Tabs */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex">
              {integrations.map((integration) => (
                <button
                  key={integration.id}
                  onClick={() => setActiveTab(integration.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 border-b-2 transition-all ${
                    activeTab === integration.id
                      ? 'border-primary-500 text-primary-600 bg-primary-50'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <SafeIcon icon={integration.icon} className="text-sm" />
                  <span className="font-medium">{integration.name}</span>
                  {state.integrations[integration.id]?.connected && (
                    <SafeIcon icon={FiCheck} className="text-green-500 text-xs" />
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Integration Content */}
          {integrations.map((integration) => (
            <div
              key={integration.id}
              className={`p-8 ${activeTab === integration.id ? 'block' : 'hidden'}`}
            >
              <div className="flex items-start space-x-6">
                <div className={`p-4 rounded-xl bg-gradient-to-br ${integration.color} flex-shrink-0`}>
                  <SafeIcon icon={integration.icon} className="text-white text-2xl" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{integration.name}</h3>
                      <p className="text-gray-600">{integration.description}</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {state.integrations[integration.id]?.connected ? (
                        <>
                          <span className="flex items-center space-x-1 text-green-600 bg-green-100 px-3 py-1 rounded-full text-sm font-medium">
                            <SafeIcon icon={FiCheck} className="text-xs" />
                            <span>Connected</span>
                          </span>
                          <button
                            onClick={() => handleDisconnect(integration.id)}
                            className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <SafeIcon icon={FiX} />
                          </button>
                        </>
                      ) : (
                        <span className="text-gray-500 bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">
                          Not Connected
                        </span>
                      )}
                    </div>
                  </div>

                  {!state.integrations[integration.id]?.connected && (
                    <div className="space-y-4">
                      {integration.fields.map((field) => (
                        <div key={field.key}>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {field.label}
                            {field.required && <span className="text-red-500 ml-1">*</span>}
                          </label>
                          <input
                            type={field.type}
                            value={formData[integration.id]?.[field.key] || ''}
                            onChange={(e) => handleInputChange(integration.id, field.key, e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder={`Enter your ${field.label.toLowerCase()}`}
                          />
                        </div>
                      ))}
                      
                      <button
                        onClick={() => handleConnect(integration.id)}
                        className="flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-accent-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-primary-700 hover:to-accent-700 transition-all"
                      >
                        <SafeIcon icon={FiKey} />
                        <span>Connect {integration.name}</span>
                      </button>
                    </div>
                  )}

                  {state.integrations[integration.id]?.connected && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2 text-green-800">
                        <SafeIcon icon={FiCheck} />
                        <span className="font-medium">Integration Active</span>
                      </div>
                      <p className="text-green-700 text-sm mt-1">
                        Content will be automatically distributed to {integration.name}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Setup Guide */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Setup Guide</h3>
          <div className="space-y-2 text-blue-800">
            <p>• <strong>Claude AI:</strong> Get your API key from the Anthropic console</p>
            <p>• <strong>WordPress:</strong> Create an application password in your user profile</p>
            <p>• <strong>Buffer:</strong> Generate an access token from your Buffer developer account</p>
            <p>• <strong>Notion:</strong> Create an integration token in your Notion workspace settings</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Integrations;