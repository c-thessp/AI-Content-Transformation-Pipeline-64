import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GetStarted } from '@questlabs/react-sdk';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import questConfig from '../config/questConfig';

const { FiX, FiPlay } = FiIcons;

const GetStartedModal = ({ isOpen, onClose }) => {
  // Generate or get user ID
  const getUserId = () => {
    let userId = localStorage.getItem('userId');
    if (!userId) {
      userId = questConfig.USER_ID;
      localStorage.setItem('userId', userId);
    }
    return userId;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiPlay} className="text-primary-600 text-xl" />
                <h2 className="text-xl font-bold text-gray-900">Get Started</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <SafeIcon icon={FiX} className="text-lg" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              <GetStarted
                questId={questConfig.GET_STARTED_QUESTID}
                uniqueUserId={getUserId()}
                accent={questConfig.PRIMARY_COLOR}
                autoHide={false}
              >
                <GetStarted.Header />
                <GetStarted.Progress />
                <GetStarted.Content />
                <GetStarted.Footer />
              </GetStarted>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GetStartedModal;