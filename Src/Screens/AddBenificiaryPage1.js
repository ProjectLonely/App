import React, {Component} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import Header from '../Common/Header';
import Input from '../Common/Input';
import FontStyle from '../Assets/Fonts/FontStyle';
import Button from '../Common/Button';
import ModalDropdown from 'react-native-modal-dropdown';
import SearchableDropdown from 'react-native-searchable-dropdown';

import Icon from 'react-native-vector-icons/FontAwesome';

class AddBenificiaryPage1 extends Component {
  state = {
    relationOption: ['Self', 'Mother', 'Father', 'Spouse', 'Others'],
    relationShipId: 2,
    genderOption: ['Men', 'Women', 'Other'],
    genderId: 0,
    selectedItems: '',
    relationShipArray: [
      {
        id: 1,
        name: 'Self',
      },
      {
        id: 2,
        name: 'Mother',
      },
      {
        id: 3,
        name: 'Father',
      },
      {
        id: 4,
        name: 'Spouse',
      },
      {
        id: 5,
        name: 'Other',
      },
    ],
  };
  render() {
    const {
      relationShipArray,
      selectedItems,
      genderOption,
      genderId,
      relationOption,
      relationShipId,
    } = this.state;

    return (
      <View
        style={{
          height: '100%',
          width: '100%',
          alignItems: 'center',
          backgroundColor: '#fff',
        }}>
        <SafeAreaView />
        <Header leftIcon={true} middleText={'Add Beneficiary'} />
        <ModalDropdown
          onSelect={(item) => this.setState({relationShipId: item})}
          isFullWidth={true}
          showsVerticalScrollIndicator={false}
          dropdownStyle={{
            backgroundColor: '#fff',
            paddingHorizontal: '1%',
            borderColor: '#004ACE',
            borderWidth: 1,
            height: 180,
            width: '88%',
            marginHorizontal: '1%',
          }}
          dropdownTextStyle={{
            fontSize: 18,
            fontFamily: FontStyle.regular,
            color: '#707070',
            paddingHorizontal: '5%',
          }}
          textStyle={{
            fontSize: 20,
            fontFamily: FontStyle.bold,
            color: '#707070',
            paddingHorizontal: '5%',
          }}
          style={{
            width: '90%',
            height: 55,
            justifyContent: 'flex-end',
            borderWidth: 1,
            borderColor: '#004ACE',
            borderRadius: 5,
          }}
          options={relationOption}>
          <View
            style={{
              flexDirection: 'row',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: '2.5%',
            }}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: FontStyle.bold,
                color: '#707070',
              }}>
              {relationOption[relationShipId]}
            </Text>
            <Icon name="chevron-down" size={24} color={'grey'} />
          </View>
        </ModalDropdown>

        <Input
          placeholder="Enter Name"
          onChangeText={(text) => this.setState({name: text})}
        />
        <Input
          placeholder="Enter Age"
          onChangeText={(text) => this.setState({name: text})}
          keyboardType={'number-pad'}
        />
        <ModalDropdown
          onSelect={(item) => this.setState({genderId: item})}
          isFullWidth={true}
          showsVerticalScrollIndicator={false}
          dropdownStyle={{
            backgroundColor: '#fff',
            paddingHorizontal: '1%',
            borderColor: '#004ACE',
            borderWidth: 1,
            height: 180,
            width: '88%',
            marginHorizontal: '1%',
          }}
          dropdownTextStyle={{
            fontSize: 18,
            fontFamily: FontStyle.regular,
            color: '#707070',
            paddingHorizontal: '5%',
          }}
          textStyle={{
            fontSize: 20,
            fontFamily: FontStyle.bold,
            color: '#707070',
            paddingHorizontal: '5%',
          }}
          style={{
            width: '90%',
            height: 55,
            justifyContent: 'flex-end',
            borderWidth: 1,
            borderColor: '#004ACE',
            borderRadius: 5,
          }}
          options={genderOption}>
          <View
            style={{
              flexDirection: 'row',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: '2.5%',
            }}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: FontStyle.bold,
                color: '#707070',
              }}>
              {genderOption[genderId]}
            </Text>
            <Icon name="chevron-down" size={24} color={'grey'} />
          </View>
        </ModalDropdown>

        <Input
          placeholder="TimeZone"
          onChangeText={(text) => this.setState({name: text})}
          iconName="chevron-down"
        />
        <Input
          placeholder="Phone Number"
          onChangeText={(text) => this.setState({name: text})}
        />
        <Button
          onPress={() => this.props.navigation.navigate('AddBenificiaryPage2')}>
          NEXT
        </Button>
      </View>
    );
  }
}

export default AddBenificiaryPage1;
