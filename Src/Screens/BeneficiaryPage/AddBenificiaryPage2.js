import React, {Component} from 'react';
import {View, Text, SafeAreaView, TextInput, FlatList} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import FontStyle from '../../Assets/Fonts/FontStyle';
import Header from '../../Common/Header';
import Button from '../../Common/Button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addBenificiary} from '../../store/actions/index';
import AlertModal from '../../Common/AlertModal';
import axios from 'axios';
import {baseurl} from '../../Common/Baseurl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Styles from '../../Common/Style';
class AddBenificiaryPage2 extends Component {
  state = {
    checkbox: false,
    selectedSeekOption: [],
    checked: 'checked',
    seekingOption: [],
  };

  componentDidMount = async () => {
    const token = await AsyncStorage.getItem('token');
    axios({
      method: 'get',
      url: `${baseurl}beneficiary/seekings/`,
      headers: {Authorization: `Token ${token}`},
    })
      .then((response) => {
        if (response.status == 200) {
          this.setState({seekingOption: response.data.results});
        }
      })
      .catch((err) => {
        this.setState({modalValue: false, message: 'Something went wrong'});
      });
  };

  next = () => {
    const {beneficiaryData} = this.props;

    if (beneficiaryData.aboutPerson == '') {
      this.setState({
        modalValue: true,
        message: 'About person field should not be blank',
      });
    } else {
      this.props.navigation.navigate('AddBenificiaryPage3');
    }
  };

  selectedSeeking = (option) => {
    const seekingOption = this.props.beneficiaryData.selectedSeekOption;

    if (seekingOption.some((data) => data.id == option)) {
      const index = seekingOption.findIndex((data) => data.id == option);
      seekingOption.splice(index, 1);

      this.props.addBenificiary({selectedSeekOption: seekingOption});
    } else {
      seekingOption.push({id: option});
      this.props.addBenificiary({selectedSeekOption: seekingOption});
    }
  };

  render() {
    const {seekingOption, checkbox, select_checkbox, message, modalValue} =
      this.state;

    return (
      <View
        style={{
          height: '100%',
          width: '100%',
          backgroundColor: '#fff',
        }}>
        {/* <SafeAreaView /> */}
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          style={{height: '100%', width: '100%'}}>
          <AlertModal
            modalValue={modalValue}
            closeModal={() => this.setState({modalValue: false})}
            message={message}
          />
          <Header leftIcon={true} middleText={'Add Beneficiary'} />
          <View style={{width: '100%', alignItems: 'center'}}>
            <Text style={[Styles.labelText]}>
              Tell us something about this person.
            </Text>
            <TextInput
              placeholder="Enter detail here"
              value={this.props.beneficiaryData.aboutPerson}
              maxLength={300}
              placeholderTextColor="#707070"
              style={{
                width: '90%',
                height: 200,
                borderWidth: 1,
                borderColor: '#004ACE',
                borderRadius: 5,
                padding: '5%',
              }}
              multiline={true}
              textAlignVertical="top"
              onChangeText={(aboutPerson) =>
                this.props.addBenificiary({aboutPerson})
              }
            />
            <View style={{width: '100%', paddingHorizontal: '5%'}}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: FontStyle.medium,
                  color: '#004ACE',
                  marginVertical: '5%',
                }}>
                What are you seeking from Cheerio
              </Text>
            </View>
            <FlatList
              data={seekingOption}
              style={{width: '90%'}}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => {
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: '100%',
                      height: 50,
                    }}>
                    <CheckBox
                      tintColors={({true: '#F79535'}, {false: '#FFF'})}
                      style={{height: 20, width: 20}}
                      onCheckColor="#fff"
                      boxType="square"
                      onFillColor="#004ACE"
                      onValueChange={() => this.selectedSeeking(item.name)}
                    />
                    <Text
                      style={{
                        fontFamily: FontStyle.regular,
                        fontSize: 16,
                        color: '#2E426E',
                        paddingLeft: '5%',
                      }}>
                      {item.name}
                    </Text>
                  </View>
                );
              }}
            />
            <View style={{width: '100%', paddingHorizontal: '5%', height: 150}}>
              <Text style={[Styles.labelText, {paddingHorizontal: '2%'}]}>
                leave a comment
              </Text>
              <TextInput
                placeholder="Write here"
                maxLength={240}
                placeholderTextColor="#707070"
                style={{
                  width: '100%',
                  minHeight: 70,
                  maxHeight: 140,
                  borderWidth: 1,
                  borderColor: '#004ACE',
                  borderRadius: 5,
                  padding: '5%',
                }}
                multiline={true}
                textAlignVertical="top"
                value={this.props.beneficiaryData.comment}
                onChangeText={(comment) => this.props.addBenificiary({comment})}
              />
            </View>
            <View style={{width: '100%'}}>
              <Button onPress={() => this.next()}>NEXT</Button>
            </View>
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
)(AddBenificiaryPage2);
