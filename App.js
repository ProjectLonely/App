import React, {Component} from 'react';
import {View} from 'react-native';
import AppNavigator from './Src/Screens/AppNavigator';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from './Src/store/reducers';
import thunk from 'redux-thunk';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';

messaging()
  .hasPermission()
  .then((enabled) => {
    if (enabled) {
      messaging()
        .getToken()
        .then((token) => {
          console.log(token, 'push token');
          AsyncStorage.setItem('deviceToken', token);
        })
        .catch((error) => {
          /* handle error */
        });
    }
  })
  .catch((error) => {
    /* handle error */
  });

messaging().onMessage(async (remoteMessage) => {
  console.log('A new FCM message arrived!', remoteMessage.notification);
  const {body, title} = remoteMessage.notification;
  PushNotification.localNotification({
    title: title,
    message: body, // (required)
  });
});

class App extends Component {
  componentDidMount = () => {
    this.requestUserPermission();
  };

  requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  };

  render() {
    const store = createStore(reducers, {}, applyMiddleware(thunk));
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <AppNavigator />
        </View>
      </Provider>
    );
  }
}

export default App;
