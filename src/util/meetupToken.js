let PREFIX = process.env.REACT_APP_LOCALSTORAGE

const storeMeetupAccessToken = () => {
  let accessToken = window.location.hash.split("access_token=")[1].split("&")[0]
  let expirationTime = new Date()
  if (accessToken) {
    expirationTime.setHours(expirationTime.getHours() + 1)
  }
  localStorage.setItem(`${PREFIX}-calendar-meetup-api-token`, accessToken)
  localStorage.setItem(`${PREFIX}-calendar-meetup-api-expiration`, expirationTime)
  return accessToken
}

const currentMeetupToken = () => {
  let expiration = localStorage.getItem(`${PREFIX}-calendar-meetup-api-expiration`)
  return expiration &&
         new Date(expiration) > Date.now() &&
         localStorage.getItem(`${PREFIX}-calendar-meetup-api-token`)
}

export { storeMeetupAccessToken, currentMeetupToken }
