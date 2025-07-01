import React, { useState } from 'react';
import { FeedbackWorkflow } from '@questlabs/react-sdk';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import questConfig from '../config/questConfig';

const { FiMessageSquare, FiChevronLeft, FiChevronRight } = FiIcons;

const FeedbackButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const getUserId = () => {
    let userId = localStorage.getItem('userId');
    if (!userId) {
      userId = questConfig.USER_ID;
      localStorage.setItem('userId', userId);
    }
    return userId;
  };

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
    
    // Event tracking for analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'feedback_button_click', {
        event_category: 'engagement',
        event_label: isOpen ? 'close' : 'open'
      });
    }
  };

  return (
    <>
      {/* Floating Feedback Button */}
      <button
        onClick={handleToggle}
        style={{ 
          background: questConfig.PRIMARY_COLOR,
          writingMode: 'vertical-rl',
          textOrientation: 'mixed'
        }}
        className="fixed top-1/2 -translate-y-1/2 -right-2 z-50 flex items-center justify-center px-3 py-4 text-white font-semibold text-sm rounded-l-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-right-0 group"
        aria-label="Open feedback form"
      >
        <div className="flex items-center space-y-2 flex-col">
          <SafeIcon 
            icon={isOpen ? FiChevronRight : FiChevronLeft} 
            className="text-sm group-hover:scale-110 transition-transform" 
          />
          <span className="text-xs font-medium tracking-wider">FEEDBACK</span>
          <SafeIcon 
            icon={FiMessageSquare} 
            className="text-sm group-hover:scale-110 transition-transform" 
          />
        </div>
      </button>

      {/* Feedback Workflow Component */}
      {isOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <FeedbackWorkflow
              uniqueUserId={getUserId()}
              questId={questConfig.QUEST_FEEDBACK_QUESTID}
              isOpen={isOpen}
              accent={questConfig.PRIMARY_COLOR}
              onClose={() => setIsOpen(false)}
            >
              <FeedbackWorkflow.ThankYou />
            </FeedbackWorkflow>
          </div>
        </div>
      )}
    </>
  );
};

export default FeedbackButton;