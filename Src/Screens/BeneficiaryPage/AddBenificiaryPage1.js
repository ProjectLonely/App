import React, {Component} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import Header from '../../Common/Header';
import Input from '../../Common/Input';
import FontStyle from '../../Assets/Fonts/FontStyle';
import Button from '../../Common/Button';
import ModalDropdown from 'react-native-modal-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addBenificiary} from '../../store/actions/index';

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

  next = () => {
    this.props.navigation.navigate('AddBenificiaryPage2');
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
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          style={{height: '100%', width: '100%'}}
          contentContainerStyle={{alignItems: 'center', paddingBottom: '20%'}}>
          <ModalDropdown
            options={relationOption}
            onSelect={(relationShipId) =>
              this.props.addBenificiary({relationShipId})
            }
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
            }}>
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
                {relationOption[this.props.beneficiaryData.relationShipId]}
              </Text>
              <Icon name="chevron-down" size={24} color={'grey'} />
            </View>
          </ModalDropdown>

          <Input
            placeholder="Enter Name"
            onChangeText={(name) => this.props.addBenificiary({name})}
            value={this.props.beneficiaryData.name}
          />
          <Input
            placeholder="Enter Age"
            onChangeText={(age) => this.props.addBenificiary({age: age})}
            keyboardType={'number-pad'}
            value={this.props.beneficiaryData.age}
          />
          <ModalDropdown
            onSelect={(genderId) => this.props.addBenificiary({genderId})}
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
                {genderOption[this.props.beneficiaryData.genderId]}
              </Text>
              <Icon name="chevron-down" size={24} color={'grey'} />
            </View>
          </ModalDropdown>

          <Input
            placeholder="TimeZone"
            onChangeText={(timeZone) => this.props.addBenificiary({timeZone})}
            value={this.props.beneficiaryData.timeZone}
            // iconName="chevron-down"
          />
          <Input
            placeholder="Phone Number"
            keyboardType={'number-pad'}
            onChangeText={(phoneNumber) =>
              this.props.addBenificiary({phoneNumber})
            }
            value={this.props.beneficiaryData.phoneNumber}
          />
          <View style={{width: '100%', top: '12%'}}>
            <Button onPress={() => this.next()}>NEXT</Button>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    beneficiaryData: state.AddBeneficiaryReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({addBenificiary}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddBenificiaryPage1);
