import React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  Dimensions,
  StyleSheet,
} from 'react-native';
import FontStyle from '../Assets/Fonts/FontStyle';
const {height, width} = Dimensions.get('window');

const Header = ({userName, notification}) => {
  return (
    <ImageBackground
      source={require('../Assets/Images/headerimage.png')}
      resizeMode="cover"
      style={{
        height: height / 8,
        width: width,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
      }}>
      <View style={{paddingLeft: '5%'}}>
        <Text
          style={{color: '#12175E', fontSize: 28, fontFamily: FontStyle.bold}}>
          {userName ? `Hi, ${userName}` : null}
        </Text>
        <Text
          style={{color: '#575757', fontSize: 14, fontFamily: FontStyle.bold}}>
          {userName ? `Let’s get you connected` : null}
        </Text>
      </View>
      <View style={{paddingRight: '5%'}}>
        {notification ? (
          <View style={styles.notifyView}>
            <Image
              source={require('../Assets/Images/bell.png')}
              style={{width: 25, height: 23, resizeMode: 'contain'}}
            />
          </View>
        ) : null}
      </View>
    </ImageBackground>
  );
};

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
});

export default Header;
