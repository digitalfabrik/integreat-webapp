// @flow

import { Payload, TunewsModel } from '@integreat-app/integreat-api-client'
import type { PayloadDataType } from '../../../modules/app/PayloadDataType'
import { START_FETCH_TUNEWS, FINISH_FETCH_TUNEWS, RESET_TUNEWS } from '../actions/fetchTunews'

type TuNewsFetchActionType<T: PayloadDataType> = { type: string, payload: Payload<T> }

const defaultState = new Payload(false, false, [])

const fetchTunewsReducer = (
  state: Payload<Array<TunewsModel>> = defaultState,
  action: TuNewsFetchActionType<TunewsModel>
) => {
  switch (action.type) {
    case START_FETCH_TUNEWS:
      return {
        data: [...state.data],
        isFetching: state.isFetching,
        isFetchingFirstTime: state.data.length === 0
      }
    case FINISH_FETCH_TUNEWS: {
      return {
        data: [...state.data, ...action.payload.data],
        isFetching: state.isFetching,
        hasMore: action.payload.data.length !== 0,
        isFetchingFirstTime: false
      }
    }
    case RESET_TUNEWS: {
      return {
        data: [],
        hasMore: true,
        isFetching: false,
        isFetchingFirstTime: false
      }
    }
    default:
      return state
  }
}

export default fetchTunewsReducer