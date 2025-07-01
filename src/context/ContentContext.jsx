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
        loading: { ...state.loading, [action.payload.type]: action.payload.loading }
      };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
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
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export const ContentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(contentReducer, initialState);

  // Create sample data if no real data exists
  const createSampleData = () => {
    const sampleTranscripts = [
      {
        id: '1',
        name: 'livestream-session-042.txt',
        content: 'Sample transcript about personal growth and vulnerability...',
        processed: true,
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()
      },
      {
        id: '2',
        name: 'coaching-call-015.txt',
        content: 'Coaching session transcript about breakthrough moments...',
        processed: true,
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
      },
      {
        id: '3',
        name: 'workshop-notes-003.txt',
        content: 'Workshop notes about mindset shifts and transformation...',
        processed: true,
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString()
      }
    ];

    const sampleContent = [
      {
        id: '1',
        title: 'Finding Clarity in Chaos: A Personal Journey',
        content: 'Life has a way of throwing curveballs when we least expect them...',
        type: 'blog_post',
        status: 'published',
        word_count: 856,
        created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString()
      },
      {
        id: '2',
        title: 'The Vulnerability Paradox',
        content: 'Chapter excerpt exploring how vulnerability is our greatest strength...',
        type: 'book_chapter',
        status: 'draft',
        word_count: 1247,
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString()
      },
      {
        id: '3',
        title: 'Growth Through Discomfort',
        content: 'Sometimes the greatest breakthroughs happen when we lean into discomfort. 🌱 #PersonalGrowth',
        type: 'social_post',
        status: 'scheduled',
        word_count: 45,
        created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString()
      },
      {
        id: '4',
        title: 'Emotional Intelligence in Leadership',
        content: 'A comprehensive guide to developing emotional intelligence as a leadership skill...',
        type: 'blog_post',
        status: 'draft',
        word_count: 1534,
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString()
      },
      {
        id: '5',
        title: 'Reframing Your Internal Narrative',
        content: 'The stories we tell ourselves shape our reality. Here are practical techniques...',
        type: 'social_post',
        status: 'ready',
        word_count: 67,
        created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString()
      }
    ];

    const sampleInsights = [
      {
        id: '1',
        type: 'emotional_breakthrough',
        content: 'Vulnerability leads to authentic connection',
        confidence: 0.95,
        context: 'Discussed during livestream about personal growth',
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()
      },
      {
        id: '2',
        type: 'core_belief',
        content: 'Growth happens in discomfort zones',
        confidence: 0.87,
        context: 'Recurring theme across multiple sessions',
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
      },
      {
        id: '3',
        type: 'pattern',
        content: 'Breakthrough moments occur during vulnerability',
        confidence: 0.92,
        context: 'Pattern identified across coaching sessions',
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString()
      },
      {
        id: '4',
        type: 'emotional_breakthrough',
        content: 'Self-acceptance accelerates personal transformation',
        confidence: 0.89,
        context: 'Workshop insight about accepting current reality',
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
      },
      {
        id: '5',
        type: 'core_belief',
        content: 'Authenticity attracts the right opportunities',
        confidence: 0.84,
        context: 'Pattern observed in successful coaching clients',
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString()
      },
      {
        id: '6',
        type: 'pattern',
        content: 'Emotional courage precedes breakthrough',
        confidence: 0.91,
        context: 'Willingness to feel difficult emotions leads to insights',
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString()
      }
    ];

    dispatch({ type: 'SET_TRANSCRIPTS', payload: sampleTranscripts });
    dispatch({ type: 'SET_GENERATED_CONTENT', payload: sampleContent });
    dispatch({ type: 'SET_INSIGHTS', payload: sampleInsights });
  };

  // Fetch transcripts from Supabase
  const fetchTranscripts = async () => {
    dispatch({ type: 'SET_LOADING', payload: { type: 'transcripts', loading: true } });
    
    try {
      const { data, error } = await supabase
        .from('transcripts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Supabase fetch error, using sample data:', error);
        createSampleData();
        return;
      }

      if (!data || data.length === 0) {
        console.log('No data found, using sample data');
        createSampleData();
        return;
      }

      dispatch({ type: 'SET_TRANSCRIPTS', payload: data });
    } catch (error) {
      console.warn('Error fetching transcripts, using sample data:', error);
      createSampleData();
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

      if (error) {
        console.warn('Content fetch error, using sample data');
        return;
      }

      if (data && data.length > 0) {
        dispatch({ type: 'SET_GENERATED_CONTENT', payload: data });
      }
    } catch (error) {
      console.warn('Error fetching content:', error);
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

      if (error) {
        console.warn('Insights fetch error, using sample data');
        return;
      }

      if (data && data.length > 0) {
        dispatch({ type: 'SET_INSIGHTS', payload: data });
      }
    } catch (error) {
      console.warn('Error fetching insights:', error);
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
        dispatch({ type: 'LOAD_STATE', payload: { integrations } });
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