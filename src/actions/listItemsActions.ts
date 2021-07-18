import { Action } from "../types"
import { POST, PUT, DELETE, GET } from "../lib/http"

import { doFetchList } from "./listActions"

export const FETCH_ITEM = "FETCH_ITEM"
export const FETCH_ITEM_FAIL = "FETCH_ITEM_FAIL"
export const FETCH_ITEM_SUCCESS = "FETCH_ITEM_SUCCESS"
export const POST_ITEM = "POST_ITEM"
export const POST_ITEM_FAIL = "POST_ITEM_FAIL"
export const POST_ITEM_SUCCESS = "POST_ITEM_SUCCESS"
export const UPDATE_ITEM = "UPDATE_ITEM"
export const UPDATE_ITEM_FAIL = "UPDATE_ITEM_FAIL"
export const UPDATE_ITEM_SUCCESS = "UPDATE_ITEM_SUCCESS"
export const DELETE_ITEM = "DELETE_ITEM"
export const DELETE_ITEM_FAIL = "DELETE_ITEM_FAIL"
export const DELETE_ITEM_SUCCESS = "DELETE_ITEM_SUCCESS"

export const fetchItem = (): Action => ({
  type: FETCH_ITEM,
})

export const fetchItemFail = (err): Action => ({
  type: FETCH_ITEM_FAIL,
  payload: err,
})

export const fetchItemSuccess = (item): Action => ({
  type: FETCH_ITEM_SUCCESS,
  payload: item,
})

export const postItem = (): Action => ({
  type: POST_ITEM,
})

export const postItemFail = (err): Action => ({
  type: POST_ITEM_FAIL,
  payload: err,
})

export const postItemSuccess = (listItem): Action => ({
  type: POST_ITEM_SUCCESS,
  payload: listItem,
})

export const updateItem = (): Action => ({
  type: UPDATE_ITEM,
})

export const updateItemFail = (err): Action => ({
  type: UPDATE_ITEM_FAIL,
  payload: err,
})

export const updateItemSuccess = (): Action => ({
  type: UPDATE_ITEM_SUCCESS,
})

export const deleteItem = (): Action => ({
  type: DELETE_ITEM,
})

export const deleteItemFail = (err): Action => ({
  type: DELETE_ITEM_FAIL,
  payload: err,
})

export const deleteItemSuccess = (): Action => ({
  type: DELETE_ITEM_SUCCESS,
})

export function doFetchItem(id: number, emailAddress, password) {
  return async (dispatch) => {
    dispatch(fetchItem())

    try {
      const response = await GET(`list-items/${id}`, {
        emailAddress,
        password,
      })

      const resData = await response.json()

      if (response.status !== 200) {
        dispatch(fetchItemFail(resData))
      } else {
        dispatch(fetchItemSuccess(resData))
      }
    } catch (err) {
      dispatch(fetchItemFail(err))
    }
  }
}

export function doPostListItem(id: number, payload, emailAddress, password) {
  return async (dispatch) => {
    dispatch(postItem())

    try {
      const response = await POST("list-items", payload, {
        emailAddress,
        password,
      })

      const resData = await response.json()

      if (response.status !== 201) {
        dispatch(postItemFail(resData))
      } else {
        dispatch(doFetchList(id, emailAddress, password))
      }
    } catch (err) {
      dispatch(postItemFail(err))
    }
  }
}

export function doUpdateItem(
  id: number,
  listId: number,
  payload,
  emailAddress,
  password
) {
  return async (dispatch) => {
    dispatch(updateItem())

    try {
      const response = await PUT(`list-items/${id}`, payload, {
        emailAddress,
        password,
      })

      const resData = await response.json()

      if (response.status !== 200) {
        dispatch(updateItemFail(resData))
      } else {
        dispatch(doFetchList(listId, emailAddress, password))
        dispatch(updateItemSuccess())
      }
    } catch (err) {
      dispatch(updateItemFail(err))
    }
  }
}

export function doDeleteItem(
  id: number,
  listId: number,
  emailAddress,
  password
) {
  return async (dispatch) => {
    dispatch(deleteItem())

    try {
      const response = await DELETE(`list-items/${id}`, {
        emailAddress,
        password,
      })

      const resData = await response.json()

      if (response.status !== 200) {
        dispatch(deleteItemFail(resData))
      } else {
        dispatch(deleteItemSuccess())
        dispatch(doFetchList(listId, emailAddress, password))
      }
    } catch (err) {
      dispatch(deleteItemFail(err))
    }
  }
}
