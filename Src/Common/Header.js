import React, {useEffect, useState} from 'react';
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
import {connect} from 'react-redux';
import {unseenNotification} from '../store/actions';
import {bindActionCreators} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Header = ({
  notification,
  leftIcon,
  middleText,
  notifyPress,
  unseenCount,
  unseenNotification,
}) => {
  const navigation = useNavigation();
  // const dispatch = useDispatch();
  // const [unseenCount, setCount] = useState(
  //   useStore().getState().unseenNotification,
  // );

  useEffect(() => {
    const data = async () => {
      const token = await AsyncStorage.getItem('token');
      console.getlog(token, 'token');
      // dispatch(unseenNotification(token));
      unseenNotification(token);
    };
  }, [unseenCount]);
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
        borderBottomWidth: 1,
        borderColor: '#dbdbdb',
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
            width: '70%',
          }}>
          {middleText ? middleText : null}
        </Text>
      </View>

      <View style={{paddingRight: 20}}>
        {notification ? (
          <TouchableOpacity
            onPress={notifyPress}
            style={[styles.notifyView, leftIcon ? {right: 20} : null]}>
            <Image
              source={require('../Assets/Images/bell.png')}
              style={{width: 25, height: 23, left: 6, resizeMode: 'contain'}}
            />
            <Text
              style={{
                top: -10,
                left: -2,
                color: unseenCount > 0 ? '#004ACE' : '#FFF',
              }}>
              {unseenCount}
            </Text>
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
    flexDirection: 'row',
  },
});

function mapStateToProps(state) {
  return {
    unseenCount: state.unseenNotification.normal,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({unseenNotification}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

// export default Header;
