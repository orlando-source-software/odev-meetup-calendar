import ReactDOM from 'react-dom'
import routes from './config/routes'
import './index.css'
console.log('reactdom', ReactDOM, '.render', ReactDOM.render, 'routes', routes, 'elm', document.getElementById('root'))
ReactDOM.render(
  routes,
  document.getElementById('root')
)
