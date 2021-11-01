import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
  Platform,
} from 'react-native';
import FontStyle from '../Assets/Fonts/FontStyle';
const {height, width} = Dimensions.get('window');
import Button from '../Common/Button';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {SubscriptionPlan, addBenificiary} from '../store/actions/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseurl} from '../Common/Baseurl';
import Header from '../Common/Header';
import axios from 'axios';
import AlertModal from '../Common/AlertModal';
import PaymentCartModal from '../Common/PaymentCartModal';
var qs = require('qs');
const PaymentRequest = require('react-native-payments').PaymentRequest;
class Subscription extends Component {
  state = {
    paymentModal: false,
    subscriptionArray: [],
    modalValue: false,
    message: '',
    appleKeySK:
      'sk_test_51JbzGgJVxtiQnRVupkCeh4NtxrjEmpSeBDPkFLa48K5DjyhK9TeYbLViojM9RGwL4D5FyKZJmbjtKQRTmZdVoUV300vvGNkpcQ',
    appleKeyPk:
      'pk_test_51JbzGgJVxtiQnRVuJ5Kahb2lpum6cOgbXyQRBieZdB7mHEp7lobeGyqfKAi3lRo29zkmAUfe3w9byKuhOKvXjWx600Bf2J1vI8',
  };

  componentDidMount = async () => {
    const token = await AsyncStorage.getItem('token');
    this.props.SubscriptionPlan(token);
  };

  closeModal = () => {
    if (this.state.completeValue) {
      this.setState({modalValue: false, completeValue: false});
      this.props.navigation.navigate('AddBenificiaryPage4');
    } else {
      this.setState({modalValue: false});
    }
  };

  addBenificiary = (planId, planAmount) => {
    this.props.addBenificiary({planId, planAmount});
    setTimeout(() => {
      Platform.OS == 'android'
        ? this.setState({paymentModal: true})
        : this.applePay();
    }, 1000);
    // this.props.navigation.navigate('AddBenificiaryPage1');
  };

