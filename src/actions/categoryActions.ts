import { Action } from "../types"
import { GET, POST, PUT, DELETE } from "../lib/http"
import { GENERAL_ERROR } from "../errors"

export const FETCH_CATEGORIES = "FETCH_CATEGORIES"
export const FETCH_CATEGORIES_FAIL = "FETCH_CATEGORIES_FAIL"
export const FETCH_CATEGORIES_SUCCESS = "FETCH_CATEGORIES_SUCCESS"

export const POST_CATEGORY = "POST_CATEGORY"
export const POST_CATEGORY_FAIL = "POST_CATEGORY_FAIL"
export const POST_CATEGORY_SUCCESS = "POST_CATEGORY_SUCCESS"

export const PUT_CATEGORY = "PUT_CATEGORY"
export const PUT_CATEGORY_FAIL = "PUT_CATEGORY_FAIL"
export const PUT_CATEGORY_SUCCESS = "PUT_CATEGORY_SUCCESS"

export const DELETE_CATEGORY = "DELETE_CATEGORY"
export const DELETE_CATEGORY_FAIL = "DELETE_CATEGORY_FAIL"

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

export const putCategory = (): Action => ({
  type: PUT_CATEGORY,
})

export const putCategoryFail = (err): Action => ({
  type: PUT_CATEGORY_FAIL,
  payload: err,
})

export const putCategorySuccess = (): Action => ({
  type: PUT_CATEGORY_SUCCESS,
})

export const deleteCategory = (): Action => ({
  type: DELETE_CATEGORY,
})

export const deleteCategoryFail = (err): Action => ({
  type: DELETE_CATEGORY_FAIL,
  payload: err,
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
        dispatch(fetchCategoriesFail(GENERAL_ERROR))
      } else {
        dispatch(fetchCategoriesSuccess(resData))
      }
    } catch (err) {
      dispatch(fetchCategoriesFail(GENERAL_ERROR))
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
        dispatch(postCategoryFail(GENERAL_ERROR))
      } else {
        dispatch(doFetchCategories(emailAddress, password))
        dispatch(postCategorySuccess())
      }
    } catch (err) {
      dispatch(postCategoryFail(GENERAL_ERROR))
    }
  }
}

export function doUpdateCategory(
  id: number,
  payload,
  emailAddress: string,
  password: string
) {
  return async (dispatch) => {
    dispatch(putCategory())

    try {
      const response = await PUT(`categories/${id}`, payload, {
        emailAddress,
        password,
      })

      const resData = await response.json()

      if (response.status !== 200) {
        dispatch(putCategoryFail(GENERAL_ERROR))
      } else {
        dispatch(doFetchCategories(emailAddress, password))
        dispatch(putCategorySuccess())
      }
    } catch (err) {
      dispatch(putCategoryFail(GENERAL_ERROR))
    }
  }
}

export function doDeleteCategory(
  id: number,
  emailAddress: string,
  password: string
) {
  return async (dispatch) => {
    dispatch(deleteCategory())

    try {
      await DELETE(`categories/${id}`, {
        emailAddress,
        password,
      })

      dispatch(doFetchCategories(emailAddress, password))
    } catch (err) {
      dispatch(deleteCategoryFail(GENERAL_ERROR))
    }
  }
}
