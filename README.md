# Orlando Tech Meetup Calendar

This project combines data from Meetup's API, the Google Calendar API, and the Amway Arena's event calendar to display meetup and parking information that is of interest to the Orlando tech community. 

## Development Instructions

`$ hub clone orlando-source-software/odev-meetup-calendar`

`$ cd odev-meetup-calendar`

`$ npm install`

`$ cd node_modules/react-big-calendar`

`$ NODE_ENV=development npm run build`

Then copy the file `.env.development` into the top-level directory of the project, and `npm run start`.
