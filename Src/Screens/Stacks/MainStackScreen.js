import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Dashboard from '../FooterPage/Dashboard';
import Benificiary from '../FooterPage/Benificiary';
import CallLogs from '../FooterPage/CallLogs';
import BeneficiaryDetail from '../BeneficiaryDetail';
import Notification from '../Notification';
import Chat from '../FooterPage/Chat';
import Inbox from '../FooterPage/Inbox';
import Icon from 'react-native-vector-icons/Ionicons';

import SettingsStackScreen from './SettingsStackScreen';
import InboxStackScreen from './InboxStackScreen';
import BeneficiariesStackScreen from './BeneficiariesStackScreen';

import FontStyle from '../../Assets/Fonts/FontStyle';
const {height, width} = Dimensions.get('window');

const MainStackScreen = ({
  footerValue,
  settingPress,
  benificiaryPress,
  dashboardPress,
  callLogPress,
  chatPress,
  unseenCount,
  unseenNotification,
  unseenValue,
}) => {
  // useEffect(() => {
  //   const data = async () => {
  //     const token = await AsyncStorage.getItem('token');
  //     console.getlog(token, 'token');
  //     // dispatch(unseenNotification(token));
  //     unseenNotification(token);
  //   };
  // }, [unseenCount]);

  const Tab = createBottomTabNavigator();

  const screenNames = {
    settings: 'Settings',
    inbox: 'Inbox',
    callLogs: 'Call Logs',
    beneficiaries: 'Beneficiaries',
    home: 'Home',
  };

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#12175E',
        labelStyle: {paddingBottom: 3},
        iconStyle: {padding: 0, margin: 0},
        style: {height: 80, paddingTop: 3},
      }}>
      <Tab.Screen
        name={screenNames.home}
        component={Dashboard}
        options={{
          gestureEnabled: false,
          tabBarIcon: ({color, focused}) => (
            <Icon
              name="home-outline"
              size={20}
              style={[styles.icon, {color: color}]}
            />
          ),
        }}
      />
      <Tab.Screen
        name={screenNames.beneficiaries}
        component={BeneficiariesStackScreen}
        options={{
          gestureEnabled: false,
          tabBarIcon: ({color, focused}) => (
            <Icon
              name="people-outline"
              size={22}
              style={[styles.icon, {color: color}]}
            />
          ),
        }}
      />

      <Tab.Screen
        name={screenNames.inbox}
        component={InboxStackScreen}
        options={{
          abBarLabel: '',
          tabBarIcon: ({color, focused}) => (
            <Icon
              name="mail-outline"
              size={20}
              style={[styles.icon, {color: color}]}
            />
          ),
        }}
      />
      <Tab.Screen
        name={screenNames.callLogs}
        component={CallLogs}
        options={{
          abBarLabel: '',
          tabBarIcon: ({color, focused}) => (
            <Icon
              name="call-outline"
              size={20}
              style={[styles.icon, {color: color}]}
            />
          ),
        }}
      />
      <Tab.Screen
        name={screenNames.settings}
        component={SettingsStackScreen}
        options={{
          abBarLabel: '',
          tabBarIcon: ({color, focused}) => (
            <Icon
              name="settings-outline"
              size={20}
              style={[styles.icon, {color: color}]}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
  //     <View style={styles.mainContainer}>
  //       <TouchableOpacity
  //         onPress={dashboardPress}
  //         style={[
  //           styles.optionContainer,
  //           route == 'Dashboard'
  //             ? {borderColor: '#004ACE', borderTopWidth: 1}
  //             : null,
  //         ]}>
  //         {route == 'Dashboard' ? (
  //           <Image
  //             source={require('../Assets/Images/footerimage/homeactive.png')}
  //             style={styles.iconStyle}
  //           />
  //         ) : (
  //           <Image
  //             source={require('../Assets/Images/footerimage/homeinactive.png')}
  //             style={styles.iconStyle}
  //           />
  //         )}
  //         <Text
  //           style={[
  //             styles.textStyle,

  //             route == 'Dashboard' ? {color: '#004ACE'} : null,
  //           ]}>
  //           Home
  //         </Text>
  //       </TouchableOpacity>
  //       <TouchableOpacity
  //         onPress={benificiaryPress}
  //         style={[
  //           styles.optionContainer,
  //           route == 'Benificiary'
  //             ? {borderColor: '#004ACE', borderTopWidth: 1}
  //             : null,
  //         ]}>
  //         {route == 'Benificiary' ? (
  //           <Image
  //             source={require('../Assets/Images/footerimage/beneficiaryactive.png')}
  //             style={styles.iconStyle}
  //           />
  //         ) : (
  //           <Image
  //             source={require('../Assets/Images/footerimage/beneficiaryinactive.png')}
  //             style={styles.iconStyle}
  //           />
  //         )}
  //         <Text
  //           style={[
  //             styles.textStyle,
  //             footerValue == 'benificiary' ? {color: '#004ACE'} : null,
  //           ]}>
  //           Beneficiaries
  //         </Text>
  //       </TouchableOpacity>
  //       <TouchableOpacity
  //         onPress={chatPress}
  //         style={[
  //           styles.optionContainer,
  //           footerValue == 'chat'
  //             ? {borderColor: '#004ACE', borderTopWidth: 1}
  //             : null,
  //         ]}>
  //         {footerValue == 'chat' ? (
  //           <View style={{flexDirection: 'row'}}>
  //             <Image
  //               source={require('../Assets/Images/footerimage/chatactive.png')}
  //               style={[styles.iconStyle]}
  //             />
  //             <Text
  //               style={{
  //                 top: -8,
  //                 left: -5,
  //                 color: unseenValue > 0 ? '#004ACE' : '#fff',
  //                 fontFamily: FontStyle.bold,
  //                 fontSize: 16,
  //               }}>
  //               {unseenValue ? unseenValue : null}
  //             </Text>
  //           </View>
  //         ) : (
  //           <View style={{flexDirection: 'row'}}>
  //             <Image
  //               source={require('../Assets/Images/footerimage/chatinactive.png')}
  //               style={[styles.iconStyle]}
  //             />
  //             <Text
  //               style={{
  //                 top: -8,
  //                 left: -5,
  //                 color: unseenValue > 0 ? '#004ACE' : '#fff',
  //                 fontFamily: FontStyle.bold,
  //                 fontSize: 16,
  //               }}>
  //               {unseenValue ? unseenValue : null}
  //             </Text>
  //           </View>
  //         )}
  //         <Text
  //           style={[
  //             styles.textStyle,
  //             footerValue == 'chat' ? {color: '#004ACE'} : null,
  //           ]}>
  //           Chat
  //         </Text>
  //       </TouchableOpacity>
  //       <TouchableOpacity
  //         onPress={callLogPress}
  //         style={[
  //           styles.optionContainer,
  //           footerValue == 'call'
  //             ? {borderColor: '#004ACE', borderTopWidth: 1}
  //             : null,
  //         ]}>
  //         {footerValue == 'call' ? (
  //           <Image
  //             source={require('../Assets/Images/footerimage/callactive.png')}
  //             style={styles.iconStyle}
  //           />
  //         ) : (
  //           <Image
  //             source={require('../Assets/Images/footerimage/callinactive.png')}
  //             style={styles.iconStyle}
  //           />
  //         )}
  //         <Text
  //           style={[
  //             styles.textStyle,
  //             footerValue == 'call' ? {color: '#004ACE'} : null,
  //           ]}>
  //           Call Logs
  //         </Text>
  //       </TouchableOpacity>
  //       <TouchableOpacity
  //         onPress={settingPress}
  //         style={[
  //           styles.optionContainer,
  //           footerValue == 'setting'
  //             ? {borderColor: '#004ACE', borderTopWidth: 1}
  //             : null,
  //         ]}>
  //         {footerValue == 'setting' ? (
  //           <Image
  //             source={require('../Assets/Images/footerimage/settingactive.png')}
  //             style={styles.iconStyle}
  //           />
  //         ) : (
  //           <Image
  //             source={require('../Assets/Images/footerimage/settinginactive.png')}
  //             style={styles.iconStyle}
  //           />
  //         )}
  //         <Text
  //           style={[
  //             styles.textStyle,
  //             footerValue == 'setting' ? {color: '#004ACE'} : null,
  //           ]}>
  //           Settings
  //         </Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 75,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.27,
    shadowRadius: 2.65,
    elevation: 2,
  },
  optionContainer: {
    alignItems: 'center',
    paddingVertical: '2%',
    width: '20%',
    // borderTopWidth: 1,
  },
  iconStyle: {
    height: 24,
    width: 23,
    resizeMode: 'contain',
  },
  textStyle: {
    fontFamily: FontStyle.regular,
    fontSize: 12,
  },
});

export default MainStackScreen;

// export default Footer;
