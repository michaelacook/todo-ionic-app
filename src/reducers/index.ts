import { combineReducers } from "redux"

import authReducer from "./authReducer"
import categoryReducer from "./categoryReducer"

const rootReducer = combineReducers({
  user: authReducer,
  categories: categoryReducer,
})

export default rootReducer
