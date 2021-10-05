import React, {Component} from 'react';
import {View} from 'react-native';
import AppNavigator from './Src/Screens/AppNavigator';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from './Src/store/reducers';
import thunk from 'redux-thunk';

class App extends Component {
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
