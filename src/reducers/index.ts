import { combineReducers } from "redux"

import authReducer from "./authReducer"
import redirectReducer from "./redirectReducer"

const rootReducer = combineReducers({
  user: authReducer,
  redirect: redirectReducer,
})

export default rootReducer
