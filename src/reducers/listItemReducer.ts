import { Action } from "../types"
import * as actions from "../actions/listItemsActions"

export const initialState = {
  loading: false,
  error: null,
  listItem: null,
}

export default function listItemReducer(state = initialState, action: Action) {
  switch (action.type) {
    case actions.POST_ITEM:
      return { ...state, loading: true, error: null }
    case actions.POST_ITEM_FAIL:
      return { ...state, loading: false, error: action.payload }
    case actions.POST_ITEM_SUCCESS:
      return { ...state, loading: false, error: null, listItem: action.payload }
    case actions.DELETE_ITEM:
      return { ...state, loading: true, error: null, listItem: null }
    case actions.DELETE_ITEM_FAIL:
      return { ...state, loading: false, error: action.payload, listItem: null }
    case actions.DELETE_ITEM_SUCCESS:
      return { ...state, loading: false, error: null, listItem: null }
    default:
      return state
  }
}
