import React, { useState, useCallback } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  IconButton,
  CircularProgress,
  Backdrop,
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  Description as DescriptionIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';

const TranscriptUpload = ({ onSummarize, isLoading }) => {
  const [transcriptText, setTranscriptText] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedFile(file);
      // Read file content for text files
      if (file.type === 'text/plain') {
        const reader = new FileReader();
        reader.onload = (e) => {
          setTranscriptText(e.target.result);
        };
        reader.readAsText(file);
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/pdf': ['.pdf'],
    },
    maxSize: 10485760, // 10MB
    multiple: false,
  });

  const handleSummarize = () => {
    if (transcriptText.trim() || uploadedFile) {
      onSummarize({
        text: transcriptText,
        file: uploadedFile,
      });
    }
  };

  const isDisabled = !transcriptText.trim() && !uploadedFile;

  return (
    <>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: '#2c3e50',
              mb: 2,
            }}
          >
            Transform Transcripts into Insights
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            Upload or paste your audio transcripts and get intelligent summaries in
            seconds. Perfect for meetings, interviews, lectures, and research.
          </Typography>
        </Box>

        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 3,
            backgroundColor: '#fafafa',
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontWeight: 'bold', mb: 2 }}
          >
            Transcript Content
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 3 }}
          >
            Paste your transcript text below or upload a file. Supports .txt, .docx, and .pdf formats.
          </Typography>

          <TextField
            fullWidth
            multiline
            rows={8}
            placeholder="Paste your transcript here... or use the file upload below"
            value={transcriptText}
            onChange={(e) => setTranscriptText(e.target.value)}
            variant="outlined"
            sx={{
              mb: 4,
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'white',
                '&:hover fieldset': {
                  borderColor: '#1976d2',
                },
              },
            }}
          />

          <Paper
            {...getRootProps()}
            sx={{
              p: 4,
              textAlign: 'center',
              border: '2px dashed',
              borderColor: isDragActive ? '#1976d2' : '#ccc',
              backgroundColor: isDragActive ? '#f0f8ff' : 'white',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              mb: 4,
              '&:hover': {
                borderColor: '#1976d2',
                backgroundColor: '#f8f9fa',
              },
            }}
          >
            <input {...getInputProps()} />
            <CloudUploadIcon
              sx={{
                fontSize: 48,
                color: isDragActive ? '#1976d2' : '#999',
                mb: 2,
              }}
            />
            <Typography variant="h6" gutterBottom>
              {isDragActive
                ? 'Drop the file here...'
                : 'Click to upload or drag and drop'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              TXT, DOCX, PDF up to 10MB
            </Typography>
            {uploadedFile && (
              <Box
                sx={{
                  mt: 2,
                  p: 2,
                  backgroundColor: '#e3f2fd',
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1,
                }}
              >
                <DescriptionIcon color="primary" />
                <Typography variant="body2" color="primary">
                  {uploadedFile.name}
                </Typography>
              </Box>
            )}
          </Paper>

          <Box sx={{ textAlign: 'center' }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<EditIcon />}
              onClick={handleSummarize}
              disabled={isDisabled || isLoading}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                backgroundColor: '#2c3e50',
                '&:hover': {
                  backgroundColor: '#34495e',
                },
                '&:disabled': {
                  backgroundColor: '#bdc3c7',
                },
              }}
            >
              {isLoading ? (
                <>
                  <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                  Processing...
                </>
              ) : (
                'Summarize Transcript'
              )}
            </Button>
          </Box>
        </Paper>

        {/* Features Section */}
        <Box sx={{ mt: 8 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ textAlign: 'center', fontWeight: 'bold', mb: 4 }}
          >
            Why Choose TranscriptAI?
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    backgroundColor: '#fff3cd',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  <Typography variant="h3">⚡</Typography>
                </Box>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Lightning Fast
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Process transcripts in seconds with our advanced AI technology.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    backgroundColor: '#d1ecf1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  <Typography variant="h3">🛡️</Typography>
                </Box>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Secure & Private
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Your data is encrypted and never stored on our servers.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    backgroundColor: '#d4edda',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  <Typography variant="h3">📊</Typography>
                </Box>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Smart Insights
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Extract key points, action items, and important themes automatically.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* Loading Backdrop */}
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
        }}
        open={isLoading}
      >
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress size={60} color="inherit" sx={{ mb: 2 }} />
          <Typography variant="h6">Processing your transcript...</Typography>
          <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
            This may take a few seconds
          </Typography>
        </Box>
      </Backdrop>
    </>
  );
};

export default TranscriptUpload;
