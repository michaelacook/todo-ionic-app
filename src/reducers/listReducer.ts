import { Action } from "../types"
import * as actions from "../actions/listActions"

export const initialState = {
  loading: false,
  error: null,
  list: null,
}

export default function listReducer(state = initialState, action: Action) {
  switch (action.type) {
    case actions.FETCH_LIST:
      return { ...state, loading: true, error: null }
    case actions.FETCH_LIST_FAIL:
      return { ...state, loading: false, error: action.payload }
    case actions.FETCH_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        list: action.payload,
      }
    default:
      return state
  }
}
