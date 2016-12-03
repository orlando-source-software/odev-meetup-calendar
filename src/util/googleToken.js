let PREFIX = process.env.REACT_APP_LOCALSTORAGE

const storeGoogleAccessToken = (token) => {
  localStorage.setItem(`${PREFIX}-google-access-token`, token)
}

const currentGoogleToken = () => {
  return localStorage.getItem(`${PREFIX}-google-access-token`)
}

export { storeGoogleAccessToken, currentGoogleToken }
