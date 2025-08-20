import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';
import TranscriptUpload from './TranscriptUpload';
import SummaryResults from './SummaryResults';
import {
  selectCurrentScreen,
  selectSummaryData,
  selectIsProcessing,
  navigateToUpload,
  navigateToResults,
  setProcessing,
  setError,
  addToHistory,
} from '../store/slices/transcriptSlice';
import { useCreateSummaryMutation } from '../store/api/transcriptApi';

const AppContent = () => {
  const dispatch = useDispatch();
  const currentScreen = useSelector(selectCurrentScreen);
  const summaryData = useSelector(selectSummaryData);
  const isProcessing = useSelector(selectIsProcessing);
  
  const [createSummary] = useCreateSummaryMutation();

  const handleSummarize = async (transcriptData) => {
    dispatch(setProcessing(true));
    dispatch(setError(null));
    
    try {
      const result = await createSummary(transcriptData).unwrap();
      
      // Add to history
      dispatch(addToHistory({
        id: Date.now().toString(),
        summary: result.summary,
        timestamp: new Date().toISOString(),
        ...result
      }));
      
      // Navigate to results with data
      dispatch(navigateToResults(result));
    } catch (error) {
      console.error('Error processing transcript:', error);
      dispatch(setError(error.message || 'An error occurred while processing the transcript'));
      dispatch(setProcessing(false));
    }
  };

  const handleBackToUpload = () => {
    dispatch(navigateToUpload());
  };

  const handleNewTranscript = () => {
    dispatch(navigateToUpload());
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'results':
        return (
          <SummaryResults
            summaryData={summaryData}
            onBack={handleBackToUpload}
            onNewTranscript={handleNewTranscript}
          />
        );
      case 'upload':
      default:
        return (
          <TranscriptUpload
            onSummarize={handleSummarize}
            isLoading={isProcessing}
          />
        );
    }
  };

  return (
    <>
      <Navbar />
      
      <Box component="main" sx={{ flexGrow: 1 }}>
        {renderCurrentScreen()}
      </Box>
      
      <Footer />
    </>
  );
};

export default AppContent;
