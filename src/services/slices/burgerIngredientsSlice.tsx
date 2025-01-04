import { getIngredientsApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { find } from '@reduxjs/toolkit/dist/utils';
import { TIngredient } from '@utils-types';
import { stat } from 'fs';
import { act } from 'react-dom/test-utils';

type TBasket = {
  bun?: TIngredient;
  ingredients: TIngredient[];
  sum: number;
};

type TIngredientsState = {
  ingredients: TIngredient[];
  isIngredientsLoading: boolean;
  error: string | null;
  basket: TBasket;
};

const initialState: TIngredientsState = {
  ingredients: [],
  isIngredientsLoading: false,
  error: null,
  basket: {
    ingredients: [],
    sum: 0
  }
};

export const getIngredients = createAsyncThunk('ingredients/getAll', async () =>
  getIngredientsApi()
);

const burgerIngredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      if (action.payload.type === 'bun') {
        state.basket.bun = action.payload;
      } else {
        state.basket.ingredients.push(action.payload);
      }

      localStorage.setItem('basket', JSON.stringify(state.basket));
    },
    removeIngredient: (state, action) => {
      if (action.payload.type === 'bun') {
        state.basket.bun = initialState.basket.bun;
      } else {
        const element = state.basket.ingredients.find(
          (ingredient) => ingredient._id === action.payload._id
        );
        if (element) {
          const elementIndex = state.basket.ingredients.indexOf(element);
          state.basket.ingredients.splice(elementIndex, 1);
        }
      }
    },
    clearBasket: (state) => {
      state.basket = initialState.basket;
    },

    updateElementPosition: (state, action) => {
      const element = state.basket.ingredients.find(
        (ingredient) => ingredient._id === action.payload.element._id
      );
      if (element) {
        const elementIndex = state.basket.ingredients.indexOf(element);
        let newIndex;

        if (action.payload.method === 'up') {
          newIndex = elementIndex - 1;
        } else {
          newIndex = elementIndex + 1;
        }

        state.basket.ingredients.splice(elementIndex, 1);
        state.basket.ingredients.splice(newIndex, 0, action.payload.element);
      }
    }
  },
  selectors: {
    getIngredientsSelector: (state) => state,
    getIngredientsBasketSelector: (state) => state.basket
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isIngredientsLoading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isIngredientsLoading = false;
        if (action.error.message) {
          state.error = action.error.message;
        }
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isIngredientsLoading = false;
        state.error = null;
        state.ingredients = action.payload;
      });
  }
});

export default burgerIngredientsSlice.reducer;
export const { getIngredientsSelector, getIngredientsBasketSelector } =
  burgerIngredientsSlice.selectors;
export const {
  addIngredient,
  removeIngredient,
  updateElementPosition,
  clearBasket
} = burgerIngredientsSlice.actions;
