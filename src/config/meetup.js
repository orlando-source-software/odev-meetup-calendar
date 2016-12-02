import axios from 'axios'

const API_STRING = 'https://api.meetup.com'

const REDIRECT_URI = `${process.env.REACT_APP_MEETUP_REDIRECT_DOMAIN}/store_token`
const MEETUP_SECRET = process.env.REACT_APP_MEETUP_SECRET

const MEETUP_OAUTH_URL = `https://secure.meetup.com/oauth2/authorize?client_id=${MEETUP_SECRET}&response_type=token&redirect_uri=${REDIRECT_URI}`

const getMeetupApi = (query, accessToken) => {
  return axios.get(`${API_STRING}${query}&access_token=${accessToken}`)
}

const getMeetups = (query, accessToken) => {
  return getMeetupApi(query, accessToken)
  .then(response => response.data.results.map(event => calendarify(event)))
}

const getMeetupGroups = (accessToken) => {
  return getMeetupApi(`/find/groups?zip=32801&page=200&radius=35&category=34&fields=plain_text_description`, accessToken)
}

const getUserTechMeetups = (accessToken, groupIds) => {
  return getMeetups(`/2/events?group_id=${groupIds.join()}`, accessToken)
}

const calendarify = (event) => {
  var address
  if (event.venue) {
    if (event.venue.address_1 === '101 S. Garland Ave') {
      address = 'Campus'
    } else if (event.venue.city === 'Orlando') {
      address = event.venue.address_1
    } else {
      address = `${event.venue.address_1}, ${event.venue.city}`
    }
  }
  if (!event.duration) {
    event.duration = 3600 * 1000
  }
  return {
    description: event.description,
    start: new Date(event.time),
    end: new Date(event.time + event.duration),
    name: event.name,
    attendance: event.yes_rsvp_count,
    group: event.group.name.replace('The Iron Yard - Orlando', 'TIY'),
    groupId: event.group.id,
    address: address,
    source: 'meetup'
  }
}
export { MEETUP_OAUTH_URL, getUserTechMeetups, getMeetupGroups }

