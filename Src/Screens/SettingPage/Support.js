import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';
import FontStyle from '../../Assets/Fonts/FontStyle';
import Header from '../../Common/Header';
import Button from '../../Common/Button';
import ThanksModal from '../../Common/ThanksModal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import {baseurl} from '../../Common/Baseurl';
import Spinner from '../../Common/Spinner';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {height} = Dimensions.get('screen');
class Support extends Component {
  state = {thanksValue: false, submitLoader: false, email: ''};
  closeModal = () => {
    this.setState({thanksValue: false});
    this.props.navigation.navigate('Setting');
  };

  componentDidMount = async () => {
    this.setState({
      email: await AsyncStorage.getItem('email'),
      token: await AsyncStorage.getItem('token'),
    });
  };

  submitButton = () => {
    const {token, query} = this.state;
    this.setState({submitLoader: true});
    axios({
      method: 'post',
      url: `${baseurl}query/`,
      headers: {Authorization: `Token ${token}`},
      data: {
        query: query,
      },
    })
      .then((response) => {
        this.setState({submitLoader: false});
        if (response.status == 201) {
          this.setState({thanksValue: true});
        }
      })
      .catch((err) => {
        this.setState({submitLoader: false});
      });
  };

  renderButton = () => {
    if (this.state.submitLoader) {
      return (
        <View style={{width: '100%', alignItems: 'center'}}>
          <Spinner spinnercolor="#fff" marginTop={20} />
        </View>
      );
    } else {
      return <Button onPress={this.submitButton}>Submit</Button>;
    }
  };

  render() {
    const {thanksValue, email, submitLoader} = this.state;
    return (
      <View
        style={{backgroundColor: '#fff', height: '100%', width: '100%'}}
        pointerEvents={submitLoader ? 'none' : 'auto'}>
        {/* <SafeAreaView /> */}
        <Header
          leftIcon={true}
          middleText={'Support'}
          notification={true}
          notifyPress={() => this.props.navigation.navigate('Notification')}
        />
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          style={{height: '100%', width: '100%', marginVertical: '5%'}}>
          <ThanksModal
            email={email}
            thanksValue={thanksValue}
            closeModal={this.closeModal}
          />

          <View
            style={{
              height: height / 1.8,
              backgroundColor: '#D5FAFB',
              width: '90%',
              alignSelf: 'center',
              borderRadius: 10,
              alignItems: 'center',
              paddingVertical: '5%',
            }}>
            <Image
              source={require('../../Assets/Images/support.png')}
              style={{width: 45, height: 45}}
            />
            <Text
              style={{
                fontSize: 15,
                fontFamily: FontStyle.regular,
                color: '#3A3A3A',
                textAlign: 'center',
              }}>
              Have a question, suggestion, or an issue that needs resolving?
              Leave a message here and a team member will respond via email as
              soon as possible.
            </Text>
            <View
              style={{
                width: '100%',
                marginTop: '10%',
                alignItems: 'flex-start',
                paddingHorizontal: '5%',
              }}>
              <Text
                style={{
                  fontSize: 17,
                  fontFamily: FontStyle.bold,
                  color: '#004ACE',
                  textAlign: 'center',
                }}>
                Your message:
              </Text>
              <TextInput
                placeholder="Type a message"
                maxLength={300}
                placeholderTextColor="#707070"
                style={{
                  marginTop: '5%',
                  width: '100%',
                  minHeight: 150,
                  borderWidth: 1,
                  borderColor: '#004ACE',
                  borderRadius: 10,
                  padding: '5%',
                  backgroundColor: '#fff',
                }}
                multiline={true}
                textAlignVertical="top"
                onChangeText={(text) => this.setState({query: text})}
              />
            </View>
          </View>

          {this.renderButton()}
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default Support;
