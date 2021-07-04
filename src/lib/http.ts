const mode: RequestMode = "cors"

export function GET(
  url: string,
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
  return fetch(url, Object.keys(options).length ? options : undefined)
}

export function POST(
  url: string,
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
  return fetch(url, options)
}

export function PUT(
  url: string,
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
  return fetch(url, options)
}

export function DELETE(
  url: string,
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

  return fetch(url, options)
}
