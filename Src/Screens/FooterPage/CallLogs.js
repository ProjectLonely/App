import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import FontStyle from '../../Assets/Fonts/FontStyle';
import Footer from '../../Common/Footer';
import Header from '../../Common/Header';
import Styles from '../../Common/Style';

class CallLogs extends Component {
  state = {
    logsData: [
      {
        id: '0',
        beneficiaryName: 'Martin Bravo',
        relationship: 'Father',
        callLogs: [
          {
            id: '0',
            dateTime: 'Aug 07, 2021 | 10:00 am',
            description: `He is feeling well,\nNext week there is a doctor appointment.`,
            callStatus: 'Call Received',
          },
          {
            id: '0',
            dateTime: 'Aug 07, 2021 | 10:00 am',
            description: `He is not picking the phone,\nmay be in a sleep after lunch.`,
            callStatus: 'Call Missed',
          },
        ],
      },
      {
        id: '1',
        beneficiaryName: 'Marry Bravo',
        relationship: 'Mother',
        callLogs: [
          {
            id: '0',
            dateTime: 'Aug 06, 2021 | 10:00 am',
            description: `He is feeling well,\nNext week there is a doctor appointment.`,
            callStatus: 'Call Received',
          },
        ],
      },
    ],
  };
  render() {
    const {logsData} = this.state;
    return (
      <View style={{backgroundColor: '#fff', height: '100%', width: '100%'}}>
        <SafeAreaView />
        <View style={{height: '86%', backgroundColor: '#fff'}}>
          <Header
            middleText={'Call Log'}
            notification={true}
            notifyPress={() => this.props.navigation.navigate('Notification')}
          />
          <View style={{height: '76%', backgroundColor: '#fff'}}>
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
              <View style={styles.calendarView}>
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
              </View>
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
              data={logsData}
              renderItem={({item: logsData}) => {
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
                        {logsData.beneficiaryName}
                      </Text>
                      <Text
                        style={{
                          fontFamily: FontStyle.bold,
                          color: '#10275A',
                          fontSize: 18,
                          left: 5,
                        }}>
                        {` (${logsData.relationship})`}
                      </Text>
                    </View>
                    <FlatList
                      data={logsData.callLogs}
                      renderItem={({item: callLogs}) => {
                        return (
                          <View style={Styles.smallContainer}>
                            <View style={{width: '72%'}}>
                              <Text
                                style={{
                                  fontFamily: FontStyle.medium,
                                  color: '#3A3A3A',
                                  fontSize: 12,
                                }}>
                                {callLogs.dateTime}
                              </Text>
                              <Text
                                style={{
                                  fontFamily: FontStyle.bold,
                                  color: '#223E6D',
                                  fontSize: 15,
                                }}>
                                {callLogs.description}
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
                                    callLogs.callStatus == 'Call Received'
                                      ? '#1F9F00'
                                      : '#EA3232',
                                }}>
                                {callLogs.callStatus}
                              </Text>
                            </View>
                          </View>
                        );
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
          chatPress={() => this.props.navigation.navigate('Chat')}
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

export default CallLogs;
