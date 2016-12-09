import React, { Component } from 'react'
import BigCalendar from 'react-big-calendar'
import BackgroundEvent from './BackgroundEvent'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

BigCalendar.momentLocalizer(moment)

class MyCalendar extends Component {

  eventSelected (event) {
    this.props.onSelect(event)
  }

  eventPropGetter (event) {
    return { className: event.source }
  }
  render () {
    return (
      <BigCalendar
        timeslots={12}
        events={this.props.events}
        onSelectEvent={this.eventSelected.bind(this)}
        eventPropGetter={this.eventPropGetter}
        min={moment('6:00am', 'h:mma').toDate()}
        formats={{
          dayFormat: 'ddd MM/DD',
          dayHeaderFormat: 'ddd MM/DD'
        }}
        components={{
          month: {
            event: Event
          },
          week: {
            event: WeekEvent
          },
          backgroundEvent: BackgroundEvent
        }}
      />
    )
  }

}
/*
    description: event.description,
    start: event.time,
    end: event.time + event.duration,
    name: event.name,
    attendance: event.yes_rsvp_count,
    group: event.group.name,
    address: event.venue
    */
const time = (dateObj) => {
  return dateObj.toLocaleTimeString().replace(':00 ', '')
}

const Event = ({event}) => {
  if (event.source === 'meetup') {
    return (
      <span title={`${event.group} (${event.address})`}>
        <strong>{time(event.start)}-{time(event.end)}:{event.group}</strong>
      </span>
    )
  } else if (event.summary) {
    return (
      <span title={`${time(event.start)}-${time(event.end)}`}>
        <strong>{event.summary}</strong>
      </span>
    )
  } else {
    return <span>Amway event</span>
  }
}

const WeekEvent = ({event}) => {
  if (event.source === 'meetup') {
    return (
      <span title={`${event.group} (${event.address})`}>
        <strong>{event.group}</strong>
      </span>
    )
  } else if (event.summary) {
    return (
      <span>
        <strong>{event.summary}</strong>
      </span>
    )
  } else {
    return <span>Amway event</span>
  }
}
// step 2 would be to allow each user to choose which events to pay attention to and store those in FB
// also I want to integrate w google calendar

export default MyCalendar

