import React from 'react';
import {StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import FontStyle from '../Assets/Fonts/FontStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
const Input = ({
  placeholder,
  maxLength,
  iconName,
  keyboardType,
  height,
  multiline,
  secureTextEntry,
  iconPress,
  onChangeText,
  value,
  editable,
  marginTop,
}) => {
  return (
    <TextInput
      multiline={multiline ? multiline : false}
      onChangeText={onChangeText}
      value={value}
      // label={placeholder}
      placeholder={placeholder}
      keyboardType={keyboardType}
      mode="outlined"
      outlineColor="#004ACE"
      maxLength={maxLength || 55}
      secureTextEntry={secureTextEntry}
      autoCorrect={false}
      editable={editable}
      theme={{
        colors: {
          placeholder: '#707070',
          text: '#3A3A3A',
          primary: '#004ACE',
          background: '#fff',
        },
      }}
      style={[
        styles.textStyle,
        {
          height: height || 45,

          textAlignVertical: 'top',
          marginTop: marginTop,
        },
      ]}
      right={
        <TextInput.Icon
          name={() => (
            <Icon
              name={iconName}
              size={24}
              color={'grey'}
              onPress={iconPress}
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
  },
});

export default Input;
