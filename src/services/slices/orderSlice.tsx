import { getOrdersApi, orderBurgerApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export type TOrderInitialState = {
  orderRequest: boolean;
  orderError: string | null;
  orderModalData: TOrder | null;
  orderList: TOrder[];
  loadingOrderList: boolean;
  errorOrderList: string | null;
};

const initialState: TOrderInitialState = {
  orderRequest: false,
  orderError: null,
  orderModalData: null,
  orderList: [],
  loadingOrderList: false,
  errorOrderList: null
};

export const makeOrder = createAsyncThunk('order/newOrder', orderBurgerApi);

export const getOrders = createAsyncThunk('order/orderList', getOrdersApi);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    closeOrderModalData: (state) => {
      state.orderModalData = null;
    }
  },
  selectors: {
    orderSelector: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(makeOrder.pending, (state) => {
        state.orderRequest = true;
        state.orderError = null;
      })
      .addCase(makeOrder.rejected, (state, action) => {
        state.orderRequest = false;

        if (action.error.message) state.orderError = action.error.message;
      })
      .addCase(makeOrder.fulfilled, (state, action) => {
        state.orderModalData = action.payload.order;
        state.orderRequest = false;
      })
      .addCase(getOrders.pending, (state) => {
        state.loadingOrderList = true;
        state.errorOrderList = null;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loadingOrderList = false;
        if (action.error.message) state.errorOrderList = action.error.message;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loadingOrderList = false;
        state.errorOrderList = null;
        state.orderList = action.payload;
      });
  }
});

export default orderSlice.reducer;
export const { orderSelector } = orderSlice.selectors;
export const { closeOrderModalData } = orderSlice.actions;
