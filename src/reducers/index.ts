import { combineReducers } from "redux"

import authReducer from "./authReducer"
import categoryReducer from "./categoryReducer"
import listReducer from "./listReducer"
import listItemReducer from "./listItemReducer"

const rootReducer = combineReducers({
  user: authReducer,
  categories: categoryReducer,
  list: listReducer,
  listItem: listItemReducer,
})

export default rootReducer
