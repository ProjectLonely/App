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

import FontStyle from '../Assets/Fonts/FontStyle';
const {height, width} = Dimensions.get('window');

const Footer = ({
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
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        onPress={dashboardPress}
        style={[
          styles.optionContainer,
          footerValue == 'home'
            ? {borderColor: '#004ACE', borderTopWidth: 1}
            : null,
        ]}>
        {footerValue == 'home' ? (
          <Image
            source={require('../Assets/Images/footerimage/homeactive.png')}
            style={styles.iconStyle}
          />
        ) : (
          <Image
            source={require('../Assets/Images/footerimage/homeinactive.png')}
            style={styles.iconStyle}
          />
        )}
        <Text
          style={[
            styles.textStyle,
            footerValue == 'home' ? {color: '#004ACE'} : null,
          ]}>
          Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={benificiaryPress}
        style={[
          styles.optionContainer,
          footerValue == 'benificiary'
            ? {borderColor: '#004ACE', borderTopWidth: 1}
            : null,
        ]}>
        {footerValue == 'benificiary' ? (
          <Image
            source={require('../Assets/Images/footerimage/beneficiaryactive.png')}
            style={styles.iconStyle}
          />
        ) : (
          <Image
            source={require('../Assets/Images/footerimage/beneficiaryinactive.png')}
            style={styles.iconStyle}
          />
        )}
        <Text
          style={[
            styles.textStyle,
            footerValue == 'benificiary' ? {color: '#004ACE'} : null,
          ]}>
          Beneficiaries
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={chatPress}
        style={[
          styles.optionContainer,
          footerValue == 'chat'
            ? {borderColor: '#004ACE', borderTopWidth: 1}
            : null,
        ]}>
        {footerValue == 'chat' ? (
          <View style={{flexDirection: 'row'}}>
            <Image
              source={require('../Assets/Images/footerimage/chatactive.png')}
              style={[styles.iconStyle]}
            />
            <Text
              style={{
                top: -8,
                left: -5,
                color: unseenValue > 0 ? '#004ACE' : '#fff',
                fontFamily: FontStyle.bold,
                fontSize: 16,
              }}>
              {unseenValue ? unseenValue : null}
            </Text>
          </View>
        ) : (
          <View style={{flexDirection: 'row'}}>
            <Image
              source={require('../Assets/Images/footerimage/chatinactive.png')}
              style={[styles.iconStyle]}
            />
            <Text
              style={{
                top: -8,
                left: -5,
                color: unseenValue > 0 ? '#004ACE' : '#fff',
                fontFamily: FontStyle.bold,
                fontSize: 16,
              }}>
              {unseenValue ? unseenValue : null}
            </Text>
          </View>
        )}
        <Text
          style={[
            styles.textStyle,
            footerValue == 'chat' ? {color: '#004ACE'} : null,
          ]}>
          Chat
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={callLogPress}
        style={[
          styles.optionContainer,
          footerValue == 'call'
            ? {borderColor: '#004ACE', borderTopWidth: 1}
            : null,
        ]}>
        {footerValue == 'call' ? (
          <Image
            source={require('../Assets/Images/footerimage/callactive.png')}
            style={styles.iconStyle}
          />
        ) : (
          <Image
            source={require('../Assets/Images/footerimage/callinactive.png')}
            style={styles.iconStyle}
          />
        )}
        <Text
          style={[
            styles.textStyle,
            footerValue == 'call' ? {color: '#004ACE'} : null,
          ]}>
          Call Logs
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={settingPress}
        style={[
          styles.optionContainer,
          footerValue == 'setting'
            ? {borderColor: '#004ACE', borderTopWidth: 1}
            : null,
        ]}>
        {footerValue == 'setting' ? (
          <Image
            source={require('../Assets/Images/footerimage/settingactive.png')}
            style={styles.iconStyle}
          />
        ) : (
          <Image
            source={require('../Assets/Images/footerimage/settinginactive.png')}
            style={styles.iconStyle}
          />
        )}
        <Text
          style={[
            styles.textStyle,
            footerValue == 'setting' ? {color: '#004ACE'} : null,
          ]}>
          Settings
        </Text>
      </TouchableOpacity>
    </View>
  );
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

export default Footer;

// export default Footer;
