import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  FlatList,
  Image,
  LayoutAnimation,
  Platform,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import FontStyle from '../../Assets/Fonts/FontStyle';
import Header from '../../Common/Header';
import Button from '../../Common/Button';
import Slider from '@react-native-community/slider';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addBenificiary, completeBeneficiary} from '../../store/actions/index';
import axios from 'axios';
import {baseurl} from '../../Common/Baseurl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AlertModal from '../../Common/AlertModal';

class AddBenificiaryPage3 extends Component {
  state = {
    modalValue: false,
    dayId: '',
    expandValue: false,
    newArray: [],
    dayOption: [
      {id: '0', day: 'Monday'},
      {id: '1', day: 'Tuesday'},
      {id: '2', day: 'Wednesday'},
      {id: '3', day: 'Thursday'},
      {id: '4', day: 'Friday'},
      {id: '5', day: 'Saturday'},
      {id: '6', day: 'Sunday'},
    ],
    timeOption: [
      {id: '0', time: '7am - 10am'},
      {id: '1', time: '10am - 1pm'},
      {id: '2', time: '1pm - 4pm'},
      {id: '3', time: '4pm - 7pm'},
      {id: '4', time: '7pm - 10pm'},
    ],
    sliderValue: '0',
  };

  next = async () => {
    const {beneficiaryData} = this.props;
    this.setState({submitLoader: true});
    const token = await AsyncStorage.getItem('token');
    this.props.completeBeneficiary();
    axios({
      method: 'post',
      url: `${baseurl}beneficiary/create/`,
      headers: {Authorization: 'Token ' + token},
      data: {
        relation: beneficiaryData.relationShipId,
        name: beneficiaryData.name,
        age: beneficiaryData.age,
        gender: beneficiaryData.genderId,
        timezone: beneficiaryData.timeZone,
        phone_no: beneficiaryData.phoneNumber,
        about: beneficiaryData.aboutPerson,
        comment: beneficiaryData.comment,
        seekings: beneficiaryData.seekingOption,
        schedule: beneficiaryData.newArray,
      },
    })
      .then((response) => {
        this.setState({submitLoader: false});
        if (response.status == 201) {
          this.setState({
            modalValue: true,
            message: 'Beneficiary added successfully',
          });
        }
      })
      .catch((err) => {
        this.setState({
          modalValue: true,
          message: 'Something went wrong',
          submitLoader: false,
        });
      });
  };

