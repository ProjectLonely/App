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
import {Checkbox} from 'react-native-paper';

class SignUp extends Component {
  state = {checked: 'checked'};
  render() {
    const {checked} = this.state;
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
            onChangeText={(text) => this.setState({name: text})}
            secureTextEntry={false}
          />
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
          <Input
            placeholder="Confirm Password"
            onChangeText={(text) => this.setState({confirmPassword: text})}
            secureTextEntry={true}
            iconName="eye-slash"
          />

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              width: '100%',
              alignItems: 'center',
              paddingHorizontal: '3%',
              // backgroundColor: 'orange',
            }}
            onPress={() => this.setState({checked: !checked})}>
            <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => {
                this.setState({checked: !checked});
              }}
              uncheckedColor="black"
              color="#004ACE"
            />
            <Text style={[styles.normalText, {fontSize: 12, color: '#004ACE'}]}>
              Accept terms & conditions
            </Text>
          </TouchableOpacity>
        </View>
        <Button onPress={() => this.props.navigation.navigate('HowAppWorks')}>
          REGISTER
        </Button>
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

export default SignUp;
