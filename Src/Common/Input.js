import React from 'react';
import {StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import FontStyle from '../Assets/Fonts/FontStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
const Input = ({placeholder, secureTextEntry, iconName}) => {
  return (
    <TextInput
      label={placeholder}
      mode="outlined"
      outlineColor="#004ACE"
      maxLength={40}
      secureTextEntry={secureTextEntry}
      autoCompleteType={false}
      theme={{
        colors: {
          placeholder: '#707070',
          text: '#3A3A3A',
          primary: '#004ACE',
          background: '#fff',
        },
      }}
      style={styles.textStyle}
      right={
        <TextInput.Icon
          name={() => (
            <Icon
              name={iconName}
              size={24}
              color={'grey'}
              //   onPress={() => {
              //     alert('hi');
              //   }}
            />
          )}
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 20,
    fontFamily: FontStyle.bold,
    width: '90%',
    marginVertical: '2.5%',
    height: 55,
  },
});

export default Input;
