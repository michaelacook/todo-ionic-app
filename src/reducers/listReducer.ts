import { Action } from "../types"
import * as actions from "../actions/listActions"

export const initialState = {
  error: null,
  list: null,
  pinned: [],
  loading: false,
}

export default function listReducer(state = initialState, action: Action) {
  switch (action.type) {
    case actions.FETCH_LIST:
      return { ...state, error: null, loading: true }
    case actions.FETCH_LIST_FAIL:
      return { ...state, error: action.payload, loading: false }
    case actions.FETCH_LIST_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        list: action.payload,
      }
    case actions.UPDATE_LIST:
      return { ...state, error: null, loading: true }
    case actions.UPDATE_LIST_FAIL:
      return { ...state, error: action.payload, loading: false }
    case actions.UPDATE_LIST_SUCCESS:
      return { ...state, error: null, list: action.payload, loading: false }
    case actions.POST_LIST:
      return { ...state, error: null, loading: true }
    case actions.POST_LIST_FAIL:
      return { ...state, error: action.payload, loading: false }
    case actions.POST_LIST_SUCCESS:
      return { ...state, error: null, list: action.payload, loading: false }
    case actions.FETCH_PINNED:
      return { ...state, error: null, loading: true }
    case actions.FETCH_PINNED_FAIL:
      return { ...state, error: action.payload, loading: false }
    case actions.FETCH_PINNED_SUCCESS:
      return { ...state, pinned: action.payload, loading: false }
    case actions.DELETE_LIST:
      return { ...state, error: null, loading: true }
    case actions.DELETE_LIST_FAIL:
      return { ...state, error: action.payload, loading: false }
    case actions.DELETE_LIST_SUCCESS:
      return { ...state, error: null, loading: false }
    default:
      return state
  }
}
