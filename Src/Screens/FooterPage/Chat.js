import {after} from 'lodash';
import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FontStyle from '../../Assets/Fonts/FontStyle';
import Header from '../../Common/Header';

class Chat extends Component {
  state = {
    chatData: [
      {
        id: '0',
        message:
          'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed.',
        operator: true,
      },
      {
        id: '1',
        message:
          'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed.',
        operator: false,
      },
      {
        id: '2',
        message:
          'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed.',
        operator: true,
      },
      {
        id: '3',
        message:
          'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed.',
        operator: false,
      },
    ],
  };
  render() {
    const {chatData} = this.state;
    return (
      <View style={{backgroundColor: '#fff', height: '100%', width: '100%'}}>
        <SafeAreaView />
        <Header
          leftIcon={true}
          middleText={'Messages'}
          notification={true}
          notifyPress={() => this.props.navigation.navigate('Notification')}
        />
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          extraScrollHeight={100}
          contentContainerStyle={{height: '98%'}}>
          <FlatList
            data={chatData}
            showsVerticalScrollIndicator={false}
            renderItem={({item: chat}) => {
              return (
                <View
                  style={[
                    styles.messageView,
                    chat.operator
                      ? {
                          alignSelf: 'flex-start',
                          backgroundColor: '#EAECF2',
                          borderBottomRightRadius: 10,
                          borderBottomLeftRadius: 0,
                        }
                      : {
                          alignSelf: 'flex-end',
                          backgroundColor: '#004ACE',
                          borderBottomRightRadius: 0,
                          borderBottomLeftRadius: 10,
                        },
                  ]}>
                  <Text
                    style={{
                      fontFamily: FontStyle.regular,
                      fontSize: 12,
                      color: chat.operator ? '#63697B' : '#FFFFFF',
                    }}>
                    {chat.message}
                  </Text>
                </View>
              );
            }}
          />

          <View style={{height: '10%'}}>
            <View
              style={{
                flexDirection: 'row',
                height: '80%',
                width: '90%',
                alignItems: 'center',
                justifyContent: 'space-between',
                alignSelf: 'center',
                backgroundColor: '#F4F7FF',
                borderRadius: 20,
                paddingHorizontal: '5%',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.27,
                shadowRadius: 2.65,

                elevation: 2,
              }}>
              <TextInput
                multiline={true}
                style={{width: '90%'}}
                placeholder="Type a message"
              />
              <Image
                source={require('../../Assets/Images/sendicon.png')}
                style={{height: 17, width: 17, resizeMode: 'contain'}}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  messageView: {
    minWidth: '60%',
    maxWidth: '80%',
    minHeight: 50,
    maxHeight: 'auto',
    marginVertical: '5%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    position: 'relative',
    padding: '5%',
    marginHorizontal: '5%',
  },
});

export default Chat;
