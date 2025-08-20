import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// API base configuration
const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api',
  prepareHeaders: (headers) => {
    headers.set('Accept', 'application/json');
    return headers;
  },
});

// RTK Query API slice
export const transcriptApi = createApi({
  reducerPath: 'transcriptApi',
  baseQuery,
  tagTypes: ['Summary'],
  endpoints: (builder) => ({
    // POST /api/summarize - Create summary from transcript
    createSummary: builder.mutation({
      query: (data) => {
        // Handle both text input and file upload
        if (data.file) {
          // File upload - use FormData
          const formData = new FormData();
          formData.append('file', data.file);
          
          return {
            url: '/summarize',
            method: 'POST',
            body: formData,
            // Don't set Content-Type header for FormData - browser will set it with boundary
          };
        } else {
          // Text input - use JSON
          return {
            url: '/summarize',
            method: 'POST',
            body: { transcript: data.text },
            headers: {
              'Content-Type': 'application/json',
            },
          };
        }
      },
      invalidatesTags: ['Summary'],
      transformResponse: (response) => {
        // Transform the API response to match our component expectations
        return {
          summary: response.summary,
          action_items: response.action_items || [],
          topics: response.topics || [],
          keyPoints: response.keyPoints || [],
          keyInsights: response.keyInsights || [],
          processingStats: {
            wordsProcessed: response.wordsProcessed || 0,
            keyPoints: response.action_items?.length || 0,
            actionItems: response.action_items?.length || 0,
            compressionRate: response.compressionRate || 85,
            processingTime: response.processingTime || '2.3s'
          }
        };
      },
    }),

    // GET /api/summaries - Get all summaries
    getAllSummaries: builder.query({
      query: () => '/summaries',
      providesTags: ['Summary'],
      transformResponse: (response) => response.summaries || [],
    }),

    // GET /api/summaries/{id} - Get summary by ID
    getSummaryById: builder.query({
      query: (id) => `/summaries/${id}`,
      providesTags: (result, error, id) => [{ type: 'Summary', id }],
    }),

    // GET /api/health - Health check
    getHealthStatus: builder.query({
      query: () => '/health',
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useCreateSummaryMutation,
  useGetAllSummariesQuery,
  useGetSummaryByIdQuery,
  useGetHealthStatusQuery,
} = transcriptApi;
