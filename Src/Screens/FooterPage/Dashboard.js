import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  Dimensions,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  RefreshControl,
} from 'react-native';
import Footer from '../../Common/Footer';
import Button from '../../Common/Button';
import FontStyle from '../../Assets/Fonts/FontStyle';
import CalendarModal from '../../Common/CalendarModal';
import {getCallLogs, unseenNotification} from '../../store/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import moment from 'moment';
import LoadingView from '../../Common/LoadingView';
import Styles from '../../Common/Style';

const {height, width} = Dimensions.get('screen');

class Beneficiary extends Component {
  state = {
    userName: '',
    loadingValue: false,
    calendarValue: false,
    startDate: moment('Jan 01 2020').format('MMM DD YYYY'),
    date: moment('Sep 01 2021'),
    endDate: moment().format('MMM DD YYYY'),
  };

  componentDidMount = async () => {
    const token = await AsyncStorage.getItem('token');
    this.setState({userName: await AsyncStorage.getItem('name'), token});

    this.props.getCallLogs(token);
    this.props.unseenNotification(token);
  };

  selectDuration = (duration) => {
    if (duration == 'week') {
      const from_date = moment().subtract(6, 'd').format('MMM DD YYYY');
      this.setState({
        startDate: from_date,
        durationStatus: 'week',
        endDate: moment().format('MMM DD YYYY'),
      });
    } else if (duration == 'month') {
      const from_date = moment().subtract(30, 'd').format('MMM DD YYYY');
      this.setState({
        startDate: from_date,
        durationStatus: 'month',
        endDate: moment().format('MMM DD YYYY'),
      });
    } else if (duration == 'year') {
      const from_date = moment().subtract(364, 'd').format('MMM DD YYYY');
      this.setState({
        startDate: from_date,
        durationStatus: 'year',
        endDate: moment().format('MMM DD YYYY'),
      });
    }
  };

  startCallBack = (childData) => {
    this.setState({
      startDate: moment(childData).format('MMM DD YYYY'),
      durationStatus: '',
    });
  };

  endCallBack = (childData) => {
    this.setState({
      endDate: moment(childData).format('MMM DD YYYY'),
      durationStatus: '',
    });
  };

  pageRefresh = () => {
    this.props.getCallLogs(this.state.token);
  };

