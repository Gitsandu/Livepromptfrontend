import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentScreen: 'upload', // 'upload' | 'results'
  transcriptData: {
    text: '',
    file: null,
  },
  summaryData: null,
  isProcessing: false,
  error: null,
  history: [], // Store previous summaries
};

const transcriptSlice = createSlice({
  name: 'transcript',
  initialState,
  reducers: {
    // Screen navigation
    setCurrentScreen: (state, action) => {
      state.currentScreen = action.payload;
    },
    
    // Transcript input management
    setTranscriptText: (state, action) => {
      state.transcriptData.text = action.payload;
    },
    
    setTranscriptFile: (state, action) => {
      state.transcriptData.file = action.payload;
    },
    
    clearTranscriptData: (state) => {
      state.transcriptData = {
        text: '',
        file: null,
      };
    },
    
    // Summary management
    setSummaryData: (state, action) => {
      state.summaryData = action.payload;
    },
    
    clearSummaryData: (state) => {
      state.summaryData = null;
    },
    
    // Processing state
    setProcessing: (state, action) => {
      state.isProcessing = action.payload;
    },
    
    // Error handling
    setError: (state, action) => {
      state.error = action.payload;
    },
    
    clearError: (state) => {
      state.error = null;
    },
    
    // History management
    addToHistory: (state, action) => {
      state.history.unshift(action.payload);
      // Keep only last 10 summaries in history
      if (state.history.length > 10) {
        state.history = state.history.slice(0, 10);
      }
    },
    
    clearHistory: (state) => {
      state.history = [];
    },
    
    // Reset all state
    resetTranscriptState: (state) => {
      return initialState;
    },
    
    // Navigate to results with data
    navigateToResults: (state, action) => {
      state.currentScreen = 'results';
      state.summaryData = action.payload;
      state.isProcessing = false;
      state.error = null;
    },
    
    // Navigate back to upload
    navigateToUpload: (state) => {
      state.currentScreen = 'upload';
      state.summaryData = null;
      state.error = null;
    },
  },
});

export const {
  setCurrentScreen,
  setTranscriptText,
  setTranscriptFile,
  clearTranscriptData,
  setSummaryData,
  clearSummaryData,
  setProcessing,
  setError,
  clearError,
  addToHistory,
  clearHistory,
  resetTranscriptState,
  navigateToResults,
  navigateToUpload,
} = transcriptSlice.actions;

// Selectors
export const selectCurrentScreen = (state) => state.transcript.currentScreen;
export const selectTranscriptData = (state) => state.transcript.transcriptData;
export const selectSummaryData = (state) => state.transcript.summaryData;
export const selectIsProcessing = (state) => state.transcript.isProcessing;
export const selectError = (state) => state.transcript.error;
export const selectHistory = (state) => state.transcript.history;

export default transcriptSlice.reducer;
