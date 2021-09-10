import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';
import FontStyle from '../Assets/Fonts/FontStyle';
import Button from '../Common/Button';
const {height, width} = Dimensions.get('window');

const ThanksModal = ({thanksValue, closeModal, email}) => {
  return (
    <View>
      <Modal
        isVisible={thanksValue}
        onBackButtonPress={closeModal}
        onBackdropPress={closeModal}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          margin: 0,
        }}>
        <ImageBackground
          source={require('../Assets/Images/splashWhite.png')}
          style={{height: height, width: width}}
          resizeMode="cover">
          <View
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={require('../Assets/Images/blueLogo.png')}
              style={{width: '60%', height: '25%', resizeMode: 'contain'}}
            />

            <Text
              style={{
                fontFamily: FontStyle.bold,
                color: '#1E8705',
                fontSize: 37,
                textAlign: 'center',
                marginBottom: '5%',
              }}>
              {`Thank You`}
            </Text>
            <Text
              style={{
                fontFamily: FontStyle.medium,
                color: '#1E8705',
                fontSize: 21,
                textAlign: 'center',
                marginBottom: '5%',
              }}>
              {`We have received your query.\nYou will get response shortly on your registered email ${email}`}
            </Text>
            <Button onPress={closeModal}>CLOSE</Button>
          </View>
        </ImageBackground>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    width: '45%',
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#004ACE',
    borderRadius: 10,
  },
  buttonText: {
    fontFamily: FontStyle.bold,
    fontSize: 16,
    color: '#fff',
  },
});

export default ThanksModal;
