import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiBrain, FiEdit3, FiShare2, FiCheck } = FiIcons;

const ProcessingModal = ({ isOpen, currentStep }) => {
  const steps = [
    {
      id: 0,
      title: 'Preparing',
      description: 'Analyzing transcript content',
      icon: FiEdit3
    },
    {
      id: 1,
      title: 'Extracting Insights',
      description: 'Identifying emotional themes and breakthroughs',
      icon: FiBrain
    },
    {
      id: 2,
      title: 'Generating Content',
      description: 'Creating blog posts, social content, and chapters',
      icon: FiEdit3
    },
    {
      id: 3,
      title: 'Finalizing',
      description: 'Preparing content for distribution',
      icon: FiShare2
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full"
          >
            <div className="text-center mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Processing Your Content
              </h3>
              <p className="text-gray-600">
                Transforming transcript into emotionally-rich content
              </p>
            </div>

            <div className="space-y-4">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`flex items-center space-x-4 p-4 rounded-lg transition-all ${
                    currentStep === step.id
                      ? 'bg-primary-50 border-2 border-primary-200'
                      : currentStep > step.id
                      ? 'bg-green-50 border-2 border-green-200'
                      : 'bg-gray-50 border-2 border-gray-200'
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      currentStep === step.id
                        ? 'bg-primary-100 text-primary-600'
                        : currentStep > step.id
                        ? 'bg-green-100 text-green-600'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {currentStep > step.id ? (
                      <SafeIcon icon={FiCheck} className="text-sm" />
                    ) : (
                      <SafeIcon icon={step.icon} className="text-sm" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{step.title}</p>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                  {currentStep === step.id && (
                    <div className="w-4 h-4">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-600 border-t-transparent"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6">
              <div className="bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-primary-600 to-accent-600 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <p className="text-center text-sm text-gray-600 mt-2">
                Step {currentStep + 1} of {steps.length}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProcessingModal;