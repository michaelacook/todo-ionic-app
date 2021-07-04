import { Action, User } from "../types"
import { POST } from "../lib/http"
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

export const signinFail = (): Action => ({
  type: SIGN_IN_FAIL,
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

export const createAccountFail = (): Action => ({
  type: CREATE_ACCOUNT_FAIL,
})

export function doCreateAccount(data: User) {
  return async (dispatch) => {
    dispatch(createAccount())

    try {
      const response = await POST(`${API}/users`, data)
      console.log(response)

      const resData = await response.json()
      dispatch(createAccountSuccess(resData))
    } catch (err) {
      console.log(err)
      dispatch(createAccountFail())
    }
  }
}

export function doSignin(data: User) {
  return async (dispatch: any) => {
    dispatch(signin())

    try {
      const response = await POST(`${API}/users/auth/${data.email}`, data, {
        emailAddress: data.email,
        password: data.password,
      })

      const resData = await response.json()
      dispatch(signinSuccess(resData))
    } catch (err) {
      console.log(err)
      dispatch(signinFail())
    }
  }
}
