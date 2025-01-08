import { describe } from "node:test";
import feedReducer, {getFeeds, TFeedSliceInitialState} from '../src/services/slices/feedSlice'
import { initialState } from "../src/services/slices/feedSlice";

describe('обработка экшенов FeedSlice', () => {

  it('При вызове экшена getFeeds.pending, state.orderRequest принимает значение true', () => {
    const action = { type: getFeeds.pending.type }
    const state = feedReducer(initialState, action)

    expect(state.feedLoading).toBe(true)
  })

  it('При вызове экшена getFeeds.fulfilled и передачи в него данных модального окна подтверждения заказа - эти данные записываются в state.feeds, а state.feedLoading принимает значение false', () => {
    const feedExpectedData ={ 
      orders: [
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
      }],
    total: 20,
  totalToday: 5}
    const action = {type: getFeeds.fulfilled.type, payload: feedExpectedData}
    const state = feedReducer(initialState, action)
    
    expect(state.feeds).toEqual(feedExpectedData)
    expect(state.feedLoading).toBe(false)
    })

    it('При вызове экшена getFeeds.rejected и передачи в него сообщения об ошибке - текст сообшения записывается в state.feedError, а state.feedLoading принимает значение false', () => {
      const orderErrorExpectedData = {
        message: 'Error'
      }


      const action = {type: getFeeds.rejected.type, error: orderErrorExpectedData}
      const state = feedReducer(initialState, action)

      expect(state.feedError).toEqual(orderErrorExpectedData.message)
      expect(state.feedLoading).toBe(false)
    })
})