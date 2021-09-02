import React, {Component} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import FontStyle from '../Assets/Fonts/FontStyle';

import Header from '../Common/Header';

class AboutApp extends Component {
  render() {
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
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam
              voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
              Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
              dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
              elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
              magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
              justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
              takimata sanctus est Lorem.
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default AboutApp;
