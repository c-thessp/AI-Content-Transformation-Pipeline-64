import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { QuestProvider } from '@questlabs/react-sdk';
import '@questlabs/react-sdk/dist/style.css';

import { AuthProvider } from './context/AuthContext';
import { ContentProvider } from './context/ContentContext';
import { RoleProvider } from './context/RoleContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navigation from './components/Navigation';
import FeedbackButton from './components/FeedbackButton';

// Pages
import Login from './pages/Login';
import OnboardingPage from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import ContentLibrary from './pages/ContentLibrary';
import InsightsDatabase from './pages/InsightsDatabase';
import Recommendations from './pages/Recommendations';
import Integrations from './pages/Integrations';
import Analytics from './pages/Analytics';

import questConfig from './config/questConfig';

function App() {
  return (
    <QuestProvider
      apiKey={questConfig.APIKEY}
      entityId={questConfig.ENTITYID}
      apiType="PRODUCTION"
    >
      <AuthProvider>
        <ContentProvider>
          <RoleProvider>
            <Router>
              <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/login" element={<Login />} />
                  
                  {/* Protected Routes */}
                  <Route
                    path="/onboarding"
                    element={
                      <ProtectedRoute>
                        <OnboardingPage />
                      </ProtectedRoute>
                    }
                  />
                  
                  <Route
                    path="/*"
                    element={
                      <ProtectedRoute>
                        <>
                          <Navigation />
                          <motion.main
                            className="pt-16"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                          >
                            <Routes>
                              <Route path="/" element={<Dashboard />} />
                              <Route path="/upload" element={<Upload />} />
                              <Route path="/library" element={<ContentLibrary />} />
                              <Route path="/insights" element={<InsightsDatabase />} />
                              <Route path="/recommendations" element={<Recommendations />} />
                              <Route path="/integrations" element={<Integrations />} />
                              <Route path="/analytics" element={<Analytics />} />
                            </Routes>
                          </motion.main>
                          <FeedbackButton />
                        </>
                      </ProtectedRoute>
                    }
                  />
                </Routes>
                
                <Toaster
                  position="top-right"
                  toastOptions={{
                    duration: 4000,
                    style: {
                      background: '#1f2937',
                      color: '#f9fafb',
                    },
                  }}
                />
              </div>
            </Router>
          </RoleProvider>
        </ContentProvider>
      </AuthProvider>
    </QuestProvider>
  );
}

export default App;