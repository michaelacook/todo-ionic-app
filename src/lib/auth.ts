import { POST } from "./http"
import { User } from "../types"
import API from "../api"

export async function createAccount(data: User) {
  console.log(API)
  try {
    const response = await POST(`${API}/users`, data)
    return await response.json()
  } catch (err) {
    Promise.reject(err)
  }
}
