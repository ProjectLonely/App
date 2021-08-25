import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import FontStyle from '../Assets/Fonts/FontStyle';

const Button = ({
  btnwidth,
  btnheight,
  bgcolor,
  btnborder,
  bordercolor,
  onPress,
  children,
}) => {
  return (
    <View style={{width: '100%'}}>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.btn_container,
          {
            width: btnwidth || '90%',
            height: btnheight || 55,
            backgroundColor: bgcolor || '#004ACE',
            borderWidth: btnborder,
            borderColor: bordercolor,
          },
        ]}>
        <Text style={styles.normal_text}>{children}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btn_container: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: '5%',
  },
  normal_text: {
    color: '#fff',
    fontSize: 16,
    fontFamily: FontStyle.bold,
  },
});
export default Button;
