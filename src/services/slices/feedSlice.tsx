import { getFeedsApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';

export const getFeeds = createAsyncThunk('feeds/getAll', getFeedsApi);

export type TFeedSliceInitialState = {
  feeds: TOrdersData;
  feedLoading: boolean;
  feedError: string | null;
};

export const initialState: TFeedSliceInitialState = {
  feeds: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  feedLoading: false,
  feedError: null
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
        state.feedLoading = true;
        state.feedError = null;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.feedLoading = false;
        if (action.error.message) {
          state.feedError = action.error.message;
        }
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.feedLoading = false;
        state.feeds = action.payload;
      });
  }
});

export default feedSlice.reducer;
export const { getFeedsSelector } = feedSlice.selectors;
