import { render } from 'react-dom'
import './styles/index.scss'
import App from './components/app'

render(<App />, document.getElementById('root'))

const objWithData = { color: 'red', eye: 2, white: 1 }

const copyObj = {
  ...objWithData,
  newProp: 'prop',
  color: 'red',
  eye: 2,
  white: 1,
  ...objWithData,
  newProp: 'prop',
  color: 'red',
  eye: 2,
  white: 1,
}
document.querySelector('.hello').getAttribute('src').slice(0, 1)
  .dataset.href
