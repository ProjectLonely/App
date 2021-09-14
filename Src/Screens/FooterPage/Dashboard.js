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
} from 'react-native';
import Footer from '../../Common/Footer';
import Button from '../../Common/Button';
import FontStyle from '../../Assets/Fonts/FontStyle';
import CalendarModal from '../../Common/CalendarModal';
import {getCallLogs} from '../../store/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import moment from 'moment';
const {height, width} = Dimensions.get('screen');

class Beneficiary extends Component {
  state = {
    calendarValue: false,
  };

  componentDidMount = async () => {
    const token = await AsyncStorage.getItem('token');
    this.props.getCallLogs(token);
  };

  selectDuration = (duration) => {
    var to_date = moment();

    if (duration == 'week') {
      const from_date = moment().subtract(6, 'd').format('MMM DD YYYY');
      this.setState({startDate: from_date});
      // var postDate = moment('Sep 08 2021');
      // var diff = postDate.diff(from_date, 'days');
      // alert(diff);
    } else if (duration == 'month') {
      const from_date = moment().subtract(30, 'd').format('MMM DD YYYY');
      alert(from_date);
    } else if (duration == 'year') {
      const from_date = moment().subtract(364, 'd').format('MMM DD YYYY');
      alert(from_date);
    }
  };

  render() {
    const {calendarValue, startDate} = this.state;
    const {callingData} = this.props;
    console.log(callingData);
    return (
      <ImageBackground
        source={require('../../Assets/Images/splashWhite.png')}
        style={{height: '100%', width: '100%'}}
        resizeMode="cover">
        <View style={{height: '91.5%'}}>
          <CalendarModal
            calendarValue={calendarValue}
            closeModal={() => this.setState({calendarValue: false})}
            lastWeek={() => this.selectDuration('week')}
            lastMonth={() => this.selectDuration('month')}
            lastYear={() => this.selectDuration('year')}
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
                {`Hi, Jhonny`}
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
                style={{width: 25, height: 23, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
          </View>
          {callingData.length < 1 ? (
            <View
              style={{
                height: '80%',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
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
                }}>
                You don't have any beneficiary
              </Text>
              <Button
                onPress={() => this.props.navigation.navigate('Subscription')}>
                ADD BENEFICIARY
              </Button>
            </View>
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
                  style={styles.calendarView}>
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
                    August 2021
                  </Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={callingData}
                style={{
                  alignSelf: 'center',
                  height: '100%',
                }}
                showsVerticalScrollIndicator={false}
                renderItem={({item: callingData}) => {
                  return (
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
                  );
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
          chatPress={() => this.props.navigation.navigate('Chat')}
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
    callingData: state.GetCallLogs,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getCallLogs}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Beneficiary);
