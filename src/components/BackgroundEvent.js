import React from 'react'

const time = (dateString) => {
  let date = new Date(dateString)
  let hr = (date.getHours() + 5) % 24
  let min = date.getMinutes()
  if (min < 10) {
      min = `0${min}`
  }
  let ampm = hr < 12 ? "am" : "pm"
  hr = (hr % 12) || 12
  return `${hr}:${min}${ampm}`
}

const BackgroundEvent = ({event}) => {
  return (
    <div title={`${event.title} (${time(event.start)}-${time(event.end)})`} className='background'>
      <em>Amway event</em>
    </div>
  )
}
export default BackgroundEvent
