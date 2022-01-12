import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  LayoutAnimation,
  Dimensions,
  ScrollView,
} from 'react-native';
import FontStyle from '../Assets/Fonts/FontStyle';
import Header from '../Common/Header';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {baseurl} from '../Common/Baseurl';
import AlertModal from '../Common/AlertModal';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getCallLogs} from '../store/actions/index';
import CalendarModal from '../Common/CalendarModal';
import moment from 'moment';
import Styles from '../Common/Style';

const {height, width} = Dimensions.get('screen');

class BeneficiaryDetail extends Component {
  state = {
    newSchedule: [],
    calendarValue: false,
    startDate: moment('Jan 01 2020').format('MMM DD YYYY'),
    date: moment('Sep 01 2021'),
    endDate: moment().format('MMM DD YYYY'),
    oldSchedule: [],
    dayId: '',
    expandValue: false,
    sliderValue: '0',
    dayArray: [
      {
        dayName: 'Monday',
        dayName: 'Tuesday',
        dayName: 'Wednesday',
        dayName: 'Thrusday',
        dayName: 'Friday',
        dayName: 'Saturday',
        dayName: 'Sunday',
      },
    ],
    timeOption: [
      '7am - 10am',
      '10am - 1pm',
      '1pm - 4pm',
      '4pm - 7pm',
      '7pm - 10pm',
    ],
    beneficiaryData: {},
  };

  componentDidMount = async () => {
    const token = await AsyncStorage.getItem('token');
    const beneficiaryId = await AsyncStorage.getItem('beneficiaryId');
    this.setState({beneficiaryId, token});
    this.getBeneficiaryDetail();
  };

  getBeneficiaryDetail = () => {
    const {beneficiaryId, token} = this.state;
    axios({
      method: 'get',
      url: `${baseurl}beneficiary/${beneficiaryId}/`,
      headers: {Authorization: `Token ${token}`},
    })
      .then((response) => {
        console.log(response, 'alsdf');
        const newArray = [];
        response.data.schedule.map((obj) => {
          if (!newArray.some((o) => o.dayName === obj.dayName)) {
            newArray.push({...obj});
          }
        });

        this.setState({
          beneficiaryData: response.data,
          oldSchedule: response.data.schedule,
          newSchedule: newArray,
          timeZone: response.data.timezone.split('(')[0],
        });
      })
      .catch((err) => {});
  };

