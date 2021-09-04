import React from 'react';
import {View} from 'react-native';
import Modal from 'react-native-modal';
import Spinner from './Spinner';

const AlertModal = ({}) => {
  return (
    <View>
      <Modal
        isVisible={true}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          margin: 0,
        }}>
        {/* <Spinner backgroundColor="transparent" spinnercolor="#fff" /> */}
      </Modal>
    </View>
  );
};

export default AlertModal;
