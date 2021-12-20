import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { Component } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import FontStyle from '../../Assets/Fonts/FontStyle';
import { baseurl } from '../../Common/Baseurl';

import Header from '../../Common/Header';

class AboutApp extends Component {
  state = { aboutData: '' };
  componentDidMount = async () => {
    const token = await AsyncStorage.getItem('token');
    this.getAboutData(token);
  };

  getAboutData = (token) => {
    console.log({
      method: 'get',
      url: `${baseurl}settings/about/`,
      headers: { Authorization: `Token ${token}` },
    });
    axios({
      method: 'get',
      url: `${baseurl}settings/about/`,
      headers: { Authorization: `Token ${token}` },
    })
      .then((response) => {
        console.log(response, 'response');
        if (response.status == 200) {
          this.setState({ aboutData: response.data });
        }
      })
      .catch((err) => {
        console.log(err, 'err');
      });
  };

  render() {
    const { aboutData } = this.state;
    return (
      <View style={{ backgroundColor: '#fff', height: '100%', width: '100%' }}>
        {/* <SafeAreaView /> */}
        <Header
          middleText={'About'}
          leftIcon={true}
          notification={true}
          notifyPress={() => this.props.navigation.navigate('Notification')}
        />
        <ScrollView style={{
          height: '68%',
          width: '100%',
          borderRadius: 10,
          padding: '5%',
        }} showsVerticalScrollIndicator={true}>
          <Text
            style={{
              color: '#223E6D',
              fontFamily: FontStyle.bold,
              fontSize: 18,
            }}>
            How does this app work?
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
        </ScrollView>
      </View>
    );
  }
}

export default AboutApp;
