import { Action } from "../types"
import * as actions from "../actions/listItemsActions"

export const initialState = {
  error: null,
  listItem: null,
}

export default function listItemReducer(state = initialState, action: Action) {
  switch (action.type) {
    case actions.FETCH_ITEM:
      return { ...state, error: null }
    case actions.FETCH_ITEM_FAIL:
      return { ...state, error: action.payload }
    case actions.FETCH_ITEM_SUCCESS:
      return { ...state, listItem: action.payload }
    case actions.POST_ITEM:
      return { ...state, error: null }
    case actions.POST_ITEM_FAIL:
      return { ...state, error: action.payload }
    case actions.POST_ITEM_SUCCESS:
      return { ...state, error: null, listItem: action.payload }
    case actions.UPDATE_ITEM:
      return { ...state, error: null, listItem: null }
    case actions.UPDATE_ITEM_FAIL:
      return { ...state, error: action.payload, listItem: null }
    case actions.UPDATE_ITEM_SUCCESS:
      return { ...state, error: null, listItem: null }
    case actions.DELETE_ITEM:
      return { ...state, error: null, listItem: null }
    case actions.DELETE_ITEM_FAIL:
      return { ...state, error: action.payload, listItem: null }
    case actions.DELETE_ITEM_SUCCESS:
      return { ...state, error: null, listItem: null }
    default:
      return state
  }
}
