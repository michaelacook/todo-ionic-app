import { Action } from "../types"
import * as actions from "../actions/authActions"

const cachedUser = localStorage.getItem("user")

export const initialState = {
  user: cachedUser ? cachedUser : null,
  loading: false,
  hasErrors: false,
}

export default function authReducer(state = initialState, action: Action) {
  switch (action.type) {
    case actions.CREATE_ACCOUNT:
      return { ...state, loading: true, hasErrors: false }
    case actions.CREATE_ACCOUNT_SUCCESS:
      return { user: action.payload, loading: false, hasErrors: false }
    case actions.CREATE_ACCOUNT_FAIL:
      return { ...state, loading: false, hasErrors: true }
    case actions.SIGN_IN:
      return { ...state, loading: true, hasErrors: false }
    case actions.SIGN_IN_SUCCESS:
      return { user: action.payload, loading: false, hasErrors: false }
    case actions.SIGN_IN_FAIL:
      return { ...state, loading: false, hasErrors: true }
    case actions.SIGN_OUT:
      return { user: null, loading: false, hasErrors: false }
    default:
      return state
  }
}
