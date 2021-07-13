import { Action, User } from "../types"
import { GET, POST } from "../lib/http"
import API from "../api"

export const SIGN_IN = "SIGN_IN"
export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS"
export const SIGN_IN_FAIL = "SIGN_IN_FAIL"
export const SIGN_OUT = "SIGN_OUT"
export const CREATE_ACCOUNT = "CREATE_ACCOUNT"
export const CREATE_ACCOUNT_SUCCESS = "CREATE_ACCOUNT_SUCCESS"
export const CREATE_ACCOUNT_FAIL = "CREATE_ACCOUNT_FAIL"

export const signin = (): Action => ({
  type: SIGN_IN,
})

export const signinSuccess = (user: User): Action => ({
  type: SIGN_IN_SUCCESS,
  payload: user,
})

export const signinFail = (err): Action => ({
  type: SIGN_IN_FAIL,
  payload: err,
})

export const signout = (): Action => ({
  type: SIGN_OUT,
})

export const createAccount = (): Action => ({
  type: CREATE_ACCOUNT,
})

export const createAccountSuccess = (user: User): Action => ({
  type: CREATE_ACCOUNT_SUCCESS,
  payload: user,
})

export const createAccountFail = (err): Action => ({
  type: CREATE_ACCOUNT_FAIL,
  payload: err,
})

export function doCreateAccount(data: User, cache = false) {
  return async (dispatch) => {
    dispatch(createAccount())

    try {
      const response = await POST("users", data)

      const resData = await response.json()
      resData.rawPass = data.password

      if (response.status !== 201) {
        dispatch(createAccountFail(resData))
      } else {
        dispatch(createAccountSuccess(resData))

        if (cache) {
          localStorage.setItem("user", JSON.stringify(resData))
        }
      }
    } catch (err) {
      dispatch(createAccountFail(err))
    }
  }
}

export function doSignin(data: User, cache = false) {
  return async (dispatch) => {
    dispatch(signin())

    try {
      const response = await GET(`users/auth/${data.email}`, {
        emailAddress: data.email,
        password: data.password,
      })

      const resData = await response.json()
      resData.rawPass = data.password

      if (response.status !== 200) {
        dispatch(signinFail(resData))
      } else {
        dispatch(signinSuccess(resData))

        if (cache) {
          localStorage.setItem("user", JSON.stringify(resData))
        }
      }
    } catch (err) {
      dispatch(signinFail(err))
    }
  }
}

export function doSignout() {
  localStorage.clear()

  return async (dispatch) => {
    dispatch(signout())
  }
}
