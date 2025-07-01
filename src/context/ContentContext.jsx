import React, { createContext, useContext, useReducer, useEffect } from 'react';

const ContentContext = createContext();

const initialState = {
  transcripts: [],
  generatedContent: [],
  insights: [],
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

  useEffect(() => {
    const savedState = localStorage.getItem('contentPipelineState');
    if (savedState) {
      dispatch({ type: 'LOAD_STATE', payload: JSON.parse(savedState) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contentPipelineState', JSON.stringify(state));
  }, [state]);

  return (
    <ContentContext.Provider value={{ state, dispatch }}>
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