export type Action = {
  type: string
  payload?: any
}

export type User = {
  id?: number
  email: string
  password: string
  firstName?: string
  lastName?: string
  createdAt?: string
  updatedAt?: string
  loading?: boolean
  hasErrors?: boolean
}
