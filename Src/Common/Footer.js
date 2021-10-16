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
      <TouchableOpacity onPress={dashboardPress} style={styles.optionContainer}>
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
      </TouchableOpacity>
      <TouchableOpacity
        onPress={benificiaryPress}
        style={styles.optionContainer}>
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
      </TouchableOpacity>
      <TouchableOpacity onPress={chatPress} style={styles.optionContainer}>
        {footerValue == 'chat' ? (
          <View style={{flexDirection: 'row'}}>
            <Image
              source={require('../Assets/Images/footerimage/chatactive.png')}
              style={styles.iconStyle}
            />
            <Text
              style={{
                top: -8,
                left: -5,
                color: unseenValue > 0 ? '#004ACE' : '#fff',
                fontFamily: FontStyle.bold,
                fontSize: 16,
              }}>
              {unseenValue}
            </Text>
          </View>
        ) : (
          <View style={{flexDirection: 'row'}}>
            <Image
              source={require('../Assets/Images/footerimage/chatinactive.png')}
              style={styles.iconStyle}
            />
            <Text
              style={{
                top: -8,
                left: -5,
                color: unseenValue > 0 ? '#004ACE' : '#fff',
                fontFamily: FontStyle.bold,
                fontSize: 16,
              }}>
              {unseenValue}
            </Text>
          </View>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={callLogPress} style={styles.optionContainer}>
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
      </TouchableOpacity>
      <TouchableOpacity onPress={settingPress} style={styles.optionContainer}>
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
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
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
    justifyContent: 'center',
    width: '20%',
  },
  iconStyle: {
    height: 24,
    width: 23,
    resizeMode: 'contain',
  },
});

export default Footer;

// export default Footer;
