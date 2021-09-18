import React from 'react';
import LottieView from 'lottie-react-native';
import {View, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const LoadingView = ({heightValue, Spinnerheight, Spinnerwidth}) => {
  return (
    <View
      style={{
        width: width,
        height: height / heightValue,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <LottieView
        style={{
          height: Spinnerheight || 300,
          width: Spinnerwidth || 300,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
        }}
        source={require('../Assets/loading/loading.json')}
        autoPlay
        loop
      />
    </View>
  );
};

export default LoadingView;
