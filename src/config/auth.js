import base from './rebase'
import { currentMeetupToken, storeMeetupAccessToken } from '../util/meetupToken'
import { storeGoogleAccessToken } from '../util/googleToken'
import { validGoogleToken } from '../config/googleCalendarEvents'
import { MEETUP_OAUTH_URL } from './meetup'

const requireMeetupToken = () => {
  if (!currentMeetupToken()) {
    window.location = MEETUP_OAUTH_URL
  }
}
console.log('yes there is an auth')

const requireAuth = (nextState, replace, callback) => {
  console.log('requireAuth')
  const onRedirectBack = (error, authData) => {
    if (error) {
      console.log(error)
    } else if (authData.credential) {
      storeGoogleAccessToken(authData.credential.accessToken)
      requireMeetupToken()
      getUserGroupsAndRedirect(authData.user.uid, replace, callback)
    } else {
      base.authWithOAuthRedirect('google', authHandler, { scope: 'https://www.googleapis.com/auth/calendar' })
    }
  }

  base.onAuth(user => {
    console.log('base.onAuth')
    validGoogleToken(user).then(() => {
      requireMeetupToken()
      callback()
    }).catch(e => {
      console.log('base.onAuth .catch')
      base.authGetOAuthRedirectResult(onRedirectBack)
    })
  })
}

const authHandler = (error) => {
  if (error) {
    console.error('error ', error)
  }
}

const storeToken = (nextState, replace, callback) => {
  if (storeMeetupAccessToken()) {
    base.onAuth(user => {
      if (user) {
        getUserGroupsAndRedirect(user.uid, replace, callback)
      }
    })
  }
}

const getUserGroupsAndRedirect = (id, replace, callback) => {
  base.fetch(`/groups/${id}`, {
    context: {},
    asArray: true
  }).then(data => {
    if (data.length) {
      replace('/')
    } else {
      replace('/profile')
    }
    callback()
  })
}

export { requireAuth, storeToken }
