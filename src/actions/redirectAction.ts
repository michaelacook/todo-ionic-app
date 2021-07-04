export const REDIRECT = "REDIRECT"

export const redirect = (link: string) => ({
  type: REDIRECT,
  payload: link,
})