  applePay = () => {
    var METHOD_DATA = [
      {
        supportedMethods: ['apple-pay'],
        data: {
          merchantIdentifier: 'merchant.cheerioApplePay',
          supportedNetworks: ['visa', 'mastercard'],
          countryCode: 'US',
          currencyCode: 'USD',
          paymentMethodTokenizationParameters: {
            parameters: {
              gateway: 'stripe',
              'stripe:publishableKey': this.state.appleKeyPk,
            },
          },
        },
      },
    ];

    var DETAILS = {
      id: 'basic-example',
      displayItems: [
        {
          label: 'Subscription Plan',
          amount: {
            currency: 'USD',
            value: this.props.beneficiaryData.planAmount,
          },
        },
      ],
      total: {
        label: 'Cheerio App',
        amount: {
          currency: 'USD',
          value: this.props.beneficiaryData.planAmount,
        },
      },
    };
    var paymentRequests = new PaymentRequest(METHOD_DATA, DETAILS);

    paymentRequests
      .canMakePayments()
      .then((canMakePayment) => {
        if (canMakePayment) {
          paymentRequests.show().then((paymentResponse) => {
            // console.log(paymentResponse, 'resposne');
            if (paymentResponse._details.paymentToken != '') {
              paymentResponse.complete('success');
              this.setState({payLoader: true});
              axios({
                method: 'post',
                url: 'https://api.stripe.com/v1/charges',
                headers: {
                  Authorization: `Bearer ${this.state.appleKeySK}`,
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
                data: qs.stringify({
                  amount: this.props.beneficiaryData.planAmount * 100,

                  currency: 'usd',
                  source: paymentResponse._details.paymentToken,
                  description: this.state.userId,
                }),
              })
                .then((response) => {
                  console.log(response, 'payment response');
                  this.setState({transaction_id: response.data.id});
                  if (response.status == 200) {
                    setTimeout(() => {
                      this.next();
                    }, 1000);
                  } else {
                    alert('Something went wrong');
                  }
                })
                .catch((error) => {
                  console.log(error.response, 'rrrrrr');
                  alert(error.response.data.error.code);
                });
            }
          });
        } else {
          this.setState({
            SubscribeLoader: false,
          });
        }
      })
      .catch((err) => {
        this.setState({
          SubscribeLoader: false,
        });

        this.paymentRequest.abort();
      });
  };

  next = async () => {
    const {beneficiaryData} = this.props;
    this.setState({submitLoader: true});
    const token = await AsyncStorage.getItem('token');
    if (beneficiaryData.newArray.length < 1) {
      this.setState({
        modalValue: true,
        message: 'Call schedule should not be blank.',
      });
    } else {
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
          seekings: beneficiaryData.selectedSeekOption,
          schedule: beneficiaryData.newArray,
          image: beneficiaryData.base64,
          plan_id: beneficiaryData.planId,
          transaction_id: this.state.transaction_id,
        },
      })
        .then((response) => {
          if (response.status == 201) {
            this.setState({
              payLoader: false,
              completeValue: true,
              modalValue: true,
              payLoader: false,
              message: 'Beneficiary added successfully',
            });
          }
        })
        .catch((err) => {
          console.log(Object.values(err.response));
          this.setState({
            payLoader: false,
            modalValue: true,
            message: Object.values(err.response.data).toString(),
            submitLoader: false,
          });
        });
    }
  };

  render() {
    const {subscriptionList} = this.props;
    const {modalValue, message, paymentModal} = this.state;

    return (
      <ImageBackground
        source={require('../Assets/Images/splashWhite.png')}
        style={{height: '100%', width: '100%'}}
        resizeMode="cover">
        <Header
          middleText={'Select Plan'}
          leftIcon={true}
          // notification={true}
          notifyPress={() => this.props.navigation.navigate('Notification')}
        />
        <PaymentCartModal
          paymentModal={paymentModal}
          closeModal={() => this.setState({paymentModal: false})}
        />
        <AlertModal
          modalValue={modalValue}
          closeModal={() => this.closeModal()}
          message={message}
        />

        <View style={{height: '90%', alignItems: 'center', paddingTop: '4%'}}>
          <FlatList
            data={subscriptionList}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <View
                  style={[
                    styles.productView,
                    item.id == this.props.beneficiaryData.planId
                      ? {backgroundColor: 'lightgrey'}
                      : null,
                  ]}>
                  <View style={{flexDirection: 'row', height: '100%'}}>
                    <View
                      style={{
                        width: '100%',
                        height: '100%',
                      }}>
                      <Text
                        style={{
                          fontFamily: FontStyle.bold,
                          fontSize: 18,
                        }}>
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          fontFamily: FontStyle.bold,
                          fontSize: 18,
                        }}>
                        Calls per week : {item.calls_per_week}
                      </Text>
                      <Text style={{fontFamily: FontStyle.regular}}>
                        {item.description}
                      </Text>

                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text
                          style={{
                            fontFamily: FontStyle.bold,
                            fontSize: 36,
                            color: '#0F0A39',
                          }}>
                          ${item.price_per_month}{' '}
                        </Text>
                        <Text
                          style={{
                            fontFamily: FontStyle.bold,
                            fontSize: 36,
                            color: '#0F0A39',
                          }}>
                          Per Month
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontFamily: FontStyle.regular,
                          color: '#004ACE',
                          fontsize: 16,
                        }}>
                        For one Beneficiary
                      </Text>
                      <Button
                        btnheight={40}
                        btnwidth={'70%'}
                        marginTop={30}
                        onPress={() =>
                          this.addBenificiary(item.id, item.price_per_month)
                        }>
                        SELECT
                      </Button>
                    </View>
                  </View>
                </View>
              );
            }}
          />
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Dashboard')}
            style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontFamily: FontStyle.regular,
                fontsize: 16,
                color: '#7B7890',
              }}>
              Not ready to subscribe,
            </Text>
            <Text
              style={{
                fontFamily: FontStyle.regular,
                fontsize: 16,
                color: '#004ACE',
              }}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  productView: {
    minHeight: 220,
    maxHeight: 240,
    width: width / 1.1,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.27,
    shadowRadius: 2.65,

    elevation: 2,
    padding: '5%',
  },
  imageStyle: {
    height: 90,
    width: 90,
  },
});

function mapStateToProps(state) {
  return {
    subscriptionList: state.SubscriptionPlan,
    beneficiaryData: state.AddBeneficiaryReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({SubscriptionPlan, addBenificiary}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Subscription);
