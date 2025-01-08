import {rootReducer} from '../src/services/store'
import { initialState as ingredientsInitialState } from '../src/services/slices/burgerIngredientsSlice'
import { initialState as orderInitialState } from '../src/services/slices/orderSlice'
import { initialState as authorizationInitialState } from '../src/services/slices/authorizationSlice'
import { initialState as feedInitialState } from '../src/services/slices/feedSlice'

describe('Проверка верности инициализации rootReducer', () => {
  it('При вызове rootReducer c undefined состоянием и неизвестным экшеном возвращается корректное начальное состояние хранилища', () => {
    const expectedState = {
      "ingredients": ingredientsInitialState,
      "order": orderInitialState,
      "authorization": authorizationInitialState,
      "feed": feedInitialState
    }

    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' })

    expect(state).toEqual(expectedState)
  })
})

