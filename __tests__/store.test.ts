import {rootReducer} from '../src/services/store'

describe('Проверка верности инициализации rootReducer', () => {
  it('При вызове rootReducer c undefined состоянием и неизвестным экшеном возвращается корректное начальное состояние хранилища', () => {
    const expectedState = {
      "ingredients": {
        "ingredients": [],
        "isIngredientsLoading": false,
        "ingredientsError": null,
        "basket": {
          "ingredients": [],
          "sum": 0
        }
      },
      "order": {
        "orderRequest": false,
        "orderError": null,
        "orderModalData": null,
        "orderList": [],
        "loadingOrderList": false,
        "errorOrderList": null
      },
      "authorization": {
        "isAuthChecked": false,
        "isAuthenticated": false,
        "user": {
          "name": "",
          "email": ""
        },
        "loginUserError": null
      },
      "feed": {
        "feeds": {
          "orders": [],
          "total": 0,
          "totalToday": 0
        },
        "feedLoading": false,
        "feedError": null
      }
    }

    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' })

    expect(state).toEqual(expectedState)
  })
})

