import { getIngredientsApi, orderBurgerApi } from '../../utils/burger-api';
import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export type TBasket = {
  bun?: TIngredient;
  ingredients: TIngredient[];
  sum: number;
};

export type TInitialIngredientsState = {
  ingredients: TIngredient[];
  isIngredientsLoading: boolean;
  ingredientsError: string | null;
  basket: TBasket;
};

export const initialState: TInitialIngredientsState = {
  ingredients: [],
  isIngredientsLoading: false,
  ingredientsError: null,
  basket: {
    ingredients: [],
    sum: 0
  }
};

export const getIngredients = createAsyncThunk(
  'ingredients/getAll',
  getIngredientsApi
);

const burgerIngredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TIngredient>) => {
        if (action.payload.type === 'bun') {
          state.basket.bun = action.payload;
        } else {
          state.basket.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
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
        state.ingredientsError = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isIngredientsLoading = false;
        if (action.error.message) {
          state.ingredientsError = action.error.message;
        }
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isIngredientsLoading = false;
        state.ingredientsError = null;
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
