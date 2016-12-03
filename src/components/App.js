import React, { Component } from 'react'
import base from '../config/rebase'
import { currentMeetupToken } from '../util/meetupToken'
import { getUserTechMeetups } from '../config/meetup'
import googleCalendarEvents from '../config/googleCalendarEvents'
import amwayEvents from '../config/amway'
import MyCalendar from './MyCalendar'
import EventDetail from './EventDetail'

class App extends Component {
  constructor () {
    super()
    this.state = {
      meetups: [],
      calendarEvents: [],
      amwayEvents: [],
      event: {}
    }
    this.getAmwayEvents = this.getAmwayEvents.bind(this)
    this.getUserMeetups = this.getUserMeetups.bind(this)
    this.getGoogleCalendarEvents = this.getGoogleCalendarEvents.bind(this)
    console.log('app constructor')
  }

  getAmwayEvents () {
    let today = new Date()
    let year = today.getFullYear()
    let month = today.getMonth() + 1
    amwayEvents(year, month).then(results => this.setState({ amwayEvents: results }))
  }

  getUserMeetups (user) {
    base.fetch(`/groups/${user.uid}`, {
      context: {},
      asArray: true
    }).then(data => getUserTechMeetups(currentMeetupToken(), data))
      .then(results => this.setState({ meetups: results }))
  }

  getGoogleCalendarEvents (user) {
    googleCalendarEvents(user)
    .then(results => this.setState({ calendarEvents: results }))
  }

  componentDidMount () {
    console.log('cDM')
    base.onAuth(user => {
      this.getAmwayEvents()
      this.getUserMeetups(user)
      this.getGoogleCalendarEvents(user)
    })
  }

  handleSelect (event) {
    this.setState({
      event
    })
  }

  render() {
    let events = this.state.meetups
                 .concat(this.state.calendarEvents)
                 .concat(this.state.amwayEvents)
    return (
      <div className="App" style={{height: '100vh'}}>
        <MyCalendar
          events={events}
          onSelect={this.handleSelect.bind(this)}
        />
        <EventDetail event={this.state.event} />
      </div>
    )
  }
}

export default App
