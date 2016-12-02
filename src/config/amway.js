import axios from 'axios'

const BASE_URL = 'http://tiy-orl-proxy.herokuapp.com/amway_events'

const calendarify = (event) => {
  console.log(event.StartDateTime)
  return {
    title: event.Title,
    start: new Date(event.StartDateTime),
    end: new Date (event.EndDateTime),
    background: true,
    source: 'amway'
  }
}

const amwayEvents = (year, month) => {
  let [nextMonth, nextMonthYear] = month === 12 ? [1, year + 1] : [month + 1, year]
  return axios.all([amwayMonth(year, month),
                    amwayMonth(nextMonthYear, nextMonth)])
              .then(axios.spread(mergeMonths))
}

const amwayMonth = (year, month) => {
  return axios.get(`${BASE_URL}/${year}/${month}`)
              .then(result => result.data.events)
}

const mergeMonths = (thisMonth, nextMonth) => {
  return thisMonth.concat(nextMonth).map(calendarify)
}

export default amwayEvents
