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
} from 'react-native';
import Header from '../../Common/Header';
import AlertModal from '../../Common/AlertModal';
import axios from 'axios';
import {baseurl} from '../../Common/Baseurl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Styles from '../../Common/Style';
import FontStyle from '../../Assets/Fonts/FontStyle';
import moment from 'moment';
import Footer from '../../Common/Footer';
const {height, width} = Dimensions.get('screen');

class ChatList extends Component {
  state = {modalValue: false, operatorArray: [], activeUser: []};

  componentDidMount = async () => {
    const token = await AsyncStorage.getItem('token');
    this.setState({token});
    this.chatList(token);
    this.socket(token);
    this.seenChat(token);
  };

  chatList = (token) => {
    axios({
      method: 'get',
      url: `${baseurl}chat/api/all-rooms/`,
      headers: {Authorization: `Token ${token}`},
    })
      .then((response) => {
        console.log(response, 'chat');
        this.setState({operatorArray: response.data, token});
      })
      .catch((err) => {});
  };

  socket = (token) => {
    this.ws = new WebSocket(`ws://digimonk.co:1612/ws/chat/global/${token}/`);

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
    this.chatList(this.state.token);
  };

  render() {
    const {modalValue, message, operatorArray} = this.state;

    return (
      <View style={{backgroundColor: '#fff', height: '100%', width: '100%'}}>
        <SafeAreaView />
        <View style={{height: '86%', backgroundColor: '#fff'}}>
          <Header
            middleText={'Chat List'}
            notification={true}
            notifyPress={() => this.props.navigation.navigate('Notification')}
          />
          <AlertModal
            modalValue={modalValue}
            closeModal={() => this.setState({modalValue: false})}
            message={message}
          />
          {operatorArray.length < 1 ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
              }}
              refreshControl={
                <RefreshControl
                  refreshing={false}
                  onRefresh={this.pageRefresh}
                  tintColor="#004ACE"
                />
              }>
              <Image
                source={require('../../Assets/Images/nochat.png')}
                style={{width: width / 1.1, height: height / 1.6}}
                resizeMode="contain"
              />
              <Text
                style={{
                  fontFamily: FontStyle.regular,
                  fontSize: 23,
                  color: '#575757',
                }}>
                You don't have any chat
              </Text>
            </ScrollView>
          ) : (
            <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={false}
                  onRefresh={this.pageRefresh}
                  tintColor="#004ACE"
                />
              }
              data={operatorArray}
              contentContainerStyle={{width: '100%'}}
              showsVerticalScrollIndicator={false}
              renderItem={({item: operatorData}) => {
                return (
                  <View style={[Styles.smallContainer]}>
                    <TouchableOpacity
                      onPress={() =>
                        this.selectChat(operatorData.id, operatorData.name)
                      }
                      style={{width: '100%'}}>
                      <View
                        style={[
                          styles.normalView,
                          {justifyContent: 'space-between'},
                        ]}>
                        <View style={{flexDirection: 'row'}}>
                          <Image
                            source={require('../../Assets/Images/smalluser.png')}
                            style={styles.imageStyle}
                          />

                          <Text
                            style={{
                              fontFamily: FontStyle.bold,
                              fontSize: 13,
                              color: '#10275A',
                              left: 5,
                            }}>
                            {operatorData.name}
                          </Text>
                        </View>
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
                            }}
                          />
                        ) : null}
                      </View>
                      <View style={styles.normalView}>
                        <Image
                          source={require('../../Assets/Images/smallgroup.png')}
                          style={styles.imageStyle}
                        />

                        {operatorData.beneficiary.map((data) => (
                          <Text style={styles.normalText}>{data.name}, </Text>
                        ))}
                      </View>
                      <View style={styles.normalView}>
                        <Image
                          source={require('../../Assets/Images/smallcalendar.png')}
                          style={styles.imageStyle}
                        />
                        <Text style={styles.normalText}>
                          {moment(operatorData.created_at).format(
                            'MMM,DD YYYY ',
                          )}
                        </Text>
                      </View>
                      <View style={styles.normalView}>
                        <Image
                          source={require('../../Assets/Images/smallcompanion.png')}
                          style={styles.imageStyle}
                        />
                        <Text style={styles.normalText}>
                          {/* {beneficiaryData.companionOperator}
                           */}
                          companionOperator: Operator 1
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          )}
        </View>

        <Footer
          footerValue={'chat'}
          dashboardPress={() => this.props.navigation.navigate('Dashboard')}
          callLogPress={() => this.props.navigation.navigate('CallLogs')}
          settingPress={() => this.props.navigation.navigate('Setting')}
          chatPress={() => this.props.navigation.navigate('ChatList')}
          benificiaryPress={() => this.props.navigation.navigate('Benificiary')}
          unseenValue={0}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  normalView: {flexDirection: 'row', height: 20, alignItems: 'center'},
  normalText: {
    fontFamily: FontStyle.regular,
    color: '#004ACE',
    fontSize: 11,
    left: 5,
  },
  imageStyle: {
    width: 8,
    height: 11,
    resizeMode: 'contain',
  },
});

export default ChatList;
