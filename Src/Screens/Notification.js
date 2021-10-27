import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
} from 'react-native';
import FontStyle from '../Assets/Fonts/FontStyle';
import {baseurl} from '../Common/Baseurl';
import Header from '../Common/Header';
import Styles from '../Common/Style';
import {unseenNotification} from '../store/actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {SwipeListView} from 'react-native-swipe-list-view';
import Footer from '../Common/Footer';
import LoadingView from '../Common/LoadingView';
const {height, width} = Dimensions.get('screen');

class Notification extends Component {
  state = {
    notificationArray: [],
    loadingValue: true,
  };

  componentDidMount = async () => {
    const token = await AsyncStorage.getItem('token');
    this.setState({token});
    this.getNotification();
  };

  getNotification = () => {
    axios({
      method: 'get',
      url: `${baseurl}api/notification/`,
      headers: {Authorization: `Token ${this.state.token}`},
    })
      .then((response) => {
        this.setState({
          notificationArray: response.data.results,
          loadingValue: false,
        });
        this.seenNotification(token);
        this.props.unseenNotification(token);
      })
      .catch((err) => {
        this.setState({loadingValue: false});
      });
  };

  seenNotification = (token) => {
    axios({
      method: 'post',
      url: `${baseurl}api/notification/set-inactive/`,
      headers: {Authorization: `Token ${token}`},
    }).then((response) => {});
  };

  deleteNotification = (deleteId, token) => {
    axios({
      method: 'delete',
      headers: {Authorization: `Token ${token}`},
      url: `${baseurl}api/notification/${deleteId}/`,
    }).then((response) => {
      this.getNotification();
    });
  };

  pageRefresh = () => {
    this.getNotification;
  };

  render() {
    const {notificationArray, loadingValue} = this.state;

    return (
      <View style={{backgroundColor: '#fff', height: '100%', width: '100%'}}>
        <View style={{height: height / 1.09}}>
          <Header
            leftIcon={true}
            middleText={'Notifications'}
            notification={true}
          />
          {loadingValue ? (
            <LoadingView heightValue={1.2} />
          ) : notificationArray.length < 1 ? (
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
                source={require('../Assets/Images/Notifications.png')}
                style={{
                  width: width / 1.1,
                  height: height / 1.6,
                }}
                resizeMode="contain"
              />
              <Text
                style={{
                  fontFamily: FontStyle.regular,
                  fontSize: 23,
                  color: '#575757',
                  textAlign: 'center',
                }}>
                You have no notifications at this moment. When you recive an
                alert, this is where it will appear.
              </Text>
            </ScrollView>
          ) : (
            <SwipeListView
              refreshControl={
                <RefreshControl
                  refreshing={false}
                  onRefresh={this.pageRefresh}
                  tintColor="#004ACE"
                />
              }
              data={notificationArray}
              renderItem={(notifyData, rowMap) => (
                <View style={[Styles.smallContainer]}>
                  <View>
                    <Text
                      style={{
                        fontFamily: FontStyle.medium,
                        fontSize: 14,
                        color: '#333333',
                      }}>
                      {notifyData.item.notification
                        ? notifyData.item.notification.chat
                        : null}
                    </Text>
                    <Text
                      style={{
                        fontFamily: FontStyle.regular,
                        fontSize: 14,
                        color: '#777777',
                      }}>
                      {notifyData.item.notification
                        ? notifyData.item.notification.name
                        : null}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontFamily: FontStyle.medium,
                      fontSize: 12,
                      color: '#777777',
                    }}>
                    {notifyData.item.notification ? notifyData.item.time : null}
                    07:30
                  </Text>
                </View>
              )}
              renderHiddenItem={(data, rowMap) => (
                <TouchableOpacity
                  onPress={() =>
                    this.deleteNotification(data.item.pk, this.state.token)
                  }
                  style={styles.rowBack}>
                  <Image
                    source={require('../Assets/Images/delete.png')}
                    style={{height: 50, width: 50, resizeMode: 'contain'}}
                  />
                  <Image
                    source={require('../Assets/Images/delete.png')}
                    style={{height: 50, width: 50, resizeMode: 'contain'}}
                  />
                </TouchableOpacity>
              )}
              leftOpenValue={75}
              rightOpenValue={-75}
            />
          )}
        </View>
        <Footer
          // footerValue={'chat'}
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
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
});

function mapStateToProps(state) {
  return {
    unseenCount: state.unseenNotification.normal,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({unseenNotification}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
