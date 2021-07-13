import API from "../api"
const mode: RequestMode = "cors"

export function GET(
  endpoint: string,
  credentials?: { emailAddress: string; password: string }
) {
  const options: any = {}
  if (credentials) {
    const encodedCredentials = btoa(
      `${credentials.emailAddress}:${credentials.password}`
    )
    options.headers = {
      Authorization: `Basic ${encodedCredentials}`,
    }
  }
  return fetch(
    `${API}/${endpoint}`,
    Object.keys(options).length ? options : undefined
  )
}

export function POST(
  endpoint: string,
  body: any,
  credentials?: { emailAddress: string; password: string }
) {
  const headers: any = {
    "Content-Type": "application/json",
  }

  if (credentials) {
    const encodedCredentials = btoa(
      `${credentials.emailAddress}:${credentials.password}`
    )

    headers["Authorization"] = `Basic ${encodedCredentials}`
  }

  const options = {
    method: "POST",
    mode,
    headers: headers,
    body: JSON.stringify(body),
  }
  return fetch(`${API}/${endpoint}`, options)
}

export function PUT(
  endpoint: string,
  body: any,
  credentials?: { emailAddress: string; password: string }
) {
  const headers: any = {
    "Content-Type": "application/json",
  }

  if (credentials) {
    const encodedCredentials = btoa(
      `${credentials.emailAddress}:${credentials.password}`
    )

    headers["Authorization"] = `Basic ${encodedCredentials}`
  }

  const options = {
    method: "PUT",
    mode,
    headers: headers,
    body: JSON.stringify(body),
  }
  return fetch(`${API}/${endpoint}`, options)
}

export function DELETE(
  endpoint: string,
  credentials?: { emailAddress: string; password: string }
) {
  const headers: any = {}

  if (credentials) {
    const encodedCredentials = btoa(
      `${credentials.emailAddress}:${credentials.password}`
    )

    headers["Authorization"] = `Basic ${encodedCredentials}`
  }

  const options: any = {
    method: "DELETE",
    mode,
    headers: headers,
  }

  return fetch(`${API}/${endpoint}`, options)
}
