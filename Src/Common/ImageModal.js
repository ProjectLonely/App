import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Button,
} from 'react-native';
import Modal from 'react-native-modal';
import FontStyle from '../Assets/Fonts/FontStyle';
const { width } = Dimensions.get('screen');
import { ButtonGroup } from 'react-native-elements/dist/buttons/ButtonGroup';

const ImageModal = ({
  imageModal,
  closeModal,
  galleryPress,
  cameraPress,
  sourceURL,
}) => {

  const [selectedIndex, setSelectedIndex] = useState(0);

  const galleryButton = () =>
    <TouchableOpacity onPress={galleryPress}>
      <Text style={styles.normalText}>Choose existing photo</Text>
    </TouchableOpacity>

  const cameraButton = () =>
    <TouchableOpacity onPress={cameraPress} >
      <Text style={styles.normalText}>Take a photo</Text>
    </TouchableOpacity>


  const buttons = [{ element: galleryButton }, { element: cameraButton }]
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
        <View style={{ width: '100%', borderBottomWidth: 1 }} />
        <ButtonGroup
          buttons={buttons}
          selectedIndex={selectedIndex}
          containerStyle={{ marginBottom: 20, height: 90, width: '95%', borderRadius: 10, color: '#007AFF', }}
          buttonContainerStyle={{ height: 25, color: '#007AFF', }}
          buttonStyle={{ color: '#007AFF', backgroundColor: '#19EN33' }}
          textStyle={{ color: '#007AFF', }}
          innerBorderStyle={{ color: '#d3d3d3', width: .5 }}
          vertical={true}
        />
        <TouchableOpacity
          onPress={closeModal}
          style={[styles.button, { borderBottomWidth: 0 }]}>
          <Text style={[styles.cancelText]}>Cancel</Text>
        </TouchableOpacity>
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
  cancelText: {
    fontFamily: FontStyle.bold,
    fontSize: 18,
    color: '#004ACE',
  },
  button: {
    width: '95%',
    height: 40,
    color: '#3740ff',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 12
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#fff'
  }
});

export default ImageModal;
