import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Keyboard,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import Style from './Style';
import Input from './Input';
import Button from './Button';
import {CreditCardInput} from 'react-native-credit-card-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Stripe from 'react-native-stripe-api';
import axios from 'axios';
import qs from 'qs';
import {baseurl} from './Baseurl';
import Spinner from './Spinner';
// import Spinner from '../common/Spinner';

const PaymentCartModal = ({
  paymentModal,
  closeModal,
  userId,
  modaldata,
  cartBalance,
}) => {
  const [amount, setAmount] = useState('100');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvc, setCvc] = useState('');
  const [showView, setShowView] = useState(false);
  const [spinnerValue, setSpinnerValue] = useState(false);
  const [modalValue, setModalValue] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const [amountData, setAmountData] = useState();
  const _onChange = (data) => {
    const expiry = data.values.expiry.split('/');
    setCardNumber(data.values.number.toString());
    setExpiryMonth(expiry[0]);
    setExpiryYear(expiry[1]);
    setCvc(data.values.cvc);
  };

  const Continue = async () => {
    setSpinnerValue(true);
    const apiKey =
      'pk_test_51JbzGgJVxtiQnRVuJ5Kahb2lpum6cOgbXyQRBieZdB7mHEp7lobeGyqfKAi3lRo29zkmAUfe3w9byKuhOKvXjWx600Bf2J1vI8';
    const client = new Stripe(apiKey);
    try {
      var token = await client.createToken({
        number: cardNumber,
        exp_month: expiryMonth,
        exp_year: expiryYear,
        cvc: cvc,
      });
    } catch (Error) {
      // console.log(Error, 'rohit error');
      setSpinnerValue(false);
      alert(Error);
      // setModalValue(true);
      // setAlertMessage(err);
    }

    var Paymentdata = qs.stringify({
      amount: 2000,
      currency: 'usd',
      source: token.id,
      description: 'Subscribe',
    });

    axios({
      method: 'post',
      url: 'https://api.stripe.com/v1/charges',
      headers: {
        Authorization: `Bearer sk_test_51JbzGgJVxtiQnRVupkCeh4NtxrjEmpSeBDPkFLa48K5DjyhK9TeYbLViojM9RGwL4D5FyKZJmbjtKQRTmZdVoUV300vvGNkpcQ`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: Paymentdata,
    })
      .then((response) => {
        console.log(response, 'respose');
        // if (response.status == 200) {
        //   axios({
        //     method: 'post',
        //     url: `${baseurl}addmoney`,
        //     data: {
        //       userid: userId,
        //       amount: response.data.amount,
        //     },
        //   })
        //     .then((response) => {
        //       if (response.data.status == 1) {
        //         // alert(response.data.message);
        //         setSpinnerValue(false);
        //         modaldata(response.data.message);
        //         setCardNumber('');
        //         setExpiryMonth('');
        //         setExpiryYear('');
        //         setCvc('');
        //       }
        //     })
        //     .catch((err) => {
        //       // console.log(err, 'pevious erro');
        //       setSpinnerValue(false);
        //     });
        // }
      })
      .catch((err) => {
        console.log(err.response, 'last error');
        alert(err);
        setSpinnerValue(false);
      });
  };

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      _keyboardDidShow,
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      _keyboardDidHide,
    );
  }, []);

  const _keyboardDidShow = () => {
    setShowView(true);
  };

  const _keyboardDidHide = () => {
    setShowView(false);
  };
  const renderContinue = () => {
    if (spinnerValue == true) {
      return (
        <Spinner
          backgroundColor={'#409056'}
          width={'70%'}
          height={45}
          spinnercolor="#fff"
        />
      );
    } else {
      return (
        <Button
          onPress={() => Continue()}
          borderRadius={20}
          bgcolor="#409056"
          textcolor="#fff">
          Continue
        </Button>
      );
    }
  };
  const closeAlertModal = () => {
    setModalValue(false);
  };

  return (
    <View style={{backgroundColor: '#fff'}}>
      <Modal
        isVisible={paymentModal}
        onBackButtonPress={closeModal}
        onBackdropPress={closeModal}
        style={Style.modal}>
        <View
          pointerEvents={spinnerValue ? 'none' : 'auto'}
          style={Style.modalView}>
          <ScrollView
            contentContainerStyle={{paddingBottom: showView ? '60%' : '0%'}}
            keyboardShouldPersistTaps="handled">
            <View style={{padding: 10}}>
              <View style={Style.modalTopRow}>
                <Text style={{fontFamily: 'Montserrat-Bold', color: '#319055'}}>
                  Cart Balance
                </Text>
                <TouchableOpacity
                  style={{alignSelf: 'flex-end'}}
                  onPress={closeModal}>
                  <Image
                    source={require('../Assets/Images/cross.png')}
                    style={Style.modalCloseIcon}
                  />
                </TouchableOpacity>
              </View>
              <View style={{paddingLeft: 15}}>
                <Text
                  style={[Style.modalText, {color: '#319055', fontSize: 20}]}>
                  ${cartBalance}
                </Text>
              </View>

              <View style={{padding: 10, marginTop: 20}}>
                <View
                  style={{
                    width: '100%',
                    borderBottomWidth: 1,
                    borderColor: '#707070',
                    marginVertical: 10,
                  }}
                />

                <View>
                  <Text style={[Style.modalText, {marginVertical: '2.5%'}]}>
                    Topup Wallet
                  </Text>
                  <Input
                    placeholder="Enter Amount"
                    placeholderTextColor="#409056"
                    icon={require('../Assets/Images/cross.png')}
                    bordercolor="#319055"
                    value={amount}
                    onChangeText={(text) => setAmount(text)}
                    keyboardType="number-pad"
                  />
                </View>
                <Text style={[Style.modalText, {marginVertical: '2.5%'}]}>
                  Recommended
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <FlatList
                    data={amountData}
                    horizontal={true}
                    renderItem={({item}) => {
                      return (
                        <TouchableOpacity
                          onPress={() => setAmount(item.amount)}
                          style={{
                            width: 100,
                            height: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 5,
                            borderWidth: 1,
                            marginHorizontal: 5,
                          }}>
                          <Text>{item.amount}</Text>
                        </TouchableOpacity>
                      );
                    }}
                  />
                </View>
                <View
                  style={{
                    marginLeft: -20,
                    marginVertical: '5%',
                  }}>
                  <CreditCardInput
                    validColor="green"
                    invalidColor="#000"
                    labels={{
                      number: 'CARD NUMBER',
                      expiry: 'Exp. Date',
                      cvc: 'CVC',
                    }}
                    onChange={_onChange}
                  />
                </View>
                <View
                  style={{
                    width: '100%',
                    marginVertical: '10%',
                    alignItems: 'center',
                  }}>
                  {renderContinue()}
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default PaymentCartModal;
