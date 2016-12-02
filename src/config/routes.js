import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import MyLayout from '../components/Layout'
import App from '../components/App'
import Logout from '../components/Logout'
import Profile from '../components/Profile'
import { requireAuth, storeToken } from './auth'

const routes = (
  <Router history={browserHistory}>
    <Route path='/' component={MyLayout}>
      <IndexRoute component={App} onEnter={requireAuth} />
      <Route path='profile' onEnter={requireAuth} component={Profile} />
      <Route path='store_token' onEnter={storeToken} />
      <Route path='logout' component={Logout} />
    </Route>
  </Router>
)
export default routes
