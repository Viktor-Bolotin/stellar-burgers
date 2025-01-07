import { nanoid } from '@reduxjs/toolkit';
import ingredientsReducer, {addIngredient, getIngredients, removeIngredient, TInitialIngredientsState, updateElementPosition} from '../src/services/slices/burgerIngredientsSlice'

describe('Обработка экшенов burgerIngredientsSlice', () => {
  const initialState: TInitialIngredientsState = {
    ingredients: [],
    isIngredientsLoading: false,
    ingredientsError: null,
    basket: {
      ingredients: [],
      sum: 0
    }
  };

  const expectedIngredients = [
    {
      "_id": "643d69a5c3f7b9001cfa093c",
      "name": "Краторная булка N-200i",
      "type": "bun",
      "proteins": 80,
      "fat": 24,
      "carbohydrates": 53,
      "calories": 420,
      "price": 1255,
      "image": "https://code.s3.yandex.net/react/code/bun-02.png",
      "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
      "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
      "__v": 0
    },
    {
      "_id": "643d69a5c3f7b9001cfa0941",
      "name": "Биокотлета из марсианской Магнолии",
      "type": "main",
      "proteins": 420,
      "fat": 142,
      "carbohydrates": 242,
      "calories": 4242,
      "price": 424,
      "image": "https://code.s3.yandex.net/react/code/meat-01.png",
      "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
      "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
      "__v": 0
    },
    {
      "_id": "643d69a5c3f7b9001cfa093e",
      "name": "Филе Люминесцентного тетраодонтимформа",
      "type": "main",
      "proteins": 44,
      "fat": 26,
      "carbohydrates": 85,
      "calories": 643,
      "price": 988,
      "image": "https://code.s3.yandex.net/react/code/meat-03.png",
      "image_mobile": "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
      "image_large": "https://code.s3.yandex.net/react/code/meat-03-large.png",
      "__v": 0
    },
    {
      "_id": "643d69a5c3f7b9001cfa0947",
      "name": "Плоды Фалленианского дерева",
      "type": "main",
      "proteins": 20,
      "fat": 5,
      "carbohydrates": 55,
      "calories": 77,
      "price": 874,
      "image": "https://code.s3.yandex.net/react/code/sp_1.png",
      "image_mobile": "https://code.s3.yandex.net/react/code/sp_1-mobile.png",
      "image_large": "https://code.s3.yandex.net/react/code/sp_1-large.png",
      "__v": 0
    }]

    const initialBasketIngredients = [expectedIngredients[1], expectedIngredients[2], expectedIngredients[3]]
    const initialStateBasket = {
      ingredients: [],
      isIngredientsLoading: false,
      ingredientsError: null,
      basket: {
        bun: expectedIngredients[0],
        ingredients: initialBasketIngredients,
        sum: 0
      } 
    }


  describe('Обработка асинхронных экшенов',() => {
    it('При вызове экшена getIngredients.pending, state.isIngredientsLoading принимает значение true', () => {
      const action = { type: getIngredients.pending.type }
      const state = ingredientsReducer(initialState, action)

      expect(state.isIngredientsLoading).toBe(true)
      })
    
    it('При вызове экшена getIngredients.fulfilled и передачи в него данных ингредиентов - эти данные записываются в state.inredients, а state.isIngredientsLoading принимает значение false', () => {
      const action = {type: getIngredients.fulfilled.type, payload: expectedIngredients}
      const state = ingredientsReducer(initialState, action)
      
      expect(state.ingredients).toEqual(expectedIngredients)
      expect(state.isIngredientsLoading).toBe(false)
    })

    it('При вызове экшена getIngredients.rejected и передачи в него сообщения об ошибке - текст сообшения записывается в state.ingredientsError, а state.isIngredientsLoading принимает значение false', () => {
      const orderErrorExpectedData = {
        message: 'Error'
      }

      const action = {type: getIngredients.rejected.type, error: orderErrorExpectedData}
      const state = ingredientsReducer(initialState, action)

      expect(state.ingredientsError).toEqual(orderErrorExpectedData.message)
      expect(state.isIngredientsLoading).toBe(false)
    })
  })
  describe('Обработка экшенов в reducer', () => {
    describe('При вызове экшена addIngredient и передаче в него ингредиента - этот ингредиент добавляется в state.basket', () => {
      it('Ингредиент с типом bun помещается в state.basket.bun', () => {
        const newState = ingredientsReducer(initialState, addIngredient(expectedIngredients[0]))

        const {bun} = newState.basket
        expect(bun).toMatchObject(expectedIngredients[0])
      })
      it('Ингредиент с типом, отличным от bun, помещается в state.basket.ingredients', () => {
        const newState = ingredientsReducer(initialState, addIngredient(expectedIngredients[1]))

        const {ingredients} = newState.basket
        expect(ingredients[0]).toMatchObject(expectedIngredients[1])
      })
    })
    describe('При вызове экшена removeIngredient и передаче в него ингредиента - этот ингредиент удаляется из state.basket', () => {

      it('Ингредиент с типом bun удаляется из state.basket.bun', () => {
        const newState = ingredientsReducer(initialStateBasket, removeIngredient(expectedIngredients[0]))

        const {bun} = newState.basket
        expect(bun).toBeUndefined()
      })
      it('Ингредиент с типом, отличным от bun, удаляется из state.basket.ingredients', () => {
        const newState = ingredientsReducer(initialStateBasket, removeIngredient(initialBasketIngredients[0]))
  
        const {ingredients} = newState.basket
        expect(ingredients).toEqual([initialBasketIngredients[1], initialBasketIngredients[2]])
      })
    })
    describe('При вызове экшена updateElementPosition и передаче в него целевого ингредиента и метода изменения позиции - этот ингредиент изменяет своё положение в массиве', () => {
      it('Ингредиент увеличивает свой индекс в массиве', () => {
        const newState = ingredientsReducer(initialStateBasket, updateElementPosition({element: initialBasketIngredients[0], method:'down'}))

        const {ingredients} = newState.basket
        expect(ingredients).toEqual([initialBasketIngredients[1], initialBasketIngredients[0], initialBasketIngredients[2]])
      })
      it('Ингредиент уменьшает свой индекс в массиве', () => {
        const newState = ingredientsReducer(initialStateBasket, updateElementPosition({element: initialBasketIngredients[2], method:'up'}))

        const {ingredients} = newState.basket
        expect(ingredients).toEqual([initialBasketIngredients[0], initialBasketIngredients[2], initialBasketIngredients[1]])
      })
    })
  })
})