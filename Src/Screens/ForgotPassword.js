import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Input from '../Common/Input';
import FontStyle from '../Assets/Fonts/FontStyle';
import Button from '../Common/Button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

class ForgotPassword extends Component {
  state = {email: ''};
  render() {
    const {email} = this.state;
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
              onChangeText={(text) => this.setState({email: text})}
              secureTextEntry={false}
            />
          </View>
          <Button
            onPress={() => this.props.navigation.navigate('VerificationCode')}>
            SEND
          </Button>
        </KeyboardAwareScrollView>
      </ImageBackground>
    );
  }
}

export default ForgotPassword;
