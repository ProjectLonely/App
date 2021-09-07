import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Input from '../Common/Input';
import FontStyle from '../Assets/Fonts/FontStyle';
import Button from '../Common/Button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import {baseurl} from '../Common/Baseurl';
import Spinner from '../Common/Spinner';
import {HelperText} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AlertModal from '../Common/AlertModal';

class ForgotPassword extends Component {
  state = {email: '', token: '', sendLoader: false, emailError: false};

  send = () => {
    if (this.state.email == '') {
      this.setState({emailError: true});
    } else {
      this.setState({sendLoader: true});
      axios({
        method: 'post',
        url: `${baseurl}password-forgot/`,
        data: {
          email: this.state.email,
        },
      })
        .then(async (response) => {
          this.setState({sendLoader: false});
          await AsyncStorage.setItem('temp_token', response.data.token);
          this.props.navigation.navigate('VerificationCode');
        })
        .catch((err) => {
          this.setState({sendLoader: false});
          alert('Enter a valid email address');
          this.setState({
            modalValue: true,
            message: 'Enter a valid email address',
          });
        });
    }
  };

  renderButton = () => {
    if (this.state.sendLoader) {
      return (
        <View style={{width: '100%', alignItems: 'center'}}>
          <Spinner spinnercolor="#fff" marginTop={17.5} />
        </View>
      );
    } else {
      return <Button onPress={this.send}>SEND</Button>;
    }
  };

  render() {
    const {email, emailError, message, modalValue} = this.state;
    return (
      <ImageBackground
        source={require('../Assets/Images/splashWhite.png')}
        style={{height: '100%', width: '100%'}}
        resizeMode="cover">
        {/* <SafeAreaView /> */}
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{height: '100%', width: '100%'}}>
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
              flexDirection: 'row',
              justifyContent: 'space-between',
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
              height: '30%',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: FontStyle.bold,
                fontSize: 32,
                color: '#0F0A39',
                marginVertical: '10%',
              }}>
              Forgot Password ?
            </Text>

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
          </View>
          {this.renderButton()}
        </KeyboardAwareScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  helperText: {
    fontFamily: FontStyle.regular,
    alignSelf: 'flex-start',
    paddingLeft: '6%',
    top: -10,
  },
});

export default ForgotPassword;
