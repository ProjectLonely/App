import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Input from '../Common/Input';
import FontStyle from '../Assets/Fonts/FontStyle';
import Button from '../Common/Button';

class SignIn extends Component {
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
            height: '65%',
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
            onChangeText={(text) => this.setState({email: text})}
            secureTextEntry={false}
          />
          <Input
            placeholder="Password"
            onChangeText={(text) => this.setState({password: text})}
            secureTextEntry={true}
            iconName="eye-slash"
          />
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('ForgotPassword')}
            style={{
              width: '100%',
              alignItems: 'flex-end',
              paddingHorizontal: '5%',
            }}>
            <Text style={[styles.normalText, {fontSize: 12}]}>
              Forgot Password ?
            </Text>
          </TouchableOpacity>
          <Button onPress={() => this.props.navigation.navigate('Dashboard')}>
            {' '}
            SIGNIN{' '}
          </Button>
        </View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('SignUp')}
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'center',
          }}>
          <Text style={styles.normalText}>Don't have an account? </Text>
          <Text style={[styles.normalText, {color: '#004ACE'}]}>Sign Up</Text>
        </TouchableOpacity>
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
});

export default SignIn;
