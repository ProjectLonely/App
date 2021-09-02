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
const {height, width} = Dimensions.get('screen');

class BeneficiaryDetail extends Component {
  state = {
    dayId: '',
    expandValue: false,
    sliderValue: '0',
    newArray: [
      {
        dayName: 'Monday',
        sliderValue: 2,
        timeOption: '07am-10am',
      },
    ],
    timeOption: [
      {id: '0', time: '7am - 10am'},
      {id: '1', time: '10am - 1pm'},
      {id: '2', time: '1pm - 4pm'},
      {id: '3', time: '4pm - 7pm'},
      {id: '4', time: '7pm - 10pm'},
    ],
    beneficiaryData: {
      id: '',
      relationship: 'Father',
      age: '51',
      phoneNumber: '7878787878',
      status:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata.',
      companionshipArray: [
        {id: '0', day: 'Monday', timeScheduleId: '2'},
        {id: '1', day: 'Thursday', timeScheduleId: '5'},
        {id: '2', day: 'Sunday', timeScheduleId: '3'},
      ],
      callLogsArray: [
        {
          id: '0',
          callDateTime: 'Aug 03, 2021 | 10:00 am',
          companionName: 'Operator 1',
          status: `he is feeling well,\n Next week there is a doctor appointment. `,
          callStatus: 'Call Received',
        },
        {
          id: '1',
          callDateTime: 'Aug 03, 2021 | 10:00 am',
          companionName: 'Operator 2',
          status: `He is not picking the phone,\n may be in a sleep after lunch.`,
          callStatus: 'Call Missed',
        },
      ],
    },
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

  render() {
    const {beneficiaryData, timeOption, newArray, dayId} = this.state;
    return (
      <View style={{backgroundColor: '#fff', height: '100%', width: '100%'}}>
        <SafeAreaView />
        <Header
          leftIcon={true}
          middleText={'Martin Bravo'}
          notification={true}
          notifyPress={() => this.props.navigation.navigate('Notification')}
        />

        <View style={{alignItems: 'center', width: '100%'}}>
          <ScrollView
            contentContainerStyle={{
              alignItems: 'center',
              paddingBottom: 200,
            }}>
            <View style={styles.container}>
              <Text
                style={{
                  fontFamily: FontStyle.regular,
                  color: '#7B7890',
                  fontSize: 14,
                  textAlign: 'justify',
                }}>
                {beneficiaryData.status}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.smallContainer}>
                  <Text
                    style={
                      styles.normalText
                    }>{`Relation : ${beneficiaryData.relationship}`}</Text>
                </View>
                <View style={styles.smallContainer}>
                  <Text
                    style={
                      styles.normalText
                    }>{`Age : ${beneficiaryData.age}`}</Text>
                </View>
                <View style={[styles.smallContainer, {flexDirection: 'row'}]}>
                  <Image
                    source={require('../Assets/Images/call.png')}
                    style={{height: 17, width: 17, resizeMode: 'contain'}}
                  />
                  <Text style={[styles.normalText, {left: 5}]}>
                    {beneficiaryData.phoneNumber}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{width: '100%'}}>
              <FlatList
                data={beneficiaryData.companionshipArray}
                showsVerticalScrollIndicator={false}
                renderItem={({item: companion}) => {
                  return (
                    <View
                      style={[
                        styles.expandview,
                        {
                          height: dayId == companion.id ? 200 : 50,
                          overflow: 'hidden',
                        },
                      ]}>
                      <TouchableOpacity
                        style={{
                          flexDirection: 'row',
                          width: '100%',
                          justifyContent: 'space-between',
                        }}
                        onPress={() => this.expandOption(companion.id)}>
                        <Text style={[styles.normalText2]}>
                          {companion.day}
                        </Text>

                        <>
                          {dayId == companion.id ? (
                            <Image
                              source={require('../Assets/Images/crosswhite.png')}
                              style={{
                                height: 24,
                                width: 24,
                                resizeMode: 'contain',
                              }}
                            />
                          ) : (
                            <Image
                              source={require('../Assets/Images/pluswhite.png')}
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
                          data={newArray}
                          scrollEnabled={false}
                          renderItem={({item: newArray}) => {
                            return (
                              <View
                                style={{
                                  flexDirection: 'row',
                                  marginTop: '5%',
                                  marginBottom: '2.5%',
                                }}>
                                <View
                                  style={{
                                    width: 84,
                                    height: 28,
                                    borderWidth: 1,
                                    borderColor: '#004ACE',
                                    borderRadius: 10,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#fff',
                                    marginHorizontal: '5%',
                                  }}>
                                  <Text>{newArray.timeOption}</Text>
                                </View>
                              </View>
                            );
                          }}
                        />
                      }
                      {
                        <Slider
                          thumbTintColor={'#004ACE'}
                          style={{
                            width: '100%',
                            height: 40,
                          }}
                          minimumValue={0}
                          maximumValue={4}
                          step={1}
                          minimumTrackTintColor="#FFFFFF"
                          maximumTrackTintColor="#FFFFFF"
                        />
                      }
                      <View style={{flexDirection: 'row'}}>
                        {timeOption.map((time) => {
                          return (
                            <View
                              style={{
                                width: '20%',
                                marginHorizontal: '0.5%',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <Text
                                style={{
                                  fontFamily: FontStyle.medium,
                                  fontSize: 10,
                                  color: '#fff',
                                }}>
                                {time.time}
                              </Text>
                            </View>
                          );
                        })}
                      </View>

                      <TouchableOpacity
                        //   onPress={() => this.addDayTimer(dayOption.day)}
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
                        <Text style={styles.normalText2}>Update</Text>
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
                <View style={styles.calendarView}>
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
                    August 2021
                  </Text>
                </View>
              </View>
              <FlatList
                data={beneficiaryData.callLogsArray}
                style={{alignSelf: 'center'}}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                renderItem={({item: callingData}) => {
                  return (
                    <View
                      style={[
                        styles.containerStyle,
                        {
                          backgroundColor:
                            callingData.callStatus == 'Call Received'
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
                            callingData.callStatus == 'Call Received'
                              ? '#1F9F00'
                              : '#E40000',
                        }}>
                        <Text
                          style={{
                            fontFamily: FontStyle.regular,
                            fontSize: 8,

                            color:
                              callingData.callStatus == 'Call Received'
                                ? '#1F9F00'
                                : '#EA3232',
                          }}>
                          {callingData.callStatus}
                        </Text>
                      </View>
                    </View>
                  );
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
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '20%',
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
    width: '32%',
    backgroundColor: '#F4F7FF',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '1%',
  },
  expandview: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#10275A',
    marginVertical: '1%',
    borderRadius: 20,
    paddingTop: '3.5%',
    paddingHorizontal: '5%',
  },
  normalText2: {
    fontFamily: FontStyle.medium,
    color: '#FFF',
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
  calendarView: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 22,
    width: 98,
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

export default BeneficiaryDetail;
