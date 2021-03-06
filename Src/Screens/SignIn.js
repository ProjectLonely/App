import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Input from '../Common/Input';
import FontStyle from '../Assets/Fonts/FontStyle';
import Button from '../Common/Button';
import {HelperText} from 'react-native-paper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import {baseurl} from '../Common/Baseurl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AlertModal from '../Common/AlertModal';
import Spinner from '../Common/Spinner';
import {StackActions} from '@react-navigation/native';

class SignIn extends Component {
  state = {
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    passwordSecure: true,
    modalValue: false,
    signinLoader: false,
    deviceId: '',
  };

  componentDidMount = async () => {
    this.setState({deviceId: await AsyncStorage.getItem('deviceToken')});
  };

  signin = () => {
    const {email, password, deviceId} = this.state;

    if (email == '') {
      this.setState({emailError: true});
    } else if (password == '') {
      this.setState({passwordError: true});
    } else {
      this.setState({signinLoader: true});

      axios({
        method: 'post',
        url: `${baseurl}login/`,
        data: {
          email: email,
          password: password,
          device_id: deviceId,
        },
      })
        .then(async (response) => {
          console.log(response, 'check response');
          this.setState({signinLoader: false});
          if (response.data.is_active == false) {
            await AsyncStorage.setItem('temp_token', response.data.temp_token);
            this.props.navigation.navigate('VerificationCode');
          } else if (response.data.is_active == true) {
            await AsyncStorage.setItem('token', response.data.token);
            await AsyncStorage.setItem('name', response.data.name);
            this.props.navigation.dispatch(
              StackActions.replace('MainStack', {screen: 'Home'}),
            );
          }
        })
        .catch((err) => {
          this.setState({
            signinLoader: false,
            modalValue: true,
            message: Object.values(err.response.data),
          });
        });
    }
  };

  renderButton = () => {
    if (this.state.signinLoader) {
      return <Spinner spinnercolor="#fff" marginTop={17.5} />;
    } else {
      return <Button onPress={this.signin}>SIGNIN</Button>;
    }
  };

  render() {
    const {
      passwordSecure,
      emailError,
      passwordError,
      message,
      modalValue,
      signinLoader,
    } = this.state;

    return (
      <ImageBackground
        source={require('../Assets/Images/splashWhite.png')}
        style={{height: '100%', width: '100%'}}
        resizeMode="cover">
        <KeyboardAwareScrollView
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          pointerEvents={signinLoader ? 'none' : 'auto'}>
          <AlertModal
            modalValue={modalValue}
            closeModal={() => this.setState({modalValue: false})}
            message={message}
          />

          <View
            style={{
              height: '30%',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Image
              source={require('../Assets/Images/blueLogo.png')}
              style={{width: 200, height: 200, resizeMode: 'contain'}}
            />
            <View />
          </View>

          <View
            style={{
              height: '55%',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: FontStyle.bold,
                fontSize: 32,
                color: '#0F0A39',
              }}>
              Login
            </Text>
            <Input
              placeholder="Email"
              onChangeText={(text) =>
                this.setState({email: text, emailError: false})
              }
              value={this.state.email}
              maxLength={30}
              secureTextEntry={false}
            />
            {emailError == true ? (
              <HelperText style={styles.helperText} type="error">
                Enter your email
              </HelperText>
            ) : null}
            <Input
              placeholder="Password"
              onChangeText={(text) =>
                this.setState({password: text, passwordError: false})
              }
              maxLength={30}
              secureTextEntry={passwordSecure}
              iconName="eye-slash"
              iconPress={() => this.setState({passwordSecure: !passwordSecure})}
            />
            {passwordError == true ? (
              <HelperText style={styles.helperText} type="error">
                Enter your password
              </HelperText>
            ) : null}
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('LoginStack', {
                  screen: 'Forgot Password',
                })
              }
              style={{
                width: 'auto',
                paddingHorizontal: '5%',
                alignSelf: 'flex-end',
                height: '7%',
                alignItems: 'center',
              }}>
              <Text style={[styles.normalText, {fontSize: 12}]}>
                Forgot Password ?
              </Text>
            </TouchableOpacity>

            {this.renderButton()}
          </View>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('LoginStack', {screen: 'Sign Up'})
            }
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'center',
              marginTop: 10,
            }}>
            <Text style={styles.normalText}>Don't have an account? </Text>
            <Text
              style={[
                styles.normalText,
                {color: '#004ACE', fontFamily: FontStyle.Bold},
              ]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  normalText: {
    fontFamily: FontStyle.regular,
    fontSize: 14,
    color: '#707070',
  },
  helperText: {
    fontFamily: FontStyle.regular,
    alignSelf: 'flex-start',
    paddingLeft: '6%',
    top: -10,
  },
});

export default SignIn;
