import { Action } from "../types"
import * as actions from "../actions/listActions"

export const initialState = {
  error: null,
  list: null,
  pinned: [],
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
    case actions.UPDATE_LIST:
      return { ...state, error: null }
    case actions.UPDATE_LIST_FAIL:
      return { ...state, error: action.payload }
    case actions.UPDATE_LIST_SUCCESS:
      return { ...state, error: null, list: action.payload }
    case actions.POST_LIST:
      return { ...state, error: null }
    case actions.POST_LIST_FAIL:
      return { ...state, error: action.payload }
    case actions.POST_LIST_SUCCESS:
      return { ...state, error: null, list: action.payload }
    case actions.FETCH_PINNED:
      return { ...state, error: null }
    case actions.FETCH_PINNED_FAIL:
      return { ...state, error: action.payload }
    case actions.FETCH_PINNED_SUCCESS:
      return { ...state, pinned: action.payload }
    default:
      return state
  }
}
