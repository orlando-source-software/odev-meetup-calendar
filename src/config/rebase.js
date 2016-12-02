import Rebase from 're-base'
const base = Rebase.createClass({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "tiy-meetup-calendar.firebaseapp.com",
  databaseURL: "https://tiy-meetup-calendar.firebaseio.com",
  storageBucket: "tiy-meetup-calendar.appspot.com",
  messagingSenderId: "491666686384"
})
export default base
