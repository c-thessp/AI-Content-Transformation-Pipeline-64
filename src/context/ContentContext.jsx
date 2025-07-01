import React, { createContext, useContext, useReducer, useEffect } from 'react';
import supabase from '../lib/supabase';

const ContentContext = createContext();

const initialState = {
  transcripts: [],
  generatedContent: [],
  insights: [],
  loading: {
    transcripts: false,
    content: false,
    insights: false
  },
  error: null,
  integrations: {
    claude: { connected: false, apiKey: '' },
    wordpress: { connected: false, url: '', username: '', password: '' },
    buffer: { connected: false, accessToken: '' },
    notion: { connected: false, token: '' }
  },
  analytics: {
    totalTranscripts: 0,
    totalContent: 0,
    totalInsights: 0,
    contentTypes: {}
  }
};

function contentReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.payload.type]: action.payload.loading
        }
      };
    
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload
      };
    
    case 'SET_TRANSCRIPTS':
      return {
        ...state,
        transcripts: action.payload,
        analytics: {
          ...state.analytics,
          totalTranscripts: action.payload.length
        }
      };
    
    case 'SET_GENERATED_CONTENT':
      const contentTypes = action.payload.reduce((acc, item) => {
        acc[item.type] = (acc[item.type] || 0) + 1;
        return acc;
      }, {});
      
      return {
        ...state,
        generatedContent: action.payload,
        analytics: {
          ...state.analytics,
          totalContent: action.payload.length,
          contentTypes
        }
      };
    
    case 'SET_INSIGHTS':
      return {
        ...state,
        insights: action.payload,
        analytics: {
          ...state.analytics,
          totalInsights: action.payload.length
        }
      };
    
    case 'ADD_TRANSCRIPT':
      return {
        ...state,
        transcripts: [...state.transcripts, action.payload],
        analytics: {
          ...state.analytics,
          totalTranscripts: state.analytics.totalTranscripts + 1
        }
      };
    
    case 'ADD_GENERATED_CONTENT':
      return {
        ...state,
        generatedContent: [...state.generatedContent, ...action.payload],
        analytics: {
          ...state.analytics,
          totalContent: state.analytics.totalContent + action.payload.length
        }
      };
    
    case 'ADD_INSIGHTS':
      return {
        ...state,
        insights: [...state.insights, ...action.payload],
        analytics: {
          ...state.analytics,
          totalInsights: state.analytics.totalInsights + action.payload.length
        }
      };
    
    case 'UPDATE_INTEGRATION':
      return {
        ...state,
        integrations: {
          ...state.integrations,
          [action.payload.type]: action.payload.config
        }
      };
    
    case 'LOAD_STATE':
      return {
        ...state,
        ...action.payload
      };
    
    default:
      return state;
  }
}

export const ContentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(contentReducer, initialState);

  // Fetch transcripts from Supabase
  const fetchTranscripts = async () => {
    dispatch({ type: 'SET_LOADING', payload: { type: 'transcripts', loading: true } });
    
    try {
      const { data, error } = await supabase
        .from('transcripts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      dispatch({ type: 'SET_TRANSCRIPTS', payload: data || [] });
    } catch (error) {
      console.error('Error fetching transcripts:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: { type: 'transcripts', loading: false } });
    }
  };

  // Fetch generated content from Supabase
  const fetchGeneratedContent = async () => {
    dispatch({ type: 'SET_LOADING', payload: { type: 'content', loading: true } });
    
    try {
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      dispatch({ type: 'SET_GENERATED_CONTENT', payload: data || [] });
    } catch (error) {
      console.error('Error fetching generated content:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: { type: 'content', loading: false } });
    }
  };

  // Fetch insights from Supabase
  const fetchInsights = async () => {
    dispatch({ type: 'SET_LOADING', payload: { type: 'insights', loading: true } });
    
    try {
      const { data, error } = await supabase
        .from('insights')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      dispatch({ type: 'SET_INSIGHTS', payload: data || [] });
    } catch (error) {
      console.error('Error fetching insights:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: { type: 'insights', loading: false } });
    }
  };

  // Refresh all data
  const refreshAllData = async () => {
    await Promise.all([
      fetchTranscripts(),
      fetchGeneratedContent(),
      fetchInsights()
    ]);
  };

  // Load integrations from localStorage
  useEffect(() => {
    try {
      const savedIntegrations = localStorage.getItem('contentPipelineIntegrations');
      if (savedIntegrations && savedIntegrations !== 'undefined') {
        const integrations = JSON.parse(savedIntegrations);
        dispatch({ 
          type: 'LOAD_STATE', 
          payload: { integrations } 
        });
      }
    } catch (error) {
      console.warn('Failed to load saved integrations:', error);
      localStorage.removeItem('contentPipelineIntegrations');
    }
  }, []);

  // Save integrations to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('contentPipelineIntegrations', JSON.stringify(state.integrations));
    } catch (error) {
      console.warn('Failed to save integrations:', error);
    }
  }, [state.integrations]);

  // Initial data fetch
  useEffect(() => {
    refreshAllData();
  }, []);

  // Set up real-time subscriptions
  useEffect(() => {
    const contentSubscription = supabase
      .channel('content_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'content' }, 
        () => {
          fetchGeneratedContent();
        }
      )
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'insights' }, 
        () => {
          fetchInsights();
        }
      )
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'transcripts' }, 
        () => {
          fetchTranscripts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(contentSubscription);
    };
  }, []);

  const value = {
    state,
    dispatch,
    refreshAllData,
    fetchTranscripts,
    fetchGeneratedContent,
    fetchInsights
  };

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};