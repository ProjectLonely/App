import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import FontStyle from '../Assets/Fonts/FontStyle';
import Input from '../Common/Input';
import Button from '../Common/Button';
import CheckBox from '@react-native-community/checkbox';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import {HelperText} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseurl} from '../Common/Baseurl';
import AlertModal from '../Common/AlertModal';
import Spinner from '../Common/Spinner';

class SignUp extends Component {
  state = {
    checked: false,
    passwordSecure: true,
    confirmPasswordSecure: true,
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    emailError: false,
    modalValue: false.name,
    message: '',
    registerLoader: false,
  };

  Register = () => {
    const strongPassword =
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    const {name, email, password, confirmPassword, checked} = this.state;

    if (name == '') {
      this.setState({nameError: true});
    } else if (email == '') {
      this.setState({emailError: true});
    } else if (password == '') {
      this.setState({passwordError: true});
    } else if (confirmPassword == '') {
      this.setState({confirmPasswordError: true});
    } else if (!strongPassword.test(password)) {
      this.setState({
        message:
          'You Password must be 8 characters long and contain one uppercase, one lowercase, one numeric & one special character.',
        modalValue: true,
      });
    } else if (confirmPassword != password) {
      this.setState({
        message: 'Your passwords do not match',
        modalValue: true,
      });
    } else if (checked == false) {
      this.setState({modalValue: true, message: 'Please accept the terms & condition'});
    } else {
      this.setState({registerLoader: true});
      console.log({
        first_name: name,
        email: email,
        password: password,
        password1: confirmPassword,
        accept: '1',
      });
      axios({
        method: 'POST',
        url: `${baseurl}register/`,
        data: {
          first_name: name,
          email: email,
          password: password,
          password1: confirmPassword,
          accept: '1',
        },
      })
        .then(async (response) => {
          console.log(response, 'res');
          this.setState({registerLoader: false});
          if (response.data.exist == true) {
            this.setState({
              modalValue: true,
              message: 'This email id alredy exists. Please login or reset your password. ',
            });
          } else {
            const pageValue = 'signup';
            AsyncStorage.setItem('temp_token', response.data.temp_token);
            this.props.navigation.navigate('Verification Code', pageValue);
          }
        })
        .catch((err) => {
          console.log(err.response);
          this.setState({
            modalValue: true,
            message: Object.values(err.response.data).toString(),
            registerLoader: false,
          });
        });
    }
  };

  renderButton = () => {
    if (this.state.registerLoader) {
      return (
        <View
          style={{width: '100%', alignItems: 'center', marginVertical: 18.5}}>
          <Spinner spinnercolor="#fff" />
        </View>
      );
    } else {
      return <Button onPress={this.Register}>REGISTER</Button>;
    }
  };

  render() {
    const {
      checked,
      passwordSecure,
      confirmPasswordSecure,
      nameError,
      emailError,
      passwordError,
      confirmPasswordError,
      modalValue,
      message,
      registerLoader,
    } = this.state;

    return (
      <ImageBackground
        source={require('../Assets/Images/splashWhite.png')}
        style={{height: '100%', width: '100%'}}
        resizeMode="cover">
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          style={{height: '100%', width: '100%'}}
          pointerEvents={registerLoader ? 'none' : 'auto'}>
          <AlertModal
            modalValue={modalValue}
            closeModal={() => this.setState({modalValue: false})}
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
              style={{width: 200, height: 200, resizeMode: 'contain'}}
            />
            <View />
          </View>

          <View
            style={{
              height: '58%',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: FontStyle.bold,
                fontSize: 32,
                color: '#0F0A39',
              }}>
              REGISTER
            </Text>

            <Input
              placeholder="Name"
              onChangeText={(text) =>
                this.setState({name: text, nameError: false})
              }
              secureTextEntry={false}
            />
            {nameError == true ? (
              <HelperText style={styles.helperText} type="error">
                Enter your name
              </HelperText>
            ) : null}
            <Input
              placeholder="Email"
              onChangeText={(text) =>
                this.setState({email: text, emailError: false})
              }
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
              secureTextEntry={passwordSecure}
              iconName="eye-slash"
              iconPress={() => this.setState({passwordSecure: !passwordSecure})}
            />
            {passwordError == true ? (
              <HelperText style={styles.helperText} type="error">
                Enter your password
              </HelperText>
            ) : null}
            <Input
              placeholder="Confirm Password"
              onChangeText={(text) =>
                this.setState({
                  confirmPassword: text,
                  confirmPasswordError: false,
                })
              }
              secureTextEntry={confirmPasswordSecure}
              iconName="eye-slash"
              iconPress={() =>
                this.setState({confirmPasswordSecure: !confirmPasswordSecure})
              }
            />
            {confirmPasswordError == true ? (
              <HelperText style={styles.helperText} type="error">
                Enter your confirm password
              </HelperText>
            ) : null}

            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
                paddingHorizontal: '5%',
              }}
              onPress={() => this.setState({checked: !checked})}>
              <CheckBox
                tintColors={
                  ({true: '#F79535'},
                  {false: Platform.OS == 'ios' ? '#fff' : '#000'})
                }
                style={{
                  height: 25,
                  width: 25,
                }}
                value={Platform.OS == 'ios' ? 'checked' : this.state.checked}
                onCheckColor="#fff"
                boxType="square"
                // hideBox={false}
                onTintColor="#000"
                // onFillColor="#004ACE"
                onValueChange={() => this.setState({checked: !checked})}
              />
              <Text
                style={[
                  styles.normalText,
                  {fontSize: 12, paddingLeft: '3%', color: '#004ACE'},
                ]}>
                Accept terms & conditions
              </Text>
            </View>
          </View>
          {this.renderButton()}
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('LoginStack', {screen: 'Login'})}
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'center',
            }}>
            <Text style={styles.normalText}>Don't have an account? </Text>
            <Text style={[styles.normalText, {color: '#004ACE'}]}>Sign In</Text>
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

export default SignUp;
