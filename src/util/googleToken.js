const storeGoogleAccessToken = (token) => {
  localStorage.setItem('google-access-token', token)
}

const currentGoogleToken = () => {
  return localStorage.getItem('google-access-token')
}

export { storeGoogleAccessToken, currentGoogleToken }
