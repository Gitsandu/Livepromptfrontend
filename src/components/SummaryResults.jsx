import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  IconButton,
  Divider,
  CircularProgress,
  LinearProgress,
  Fade,
  Grow,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Assignment as AssignmentIcon,
  Lightbulb as LightbulbIcon,
  FileCopy as FileCopyIcon,
  Download as DownloadIcon,
  Code as CodeIcon,
  Add as AddIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';

const SummaryResults = ({ summaryData, onBack, onNewTranscript }) => {
  const [showContent, setShowContent] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [isProcessingComplete, setIsProcessingComplete] = useState(false);

  useEffect(() => {
    // Simulate processing animation
    const timer = setInterval(() => {
      setProcessingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsProcessingComplete(true);
            setTimeout(() => setShowContent(true), 300);
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(timer);
  }, []);

  const handleCopySummary = () => {
    const summaryText = `
Summary: ${summaryData.summary}

Action Items:
${summaryData.action_items?.map(item => `• ${item.text} (Owner: ${item.owner}, Due: ${item.due})`).join('\n') || ''}

Topics:
${summaryData.topics?.map(topic => `• ${topic}`).join('\n') || ''}
    `.trim();
    
    navigator.clipboard.writeText(summaryText);
  };

  const handleDownloadTxt = () => {
    const summaryText = `
TRANSCRIPT SUMMARY
==================

Summary: ${summaryData.summary}

ACTION ITEMS
============
${summaryData.action_items?.map(item => `• ${item.text}\n  Owner: ${item.owner}\n  Due: ${item.due}`).join('\n\n') || ''}

TOPICS COVERED
==============
${summaryData.topics?.map(topic => `• ${topic}`).join('\n') || ''}
    `.trim();

    const blob = new Blob([summaryText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transcript-summary.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadJson = () => {
    const blob = new Blob([JSON.stringify(summaryData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transcript-summary.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isProcessingComplete) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress size={80} sx={{ mb: 3, color: '#1976d2' }} />
          <Typography variant="h5" gutterBottom>
            Processing Your Transcript...
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Analyzing content and generating insights
          </Typography>
          <Box sx={{ width: '100%', maxWidth: 400, mx: 'auto' }}>
            <LinearProgress 
              variant="determinate" 
              value={processingProgress} 
              sx={{ 
                height: 8, 
                borderRadius: 4,
                backgroundColor: '#e0e0e0',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#1976d2',
                }
              }} 
            />
            <Typography variant="body2" sx={{ mt: 1 }}>
              {processingProgress}% Complete
            </Typography>
          </Box>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Fade in={showContent} timeout={800}>
        <Box>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
              <CheckCircleIcon sx={{ fontSize: 48, color: '#4caf50', mb: 1 }} />
              <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                Summary Ready!
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Your transcript has been successfully processed and summarized. Review the key
                insights below and export in your preferred format.
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={4} justifyContent="center">
            {/* Main Summary Section */}
            <Grid item xs={12} lg={8} >
              <Grow in={showContent} timeout={1000}>
                <Paper elevation={3} sx={{ p: 4, mb: 3, borderRadius: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h5" fontWeight="bold">
                      Generated Summary
                    </Typography>
                    <Chip 
                      label="Processed in 2.3s" 
                      color="primary" 
                      variant="outlined"    
                      size="small"
                    />
                  </Box>

                  {/* Summary */}
                  <Box sx={{ mb: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <AssignmentIcon sx={{ mr: 1, color: '#1976d2' }} />
                      <Typography variant="h6" fontWeight="bold">
                        Summary
                      </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ lineHeight: 1.6, color: 'text.primary' }}>
                      {summaryData.summary}
                    </Typography>
                  </Box>

                  {/* Action Items */}
                  {summaryData.action_items && summaryData.action_items.length > 0 && (
                    <Box sx={{ mb: 4 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <AssignmentIcon sx={{ mr: 1, color: '#ff9800' }} />
                        <Typography variant="h6" fontWeight="bold">
                          Action Items
                        </Typography>
                      </Box>
                      <List>
                        {summaryData.action_items.map((item, index) => (
                          <ListItem key={index} sx={{ py: 1, backgroundColor: '#f8f9fa', borderRadius: 1, mb: 1 }}>
                            <ListItemText 
                              primary={item.text}
                              secondary={`Owner: ${item.owner} • Due: ${item.due}`}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  )}


                  {/* Action Buttons */}
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Button
                      variant="contained"
                      startIcon={<FileCopyIcon />}
                      onClick={handleCopySummary}
                      sx={{ backgroundColor: '#2c3e50', '&:hover': { backgroundColor: '#34495e' } }}
                    >
                      Copy Summary
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<DownloadIcon />}
                      onClick={handleDownloadTxt}
                    >
                      Download as .txt
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<CodeIcon />}
                      onClick={handleDownloadJson}
                    >
                      Download as .json
                    </Button>
                  </Box>
                </Paper>
              </Grow>

              {/* New Transcript Button */}
              <Box sx={{ textAlign: 'center' }}>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={onNewTranscript}
                  size="large"
                  sx={{ px: 4 }}
                >
                  Summarize Another Transcript
                </Button>
              </Box>
            </Grid>

            {/* Sidebar with Statistics */}
            <Grid item xs={12} lg={4}>
              <Grow in={showContent} timeout={1200}>
                <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Processing Statistics
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" fontWeight="bold" color="primary">
                          {summaryData.action_items?.length || 0}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Action Items
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" fontWeight="bold" color="primary">
                          {summaryData.topics?.length || 0}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Topics
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>

                  {/* Topics */}
                  {summaryData.topics && summaryData.topics.length > 0 && (
                    <Box sx={{ mt: 4 }}>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Topics Covered
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {summaryData.topics.map((topic, index) => (
                          <Chip
                            key={index}
                            label={topic}
                            variant="outlined"
                            size="small"
                            color="primary"
                          />
                        ))}
                      </Box>
                    </Box>
                  )}
                </Paper>
              </Grow>
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Container>
  );
};

export default SummaryResults;
