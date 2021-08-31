import React, {Component} from 'react';
import {View, Text, SafeAreaView, Image, Dimensions} from 'react-native';
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import Button from '../Common/Button';
const {height, width} = Dimensions.get('screen');

class Beneficiary extends Component {
  render() {
    return (
      <View style={{height: '100%', width: '100%', backgroundColor: '#fff'}}>
        <SafeAreaView />
        <Header userName="Jhonny" notification={true} />
        <View
          style={{
            height: '74%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={require('../Assets/Images/beneficiary.png')}
            style={{width: width / 1.6, height: height / 2}}
            resizeMode="contain"
          />
          <Button
            onPress={() => this.props.navigation.navigate('Subscription')}>
            ADD BENEFICIARY
          </Button>
        </View>
        <Footer footerValue="home" />
      </View>
    );
  }
}

export default Beneficiary;
