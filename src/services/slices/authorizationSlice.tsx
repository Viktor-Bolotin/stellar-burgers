import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TRegisterData,
  updateUserApi
} from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteCookie, setCookie } from '../../utils/cookie';
import { TUser } from '@utils-types';

export const registerUser = createAsyncThunk(
  'user/registration',
  async (data: TRegisterData) => registerUserApi(data)
);

export const loginUser = createAsyncThunk('user/login', loginUserApi);

export const updateUser = createAsyncThunk('user/upData', updateUserApi);

export const getUser = createAsyncThunk('user/getData', getUserApi);

export const logoutUser = createAsyncThunk('user/logout', logoutApi);

export type TAutorizationInitialState = {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  user: TUser;
  loginUserError: string | null;
};

const initialState: TAutorizationInitialState = {
  isAuthChecked: false,
  isAuthenticated: false,
  user: {
    name: '',
    email: ''
  },
  loginUserError: null
};

const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {},
  selectors: {
    authorizationSelector: (state) => state,
    userSelector: (state) => state.user,
    isAuthCheckedSelector: (state) => state.isAuthChecked
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isAuthenticated = false;
        state.isAuthChecked = false;
        state.loginUserError = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.isAuthChecked = true;
        if (action.error.message) {
          state.loginUserError = action.error.message;
        }
        state.isAuthenticated = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.isAuthChecked = true;
        state.loginUserError = null;
        state.user = action.payload.user;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(loginUser.pending, (state) => {
        state.isAuthChecked = false;
        state.loginUserError = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthChecked = true;
        if (action.error.message) {
          state.loginUserError = action.error.message;
        }
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.isAuthChecked = true;
        state.loginUserError = null;
        state.user = action.payload.user;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(getUser.pending, (state) => {
        state.isAuthChecked = false;
        state.loginUserError = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isAuthChecked = true;
        if (action.error.message) {
          state.loginUserError = action.error.message;
        }
      })
      .addCase(getUser.fulfilled, (state, action) => {
        console.log(action);
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.loginUserError = null;
        state.user = action.payload.user;
      })
      .addCase(updateUser.pending, (state) => {
        state.isAuthChecked = false;
        state.loginUserError = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isAuthChecked = true;
        if (action.error.message) {
          state.loginUserError = action.error.message;
        }
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.loginUserError = null;
        state.user = action.payload.user;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isAuthChecked = false;
        state.loginUserError = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isAuthChecked = true;
        if (action.error.message) {
          state.loginUserError = action.error.message;
        }
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.isAuthChecked = true;
        state.user.email = '';
        state.user.name = '';
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
      });
  }
});

export default authorizationSlice.reducer;
export const { authorizationSelector, userSelector, isAuthCheckedSelector } =
  authorizationSlice.selectors;
