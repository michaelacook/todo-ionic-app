import { Action } from "../types"
import { GET, POST } from "../lib/http"

export const FETCH_CATEGORIES = "FETCH_CATEGORIES"
export const FETCH_CATEGORIES_FAIL = "FETCH_CATEGORIES_FAIL"
export const FETCH_CATEGORIES_SUCCESS = "FETCH_CATEGORIES_SUCCESS"
export const POST_CATEGORY = "POST_CATEGORY"
export const POST_CATEGORY_FAIL = "POST_CATEGORY_FAIL"
export const POST_CATEGORY_SUCCESS = "POST_CATEGORY_SUCCESS"

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

export const postCategory = (): Action => ({
  type: POST_CATEGORY,
})

export const postCategoryFail = (err): Action => ({
  type: POST_CATEGORY_FAIL,
  payload: err,
})

export const postCategorySuccess = (): Action => ({
  type: POST_CATEGORY_SUCCESS,
})

export function doFetchCategories(emailAddress: string, password: string) {
  return async (dispatch) => {
    dispatch(fetchCategories())

    try {
      const response = await GET("categories", {
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

export function doPostCategory(
  category,
  emailAddress: string,
  password: string
) {
  return async (dispatch) => {
    dispatch(postCategory())

    try {
      const response = await POST("categories", category, {
        emailAddress,
        password,
      })

      const resData = await response.json()

      if (response.status !== 201) {
        dispatch(postCategoryFail(resData))
      } else {
        dispatch(doFetchCategories(emailAddress, password))
        dispatch(postCategorySuccess())
      }
    } catch (err) {
      dispatch(postCategoryFail(err))
    }
  }
}
