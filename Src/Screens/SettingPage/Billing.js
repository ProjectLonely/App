import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import FontStyle from '../../Assets/Fonts/FontStyle';
import Header from '../../Common/Header';
import Styles from '../../Common/Style';
import AlertModal from '../../Common/AlertModal';
import {transactionPlan} from '../../store/actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';

class Billing extends Component {
  state = {
    modalValue: false,
    billingData: [
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
  };

  componentDidMount = () => {
    this.props.transactionPlan();
  };

  render() {
    const {billingData, modalValue} = this.state;
    const {transactionArray, active_plans} = this.props;
    return (
      <View style={{backgroundColor: '#fff', height: '100%', width: '100%'}}>
        <SafeAreaView />

        <Header
          leftIcon={true}
          middleText={'Billing'}
          notification={true}
          notifyPress={() => this.props.navigation.navigate('Notification')}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
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
            <FlatList
              data={active_plans}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => {
                return (
                  <View
                    style={{
                      marginVertical: '5%',
                      height: 140,
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
                          Plan Name: {item.plan_name}
                        </Text>

                        <Text
                          style={{
                            fontFamily: FontStyle.regular,
                            fontSize: 16,
                            color: '#004ACE',
                            lineHeight: 22,
                          }}>
                          {`Next due date\n${moment(item.end_date).format(
                            'DD MMM, YYYY',
                          )}`}
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            fontFamily: FontStyle.bold,
                            fontSize: 36,
                            color: '#0F0A39',
                          }}>{`$${item.price}`}</Text>
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
                );
              }}
            />
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
              data={transactionArray}
              scrollEnabled={false}
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
                        Payment Successfull
                      </Text>
                      <Text
                        style={{
                          fontFamily: FontStyle.regular,
                          fontSize: 12,
                          color: '#99A2B4',
                        }}>
                        {moment(transaction.created_at).format('DD MMM, YYYY')}
                      </Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                      <Text
                        style={{
                          fontFamily: FontStyle.bold,
                          fontSize: 16,
                          color: '#027BFF',
                        }}>
                        ${transaction.price}
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
        </ScrollView>
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

function mapStateToProps(state) {
  console.log(state, 'transaction');
  return {
    transactionArray: state.TransactionReducer.all_transactions,
    active_plans: state.TransactionReducer.active_plans,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({transactionPlan}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Billing);
