import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {Component} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import FontStyle from '../../Assets/Fonts/FontStyle';
import {baseurl} from '../../Common/Baseurl';

import Header from '../../Common/Header';

class AboutApp extends Component {
  state = {aboutData: ''};
  componentDidMount = async () => {
    const token = await AsyncStorage.getItem('token');
    this.getAboutData(token);
  };

  getAboutData = (token) => {
    axios({
      method: 'get',
      url: `${baseurl}settings/about/`,
      headers: {Authorization: `Token ${token}`},
    })
      .then((response) => {
        if (response.status == 200) {
          this.setState({aboutData: response.data});
        }
      })
      .catch((err) => {});
  };

  render() {
    const {aboutData} = this.state;
    return (
      <View style={{backgroundColor: '#fff', height: '100%', width: '100%'}}>
        <SafeAreaView />
        <Header
          middleText={'About App'}
          leftIcon={true}
          notification={true}
          notifyPress={() => this.props.navigation.navigate('Notification')}
        />
        <View style={{height: '100%', width: '100%', paddingHorizontal: '5%'}}>
          <View
            style={{
              height: '68%',
              width: '100%',
              backgroundColor: '#D5FAFB',
              borderRadius: 10,
              padding: '5%',
            }}>
            <Text
              style={{
                color: '#223E6D',
                fontFamily: FontStyle.bold,
                fontSize: 18,
              }}>
              How this app works
            </Text>
            <Text
              style={{
                fontFamily: FontStyle.regular,
                fontSize: 15,
                color: '#3A3A3A',
                paddingVertical: '5%',
                textAlign: 'justify',
              }}>
              {aboutData}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default AboutApp;
