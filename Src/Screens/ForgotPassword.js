import React, {Component} from 'react';
import {View, Text, ImageBackground, Image} from 'react-native';
import Input from '../Common/Input';
import FontStyle from '../Assets/Fonts/FontStyle';
import Button from '../Common/Button';

class ForgotPassword extends Component {
  state = {email: ''};
  render() {
    const {email} = this.state;
    return (
      <ImageBackground
        source={require('../Assets/Images/splashWhite.png')}
        style={{height: '100%', width: '100%'}}
        resizeMode="contain">
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
          }}>
          <Text
            style={{
              fontFamily: FontStyle.bold,
              fontSize: 32,
              color: '#0F0A39',
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
      </ImageBackground>
    );
  }
}

export default ForgotPassword;
