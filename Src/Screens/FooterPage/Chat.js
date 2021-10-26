import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import moment from 'moment';
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
  KeyboardAvoidingView,
  Dimensions,
  Keyboard,
  RefreshControl,
} from 'react-native';

import FontStyle from '../../Assets/Fonts/FontStyle';
import {baseurl} from '../../Common/Baseurl';
import Header from '../../Common/Header';
const {height, width} = Dimensions.get('window');

class Chat extends Component {
  state = {
    message: '',
    isShowKeyboard: false,
    chatData: [],
    lastChatTime: '',
    rohit: true,
    currentDate: moment(),
  };
  _keyboardDidShow = () => {
    this.setState({isShowKeyboard: true});
  };
  _keyboardDidHide = () => {
    this.setState({isShowKeyboard: false});
  };

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  componentDidMount = async () => {
    const {operatorId, operatorName} = this.props.route.params;
    const token = await AsyncStorage.getItem('token');
    this.setState({token, operatorId, operatorName});
    this.roomCreation(operatorId);
    this.chatHistory(token);
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
  };

  roomCreation = (operatorId) => {
    axios({
      method: 'post',
      url: `${baseurl}chat/api/room/${operatorId}/`,
      headers: {Authorization: `Token ${this.state.token}`},
    })
      .then(async (response) => {
        const roomId = await response.data.room_id;
        this.setState({roomId: roomId});
        this.socket(roomId);
      })
      .catch((err) => {});
  };

  chatHistory = () => {
    axios({
      method: 'get',
      url: `${baseurl}chat/api/room/${this.state.operatorId}/`,
      headers: {Authorization: `Token ${this.state.token}`},
    })
      .then(async (response) => {
        this.setState({
          chatData: response.data.chats,
          lastChatTime: response.data.chats[0].created_at,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  socket = (roomId) => {
    this.ws = new WebSocket(
      `ws://digimonk.co:1617/ws/chat/${roomId}/${this.state.token}/`,
    );

    this.ws.onopen = (open) => {
      console.log(open, 'asdfasfasdf');
    };
    this.ws.onmessage = (res) => {
      console.log(res, 'onmessage');
      const chatHistory = this.state.chatData;
      chatHistory.push({
        chat: JSON.parse(res.data).message,
        user_id: JSON.parse(res.data).user,
      });
      this.setState({chatData: chatHistory});
    };
  };

  sendMessage = () => {
    if (this.state.message == '') {
    } else {
      this.ws.send(JSON.stringify({message: this.state.message}));
      this.setState({message: ''});
    }
  };

  onContentOffsetChanged = () => {
    this.setState({rohit: false});
    axios({
      method: 'get',
      url: `${baseurl}chat/api/room/${this.state.operatorId}/?last_chat=${this.state.lastChatTime}`,
      headers: {Authorization: `Token ${this.state.token}`},
    })
      .then(async (response) => {
        const chatHistory = this.state.chatData;
        if (response.data.chats.length > 0) {
          const reverseData = response.data.chats.reverse();
          reverseData.map((data) => chatHistory.splice(0, 0, data));
          this.setState({
            lastChatTime: response.data.chats.pop().created_at,
            chatData: chatHistory,
          });
        }
      })
      .catch((err) => {});
  };

  render() {
    const {chatData, operatorId, isShowKeyboard, operatorName, currentDate} =
      this.state;

    return (
      <View
        style={{
          height: height,
          width: '100%',
        }}>
        <Header
          leftIcon={true}
          middleText={operatorName}
          notification={true}
          notifyPress={() => this.props.navigation.navigate('Notification')}
        />
        <KeyboardAvoidingView behavior="padding">
          <View
            style={{
              height: isShowKeyboard ? height / 2.2 : height / 1.2,
            }}>
            <FlatList
              data={chatData}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={[
                isShowKeyboard ? {paddingBottom: '20%'} : null,
              ]}
              ref={(ref) => (this.flatList = ref)}
              refreshControl={
                <RefreshControl
                  tintColor="#004ACE"
                  refreshing={false}
                  onRefresh={this.onContentOffsetChanged}
                />
              }
              onContentSizeChange={() =>
                this.state.rohit
                  ? this.flatList.scrollToEnd({animated: true})
                  : null
              }
              renderItem={({item: chat}) => {
                var chatDate = moment(chat.created_at).format('DD-MM-YYYY');
                var chatTime = moment(chatDate, 'DD-MM-YYYY HH:mm:ss');
                var currentTime = moment(currentDate, 'DD-MM-YYYY HH:mm:ss');
                var timeDifference = moment
                  .duration(currentTime.diff(chatTime))
                  .asDays();

                return (
                  <View
                    style={[
                      styles.messageView,
                      chat.user_id == operatorId
                        ? {
                            alignSelf: 'flex-start',
                            backgroundColor: '#808080',
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
                        fontFamily: FontStyle.bold,
                        fontSize: 12,
                        color: chat.user_id == operatorId ? '#FFF' : '#FFFFFF',
                      }}>
                      {chat.chat}
                    </Text>

                    {timeDifference > 1 ? (
                      <Text
                        style={{
                          fontFamily: FontStyle.regular,
                          color:
                            chat.user_id == operatorId ? '#FFF' : '#FFFFFF',
                          alignSelf: 'flex-end',
                        }}>
                        {moment(chat.created_at).format('DD MMM YYYY')}
                      </Text>
                    ) : null}
                    <Text
                      style={{
                        fontFamily: FontStyle.regular,
                        color: chat.user_id == operatorId ? '#FFF' : '#FFFFFF',
                        alignSelf: 'flex-end',
                      }}>
                      {moment(chat.created_at).format('hh:mm a')}
                    </Text>
                  </View>
                );
              }}
            />
            <View
              style={{
                minHeight: 60,
                maxHeight: 120,
                marginBottom: 20,
                paddingVertical: '1%',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  minHeight: 60,
                  maxHeight: 120,
                  paddingVertical: '1%',
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
                  style={{width: '90%', fontFamily: FontStyle.regular}}
                  placeholder="Type a message"
                  onChangeText={(text) => this.setState({message: text})}
                  value={this.state.message}
                />
                <TouchableOpacity
                  style={{
                    height: 50,
                    width: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => this.sendMessage()}>
                  <Image
                    source={require('../../Assets/Images/sendicon.png')}
                    style={{height: 20, width: 20, resizeMode: 'contain'}}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  messageView: {
    minWidth: '60%',
    maxWidth: '90%',
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
