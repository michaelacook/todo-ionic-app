import { Action } from "../types"
import { GET, POST, PUT } from "../lib/http"
import { doFetchCategories } from "./categoryActions"

export const FETCH_LIST = "FETCH_LIST"
export const FETCH_LIST_FAIL = "FETCH_LIST_FAIL"
export const FETCH_LIST_SUCCESS = "FETCH_LIST_SUCCESS"

export const POST_LIST = "POST_LIST"
export const POST_LIST_FAIL = "POST_LIST_FAIL"
export const POST_LIST_SUCCESS = "POST_LIST_SUCCESS"

export const UPDATE_LIST = "UPDATE_LIST"
export const UPDATE_LIST_FAIL = "UPDATE_LIST_FAIL"
export const UPDATE_LIST_SUCCESS = "UPDATE_LIST_SUCCESS"

export const FETCH_PINNED = "FETCH_PINNED"
export const FETCH_PINNED_FAIL = "FETCH_PINNED_FAIL"
export const FETCH_PINNED_SUCCESS = "FETCH_PINNED_SUCCESS"

export const fetchList = (): Action => ({
  type: FETCH_LIST,
})

export const fetchListFail = (err): Action => ({
  type: FETCH_LIST_FAIL,
  payload: err,
})

export const fetchListSuccess = (listItems): Action => ({
  type: FETCH_LIST_SUCCESS,
  payload: listItems,
})

export const postList = (): Action => ({
  type: POST_LIST,
})

export const postListFail = (err): Action => ({
  type: POST_LIST_FAIL,
  payload: err,
})

export const postListSuccess = (list): Action => ({
  type: POST_LIST_SUCCESS,
  payload: list,
})

export const updateList = (): Action => ({
  type: UPDATE_LIST,
})

export const updateListFail = (err): Action => ({
  type: UPDATE_LIST_FAIL,
  payload: err,
})

export const updateListSuccess = (list): Action => ({
  type: UPDATE_LIST_SUCCESS,
  payload: list,
})

export const fetchPinned = (): Action => ({
  type: FETCH_PINNED,
})

export const fetchPinnedFail = (err): Action => ({
  type: FETCH_PINNED_FAIL,
  payload: err,
})

export const fetchPinnedSuccess = (pinned): Action => ({
  type: FETCH_PINNED_SUCCESS,
  payload: pinned,
})

export function doFetchList(
  id: number,
  emailAddress: string,
  password: string
) {
  return async (dispatch) => {
    dispatch(fetchList())

    try {
      const response = await GET(`lists/${id}`, {
        emailAddress,
        password,
      })

      const resData = await response.json()

      if (response.status !== 200) {
        dispatch(fetchListFail(resData))
      } else {
        dispatch(fetchListSuccess(resData))
      }
    } catch (err) {
      dispatch(fetchListFail(err))
    }
  }
}

export function doPostList(list, emailAddress: string, password: string) {
  return async (dispatch) => {
    dispatch(postList())

    return new Promise((resolve, reject) => {
      POST("lists", list, {
        emailAddress,
        password,
      }).then((response) => {
        if (response.status !== 201) {
          response.json().then((data) => {
            dispatch(postListFail(data))
            reject(data)
          })
        } else {
          response.json().then((data) => {
            dispatch(doFetchCategories(emailAddress, password))
            dispatch(postListSuccess(data))
            return resolve(data)
          })
        }
      })
    })
  }
}

export function doFetchPinned(emailAddress, password) {
  return async (dispatch) => {
    dispatch(fetchPinned())

    try {
      const response = await GET("lists/pinned", {
        emailAddress,
        password,
      })

      const resData = await response.json()

      if (response.status !== 200) {
        dispatch(fetchPinnedFail(resData))
      } else {
        dispatch(doFetchCategories(emailAddress, password))
        dispatch(fetchPinnedSuccess(resData))
      }
    } catch (err) {
      dispatch(fetchPinnedFail(err))
    }
  }
}

export function doUpdateList(id: number, payload, emailAddress, password) {
  return async (dispatch) => {
    dispatch(updateList())

    try {
      const response = await PUT(`lists/${id}`, payload, {
        emailAddress,
        password,
      })

      const resData = await response.json()
      console.log(resData)

      if (response.status !== 200) {
        dispatch(updateListFail(resData))
      } else {
        dispatch(doFetchList(id, emailAddress, password))
        dispatch(doFetchPinned(emailAddress, password))
      }
    } catch (err) {
      dispatch(updateListFail(err))
    }
  }
}
