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
  ScrollView,
} from 'react-native';
import FontStyle from '../../Assets/Fonts/FontStyle';
import Header from '../../Common/Header';
import Button from '../../Common/Button';
import Slider from '@react-native-community/slider';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addBenificiary, completeBeneficiary} from '../../store/actions/index';
import AlertModal from '../../Common/AlertModal';
import Spinner from '../../Common/Spinner';

var qs = require('qs');

const PaymentRequest = require('react-native-payments').PaymentRequest;

class AddBenificiaryPage3 extends Component {
  state = {
    modalValue: false,
    dayId: '',
    payLoader: false,
    completeValue: false,
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
      '7am - 10am',
      '10am - 1pm',
      '1pm - 4pm',
      '4pm - 7pm',
      '7pm - 10pm',
    ],

    // appleKeySK:
    //   'sk_test_51JbzGgJVxtiQnRVupkCeh4NtxrjEmpSeBDPkFLa48K5DjyhK9TeYbLViojM9RGwL4D5FyKZJmbjtKQRTmZdVoUV300vvGNkpcQ',
    // appleKeyPk:
    //   'pk_test_51JbzGgJVxtiQnRVuJ5Kahb2lpum6cOgbXyQRBieZdB7mHEp7lobeGyqfKAi3lRo29zkmAUfe3w9byKuhOKvXjWx600Bf2J1vI8',
  };
  getDay = (id) => {
    return this.state.dayOption.find((day) => Number(day.id) === Number(id));
  };
  // applePay = () => {
  //   var METHOD_DATA = [
  //     {
  //       supportedMethods: ['apple-pay'],
  //       data: {
  //         merchantIdentifier: 'merchant.cheerioApplePay',
  //         supportedNetworks: ['visa', 'mastercard'],
  //         countryCode: 'US',
  //         currencyCode: 'USD',
  //         paymentMethodTokenizationParameters: {
  //           parameters: {
  //             gateway: 'stripe',
  //             'stripe:publishableKey': this.state.appleKeyPk,
  //           },
  //         },
  //       },
  //     },
  //   ];

  //   var DETAILS = {
  //     id: 'basic-example',
  //     displayItems: [
  //       {
  //         label: 'Subscription Plan',
  //         amount: {
  //           currency: 'USD',
  //           value: this.props.beneficiaryData.planAmount,
  //         },
  //       },
  //     ],
  //     total: {
  //       label: 'Cheerio App',
  //       amount: {
  //         currency: 'USD',
  //         value: this.props.beneficiaryData.planAmount,
  //       },
  //     },
  //   };
  //   var paymentRequests = new PaymentRequest(METHOD_DATA, DETAILS);

  //   paymentRequests
  //     .canMakePayments()
  //     .then((canMakePayment) => {
  //       if (canMakePayment) {
  //         paymentRequests.show().then((paymentResponse) => {
  //           // console.log(paymentResponse, 'resposne');
  //           if (paymentResponse._details.paymentToken != '') {
  //             paymentResponse.complete('success');
  //             this.setState({payLoader: true});
  //             axios({
  //               method: 'post',
  //               url: 'https://api.stripe.com/v1/charges',
  //               headers: {
  //                 Authorization: `Bearer ${this.state.appleKeySK}`,
  //                 'Content-Type': 'application/x-www-form-urlencoded',
  //               },
  //               data: qs.stringify({
  //                 amount: this.props.beneficiaryData.planAmount * 100,

  //                 currency: 'usd',
  //                 source: paymentResponse._details.paymentToken,
  //                 description: this.state.userId,
  //               }),
  //             })
  //               .then((response) => {
  //                 console.log(response, 'payment response');
  //                 this.setState({transaction_id: response.data.id});
  //                 if (response.status == 200) {
  //                   setTimeout(() => {
  //                     this.next();
  //                   }, 1000);
  //                 } else {
  //                   alert('Something went wrong');
  //                 }
  //               })
  //               .catch((error) => {
  //                 console.log(error.response, 'rrrrrr');
  //                 alert(error.response.data.error.code);
  //               });
  //           }
  //         });
  //       } else {
  //         this.setState({
  //           SubscribeLoader: false,
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       this.setState({
  //         SubscribeLoader: false,
  //       });

  //       this.paymentRequest.abort();
  //     });
  // };

  // next = async () => {
  //   const {beneficiaryData} = this.props;
  //   this.setState({submitLoader: true});
  //   const token = await AsyncStorage.getItem('token');
  //   if (beneficiaryData.newArray.length < 1) {
  //     this.setState({
  //       modalValue: true,
  //       message: 'Call schedule should not be blank.',
  //     });
  //   } else {
  //     axios({
  //       method: 'post',
  //       url: `${baseurl}beneficiary/create/`,
  //       headers: {Authorization: 'Token ' + token},
  //       data: {
  //         relation: beneficiaryData.relationShipId,
  //         name: beneficiaryData.name,
  //         age: beneficiaryData.age,
  //         gender: beneficiaryData.genderId,
  //         timezone: beneficiaryData.timeZone,
  //         phone_no: beneficiaryData.phoneNumber,
  //         about: beneficiaryData.aboutPerson,
  //         comment: beneficiaryData.comment,
  //         seekings: beneficiaryData.selectedSeekOption,
  //         schedule: beneficiaryData.newArray,
  //         image: beneficiaryData.base64,
  //         plan_id: beneficiaryData.planId,
  //         transaction_id: this.state.transaction_id,
  //       },
  //     })
  //       .then((response) => {
  //         // this.setState({submitLoader: false});
  //         if (response.status == 201) {
  //           this.setState({
  //             payLoader: false,
  //             completeValue: true,
  //             modalValue: true,
  //             payLoader: false,
  //             message: 'Beneficiary added successfully',
  //           });
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(Object.values(err.response));
  //         this.setState({
  //           payLoader: false,
  //           modalValue: true,
  //           message: Object.values(err.response.data).toString(),
  //           submitLoader: false,
  //         });
  //       });
  //   }
  // };

  expandOption = (dayId) => {
    if (dayId == this.state.dayId) {
      this.setState({dayId: ''});
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    } else {
      this.setState({dayId: dayId});
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
  };

  addDayTimer = (dayName, timeOption) => {
    var newArray = [];
    newArray = this.props.beneficiaryData.newArray;

    if (
      newArray.some(
        (data) => data.dayName == dayName && data.timeOption == timeOption,
      )
    ) {
      const dayIndex = this.props.beneficiaryData.newArray.findIndex(
        (data) => data.dayName == dayName && data.timeOption == timeOption,
      );
      newArray.splice(dayIndex, 1);
    } else {
      newArray.push({
        dayName: dayName,
        timeOption: timeOption,
      });
    }
    this.props.addBenificiary({newArray: newArray, timeOption: timeOption});
  };

  closeModal = () => {
    if (this.state.completeValue) {
      this.setState({modalValue: false, completeValue: false});
      this.props.navigation.navigate('AddBenificiaryPage4');
    } else {
      this.setState({modalValue: false});
    }
  };

  renderButton = () => {
    if (this.state.payLoader) {
      return (
        <View style={{width: '100%', alignItems: 'center'}}>
          <Spinner spinnercolor="#fff" marginTop={17.5} />
        </View>
      );
    } else {
      return (
        <Button onPress={() => this.props.navigation.navigate('Subscription')}>
          NEXT
        </Button>
      );
    }
  };
  removeItem = (val1, val2) => {
    console.warn(val1, val2);
  };

  removeTime = (time) => {
    const newArray = this.props.beneficiaryData.newArray;
    const index = newArray.findIndex(
      (data) =>
        data.sliderValue == time.sliderValue && data.dayName == time.dayName,
    );
    newArray.splice(index, 1);
    this.props.addBenificiary({newArray: newArray});
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
        {/* <SafeAreaView /> */}
        <Header
          leftIcon={true}
          middleText={'Select Beneficiary Availability'}
        />
        <View style={{height: '65%', paddingTop: '4%'}}>
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
                        (el) => el.dayName == dayOption.day,
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
                            (el) => el.dayName == dayOption.day,
                          )
                            ? '#FFF'
                            : '#004ACE',
                        },
                      ]}>
                      {dayOption.day}
                    </Text>
                    {dayOption.id == dayId ? (
                      <Image
                        source={require('../../Assets/Images/crosswhite.png')}
                        style={{height: 24, width: 24, resizeMode: 'contain'}}
                      />
                    ) : (
                      <Image
                        source={require('../../Assets/Images/pluswhite.png')}
                        style={{height: 24, width: 24, resizeMode: 'contain'}}
                      />
                    )}
                  </TouchableOpacity>
                  <FlatList
                    style={{marginTop: '5%', alignItems: 'center'}}
                    data={timeOption}
                    numColumns={3}
                    renderItem={({item}) => {
                      return (
                        <TouchableOpacity
                          onPress={() => this.addDayTimer(dayOption.day, item)}
                          style={[
                            styles.tabStyle,
                            {
                              borderColor:
                                this.props.beneficiaryData.newArray.some(
                                  (el) =>
                                    el.dayName == dayOption.day &&
                                    el.timeOption == item,
                                )
                                  ? '#D5FAFB'
                                  : '#004ACE',
                              backgroundColor:
                                this.props.beneficiaryData.newArray.some(
                                  (el) =>
                                    el.dayName == dayOption.day &&
                                    el.timeOption == item,
                                )
                                  ? '#004ACE'
                                  : '#D5FAFB',
                            },
                          ]}>
                          <Text
                            style={{
                              fontFamily: FontStyle.medium,
                              color: this.props.beneficiaryData.newArray.some(
                                (newArray) =>
                                  newArray.timeOption == item &&
                                  newArray.dayName == dayOption.day,
                              )
                                ? '#fff'
                                : '#004ACE',
                            }}>
                            {item}
                          </Text>
                        </TouchableOpacity>
                      );
                    }}
                  />
                  {/* {dayOption.id == dayId ? (
                    <FlatList
                      style={{
                        width: '100%',
                      }}
                      showsHorizontalScrollIndicator={false}
                      horizontal={true}
                      data={this.props.beneficiaryData.newArray}
                      renderItem={({item: newArray}) => {
                        console.log(newArray, 'newArray');
                        return newArray.dayName == dayOption.day ? (
                          <View
                            style={{
                              height: 28,
                              width: 100,
                              marginRight: 5,
                              marginTop: 10,
                            }}>
                            <TouchableOpacity
                              onPress={() => this.removeTime(newArray)}
                              style={{
                                alignSelf: 'flex-end',
                                // backgroundColor: 'green',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'absolute',
                                zIndex: 999,
                                top: -5,
                              }}>
                              <Text style={{fontSize: 16, color: 'red'}}>
                                X
                              </Text>
                            </TouchableOpacity>
                            <View
                              style={{
                                width: 100,
                                height: 28,
                                borderWidth: 1,
                                borderColor: '#004ACE',
                                borderRadius: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#fff',
                                marginHorizontal: '5%',
                                marginVertical: 6,
                              }}>
                              <Text>{newArray.timeOption}</Text>
                            </View>
                          </View>
                        ) : null;
                      }}
                    />
                  ) : null} */}
                  {/* {dayOption.id == dayId ? (
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
                        this.setState({sliderValue: value})
                      }
                    />
                  ) : null} */}
                  {/* <View style={{flexDirection: 'row'}}>
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
                  </View> */}
                  {/* {dayOption.id == dayId ? (
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
                        marginVertical: '5%',
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
                  ) : null} */}
                </View>
              );
            }}
          />
        </View>

        {this.renderButton()}
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
  tabStyle: {
    backgroundColor: '#fff',
    marginLeft: '5%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#004ACE',
    marginVertical: 10,
    height: 26,
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

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
)(AddBenificiaryPage3);
