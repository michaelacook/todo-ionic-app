import { Action } from "../types"
import * as actions from "../actions/categoryActions"

export const initialState = {
  loading: false,
  hasErrors: false,
  error: null,
  categories: null,
}

export default function categoryReducer(state = initialState, action: Action) {
  switch (action.type) {
    case actions.FETCH_CATEGORIES:
      return { ...state, loading: true, hasErrors: false }
    case actions.FETCH_CATEGORIES_FAIL:
      return {
        ...state,
        loading: false,
        hasErrors: true,
        error: action.payload,
      }
    case actions.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        hasErrors: false,
        error: null,
        categories: action.payload,
      }
    default:
      return state
  }
}
