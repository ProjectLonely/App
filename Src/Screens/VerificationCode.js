import React, { Component } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import Input from '../Common/Input';
import FontStyle from '../Assets/Fonts/FontStyle';
import Button from '../Common/Button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import { baseurl } from '../Common/Baseurl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AlertModal from '../Common/AlertModal';
import Spinner from '../Common/Spinner';

class VerificationCode extends Component {
  state = {
    timer: 30,
    temp_token: '',
    otp: '',
    message: '',
    modalValue: false,
    verifyLoader: false,
    resendLoader: false,
    deviceId: '',
  };
  componentDidMount = async () => {
    this.timer();
    const pageValue = this.props.route.params;
    this.setState({
      deviceId: await AsyncStorage.getItem('deviceToken'),
      temp_token: await AsyncStorage.getItem('temp_token'),
      pageValue,
    });
    console.log(pageValue);
  };

  verify = () => {
    this.setState({ verifyLoader: true });
    const { temp_token, otp, deviceId } = this.state;
    axios({
      method: 'POST',
      url: `${baseurl}verify/`,
      data: {
        temp_token: temp_token,
        code: otp,
        device_id: deviceId,
      },
    })
      .then(async (response) => {
        this.setState({ verifyLoader: false });
        if (response.status == 201) {
          await AsyncStorage.setItem('token', response.data.token);
          await AsyncStorage.setItem('name', response.data.name);
          await AsyncStorage.setItem('email', response.data.email);
          if (this.state.pageValue == 'signup') {
            this.props.navigation.navigate('MainStack', { screen: 'Beneficiaries'});
          } else {
            this.props.navigation.navigate('MainStack', {
              screen: 'Settings', params: {
                screen: 'Account Information',
              },
            })
          } 
        } 
      })
      .catch((err) => {
        this.setState({ verifyLoader: false });
        this.setState({
          modalValue: true,
          message: Object.values(err.response.data),
        });
      });
  };

  resendVerification = () => {
    this.setState({ resendLoader: true });
    axios({
      method: 'post',
      url: `${baseurl}verify-resend/`,
      data: {
        temp_token: this.state.temp_token,
      },
    })
      .then((response) => {
        console.log(response);
        this.setState({ timer: 30, resendLoader: false });
        if (response.status == 204) {
          this.setState({
            modalValue: true,
            message: 'A verification code was sucessfully re-sent to your email address.',
          });
        }
      })
      .catch((err) => {
        this.setState({
          resendLoader: false,
          modalValue: true,
          message: 'Something went wrong',
        });
      });
  };

  timer = () => {
    if (this.state.timer > 1) {
      this.interval = setInterval(
        () =>
          this.setState((prevState) => ({
            timer: prevState.timer - 1,
          })),
        1000,
      );
    }
  };

  renderButton = () => {
    if (this.state.verifyLoader) {
      return (
        <View style={{ width: '100%', alignItems: 'center' }}>
          <Spinner spinnercolor="#fff" marginTop={17.5} />
        </View>
      );
    } else {
      return <Button onPress={this.verify}>VERIFY</Button>;
    }
  };

  render() {
    const { timer, modalValue, message, resendLoader, verifyLoader } = this.state;
    console.log(this.state.deviceId, 'rrr');
    return (
      <ImageBackground
        source={require('../Assets/Images/splashWhite.png')}
        style={{ height: '100%', width: '100%' }}
        resizeMode="cover">
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ height: '100%', width: '100%' }}
          pointerEvents={verifyLoader ? 'none' : 'auto'}>
          <AlertModal
            modalValue={modalValue}
            closeModal={() => this.setState({ modalValue: false })}
            message={message}
          />
          <View
            style={{
              height: '20%',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Image
                source={require('../Assets/Images/back.png')}
                style={{
                  height: 30,
                  width: 30,
                  resizeMode: 'contain',
                  marginLeft: 10,
                }}
              />
            </TouchableOpacity>
            <Image
              source={require('../Assets/Images/blueLogo.png')}
              style={{ width: 200, height: 200, resizeMode: 'contain' }}
            />
            <View />
          </View>

          <View
            style={{
              height: '30%',
              alignItems: 'center',
              marginTop: '5%',
            }}>
            <Text
              style={{
                fontFamily: FontStyle.bold,
                fontSize: 32,
                color: '#0F0A39',
                textAlign: 'center',
              }}>
              Email Verification Code
            </Text>

            <Input
              placeholder="Email Verification Code"
              onChangeText={(text) => this.setState({ otp: text })}
              secureTextEntry={false}
              maxLength={6}
              keyboardType={'number-pad'}
            />
            {timer > 0 ? (
              <View
                style={{
                  width: '100%',
                  alignItems: 'flex-end',
                  paddingHorizontal: '5%',
                }}>
                <Text style={[styles.normalText]}>{`Resend in ${timer > 0 ? `${timer}` : ''
                  }s`}</Text>
              </View>
            ) : resendLoader ? (
              <View
                style={{
                  alignSelf: 'flex-end',
                  width: '10%',
                  right: '5%',
                  top: -5,
                }}>
                <Spinner backgroundColor={'#fff'} />
              </View>
            ) : (
              <TouchableOpacity
                style={{
                  width: '100%',
                  alignItems: 'flex-end',
                  paddingHorizontal: '5%',
                }}
                onPress={this.resendVerification}>
                <Text style={[styles.normalText, { color: '#004ACE' }]}>
                  Resend
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <View
            style={{
              width: '100%',
              paddingVertical: Platform.OS == 'ios' ? 0 : 20,
            }}>
            {this.renderButton()}
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  normalText: {
    fontFamily: FontStyle.regular,
    fontSize: 16,
    color: '#707070',
  },
});

export default VerificationCode;
