import { describe } from "node:test";
import orderReducer, {getOrders, makeOrder, TOrderInitialState} from '../src/services/slices/orderSlice';
import { initialState } from "../src/services/slices/orderSlice";

describe('Обработка экшенов orderSlice', () => {
  const orderErrorExpectedData = {
    message: 'Error'
  }

  const userOrderExpectedData = {
    order: {
      createdAt: "2025-01-06T15:28:41.155Z",
      ingredients: [
        {
          calories: 643,
          carbohydrates: 85,
          fat: 26,
          image: "https://code.s3.yandex.net/react/code/bun-01.png",
          image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
          image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
          name: "Флюоресцентная булка R2-D3",
          price: 988,
          proteins: 44,
          type: "bun",
          __v: 0,
          _id: "643d69a5c3f7b9001cfa093d",
        },
        {
          calories: 643,
          carbohydrates: 85,
          fat: 26,
          image: "https://code.s3.yandex.net/react/code/bun-01.png",
          image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
          image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
          name: "Флюоресцентная булка R2-D3",
          price: 988,
          proteins: 44,
          type: "bun",
          __v: 0,
          _id: "643d69a5c3f7b9001cfa093d",
        },
        {
          calories: 643,
          carbohydrates: 85,
          fat: 26,
          image: "https://code.s3.yandex.net/react/code/meat-03.png",
          image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
          image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
          name: "Филе Люминесцентного тетраодонтимформа",
          price: 988,
          proteins: 44,
          type: "main",
          __v: 0,
          _id: "643d69a5c3f7b9001cfa093e",
        },   
      ], 
      name: "Флюоресцентный минеральный люминесцентный бессмертный бургер",
      number: 64884,
      owner: {
        name: 'Сергей', 
        email: 'Sergei@mail.com', 
        createdAt: '2025-01-04T14:58:23.706Z', 
        updatedAt: '2025-01-05T14:01:28.891Z'},
      price: 4601,
      status: "done",
      updatedAt: "2025-01-06T15:28:41.994Z",
      _id: "677bf6a9750864001d37782b"},
    success:true}

  describe('Обработка экшенов, связанных с отправкой заказа', () => {
   
    it('При вызове экшена makeOrder.pending state.orderRequest принимает значение true', () => {
    const action = { type: makeOrder.pending.type }
    const state = orderReducer(initialState, action)
    expect(state.orderRequest).toBe(true)
    })

    it('При вызове экшена makeOrder.fulfilled и передачи в него данных модального окна подтверждения заказа - эти данные записываются в state.orderModalData, а state.orderRequest принимает значение false', () => {

    const action = {type: makeOrder.fulfilled.type, payload: userOrderExpectedData}
    const state = orderReducer(initialState, action)
    
    expect(state.orderModalData).toEqual(userOrderExpectedData.order)
    expect(state.orderRequest).toBe(false)
    })

    it('При вызове экшена makeOrder.rejected и передачи в него сообщения об ошибке - текст сообшения записывается в state.orderError, а state.orderRequest принимает значение false', () => {
      const action = {type: makeOrder.rejected.type, error: orderErrorExpectedData}
      const state = orderReducer(initialState, action)

      expect(state.orderError).toEqual(orderErrorExpectedData.message)
      expect(state.orderRequest).toBe(false)
    })
  })

  describe('Обработка экшенов, связанных с получением списка заказов пользователя', () => {
    it('При вызове экшена getOrders.pending, state.loadingOrderList принимает значение true', () => {
      const action = { type: getOrders.pending.type }
      const state = orderReducer(initialState, action)

      expect(state.loadingOrderList).toBe(true)
      })

    it('При вызове экшена gerorders.fulfilled и передачи в него данных заказов пользователя - эти данные сохраняются в state.orderList, а state.loadingOrderList принимает значение false', () => {
      const orderListExpectedData = 
        [
          {
            "_id": "677982c3750864001d377030",
            "ingredients": [
              "643d69a5c3f7b9001cfa0941",
              "643d69a5c3f7b9001cfa093e"
            ],
            "status": "done",
            "name": "Био-марсианский люминесцентный бургер",
            "createdAt": "2025-01-04T18:49:39.742Z",
            "updatedAt": "2025-01-04T18:49:40.527Z",
            "number": 64660
          },
          {
            "_id": "677987ea750864001d377038",
            "ingredients": [
              "643d69a5c3f7b9001cfa0941",
              "643d69a5c3f7b9001cfa093f",
              "643d69a5c3f7b9001cfa0940",
              "643d69a5c3f7b9001cfa093e"
            ],
            "status": "done",
            "name": "Био-марсианский бессмертный люминесцентный метеоритный бургер",
            "createdAt": "2025-01-04T19:11:38.171Z",
            "updatedAt": "2025-01-04T19:11:39.180Z",
            "number": 64661
          },
          {
            "_id": "6779885a750864001d37703a",
            "ingredients": [
              "643d69a5c3f7b9001cfa093e",
              "643d69a5c3f7b9001cfa0941",
              "643d69a5c3f7b9001cfa093f",
              "643d69a5c3f7b9001cfa0940"
            ],
            "status": "done",
            "name": "Био-марсианский бессмертный люминесцентный метеоритный бургер",
            "createdAt": "2025-01-04T19:13:30.932Z",
            "updatedAt": "2025-01-04T19:13:31.883Z",
            "number": 64662
          }]

      const action = {type: getOrders.fulfilled.type, payload: orderListExpectedData}
      const state = orderReducer(initialState, action)
      
      expect(state.orderList).toEqual(orderListExpectedData)
      expect(state.loadingOrderList).toBe(false)
    })

    it('При вызове экшена getOrders.rejected и передачи в него сообщения об ошибке - текст сообшения записывается в state.orderError, а state.orderRequest принимает значение false', () => {
      const action = {type: getOrders.rejected.type, error: orderErrorExpectedData}
      const state = orderReducer(initialState, action)

      expect(state.errorOrderList).toEqual(orderErrorExpectedData.message)
      expect(state.loadingOrderList).toBe(false)
    })
  })
})