import { AppRegistry } from 'react-native'

import App from '@onepass/components/src/App'

AppRegistry.registerComponent('onepass', () => App)
AppRegistry.runApplication('onepass', {
  rootTag: document.getElementById('root'),
})