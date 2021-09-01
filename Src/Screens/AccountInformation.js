import React, {Component} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import Header from '../Common/Header';
import Input from '../Common/Input';
import FontStyle from '../Assets/Fonts/FontStyle';
import Button from '../Common/Button';

class AccountInformation extends Component {
  render() {
    return (
      <View style={{backgroundColor: '#fff', height: '100%', width: '100%'}}>
        <SafeAreaView />
        <Header
          leftIcon={true}
          middleText={'Account Information'}
          notification={true}
        />
        <View
          style={{
            alignItems: 'center',
            width: '100%',
          }}>
          <Text style={styles.headingText}>Edit Profile</Text>
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
        </View>
        <View
          style={{
            alignItems: 'center',
            width: '100%',
          }}>
          <Text style={styles.headingText}>Change Password</Text>
          <Input
            placeholder="Password"
            onChangeText={(text) => this.setState({name: text})}
            secureTextEntry={true}
          />
          <Input
            placeholder="Confirm Password"
            onChangeText={(text) => this.setState({email: text})}
            secureTextEntry={true}
          />
        </View>
        <View style={{paddingTop: '20%'}}>
          <Button>UPDATE</Button>
        </View>
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
