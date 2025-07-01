import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { OnBoarding } from '@questlabs/react-sdk';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAuth } from '../context/AuthContext';
import questConfig from '../config/questConfig';

const { FiBrain, FiRocket, FiStar, FiCheck } = FiIcons;

const OnboardingPage = () => {
  const navigate = useNavigate();
  const { user, completeOnboarding, isAuthenticated } = useAuth();
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const userId = user?.id || localStorage.getItem('userId');
  const token = user?.token || localStorage.getItem('token');

  const getAnswers = () => {
    // Mark onboarding as complete
    completeOnboarding();
    
    // Navigate to main app
    navigate('/', { replace: true });
  };

  if (!userId || !token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your onboarding experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex">
      {/* Left Section - Visual/Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 to-accent-600 p-12 items-center justify-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white max-w-lg text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", bounce: 0.5 }}
            className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm mx-auto mb-8"
          >
            <SafeIcon icon={FiRocket} className="text-white text-4xl" />
          </motion.div>
          
          <h1 className="text-4xl font-bold mb-6">Let's Get Started!</h1>
          
          <p className="text-xl text-primary-100 mb-8 leading-relaxed">
            We're setting up your personalized content transformation experience. This will only take a few moments.
          </p>
          
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center space-x-3 bg-white/10 rounded-lg p-4 backdrop-blur-sm"
            >
              <SafeIcon icon={FiCheck} className="text-green-300" />
              <span className="text-primary-100">Account created successfully</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center space-x-3 bg-white/10 rounded-lg p-4 backdrop-blur-sm"
            >
              <SafeIcon icon={FiStar} className="text-yellow-300" />
              <span className="text-primary-100">Personalization in progress</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Right Section - Onboarding Component */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                <SafeIcon icon={FiBrain} className="text-white text-xl" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                ContentAI
              </h1>
            </div>
            <p className="text-gray-600">Let's personalize your experience</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div style={{ width: '400px', height: 'auto', minHeight: '500px' }}>
              <OnBoarding
                userId={userId}
                token={token}
                questId={questConfig.QUEST_ONBOARDING_QUESTID}
                answer={answers}
                setAnswer={setAnswers}
                getAnswers={getAnswers}
                accent={questConfig.PRIMARY_COLOR}
                singleChoose="modal1"
                multiChoice="modal2"
              >
                <OnBoarding.Header />
                <OnBoarding.Content />
                <OnBoarding.Footer />
              </OnBoarding>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OnboardingPage;