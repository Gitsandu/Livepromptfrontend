import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { transcriptApi } from './api/transcriptApi';
import transcriptReducer from './slices/transcriptSlice';

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    transcript: transcriptReducer,
    // Add the API reducer
    [transcriptApi.reducerPath]: transcriptApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        ignoredPaths: ['transcript.transcriptData.file'],
      },
    }).concat(transcriptApi.middleware),
});

// Optional, but required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

// Export types for TypeScript usage (if needed)
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
