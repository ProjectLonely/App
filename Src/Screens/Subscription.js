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
import LoadingView from '../Common/LoadingView';
var qs = require('qs');
const PaymentRequest = require('react-native-payments').PaymentRequest;

// App In Purchase
import RNIap, {
  InAppPurchase,
  PurchaseError,
  SubscriptionPurchase,
  acknowledgePurchaseAndroid,
  consumePurchaseAndroid,
  finishTransaction,
  finishTransactionIOS,
} from 'react-native-iap';
import moment from 'moment';

const itemSkus = Platform.select({
  ios: [
    'org.digimonk.cheerio.Tier1',
    'org.digimonk.cheerio.Tier2',
    'org.digimonk.cheerio.Tier3',
  ],
  android: ['android.test.purchased'],
});
// const itemSubs = Platform.select({
//   ios: ['org.digimonk.cheerio.Tier1'],
//   android: ['test.sub1'],
// });
let purchaseUpdatedListener;
let purchaseErrorListener;

class Subscription extends Component {
  state = {
    paymentModal: false,
    subscriptionArray: [],
    modalValue: false,
    message: '',
    subscriptionPlans: [],
    planLoader: true,
  };

  componentDidMount = async () => {
    const date = '1638186081000';

    console.log(moment(date).format('DD MM YYYY'));
    const token = await AsyncStorage.getItem('token');
    this.setState({token});
    // this.props.SubscriptionPlan(token);
    ////
    RNIap.initConnection()
      .catch((error) => {
        console.log(error, 'Connection Error');
      })
      .then(async () => {
        //////////////////// get the subscription list here ////////////////
        const purchases = await RNIap.getProducts(itemSkus)
          .catch(() => console.log(error, 'Error to get the product '))
          .then((result) => {
            console.log(result, 'resutl list');
            if (result.length > 0) {
              this.setState({
                subscriptionPlans: result,
                planLoader: false,
              });
            }
          });
      });
    purchaseUpdatedListener = RNIap.purchaseUpdatedListener((purchase) => {
      try {
        const reciept = purchase.transactionReceipt;
        if (reciept) {
          ///// call back end API's
          this.apiCall(purchase.transactionId, purchase.productId);
          RNIap.finishTransaction(purchase);
        }
      } catch (error) {
        console.log(error, 'Error while purchaseing');
      }
    });
    purchaseErrorListener = RNIap.purchaseErrorListener((error) => {
      console.log(error, 'test error');
    });
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
  };

  apiCall = (transactionId, productId) => {
    const {beneficiaryData} = this.props;

    this.setState({submitLoader: true});
    console.log({
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
      transaction_id: transactionId,
      product_id: productId,
    });
    axios({
      method: 'post',
      url: `${baseurl}beneficiary/create/`,
      headers: {Authorization: 'Token ' + this.state.token},
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
        transaction_id: transactionId,
        product_id: productId,
      },
    })
      .then((response) => {
        console.log('created', response);
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
        console.log(err.response.data, 'eroror');
        this.setState({
          payLoader: false,
          modalValue: true,
          message: Object.values(err.response.data).toString(),
          submitLoader: false,
        });
      });
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

  /////// FUNCTION TO PURCHASE THE SUBSCRIPTION  /////////////////
  PurchaseSubscription = async (productId, productPrice) => {
    try {
      RNIap.requestSubscription(productId);
      this.props.addBenificiary({productId, productPrice});
    } catch (err) {
      Alert.alert(err.message);
    }
  };
  render() {
    const {subscriptionList} = this.props;
    const {modalValue, message, paymentModal, subscriptionPlans, planLoader} =
      this.state;

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

        {planLoader ? (
          <LoadingView heightValue={1.2} />
        ) : (
          <View style={{height: '90%', alignItems: 'center', paddingTop: '4%'}}>
            <FlatList
              data={subscriptionPlans}
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
                          {item.title}
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
                            ${item.price}
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
                          onPress={
                            () =>
                              this.PurchaseSubscription(
                                item.productId,
                                item.price,
                              )
                            // this.addBenificiary(item.id, item.price_per_month)
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
        )}
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
  console.log(state, 'rohit list');
  return {
    subscriptionList: state.SubscriptionPlan,
    beneficiaryData: state.AddBeneficiaryReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({SubscriptionPlan, addBenificiary}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Subscription);
