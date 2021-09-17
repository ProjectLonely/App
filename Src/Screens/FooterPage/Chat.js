import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
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
  TouchableOpacity,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FontStyle from '../../Assets/Fonts/FontStyle';
import {baseurl} from '../../Common/Baseurl';
import Header from '../../Common/Header';
import WS from 'react-native-websocket';

class Chat extends Component {
  state = {
    message: '',
    chatData: [
      // {
      //   id: '0',
      //   message:
      //     'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed.',
      //   operator: true,
      // },
      // {
      //   id: '1',
      //   message:
      //     'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed.',
      //   operator: false,
      // },
      // {
      //   id: '2',
      //   message:
      //     'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed.',
      //   operator: true,
      // },
      // {
      //   id: '3',
      //   message:
      //     'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed.',
      //   operator: false,
      // },
    ],
  };

  componentDidMount = async () => {
    const {operatorId, operatorName} = this.props.route.params;
    const token = await AsyncStorage.getItem('token');
    this.setState({token, operatorId});

    axios({
      method: 'get',
      url: `${baseurl}chat/api/room/${operatorId}/`,
      headers: {Authorization: `Token ${token}`},
    })
      .then((response) => {
        const roomId = response.data.room_id;
        this.socket(roomId);
        this.setState({roomId, chatData: response.data.chats});
      })
      .catch((err) => {
        console.log(err);
      });
  };

  socket = (roomId) => {
    console.log(`ws://digimonk.co:1612/ws/chat/${'44'}/${this.state.token}/`);
    this.ws = new WebSocket(
      `ws://digimonk.co:1612/ws/chat/${'44'}/${this.state.token}/`,
    );
    console.log(this.ws, 'ws');

    this.ws.onopen = (open) => {
      console.log(open, 'open');
    };
    this.ws.onmessage = (res) => {
      console.log(res.data, 'reesdf');
      const chatHistory = this.state.chatData;
      chatHistory.push({user_id: res.data.user, chat: res.data.message});
      this.setState({chatData: chatHistory});
    };
  };

  sendMessage = () => {
    this.ws.send(JSON.stringify({message: this.state.message}));
    const chatHistory = this.state.chatData;
    chatHistory.push({user_id: '7', chat: this.state.message});
    this.setState({chatData: chatHistory});
  };

  render() {
    const {chatData, operatorId} = this.state;
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
                    chat.user_id == operatorId
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
                      color: chat.user_id == operatorId ? '#63697B' : '#FFFFFF',
                    }}>
                    {chat.chat}
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
                onChangeText={(text) => this.setState({message: text})}
              />
              <TouchableOpacity onPress={() => this.sendMessage()}>
                <Image
                  source={require('../../Assets/Images/sendicon.png')}
                  style={{height: 17, width: 17, resizeMode: 'contain'}}
                />
              </TouchableOpacity>
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
