import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  RefreshControl,
  Dimensions,
  Platform,
} from 'react-native';
import Header from '../../Common/Header';
import AlertModal from '../../Common/AlertModal';
import axios from 'axios';
import {baseurl} from '../../Common/Baseurl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontStyle from '../../Assets/Fonts/FontStyle';
import moment from 'moment';
import LoadingView from '../../Common/LoadingView';
const {height, width} = Dimensions.get('screen');

class Inbox extends Component {
  state = {
    modalValue: false,
    operatorArray: [],
    activeUser: [],
    pageLoading: true,
  };

  componentDidMount = async () => {
    const token = await AsyncStorage.getItem('token');
    this.setState({token});
    this.inbox(token);
    this.socket(token);
    this.seenChat(token);
  };

  inbox = (token) => {
    axios({
      method: 'get',
      url: `${baseurl}chat/api/all-rooms/`,
      headers: {Authorization: `Token ${token}`},
    })
      .then((response) => {
        console.log(response, 'alsdjflasdf');
        this.setState({
          operatorArray: response.data,
          token,
          pageLoading: false,
        });
      })
      .catch((err) => {
        this.setState({pageLoading: false});
      });
  };

  socket = (token) => {
    // this.ws = new WebSocket(`ws://digimonk.co:1617/ws/chat/global/${token}/`);
    this.ws = new WebSocket(
      `ws://backend.joincheerio.com/ws/chat/global/${token}/`,
    );
    this.ws.onmessage = (res) => {
      const activeUser = JSON.parse(res.data).active_users;
      this.setState({activeUser});
    };
  };

  componentWillUnmount = () => {
    this.ws.close();
  };

  selectChat = (operatorId, operatorName) => {
    this.props.navigation.navigate('Chat', {operatorId, operatorName});
  };

  seenChat = (token) => {
    axios({
      method: 'post',
      url: `${baseurl}api/notification/set-inactive/?type=chat`,
      headers: {Authorization: `Token ${token}`},
    }).then((response) => {});
  };

  pageRefresh = () => {
    this.inbox(this.state.token);
  };

  render() {
    const {modalValue, message, operatorArray, pageLoading} = this.state;
    return (
      <View style={{backgroundColor: '#fff', height: '100%', width: '100%'}}>
        <View
          style={{
            height: Platform.OS == 'android' ? height / 1.2 : height / 1.09,
            backgroundColor: '#fff',
          }}>
          <Header
            middleText={'Inbox'}
            notification={true}
            notifyPress={() => this.props.navigation.navigate('Notification')}
          />
          <AlertModal
            modalValue={modalValue}
            closeModal={() => this.setState({modalValue: false})}
            message={message}
          />
          {pageLoading ? (
            <LoadingView heightValue={1.2} />
          ) : operatorArray.length < 1 ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                padding: 15,
              }}
              refreshControl={
                <RefreshControl
                  refreshing={false}
                  onRefresh={this.pageRefresh}
                  tintColor="#004ACE"
                />
              }>
             
              <Text
                style={{
                  fontFamily: FontStyle.regular,
                  fontSize: 23,
                  color: '#575757',
                  textAlign: 'center',
                }}>
                You have no messages at this time. When you recive a message,
                this is where it will appear.
              </Text>
            </ScrollView>
          ) : (
            <View style={{width: '100%'}}>
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={false}
                    onRefresh={this.pageRefresh}
                    tintColor="#004ACE"
                  />
                }
                style={{paddingVertical: '2%'}}
                data={operatorArray}
                contentContainerStyle={{width: '100%'}}
                showsVerticalScrollIndicator={false}
                renderItem={({item: operatorData}) => {
                  return (
                    <View style={{width: '100%'}}>
                      <View style={[styles.smallContainer]}>
                        <TouchableOpacity
                          onPress={() =>
                            this.selectChat(operatorData.id, operatorData.name)
                          }
                          style={{
                            width: '100%',
                            flexDirection: 'row',
                          }}>
                          <View style={{width: '20%', backgroundColor: '#fff'}}>
                            {operatorData.image == null ? (
                              <Image
                                source={require('../../Assets/Images/group.png')}
                                style={{
                                  height: 70,
                                  width: 70,
                                  resizeMode: 'contain',
                                }}
                              />
                            ) : (
                              <Image
                                source={{
                                  uri: `http://backend.joincheerio.com/${operatorData.image}`,
                                }}
                                style={{
                                  height: 70,
                                  width: 70,
                                  resizeMode: 'cover',
                                  borderRadius: 70 / 2,
                                }}
                              />
                            )}
                          </View>
                          <View
                            style={{
                              width: '75%',
                              paddingLeft: 7,
                            }}>
                            {this.state.activeUser.some(
                              (data) => data == operatorData.id,
                            ) ? (
                              <View
                                style={{
                                  width: 10,
                                  height: 10,
                                  borderRadius: 5,
                                  backgroundColor: 'green',
                                  alignSelf: 'flex-end',
                                  left: '5%',
                                }}
                              />
                            ) : null}
                            <View style={[styles.normalView]}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',

                                  width: '75%',
                                }}>
                                <Text
                                  style={{
                                    fontFamily: FontStyle.bold,
                                    fontSize: 16,
                                    color: '#10275A',
                                    left: 5,
                                  }}>
                                  {operatorData.name != ''
                                    ? operatorData.name
                                    : 'Deleted User'}
                                </Text>
                              </View>

                              <Text
                                ellipsizeMode="tail"
                                numberOfLines={1}
                                style={styles.normalText}>
                                {moment(
                                  operatorData.last_chat_created_at,
                                ).format('MMM,DD YYYY ')}
                              </Text>
                            </View>

                            <View
                              style={[
                                styles.normalView,
                                {
                                  height: '60%',
                                  alignItems: 'flex-start',
                                },
                              ]}>
                              <Text
                                ellipsizeMode="tail"
                                numberOfLines={2}
                                style={[styles.normalText, {width: '80%'}]}>
                                {operatorData.last_chat_message}
                              </Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          width: '76%',
                          height: 1,
                          backgroundColor: 'lightgrey',
                          alignSelf: 'flex-end',
                        }}
                      />
                    </View>
                  );
                }}
              />
            </View>
          )}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  normalView: {flexDirection: 'row', height: 20, alignItems: 'center'},
  normalText: {
    fontFamily: FontStyle.regular,
    color: '#004ACE',
    fontSize: 14,
    left: 5,
  },
  imageStyle: {
    width: 8,
    height: 11,
    resizeMode: 'contain',
  },
  smallContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 70,
    width: '90%',
    backgroundColor: '#fff',
    marginVertical: '2%',
    padding: '2%',
    alignSelf: 'center',
  },
});

export default Inbox;