  expandOption = (dayId) => {
    if (dayId == this.state.dayId) {
      this.setState({dayId: ''});
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    } else {
      this.setState({dayId: dayId});
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
  };

  addDayTimer = (dayName) => {
    const newArray = this.props.beneficiaryData.newArray;
    if (newArray.some((data) => data.dayName == dayName)) {
      const index = newArray.findIndex((obj) => obj.dayName == dayName);
      newArray[index] = {
        dayName: dayName,
        sliderValue: this.state.sliderValue,
        timeOption: this.state.timeOption[this.state.sliderValue].time,
      };
    } else {
      newArray.push({
        dayName: dayName,
        sliderValue: this.state.sliderValue,
        timeOption: this.state.timeOption[this.state.sliderValue].time,
      });
    }
    this.props.addBenificiary({newArray: newArray});
  };

  closeModal = () => {
    this.setState({modalValue: false});
    this.props.navigation.navigate('AddBenificiaryPage4');
  };

  render() {
    const {dayOption, dayId, timeOption, newArray, modalValue, message} =
      this.state;

    return (
      <View
        style={{
          height: '100%',
          width: '100%',
          backgroundColor: '#fff',
        }}>
        <SafeAreaView />
        <Header leftIcon={true} middleText={'Set up a call schedule'} />
        <View style={{height: '65%'}}>
          <AlertModal
            modalValue={modalValue}
            closeModal={() => this.closeModal()}
            message={message}
          />
          <FlatList
            data={dayOption}
            showsVerticalScrollIndicator={false}
            renderItem={({item: dayOption}) => {
              return (
                <View
                  style={[
                    styles.expandview,
                    {
                      height: dayId == dayOption.id ? 200 : 50,
                      overflow: 'hidden',
                      backgroundColor: this.props.beneficiaryData.newArray.some(
                        (newArray) => newArray.dayName == dayOption.day,
                      )
                        ? '#004ACE'
                        : '#D5FAFB',
                    },
                  ]}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      justifyContent: 'space-between',
                    }}
                    onPress={() => this.expandOption(dayOption.id)}>
                    <Text
                      style={[
                        styles.normalText,
                        {
                          color: this.props.beneficiaryData.newArray.some(
                            (newArray) => newArray.dayName == dayOption.day,
                          )
                            ? '#FFF'
                            : '#004ACE',
                        },
                      ]}>
                      {dayOption.day}
                    </Text>
                    {dayOption.id == dayId ? (
                      this.props.beneficiaryData.newArray.some(
                        (newArray) => newArray.dayName == dayOption.day,
                      ) ? (
                        <Image
                          source={require('../../Assets/Images/crosswhite.png')}
                          style={{height: 24, width: 24, resizeMode: 'contain'}}
                        />
                      ) : (
                        <Image
                          source={require('../../Assets/Images/cross.png')}
                          style={{height: 24, width: 24, resizeMode: 'contain'}}
                        />
                      )
                    ) : this.props.beneficiaryData.newArray.some(
                        (newArray) => newArray.dayName == dayOption.day,
                      ) ? (
                      <Image
                        source={require('../../Assets/Images/pluswhite.png')}
                        style={{height: 24, width: 24, resizeMode: 'contain'}}
                      />
                    ) : (
                      <Image
                        source={require('../../Assets/Images/plus.png')}
                        style={{height: 24, width: 24, resizeMode: 'contain'}}
                      />
                    )}
                  </TouchableOpacity>
                  {dayOption.id == dayId ? (
                    <FlatList
                      data={this.props.beneficiaryData.newArray}
                      renderItem={({item: newArray}) => {
                        return newArray.dayName == dayOption.day ? (
                          <View
                            style={{
                              flexDirection: 'row',
                              marginTop: '5%',
                              marginBottom: '2.5%',
                            }}>
                            <View
                              style={{
                                width: 84,
                                height: 28,
                                borderWidth: 1,
                                borderColor: '#004ACE',
                                borderRadius: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#fff',
                                marginHorizontal: '5%',
                              }}>
                              <Text>{newArray.timeOption}</Text>
                            </View>
                          </View>
                        ) : null;
                      }}
                    />
                  ) : null}
                  {dayOption.id == dayId ? (
                    <Slider
                      thumbTintColor={
                        this.props.beneficiaryData.newArray.some(
                          (newArray) => newArray.dayName == dayOption.day,
                        )
                          ? '#fff'
                          : '#004ACE'
                      }
                      style={{
                        width: '100%',
                        height: 40,
                      }}
                      minimumValue={0}
                      maximumValue={4}
                      step={1}
                      minimumTrackTintColor="#FFFFFF"
                      maximumTrackTintColor="#FFFFFF"
                      onValueChange={(value) =>
                        this.setState({
                          sliderValue: value,
                        })
                      }
                    />
                  ) : null}
                  <View style={{flexDirection: 'row'}}>
                    {dayOption.id == dayId
                      ? timeOption.map((time) => {
                          return (
                            <View
                              style={{
                                width: '20%',
                                marginHorizontal: '0.5%',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <Text
                                style={{
                                  fontFamily: FontStyle.medium,
                                  fontSize: 10,
                                  color:
                                    this.props.beneficiaryData.newArray.some(
                                      (newArray) =>
                                        newArray.dayName == dayOption.day,
                                    )
                                      ? '#fff'
                                      : '#000',
                                }}>
                                {time.time}
                              </Text>
                            </View>
                          );
                        })
                      : null}
                  </View>
                  {dayOption.id == dayId ? (
                    <TouchableOpacity
                      onPress={() => this.addDayTimer(dayOption.day)}
                      style={{
                        height: 26,
                        width: 62,
                        backgroundColor:
                          this.props.beneficiaryData.newArray.some(
                            (newArray) => newArray.dayName == dayOption.day,
                          )
                            ? '#FFF'
                            : '#004ACE',
                        borderRadius: 5,
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignSelf: 'flex-end',
                        marginTop: '5%',
                      }}>
                      <Text
                        style={{
                          fontFamily: FontStyle.bold,
                          fontSize: 13,
                          color: this.props.beneficiaryData.newArray.some(
                            (newArray) => newArray.dayName == dayOption.day,
                          )
                            ? '#004ACE'
                            : '#fff',
                        }}>
                        ADD
                      </Text>
                    </TouchableOpacity>
                  ) : null}
                </View>
              );
            }}
          />
        </View>

        <Button onPress={() => this.next()}>NEXT</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  expandview: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#D5FAFB',
    marginVertical: '1%',
    borderRadius: 20,
    paddingTop: '3.5%',
    paddingHorizontal: '5%',
  },
  normalText: {
    fontFamily: FontStyle.medium,
    color: '#004ACE',
    fontSize: 16,
  },
});

function mapStateToProps(state) {
  return {
    beneficiaryData: state.AddBeneficiaryReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({addBenificiary, completeBeneficiary}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddBenificiaryPage3);
