import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  Image,
  ImageBackground,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import FontStyle from '../Assets/Fonts/FontStyle';
const {height, width} = Dimensions.get('window');

const Header = ({notification, leftIcon, middleText, notifyPress}) => {
  const navigation = useNavigation();
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
      <View
        style={{paddingLeft: '5%', flexDirection: 'row', alignItems: 'center'}}>
        {leftIcon ? (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.notifyView}>
            <Image
              source={require('../Assets/Images/back.png')}
              style={{width: 25, height: 23, resizeMode: 'contain'}}
            />
          </TouchableOpacity>
        ) : null}
        <Text
          style={{
            fontFamily: FontStyle.bold,
            fontSize: 22,
            color: '#12175E',
            left: leftIcon ? 20 : 0,
          }}>
          {middleText ? middleText : null}
        </Text>
      </View>

      <View style={{paddingRight: '5%'}}>
        {notification ? (
          <TouchableOpacity onPress={notifyPress} style={styles.notifyView}>
            <Image
              source={require('../Assets/Images/bell.png')}
              style={{width: 25, height: 23, resizeMode: 'contain'}}
            />
          </TouchableOpacity>
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
