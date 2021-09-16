import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';
import FontStyle from '../Assets/Fonts/FontStyle';
const {width} = Dimensions.get('screen');

const ImageModal = ({
  imageModal,
  closeModal,
  galleryPress,
  cameraPress,
  sourceURL,
}) => {
  return (
    <View>
      <Modal
        isVisible={imageModal}
        onBackButtonPress={closeModal}
        onBackdropPress={closeModal}
        style={{
          alignItems: 'center',
          justifyContent: 'flex-end',
          margin: 0,
        }}>
        <View
          style={{
            backgroundColor: '#fff',
            width: width,
            alignItems: 'center',
            height: 180,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}>
          <Text style={[styles.normalText, {color: 'grey', fontSize: 20}]}>
            Select Image from
          </Text>
          <View style={{width: '100%', borderBottomWidth: 1}} />
          <TouchableOpacity onPress={galleryPress} style={styles.tabStyle}>
            <Text style={styles.normalText}>Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={cameraPress} style={styles.tabStyle}>
            <Text style={styles.normalText}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={closeModal}
            style={[styles.tabStyle, {borderBottomWidth: 0}]}>
            <Text style={[styles.normalText, {color: 'red'}]}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  tabStyle: {
    width: '100%',
    height: 40,
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  normalText: {
    fontFamily: FontStyle.regular,
    fontSize: 18,
    color: '#004ACE',
  },
});

export default ImageModal;
