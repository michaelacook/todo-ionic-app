import { Action } from "../types"
import { GET, POST } from "../lib/http"

export const FETCH_LIST = "FETCH_LIST"
export const FETCH_LIST_FAIL = "FETCH_LIST_FAIL"
export const FETCH_LIST_SUCCESS = "FETCH_LIST_SUCCESS"

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
