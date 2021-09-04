import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Input from '../Common/Input';
import FontStyle from '../Assets/Fonts/FontStyle';
import Button from '../Common/Button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import {baseurl} from '../Common/Baseurl';
import AsyncStorage from '@react-native-async-storage/async-storage';

class VerificationCode extends Component {
  state = {timer: 30, temp_token: '', otp: ''};
  componentDidMount = async () => {
    this.timer();
    this.setState({temp_token: await AsyncStorage.getItem('temp_token')});
  };

  verify = () => {
    const {temp_token, otp} = this.state;
    axios({
      method: 'POST',
      url: `${baseurl}verify/`,
      data: {
        temp_token: temp_token,
        code: otp,
      },
    })
      .then((response) => {
        if (response.status == 201) {
          AsyncStorage.setItem('token', response.data.token);
          this.props.navigation.navigate('Dashboard');
        }
      })
      .catch((err) => {
        console.log(err.response);
        alert(err.response.data.__all__.toString());
      });
  };

  resendVerification = () => {
    axios({
      method: 'post',
      url: `${baseurl}verify-resend/`,
      data: {
        temp_token: this.state.temp_token,
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err.response);
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

  render() {
    const {timer, temp_token, code} = this.state;

    return (
      <ImageBackground
        source={require('../Assets/Images/splashWhite.png')}
        style={{height: '100%', width: '100%'}}
        resizeMode="cover">
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{height: '100%', width: '100%'}}>
          <View
            style={{
              height: '20%',
              width: '100%',
              alignItems: 'center',
            }}>
            <Image
              source={require('../Assets/Images/blueLogo.png')}
              style={{width: 200, height: 200, resizeMode: 'contain'}}
            />
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
              }}>
              Verification Code
            </Text>

            <Input
              placeholder="Verification Code"
              onChangeText={(text) => this.setState({otp: text})}
              secureTextEntry={false}
              maxLength={6}
              keyboardType={'number-pad'}
            />
            <TouchableOpacity
              onPress={this.resendVerification}
              style={{
                width: '100%',
                alignItems: 'flex-end',
                paddingHorizontal: '5%',
              }}>
              <Text style={[styles.normalText]}>{`Resend(${
                timer > 0 ? `${timer}` : ''
              }s)`}</Text>
            </TouchableOpacity>
          </View>
          <Button onPress={this.verify}>VERIFY</Button>
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