  render() {
    const {calendarValue, startDate, endDate, durationStatus, userName} =
      this.state;
    const {callingData, unseenCount, unseenValue} = this.props;

    return (
      <ImageBackground
        source={require('../../Assets/Images/splashWhite.png')}
        style={{height: '100%', width: '100%'}}
        resizeMode="cover">
        <View style={{height: '92%'}}>
          <CalendarModal
            calendarValue={calendarValue}
            closeModal={() => this.setState({calendarValue: false})}
            lastWeek={() => this.selectDuration('week')}
            lastMonth={() => this.selectDuration('month')}
            lastYear={() => this.selectDuration('year')}
            startDateFromParent={this.startCallBack}
            endDateFromParent={this.endCallBack}
            durationStatus={durationStatus}
          />
          <SafeAreaView />
          <View
            style={{
              paddingHorizontal: '5%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text
                style={{
                  color: '#12175E',
                  fontSize: 22,
                  fontFamily: FontStyle.bold,
                }}>
                {`Hi, ${userName}`}
              </Text>
              <Text
                style={{
                  color: '#575757',
                  fontSize: 14,
                  fontFamily: FontStyle.bold,
                }}>
                {`Let’s get you connected`}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Notification')}
              style={styles.notifyView}>
              <Image
                source={require('../../Assets/Images/bell.png')}
                style={{width: 25, height: 23, left: 6, resizeMode: 'contain'}}
              />
              <Text
                style={{
                  top: -10,
                  left: -2,
                  color: unseenCount > 0 ? '#004ACE' : '#FFF',
                }}>
                {unseenCount > 0 ? unseenCount : '0'}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '100%',
              height: 1,
              marginTop: 10,
              backgroundColor: '#dbdbdb',
            }}
          />
          {this.props.loading ? (
            <LoadingView heightValue={1.2} />
          ) : callingData.length < 1 ? (
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
                source={require('../../Assets/Images/beneficiary.png')}
                style={{width: width / 1.6, height: height / 2.4}}
                resizeMode="contain"
              />
              <Text
                style={{
                  fontFamily: FontStyle.regular,
                  fontSize: 23,
                  color: '#575757',
                  textAlign: 'center',
                }}>
                Your beneficiarie have received any calls yet. When they do, you
                will see the call logs here.
              </Text>
              {/* <Button
                onPress={() => this.props.navigation.navigate('Subscription')}>
                ADD BENEFICIARY
              </Button> */}
            </ScrollView>
          ) : (
            <View style={{height: '87%'}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: '5%',
                }}>
                <Text
                  style={{
                    fontFamily: FontStyle.bold,
                    fontSize: 20,
                    color: '#3A3A3A',
                  }}>
                  Recent Activity
                </Text>
                <TouchableOpacity
                  onPress={() => this.setState({calendarValue: !calendarValue})}
                  style={Styles.calendarView}>
                  <Image
                    source={require('../../Assets/Images/calendar.png')}
                    style={{
                      height: 16,
                      width: 16,
                      resizeMode: 'contain',
                      right: 5,
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: FontStyle.regular,
                      fontSize: 12,
                      color: '#525F77',
                    }}>
                    {startDate} - {endDate}
                  </Text>
                </TouchableOpacity>
              </View>
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={false}
                    onRefresh={this.pageRefresh}
                    tintColor="#004ACE"
                  />
                }
                data={callingData}
                style={{
                  alignSelf: 'center',
                  height: '100%',
                }}
                showsVerticalScrollIndicator={false}
                renderItem={({item: callingData}) => {
                  const callDate = moment(callingData.callDate);

                  return moment(callDate).isBetween(
                    startDate,
                    endDate,
                    null,
                    [],
                  ) ? (
                    <View
                      style={[
                        styles.containerStyle,
                        {
                          backgroundColor:
                            callingData.callStatus == 'call_received'
                              ? '#D5FAFB'
                              : '#FF7A7A',
                        },
                      ]}>
                      <View style={{width: '80%'}}>
                        <Text
                          style={{
                            fontFamily: FontStyle.medium,
                            color: '#3A3A3A',
                            fontSize: 12,
                          }}>
                          {callingData.callDate}
                        </Text>
                        <Text
                          style={{
                            fontFamily: FontStyle.bold,
                            color: '#223E6D',
                            fontSize: 15,
                            marginVertical: 5,
                          }}>{`${callingData.name}  (${callingData.relationship})`}</Text>

                        <Text
                          style={{
                            fontFamily: FontStyle.bold,
                            fontSize: 13,
                            color: '#004ACE',
                          }}>{`Companion Name: ${callingData.companionName}`}</Text>
                        <Text
                          style={{
                            fontFamily: FontStyle.regular,
                            color: '#3A3A3A',
                            fontSize: 15,
                            top: 5,
                          }}>
                          {callingData.status}
                        </Text>
                      </View>
                      <View
                        style={{
                          height: 21,
                          width: '20%',
                          borderWidth: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 5,
                          borderColor:
                            callingData.callStatus == 'call_received'
                              ? '#1F9F00'
                              : '#E40000',
                        }}>
                        <Text
                          style={{
                            fontFamily: FontStyle.regular,
                            fontSize: 8,

                            color:
                              callingData.callStatus == 'call_received'
                                ? '#1F9F00'
                                : '#EA3232',
                          }}>
                          {callingData.callStatus == 'call_received'
                            ? 'Call Received'
                            : 'Call Missed'}
                        </Text>
                      </View>
                    </View>
                  ) : null;
                }}
              />
            </View>
          )}
        </View>
        <Footer
          footerValue="home"
          benificiaryPress={() => this.props.navigation.navigate('Benificiary')}
          callLogPress={() => this.props.navigation.navigate('CallLogs')}
          settingPress={() => this.props.navigation.navigate('Setting')}
          chatPress={() => this.props.navigation.navigate('ChatList')}
          unseenValue={unseenValue}
        />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  notifyView: {
    height: 48,
    width: 48,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 11,
    flexDirection: 'row',
  },

  containerStyle: {
    minHeight: height / 5,
    maxHeight: 'auto',
    width: width / 1.1,
    marginVertical: '1%',
    borderRadius: 10,
    padding: '5%',
    flexDirection: 'row',
  },
});

function mapStateToProps(state) {
  return {
    callingData: state.GetCallLogs.data,
    loading: state.GetCallLogs.loading,
    unseenCount: state.unseenNotification.normal,
    unseenValue: state.unseenNotification.chat,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getCallLogs, unseenNotification}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Beneficiary);
