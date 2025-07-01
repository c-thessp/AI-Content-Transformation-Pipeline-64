import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { QuestLogin } from '@questlabs/react-sdk';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAuth } from '../context/AuthContext';
import questConfig from '../config/questConfig';

const { FiBrain, FiZap, FiTarget, FiTrendingUp } = FiIcons;

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = ({ userId, token, newUser, email }) => {
    const result = login({ userId, token, email, newUser });
    
    if (result.newUser) {
      navigate('/onboarding');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex">
      {/* Left Section - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 to-accent-600 p-12 items-center justify-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white max-w-lg"
        >
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <SafeIcon icon={FiBrain} className="text-white text-2xl" />
            </div>
            <h1 className="text-3xl font-bold">ContentAI</h1>
          </div>
          
          <h2 className="text-4xl font-bold mb-6 leading-tight">
            Transform Your Content with AI
          </h2>
          
          <p className="text-xl text-primary-100 mb-8 leading-relaxed">
            Convert livestream transcripts into emotionally-rich content across multiple platforms with our advanced AI pipeline.
          </p>
          
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center space-x-3"
            >
              <SafeIcon icon={FiZap} className="text-primary-200" />
              <span className="text-primary-100">AI-powered insight extraction</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center space-x-3"
            >
              <SafeIcon icon={FiTarget} className="text-primary-200" />
              <span className="text-primary-100">Multi-platform content generation</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center space-x-3"
            >
              <SafeIcon icon={FiTrendingUp} className="text-primary-200" />
              <span className="text-primary-100">Advanced analytics & insights</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Right Section - Login Form */}
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
            <p className="text-gray-600">Welcome back to your content transformation hub</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
              <p className="text-gray-600">Sign in to continue your content journey</p>
            </div>

            <div className="w-full" style={{ minHeight: '400px' }}>
              <QuestLogin
                onSubmit={handleLogin}
                email={true}
                google={false}
                accent={questConfig.PRIMARY_COLOR}
              />
            </div>
          </div>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              By signing in, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;