  expandOption = (dayId) => {
    if (dayId == this.state.dayId) {
      this.setState({dayId: ''});
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    } else {
      this.setState({dayId: dayId});
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
  };

  updateProfile = (beneficiaryId) => {
    axios({
      method: 'patch',
      url: `${baseurl}beneficiary/${beneficiaryId}/`,
      headers: {Authorization: `Token ${this.state.token}`},
      data: {
        schedule: this.state.oldSchedule,
      },
    })
      .then((response) => {
        if (response.status == 200) {
          this.setState({
            modalValue: true,
            message: 'Profile updated successfully',
          });
        }
      })
      .catch((err) => {
        this.setState({
          modalValue: true,
          message: 'Something went wrong',
        });
      });
  };

  newSliderValue = (dayName, value) => {
    var beneficiaryData = this.state.beneficiaryData.schedule;

    const index = beneficiaryData.findIndex((data) => data.dayName == dayName);
    beneficiaryData[index] = {
      dayName: dayName,
      timeOption: this.state.timeOption[value].time,
      sliderValue: value,
    };
    this.setState({schedule: beneficiaryData});
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

  addDayTimer = (day, time) => {
    const oldArray = this.state.oldSchedule;
    if (oldArray.some((el) => el.dayName == day && el.timeOption == time)) {
      const index = oldArray.findIndex(
        (data) => data.dayName == day && data.timeOption == time,
      );
      oldArray.splice(index, 1);
    } else {
      oldArray.push({dayName: day, timeOption: time});
    }
    this.setState({oldSchedule: oldArray});
  };

  render() {
    const {
      beneficiaryData,
      timeOption,
      newArray,
      dayId,
      oldSchedule,
      modalValue,
      message,
      beneficiaryId,
      calendarValue,
      startDate,
      endDate,
      durationStatus,
      timeZone,
      newSchedule,
    } = this.state;

    return (
      <View style={{backgroundColor: '#fff', height: '100%', width: '100%'}}>
        <Header
          leftIcon={true}
          relation={beneficiaryData.relation}
          middleText={beneficiaryData.name}
          notification={true}
          notifyPress={() => this.props.navigation.navigate('Notification')}
        />

        <View style={{alignItems: 'center', width: '100%'}}>
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
          <AlertModal
            modalValue={modalValue}
            closeModal={() => this.setState({modalValue: false})}
            message={message}
          />
          <ScrollView
            contentContainerStyle={{
              alignItems: 'center',
              paddingBottom: 200,
              paddingTop: '2%',
            }}>
            <View
              style={{
                backgroundColor: '#f9dcde',
                width: 80,
                height: 80,
                borderRadius: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={{uri: beneficiaryData.image}}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 30,
                  resizeMode: 'contain',
                }}
              />
            </View>
            <View style={{width: '100%', paddingHorizontal: '5%'}}>
              <Text
                style={{
                  fontFamily: FontStyle.regular,
                  color: '#004ACE',
                  fontSize: 14,
                  textAlign: 'justify',
                }}>
                {beneficiaryData.about}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.smallContainer}>
                  <Text style={[styles.normalText]}>
                    {beneficiaryData.age} years old
                  </Text>
                </View>
                <View style={styles.smallContainer}>
                  <Text style={[styles.normalText]}>
                    {beneficiaryData.relation}
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  fontSize: 21,
                  color: '#0014ab',
                  fontFamily: FontStyle.medium,
                  marginVertical: 10,
                }}>
                Schedule
              </Text>
            </View>
            <View style={{width: '100%'}}>
              <FlatList
                data={newSchedule}
                showsVerticalScrollIndicator={false}
                renderItem={({item: schedule}) => {
                  return (
                    <View
                      style={[
                        styles.expandview,
                        {
                          height: dayId == schedule.dayName ? 200 : 50,
                          overflow: 'hidden',
                        },
                      ]}>
                      <TouchableOpacity
                        style={{
                          flexDirection: 'row',
                          width: '100%',
                          justifyContent: 'space-between',
                        }}
                        onPress={() => this.expandOption(schedule.dayName)}>
                        <Text style={[styles.normalText2]}>
                          {schedule.dayName}
                        </Text>

                        <>
                          {dayId == schedule.dayName ? (
                            <Image
                              source={require('../Assets/Images/cross.png')}
                              style={{
                                height: 24,
                                width: 24,
                                resizeMode: 'contain',
                              }}
                            />
                          ) : (
                            <Image
                              source={require('../Assets/Images/plus.png')}
                              style={{
                                height: 24,
                                width: 24,
                                resizeMode: 'contain',
                              }}
                            />
                          )}
                        </>
                      </TouchableOpacity>
                      {
                        <FlatList
                          style={{marginTop: '5%', alignItems: 'center'}}
                          data={timeOption}
                          numColumns={3}
                          renderItem={({item}) => {
                            return (
                              <TouchableOpacity
                                onPress={() =>
                                  this.addDayTimer(schedule.dayName, item)
                                }
                                style={[
                                  styles.tabStyle,
                                  {
                                    borderColor: oldSchedule.some(
                                      (el) =>
                                        el.dayName == schedule.dayName &&
                                        el.timeOption == item,
                                    )
                                      ? '#D5FAFB'
                                      : '#004ACE',
                                    backgroundColor: oldSchedule.some(
                                      (el) =>
                                        el.dayName == schedule.dayName &&
                                        el.timeOption == item,
                                    )
                                      ? '#004ACE'
                                      : '#fff',
                                  },
                                ]}>
                                <Text
                                  style={{
                                    fontFamily: FontStyle.medium,
                                    color: oldSchedule.some(
                                      (el) =>
                                        el.dayName == schedule.dayName &&
                                        el.timeOption == item,
                                    )
                                      ? '#D5FAFB'
                                      : '#004ACE',
                                  }}>
                                  {item}
                                </Text>
                              </TouchableOpacity>
                            );
                          }}
                        />
                      }

                      <TouchableOpacity
                        onPress={() => this.updateProfile(beneficiaryData.id)}
                        style={{
                          height: 26,
                          width: 62,
                          backgroundColor: '#004ACE',
                          borderRadius: 5,
                          alignItems: 'center',
                          justifyContent: 'center',
                          alignSelf: 'flex-end',
                          marginTop: '5%',
                        }}>
                        <Text style={[styles.normalText2, {color: '#fff'}]}>
                          Update
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
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
                    color: '#10275A',
                  }}>
                  Call Logs
                </Text>
                <TouchableOpacity
                  onPress={() => this.setState({calendarValue: !calendarValue})}
                  style={Styles.calendarView}>
                  <Image
                    source={require('../Assets/Images/calendar.png')}
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
                data={this.props.callingData}
                style={{alignSelf: 'center'}}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                renderItem={({item: callingData}) => {
                  const callDate = moment(callingData.callDate);
                  return moment(callDate).isBetween(
                    startDate,
                    endDate,
                    null,
                    [],
                  ) ? (
                    callingData.beneficiary_id == beneficiaryId ? (
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
                            {callingData.callDateTime}
                          </Text>

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
                    ) : null
                  ) : null;
                }}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    // alignItems: 'center',
    // justifyContent: 'center',
    minHeight: height / 6,
    maxHeight: 'auto',
    borderLeftWidth: 4,
    borderLeftColor: '#004ACE',
    backgroundColor: '#fff',
    marginVertical: '2%',
    padding: '2%',

    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.27,
    shadowRadius: 2.65,

    elevation: 2,
  },
  normalText: {
    fontFamily: FontStyle.medium,
    fontSize: 13,
    color: '#004ACE',
  },
  smallContainer: {
    height: 38,
    width: '45%',
    marginVertical: '1%',
    backgroundColor: '#e6f0ff',
    borderRadius: 5,
    alignItems: 'center',
    marginRight: '1%',
    justifyContent: 'center',
  },
  expandview: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#10275A',
    marginVertical: '1%',
    borderRadius: 20,
    paddingTop: '3.5%',
    paddingHorizontal: '5%',
  },
  normalText2: {
    fontFamily: FontStyle.medium,
    color: '#10275A',
    fontSize: 16,
  },
  containerStyle: {
    minHeight: height / 6.5,
    maxHeight: 'auto',
    width: width / 1.1,
    marginVertical: '1%',
    borderRadius: 10,
    padding: '5%',
    flexDirection: 'row',
  },
  tabStyle: {
    backgroundColor: '#fff',
    marginLeft: '5%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#004ACE',
    marginVertical: 10,
    height: 26,
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function mapStateToProps(state) {
  return {
    callingData: state.GetCallLogs.data,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getCallLogs}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BeneficiaryDetail);

// export default BeneficiaryDetail;
