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

class VerificationCode extends Component {
  state = {timer: 5};
  componentDidMount = () => {
    this.timer();
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
    const {timer} = this.state;
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
            Verification Code
          </Text>

          <Input
            placeholder="Verification Code"
            onChangeText={(text) => this.setState({otp: text})}
            secureTextEntry={false}
          />
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('ForgotPassword')}
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
        <Button> VERIFY </Button>
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
