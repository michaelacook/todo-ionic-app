import { Action } from "../types"
import * as actions from "../actions/categoryActions"

export const initialState = {
  loading: false,
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
        error: action.payload,
      }
    case actions.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,

        error: null,
        categories: action.payload,
      }
    case actions.POST_CATEGORY:
      return { ...state, loading: true, error: null }
    case actions.POST_CATEGORY_FAIL:
      return { ...state, loading: false, error: action.payload }
    case actions.FETCH_CATEGORIES_SUCCESS:
      return { ...state, loading: false }
    case actions.PUT_CATEGORY:
      return { ...state, loading: true }
    case actions.PUT_CATEGORY_FAIL:
      return { ...state, loading: false, error: action.payload }
    case actions.PUT_CATEGORY_SUCCESS:
      return { ...state, loading: false }
    case actions.DELETE_CATEGORY:
      return { ...state, loading: true }
    case actions.DELETE_CATEGORY_FAIL:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}
