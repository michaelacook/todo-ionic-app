import { Action } from "../types"
import { GET, POST } from "../lib/http"
import API from "../api"

export const FETCH_CATEGORIES = "FETCH_CATEGORIES"
export const FETCH_CATEGORIES_FAIL = "FETCH_CATEGORIES_FAIL"
export const FETCH_CATEGORIES_SUCCESS = "FETCH_CATEGORIES_SUCCESS"

export const fetchCategories = (): Action => ({
  type: FETCH_CATEGORIES,
})

export const fetchCategoriesFail = (err): Action => ({
  type: FETCH_CATEGORIES_FAIL,
  payload: err,
})

export const fetchCategoriesSuccess = (categories): Action => ({
  type: FETCH_CATEGORIES_SUCCESS,
  payload: categories,
})

export function doFetchCategories(emailAddress: string, password: string) {
  return async (dispatch) => {
    dispatch(fetchCategories())

    try {
      const response = await GET(`${API}/categories`, {
        emailAddress,
        password,
      })

      const resData = await response.json()

      if (response.status !== 200) {
        dispatch(fetchCategoriesFail(resData))
      } else {
        dispatch(fetchCategoriesSuccess(resData))
      }
    } catch (err) {
      dispatch(fetchCategoriesFail(err))
    }
  }
}
