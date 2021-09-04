import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import FontStyle from '../../Assets/Fonts/FontStyle';
import Header from '../../Common/Header';
import Styles from '../../Common/Style';
import AlertModal from '../../Common/AlertModal';

class Billing extends Component {
  state = {
    modalValue: false,
    billingData: {
      planName: 'Advanced',
      dueDate: 'Sept 11, 2021',
      planPrice: '150',
      transactionArray: [
        {
          id: '0',
          status: 'Payment Successfull',
          dateTime: '02 Aug,2021 | 06:25PM',
          amount: '150',
        },
        {
          id: '1',
          status: 'Payment Successfull',
          dateTime: '01 July,2021 | 06:25PM',
          amount: '150',
        },
      ],
    },
  };
  render() {
    const {billingData, modalValue} = this.state;
    return (
      <View style={{backgroundColor: '#fff', height: '100%', width: '100%'}}>
        <SafeAreaView />

        <Header
          leftIcon={true}
          middleText={'Billing'}
          notification={true}
          notifyPress={() => this.props.navigation.navigate('Notification')}
        />
        <View style={{width: '100%'}}>
          <AlertModal
            modalValue={modalValue}
            closeModal={() => this.setState({modalValue: false})}
          />
          <Text
            style={{
              fontFamily: FontStyle.bold,
              color: '#12175E',
              fontSize: 22,
              paddingHorizontal: '5%',
            }}>
            Current Plan
          </Text>
          <View
            style={{
              marginVertical: '5%',
              height: '30%',
              width: '90%',
              backgroundColor: '#fff',
              padding: '5%',
              borderRadius: 5,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.27,
              shadowRadius: 2.65,
              alignSelf: 'center',
              elevation: 2,
            }}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <View>
                <Text
                  style={{
                    fontFamily: FontStyle.bold,
                    fontSize: 18,
                    color: '#0F0A39',
                    lineHeight: 22,
                  }}>
                  {billingData.planName}
                </Text>

                <Text
                  style={{
                    fontFamily: FontStyle.regular,
                    fontSize: 16,
                    color: '#004ACE',
                    lineHeight: 22,
                  }}>
                  {`Next due date\n${billingData.dueDate}`}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: FontStyle.bold,
                    fontSize: 36,
                    color: '#0F0A39',
                  }}>{`$${billingData.planPrice}`}</Text>
                <Text
                  style={{
                    fontFamily: FontStyle.regular,
                    fontSize: 22,
                    color: '#0F0A39',
                  }}>{`Per month`}</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: '5%',
              }}>
              <TouchableOpacity
                onPress={() =>
                  this.setState({modalValue: !this.state.modalValue})
                }
                style={styles.buttonStyle}>
                <Text style={styles.buttonText}>CANCEL PLAN</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.buttonStyle,
                  {
                    backgroundColor: '#fff',
                    borderColor: '#004ACE',
                    borderWidth: 1,
                  },
                ]}>
                <Text style={[styles.buttonText, {color: '#004ACE'}]}>
                  UPGRADE
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text
            style={{
              fontFamily: FontStyle.bold,
              fontSize: 18,
              color: '#12175E',
              paddingHorizontal: '5%',
            }}>
            Transaction
          </Text>
          <FlatList
            data={billingData.transactionArray}
            showsVerticalScrollIndicator={false}
            renderItem={({item: transaction}) => {
              return (
                <View style={Styles.smallContainer}>
                  <View>
                    <Text
                      style={{
                        fontFamily: FontStyle.bold,
                        fontSize: 16,
                        color: '#4C4C4C',
                      }}>
                      {transaction.status}
                    </Text>
                    <Text
                      style={{
                        fontFamily: FontStyle.regular,
                        fontSize: 12,
                        color: '#99A2B4',
                      }}>
                      {transaction.dateTime}
                    </Text>
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <Text
                      style={{
                        fontFamily: FontStyle.bold,
                        fontSize: 16,
                        color: '#027BFF',
                      }}>
                      ${transaction.amount}
                    </Text>
                    <Text
                      style={{
                        fontFamily: FontStyle.regular,
                        fontSize: 12,
                        color: '#1F9F00',
                      }}>
                      SuccessFull
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    width: '45%',
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#004ACE',
    borderRadius: 10,
  },
  buttonText: {
    fontFamily: FontStyle.bold,
    fontSize: 16,
    color: '#fff',
  },
});

export default Billing;
