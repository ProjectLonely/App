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
} from 'react-native';
import FontStyle from '../Assets/Fonts/FontStyle';
const {height, width} = Dimensions.get('window');
import Button from '../Common/Button';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {SubscriptionPlan, addBenificiary} from '../store/actions/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
class Subscription extends Component {
  state = {
    subscriptionArray: [],
  };

  componentDidMount = async () => {
    const token = await AsyncStorage.getItem('token');
    this.props.SubscriptionPlan(token);
  };

  addBenificiary = (planId, planAmount) => {
    this.props.addBenificiary({planId, planAmount});
    this.props.navigation.navigate('AddBenificiaryPage1');
  };

  render() {
    const {subscriptionList} = this.props;
    console.log(subscriptionList, 'sub list');
    return (
      <ImageBackground
        source={require('../Assets/Images/splashWhite.png')}
        style={{height: '100%', width: '100%'}}
        resizeMode="cover">
        <SafeAreaView />

        <View style={{height: '90%', alignItems: 'center'}}>
          <TouchableOpacity
            style={{
              width: '10%',
              alignSelf: 'flex-start',
              marginHorizontal: '5%',
              height: 30,
            }}
            onPress={() => this.props.navigation.goBack()}>
            <Image
              source={require('../Assets/Images/back.png')}
              style={{
                width: 25,
                height: 23,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
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
                    {/* <Image
                      source={{uri: item.image}}
                      style={styles.imageStyle}
                    /> */}
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
                      <Text>{item.description}</Text>
                      {/* {item.descriptions.map((description) => {
                        return (
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Image
                              source={require('../Assets/Images/right.png')}
                              style={{
                                height: 20,
                                width: 20,
                                resizeMode: 'contain',
                                marginVertical: 5,
                              }}
                            />
                            <Text
                              ellipsizeMode={'tail'}
                              numberOfLines={2}
                              style={{
                                fontFamily: FontStyle.regular,
                                fontSize: 14,
                                color: '#3A3A3A',
                                paddingLeft: 5,
                                width: '80%',
                              }}>
                              {description.description}
                            </Text>
                          </View>
                        );
                      })} */}
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
                            fontFamily: FontStyle.regular,
                            fontSize: 22,
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
                        marginTop={40}
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
    height: 220,
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
