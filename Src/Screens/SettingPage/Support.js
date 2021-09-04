import React, {Component} from 'react';
import {View, Text, SafeAreaView, Image, TextInput} from 'react-native';
import FontStyle from '../../Assets/Fonts/FontStyle';
import Header from '../../Common/Header';
import Button from '../../Common/Button';
import ThanksModal from '../../Common/ThanksModal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
class Support extends Component {
  state = {thanksValue: false};
  closeModal = () => {
    this.setState({thanksValue: false});
    this.props.navigation.navigate('Setting');
  };
  render() {
    const {thanksValue} = this.state;
    return (
      <View style={{backgroundColor: '#fff', height: '100%', width: '100%'}}>
        <SafeAreaView />
        <Header
          leftIcon={true}
          middleText={'Support'}
          notification={true}
          notifyPress={() => this.props.navigation.navigate('Notification')}
        />
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          style={{height: '100%', width: '100%'}}>
          <ThanksModal thanksValue={thanksValue} closeModal={this.closeModal} />

          <View
            style={{
              height: '80%',
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
              For any help or Query you may contact us support@digimonk.in or
              Call 1800-XXX-XXXX
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
                Send Your Query-
              </Text>
              <TextInput
                placeholder="Query"
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
              />
            </View>
          </View>

          <Button onPress={() => this.setState({thanksValue: true})}>
            Submit
          </Button>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default Support;
