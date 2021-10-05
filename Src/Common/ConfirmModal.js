import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import FontStyle from '../Assets/Fonts/FontStyle';

const ConfirmModal = ({confirmValue, closeModal, deleteValue}) => {
  return (
    <View>
      <Modal
        isVisible={confirmValue}
        onBackButtonPress={closeModal}
        onBackdropPress={closeModal}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          margin: 0,
        }}>
        <View
          style={{
            backgroundColor: '#fff',
            width: '80%',
            minHeight: '20%',
            maxHeight: 'auto',
            paddingVertical: '4%',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: '#3A3A3A',
              fontSize: 24,
              fontFamily: FontStyle.medium,
              textAlign: 'center',
            }}>
            {`Are you sure you want to delete this beneficiary?\n This cannot be undone.`}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: '5%',
              width: '90%',
            }}>
            <TouchableOpacity
              onPress={deleteValue}
              style={[styles.buttonStyle]}>
              <Text style={[styles.buttonText]}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeModal} style={styles.buttonStyle}>
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    width: 80,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 10,
    backgroundColor: '#fff',
    borderColor: '#004ACE',
    borderWidth: 1,
  },
  buttonText: {
    fontFamily: FontStyle.bold,
    fontSize: 16,
    color: '#004ACE',
  },
});

export default ConfirmModal;
