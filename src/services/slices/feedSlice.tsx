import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';

export const getFeeds = createAsyncThunk('feeds/getAll', async () =>
  getFeedsApi()
);

type TFeedSliceInitialState = {
  feeds: TOrdersData;
  loading: boolean;
  error: string | null;
};

const initialState: TFeedSliceInitialState = {
  feeds: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  loading: false,
  error: null
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getFeedsSelector: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.loading = false;
        if (action.error.message) {
          state.error = action.error.message;
        }
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.feeds = action.payload;
      });
  }
});

export default feedSlice.reducer;
export const { getFeedsSelector } = feedSlice.selectors;
