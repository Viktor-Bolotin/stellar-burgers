import { register } from "module";
import { describe } from "node:test";
import authorizationReducer, {getUser, loginUser, logoutUser, registerUser, TAutorizationInitialState, updateUser} from '../src/services/slices/authorizationSlice'
import { getCookie } from "../src/utils/cookie";

describe('Обработка экшенов authorizationSlice',() => {
  const initialState: TAutorizationInitialState = {
    isAuthChecked: false,
    isAuthenticated: false,
    user: {
      name: '',
      email: ''
    },
    loginUserError: null
  };

  const errorExpectedData = {
    message: 'Error'
  }

  const userExpectedData = {
    user: {
      name: 'Иван',
      email: 'Ivan@mail.ru'
    },
    accessToken: '12345',
    refreshToken: '54321'
  }

  describe('Обработка экшенов, связанных с регистрацией пользователя', () => {
    it('При вызове экшена registerUser.pending, состояния state.isAuthenticated и state.isAuthChecked принимают значение false', () => {
      const action = { type: registerUser.pending.type }
      const state = authorizationReducer(initialState, action)

      expect(state.isAuthChecked).toBe(false)
      expect(state.isAuthenticated).toBe(false)
      })
  
    describe('Обработка вызова registerUser.fulfilled c передачей ему данных', () => {
      const action = { type: registerUser.fulfilled.type, payload: userExpectedData}
      const state = authorizationReducer(initialState, action)

      it('Cостояния state.isAuthenticated и state.isAuthChecked принимают значение true, state.user - принимает значение из переданных данных', () => {
        expect(state.isAuthChecked).toBe(true)
        expect(state.isAuthenticated).toBe(true)
        expect(state.user).toEqual(userExpectedData.user)
      })
        
      it('Токены из полученных данных сохраняются в cookie и localStorage',() => {
        const cookieData = getCookie('accessToken')
        const storageData = localStorage.getItem('refreshToken')
        expect(cookieData).toBe(userExpectedData.accessToken)
        expect(storageData).toBe(userExpectedData.refreshToken)
      })
    })
    
    it('При вызове экшена registerUser.rejected и передачи в него сообщения об ошибке - текст сообшения записывается в state.loginUserError, state.isAuthChecked принимает значение true, a state.isAuthenticated  - false', () => {
      const action = {type: registerUser.rejected.type, error: errorExpectedData}
      const state = authorizationReducer(initialState, action)

      expect(state.loginUserError).toEqual(errorExpectedData.message)
      expect(state.isAuthenticated).toBe(false)
      expect(state.isAuthChecked).toBe(true)
    })
      
  })

  describe('Обработка экшенов, связанных с прохождением авторизации', () => {
    it('При вызове экшена loginUser.pending, состояния state.isAuthenticated и state.isAuthChecked принимают значение false', () => {
      const action = { type: loginUser.pending.type }
      const state = authorizationReducer(initialState, action)

      expect(state.isAuthChecked).toBe(false)
      expect(state.isAuthenticated).toBe(false)
      })
    
    describe('Обработка вызова loginUser.fulfilled c передачей ему данных', () => {
      const action = { type: loginUser.fulfilled.type, payload: userExpectedData}
      const state = authorizationReducer(initialState, action)

      it('Cостояния state.isAuthenticated и state.isAuthChecked принимают значение true, state.user - принимает значение из переданных данных', () => {
        expect(state.isAuthChecked).toBe(true)
        expect(state.isAuthenticated).toBe(true)
        expect(state.user).toEqual(userExpectedData.user)
      })
        
      it('Токены из полученных данных сохраняются в cookie и localStorage',() => {
        const cookieData = getCookie('accessToken')
        const storageData = localStorage.getItem('refreshToken')
        expect(cookieData).toBe(userExpectedData.accessToken)
        expect(storageData).toBe(userExpectedData.refreshToken)
      })
    })

    it('При вызове экшена loginUser.rejected и передачи в него сообщения об ошибке - текст сообшения записывается в state.loginUserError, state.isAuthChecked принимает значение true, a state.isAuthenticated  - false', () => {
      const action = {type: loginUser.rejected.type, error: errorExpectedData}
      const state = authorizationReducer(initialState, action)

      expect(state.loginUserError).toEqual(errorExpectedData.message)
      expect(state.isAuthenticated).toBe(false)
      expect(state.isAuthChecked).toBe(true)
    })
  })

  describe('Обработка экшенов, связанных с получением данных о пользователе', () => {
    it('При вызове экшена getUser.pending, состояния state.isAuthenticated и state.isAuthChecked принимают значение false', () => {
      const action = { type: getUser.pending.type }
      const state = authorizationReducer(initialState, action)

      expect(state.isAuthChecked).toBe(false)
      expect(state.isAuthenticated).toBe(false)
      })

    it('При вызове экшена getUser.fulfilled и передаче ему данных, состояния state.isAuthenticated и state.isAuthChecked принимают значение true, state.user - принимает значение из переданных данных', () => {
      const action = { type: getUser.fulfilled.type, payload: userExpectedData}
      const state = authorizationReducer(initialState, action)

      expect(state.isAuthChecked).toBe(true)
      expect(state.isAuthenticated).toBe(true)
      expect(state.user).toEqual(userExpectedData.user)
    })

    it('При вызове экшена getUser.rejected и передачи в него сообщения об ошибке - текст сообшения записывается в state.loginUserError, state.isAuthChecked принимает значение true, a state.isAuthenticated  - false', () => {
      const action = {type: getUser.rejected.type, error: errorExpectedData}
      const state = authorizationReducer(initialState, action)

      expect(state.loginUserError).toEqual(errorExpectedData.message)
      expect(state.isAuthenticated).toBe(false)
      expect(state.isAuthChecked).toBe(true)
    })
  })

  describe('Обработка экшенов, связанных с обновлением информации о пользователе', () => {
    it('При вызове экшена updateUser.pending, состояние state.isAuthChecked принимает значение false', () => {
      const action = { type: updateUser.pending.type }
      const state = authorizationReducer(initialState, action)

      expect(state.isAuthChecked).toBe(false)
    })

    it('При вызове экшена updateUser.fulfilled и передаче ему данных, состояние state.isAuthChecked принимаeт значение true, state.user - принимает значение из переданных данных', () => {
      const updateExpectedData = {
        user: {
          name: 'Виталий',
          email: 'Vitaliy@mail.ru'
        }
      }  

      const action = { type: updateUser.fulfilled.type, payload: updateExpectedData}
      const state = authorizationReducer(initialState, action)

      expect(state.isAuthChecked).toBe(true)
      expect(state.user).toEqual(updateExpectedData.user)
    })

    it('При вызове экшена updateUser.rejected и передачи в него сообщения об ошибке - текст сообшения записывается в state.loginUserError, state.isAuthChecked принимает значение true', () => {
      const action = {type: updateUser.rejected.type, error: errorExpectedData}
      const state = authorizationReducer(initialState, action)

      expect(state.loginUserError).toEqual(errorExpectedData.message)
      expect(state.isAuthChecked).toBe(true)
    })
  })

  describe('Обработка экшенов, связанных с выходом пользователя',() => {
    it('При вызове экшена logoutUser.pending, состояние state.isAuthChecked принимает значение false', () => {
      const action = { type: updateUser.pending.type }
      const state = authorizationReducer(initialState, action)

      expect(state.isAuthChecked).toBe(false)
    })

    describe('Обработка экшена logutUser.fulfilled', () => {
      const action = { type: updateUser.fulfilled.type}
      const state = authorizationReducer(initialState, action)

      it('Cостояние state.isAuthChecked принимаeт значение true, state.isAuthenticated принимает значение false, состояние state.user очищается', () => {
  
        expect(state.isAuthChecked).toBe(true)
        expect(state.isAuthenticated).toBe(false)
        expect(state.user).toEqual({name: '', email: ''})
      })
      it('Токены удалются из cookie и localStorage', () => {
        const cookie = getCookie('accessToken')
        const storageData = localStorage.getItem('refreshToken')

        expect(cookie).toBeUndefined()
        expect(storageData).toBeUndefined()
      })
    })

    it('При вызове экшена logoutUser.rejected и передачи в него сообщения об ошибке - текст сообшения записывается в state.loginUserError, state.isAuthChecked принимает значение true', () => {
      const action = {type: logoutUser.rejected.type, error: errorExpectedData}
      const state = authorizationReducer(initialState, action)

      expect(state.loginUserError).toEqual(errorExpectedData.message)
      expect(state.isAuthChecked).toBe(true)
    })
    
  })

})