import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import FontStyle from '../../Assets/Fonts/FontStyle';
import Footer from '../../Common/Footer';
import Header from '../../Common/Header';
import Styles from '../../Common/Style';
import {getCallLogs} from '../../store/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import moment from 'moment';
import CalendarModal from '../../Common/CalendarModal';

class CallLogs extends Component {
  state = {
    calendarValue: false,
    startDate: moment('Jan 01 2020').format('MMM DD YYYY'),
    date: moment('Sep 01 2021'),
    endDate: moment().format('MMM DD YYYY'),
  };
  componentDidMount = async () => {
    const token = await AsyncStorage.getItem('token');
    this.props.getCallLogs(token);
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

  render() {
    const {callingData, operatorData} = this.props;
    const {calendarValue, startDate, endDate, date, durationStatus} =
      this.state;
    console.log(callingData, 'sdf');
    return (
      <View style={{backgroundColor: '#fff', height: '100%', width: '100%'}}>
        <SafeAreaView />
        <View style={{height: '86%', backgroundColor: '#fff'}}>
          <Header
            middleText={'Call Log'}
            notification={true}
            notifyPress={() => this.props.navigation.navigate('Notification')}
          />
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
          <View style={{height: '84%', backgroundColor: '#fff'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: '5%',
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
            <View
              style={{
                width: '100%',
                height: 1,
                backgroundColor: '#707070',
                marginTop: '2.5%',
              }}
            />
            <FlatList
              data={operatorData}
              showsVerticalScrollIndicator={false}
              renderItem={({item: operatorData}) => {
                return (
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        paddingHorizontal: '5%',
                        alignItems: 'center',
                        paddingVertical: '3%',
                      }}>
                      <Image
                        source={require('../../Assets/Images/lineuser.png')}
                        style={{height: 12, width: 11, resizeMode: 'contain'}}
                      />
                      <Text
                        style={{
                          fontFamily: FontStyle.bold,
                          color: '#10275A',
                          fontSize: 18,
                          left: 5,
                        }}>
                        {operatorData.name}
                      </Text>
                      <Text
                        style={{
                          fontFamily: FontStyle.bold,
                          color: '#10275A',
                          fontSize: 18,
                          left: 5,
                        }}>
                        {` (${operatorData.relationship})`}
                      </Text>
                    </View>
                    <FlatList
                      data={callingData}
                      renderItem={({item: callLogs}) => {
                        const callDate = moment(callLogs.callDate);

                        return moment(callDate).isBetween(
                          startDate,
                          endDate,
                          null,
                          [],
                        ) ? (
                          operatorData.name == callLogs.name ? (
                            <View style={Styles.smallContainer}>
                              <View style={{width: '72%'}}>
                                <Text
                                  style={{
                                    fontFamily: FontStyle.medium,
                                    color: '#3A3A3A',
                                    fontSize: 12,
                                  }}>
                                  {callLogs.callDate}
                                </Text>
                                <Text
                                  style={{
                                    fontFamily: FontStyle.bold,
                                    color: '#223E6D',
                                    fontSize: 15,
                                  }}>
                                  {callLogs.status}
                                </Text>
                              </View>
                              <View
                                style={{
                                  width: '25%',
                                }}>
                                <Text
                                  style={{
                                    fontFamily: FontStyle.medium,
                                    fontSize: 12,
                                    color:
                                      callLogs.callStatus == 'call_received'
                                        ? '#1F9F00'
                                        : '#EA3232',
                                  }}>
                                  {callLogs.callStatus}
                                </Text>
                              </View>
                            </View>
                          ) : null
                        ) : null;
                      }}
                    />
                  </View>
                );
              }}
            />
          </View>
        </View>
        <Footer
          footerValue={'call'}
          dashboardPress={() => this.props.navigation.navigate('Dashboard')}
          callLogPress={() => this.props.navigation.navigate('CallLogs')}
          settingPress={() => this.props.navigation.navigate('Setting')}
          benificiaryPress={() => this.props.navigation.navigate('Benificiary')}
          chatPress={() => this.props.navigation.navigate('ChatList')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  calendarView: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 22,
    minWidth: 98,
    width: 'auto',
    paddingHorizontal: 5,
    borderRadius: 5,
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
  },
});

function mapStateToProps(state) {
  return {
    operatorData: state.GetCallLogs.data.filter(
      (v, i, a) => a.findIndex((t) => t.name === v.name) === i,
    ),
    callingData: state.GetCallLogs.data,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getCallLogs}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CallLogs);
// export default CallLogs;
