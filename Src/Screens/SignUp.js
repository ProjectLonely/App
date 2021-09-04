import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
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
  };

  Register = () => {
    const {name, email, password, confirmPassword, checked} = this.state;
    if (name == '') {
      this.setState({nameError: true});
    } else if (email == '') {
      this.setState({emailError: true});
    } else if (password == '') {
      this.setState({passwordError: true});
    } else if (confirmPassword == '') {
      this.setState({confirmPasswordError: true});
    } else if (checked == false) {
      alert('accept terms & condition');
    } else {
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
          if (response.data.exist == true) {
            alert('already exist');
          } else {
            AsyncStorage.setItem('temp_token', response.data.temp_token);
            this.props.navigation.navigate('VerificationCode');
          }
        })
        .catch((err) => {
          console.log(err.response, 'aer');
        });
    }
  };

  render() {
    const {
      checked,
      passwordSecure,
      confirmPasswordSecure,
      name,
      email,
      password,
      confirmPassword,
      nameError,
      emailError,
      passwordError,
      confirmPasswordError,
    } = this.state;

    return (
      <ImageBackground
        source={require('../Assets/Images/splashWhite.png')}
        style={{height: '100%', width: '100%'}}
        resizeMode="cover">
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          style={{height: '100%', width: '100%'}}>
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
                tintColors={({true: '#F79535'}, {false: '#FFF'})}
                value={'checked'}
                onCheckColor="#fff"
                boxType="square"
                style={{
                  height: 20,
                  width: 20,
                }}
                onFillColor="#004ACE"
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
          <Button onPress={this.Register}>REGISTER</Button>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('SignIn')}
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
