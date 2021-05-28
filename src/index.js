import {render} from 'react-dom'
import './styles/index.scss'
import App from './components/app';

render(<App/>, document.getElementById('root'))

const objWithData = {
  color: 'red',
  eye: 2
}

const copyObj = {
  ...objWithData,
  newProp: 'prop'
}
