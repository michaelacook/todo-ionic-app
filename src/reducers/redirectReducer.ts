import { Action } from "../types"
import { REDIRECT } from "../actions/redirectAction"

const redirectReducer = (state = {}, action: Action) => {
  switch (action.type) {
    case REDIRECT:
      return { redirectTo: action.payload }
    default:
      return state
  }
}

export default redirectReducer
