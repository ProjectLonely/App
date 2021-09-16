import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import FontStyle from '../Assets/Fonts/FontStyle';

const AlertModal = ({modalValue, closeModal, message}) => {
  return (
    <View>
      <Modal
        isVisible={modalValue}
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
            width: '70%',
            minHeight: '20%',
            maxHeight: 'auto',
            paddingVertical: '2%',
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
            {message || `Are you sure to cancel\n the subcription?`}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: '5%',
              width: '90%',
            }}>
            {!message ? (
              <View>
                <TouchableOpacity
                  onPress={closeModal}
                  style={[
                    styles.buttonStyle,
                    {
                      backgroundColor: '#fff',
                      borderColor: '#004ACE',
                      borderWidth: 1,
                    },
                  ]}>
                  <Text style={[styles.buttonText, {color: '#004ACE'}]}>
                    Yes
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={closeModal}
                  style={styles.buttonStyle}>
                  <Text style={styles.buttonText}>No</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity onPress={closeModal} style={styles.buttonStyle}>
                <Text style={styles.buttonText}>ok</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
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

export default AlertModal;
