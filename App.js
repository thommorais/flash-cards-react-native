import React from 'react';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducer from './reducers'
import {View, StatusBar} from 'react-native'
import { purple, pink } from './style'
import MainNavigator from './components/Routes'
import { setLocalNotification, clearLocalNotification } from './notifications'

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware)
)


export default class App extends React.Component {

  componentDidMount(){
    clearLocalNotification().then(setLocalNotification(20))
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1, backgroundColor: pink}}>
          <View>
            <StatusBar translucent backgroundColor={purple} barStyle="light-content" />
          </View>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

