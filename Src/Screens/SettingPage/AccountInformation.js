import React, {Component} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import Header from '../../Common/Header';
import Input from '../../Common/Input';
import FontStyle from '../../Assets/Fonts/FontStyle';
import Button from '../../Common/Button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import {baseurl} from '../../Common/Baseurl';
import AsyncStorage from '@react-native-async-storage/async-storage';

class AccountInformation extends Component {
  state = {token: '', password: '', confirmPassword: ''};

  componentDidMount = async () => {
    this.setState({token: await AsyncStorage.getItem('token')});
    this.getProfileData();
  };

  getProfileData = () => {
    axios({
      method: 'get',
      url: `${baseurl}profile/`,
      headers: {Authorization: `Token ${this.state.token}`},
    })
      .then((response) => {
        this.setState({
          firstName: response.data.first_name,
          email: response.data.email,
        });
        AsyncStorage.setItem('email', response.data.email);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  updateProfileData = () => {
    console.log({
      first_name: this.state.firstName,
      password: this.state.password,
      password1: this.state.confirmPassword,
    });
    axios({
      method: 'post',
      url: `${baseurl}profile/`,
      headers: {Authorization: `Token ${this.state.token}`},
      data: {
        first_name: this.state.firstName,
        password: this.state.password,
        password1: this.state.confirmPassword,
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  render() {
    const {password, confirmPassword} = this.state;
    return (
      <View style={{backgroundColor: '#fff', height: '100%', width: '100%'}}>
        <SafeAreaView />
        <Header
          leftIcon={true}
          middleText={'Account Information'}
          notification={true}
          notifyPress={() => this.props.navigation.navigate('Notification')}
        />
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          style={{height: '100%', width: '100%'}}>
          <View
            style={{
              alignItems: 'center',
              width: '100%',
            }}>
            <Text style={styles.headingText}>Edit Profile</Text>
            <Input
              placeholder="Name"
              onChangeText={(text) => this.setState({firstName: text})}
              secureTextEntry={false}
              value={this.state.firstName}
            />
            <Input
              placeholder="Email"
              onChangeText={(text) => this.setState({email: text})}
              secureTextEntry={false}
              value={this.state.email}
              editable={false}
            />
          </View>
          <View
            style={{
              alignItems: 'center',
              width: '100%',
            }}>
            <Text style={styles.headingText}>Change Password</Text>
            <Input
              placeholder="Password"
              onChangeText={(text) => this.setState({password: text})}
              secureTextEntry={true}
            />
            <Input
              placeholder="Confirm Password"
              onChangeText={(text) => this.setState({confirmPassword: text})}
              secureTextEntry={true}
            />
          </View>
          <View style={{paddingTop: '20%'}}>
            <Button onPress={this.updateProfileData}>UPDATE</Button>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headingText: {
    fontFamily: FontStyle.bold,
    fontSize: 20,
    color: '#12175E',
    alignSelf: 'flex-start',
    paddingHorizontal: '5%',
    marginVertical: '5%',
  },
});

export default AccountInformation;
