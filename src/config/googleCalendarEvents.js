import axios from 'axios'
import { currentGoogleToken } from '../util/googleToken'

const GOOGLE_URL = 'https://www.googleapis.com'

const validGoogleToken = (user) => {
  return axios.get(`${GOOGLE_URL}/oauth2/v3/tokeninfo?access_token=${currentGoogleToken()}`)
         .then(response => user.email === response.data.email)
}

const monthEventUrl = (calendar) => {
  let startTime = (new Date()).toISOString()
  let stopTime = (new Date(Date.now() + 31 * 24 * 3600 * 1000))
                 .toISOString()
  return `/calendars/${encodeURIComponent(calendar.id)}/events?` +
         `singleEvents=true&orderBy=startTime&timeMin=${startTime}` +
         `&timeMax=${stopTime}`
}

const flatten = (array) => {
  return array.reduce((flat, toFlatten) => {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten)
  }, [])
}

const calendarify = (response) => {
  return response.data.items.filter(event => !!event.summary)
    .map(event => {
    if (event.creator.displayName === 'Holidays in United States') {
      event.start.date = event.end.date
    }
    return {
      start: new Date(event.start.dateTime || event.start.date),
      end: new Date(event.end.dateTime || event.end.date),
      summary: event.summary,
      attendance: (event.attendees && event.attendees.length) || undefined,
      address: event.location,
      creator: event.creator,
      source: 'google'
    }
  })
}

const makeFlatEventList = (responses) => {
  return flatten(responses.map(calendarify))
}

const makeEventListWithoutDuplicates = (events) => {
  let holidays = events.filter(event => event.creator.displayName === 'Holidays in United States')
  let holidayNames = holidays.map(event => event.summary)
  return events.filter(event => holidays.includes(event) || !holidayNames.includes(event.summary))
}

const googleCalendarEvents = () => {
  let token = `Bearer ${currentGoogleToken()}`
  let gCalAPIConfig = {
    baseURL: `${GOOGLE_URL}/calendar/v3`,
    headers: { Authorization: token }
  }
  const monthEvents = (calendar) => {
    return axios.get(monthEventUrl(calendar), gCalAPIConfig)
  }

  return axios.get('/users/me/calendarList', gCalAPIConfig)
              .then(response => axios.all(response.data.items.map(monthEvents)))
       .then(makeFlatEventList)
       .then(makeEventListWithoutDuplicates)
}

export { googleCalendarEvents as default, validGoogleToken }
