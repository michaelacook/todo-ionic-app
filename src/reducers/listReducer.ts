import { Action } from "../types"
import * as actions from "../actions/listActions"

export const initialState = {
  error: null,
  list: null,
}

export default function listReducer(state = initialState, action: Action) {
  switch (action.type) {
    case actions.FETCH_LIST:
      return { ...state, error: null }
    case actions.FETCH_LIST_FAIL:
      return { ...state, error: action.payload }
    case actions.FETCH_LIST_SUCCESS:
      return {
        ...state,
        error: null,
        list: action.payload,
      }
    default:
      return state
  }
}
