import { Action } from "../types"
import { POST, DELETE } from "../lib/http"

import { doFetchList } from "./listActions"

export const POST_ITEM = "POST_ITEM"
export const POST_ITEM_FAIL = "POST_ITEM_FAIL"
export const POST_ITEM_SUCCESS = "POST_ITEM_SUCCESS"
export const DELETE_ITEM = "DELETE_ITEM"
export const DELETE_ITEM_FAIL = "DELETE_ITEM_FAIL"
export const DELETE_ITEM_SUCCESS = "DELETE_ITEM_SUCCESS"

export const postItem = (): Action => ({
  type: POST_ITEM,
})

export const postItemFail = (err): Action => ({
  type: POST_ITEM_FAIL,
  payload: err,
})

export const postItemSuccess = (listItem) => ({
  type: POST_ITEM_SUCCESS,
  payload: listItem,
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
