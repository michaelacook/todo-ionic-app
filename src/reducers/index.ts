import { combineReducers } from "redux"

import authReducer from "./authReducer"
import categoryReducer from "./categoryReducer"
import listReducer from "./listReducer"

const rootReducer = combineReducers({
  user: authReducer,
  categories: categoryReducer,
  list: listReducer,
})

export default rootReducer
