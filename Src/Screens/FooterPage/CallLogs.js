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
import {getCallLogs} from '../../store/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import moment from 'moment';

class CallLogs extends Component {
  state = {
    logsData: [
      {
        // id: '0',
        // beneficiaryName: 'Martin Bravo',
        // relationship: 'Father',
        // callLogs: [
        //   {
        //     id: '0',
        //     dateTime: 'Aug 07, 2021 | 10:00 am',
        //     description: `He is feeling well,\nNext week there is a doctor appointment.`,
        //     callStatus: 'Call Received',
        //   },
        // ],
      },
    ],
  };

  componentDidMount = async () => {
    const token = await AsyncStorage.getItem('token');
    this.props.getCallLogs(token);
  };

  render() {
    const {callingData, mainData} = this.props;
    console.log(mainData, 'mainData');
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
              data={mainData}
              renderItem={({item: mainData}) => {
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
                        {mainData.name}
                      </Text>
                      <Text
                        style={{
                          fontFamily: FontStyle.bold,
                          color: '#10275A',
                          fontSize: 18,
                          left: 5,
                        }}>
                        {` (${mainData.relationship})`}
                      </Text>
                    </View>
                    <FlatList
                      data={callingData}
                      renderItem={({item: callLogs}) => {
                        return mainData.name == callLogs.name ? (
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
                                {/* {callLogs.description} */}
                                asdflkasd alsdfjasjalskfjaslkf asdfasdj
                                fkasdfkal fjalsfjalsdf
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

function mapStateToProps(state) {
  return {
    mainData: state.GetCallLogs.filter(
      (v, i, a) => a.findIndex((t) => t.name === v.name) === i,
    ),
    callingData: state.GetCallLogs,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getCallLogs}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CallLogs);
// export default CallLogs;
