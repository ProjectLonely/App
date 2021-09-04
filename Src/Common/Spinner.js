import React from 'react';
import {View, ActivityIndicator} from 'react-native';

const Spinner = ({
  size,
  backgroundColor,
  spinnercolor,
  width,
  height,
  marginTop,
}) => {
  return (
    <View
      style={[
        styles.spinnerStyle,
        {
          backgroundColor: backgroundColor || '#004ACE',
          width: width || '90%',
          height: height || 55,
          marginTop: marginTop || null,
        },
      ]}>
      <ActivityIndicator size={size || 'large'} color={spinnercolor} />
    </View>
  );
};

const styles = {
  spinnerStyle: {
    borderRadius: 10,
    alignItems: 'center',

    justifyContent: 'center',
  },
};

export default Spinner;
