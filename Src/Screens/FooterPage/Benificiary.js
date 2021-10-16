import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  Dimensions,
} from 'react-native';
import FontStyle from '../../Assets/Fonts/FontStyle';
import Footer from '../../Common/Footer';
import Header from '../../Common/Header';
import Button from '../../Common/Button';
import Styles from '../../Common/Style';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getAllBeneficiary, unseenNotification} from '../../store/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import axios from 'axios';
import LoadingView from '../../Common/LoadingView';

import {baseurl} from '../../Common/Baseurl';
import AlertModal from '../../Common/AlertModal';
import ConfirmModal from '../../Common/ConfirmModal';
const {height, width} = Dimensions.get('screen');

class Benificiary extends Component {
  state = {
    beneficiaryArray: [],
    confirmValue: false,
  };

  componentDidMount = async () => {
    const token = await AsyncStorage.getItem('token');
    this.setState({token});
    this.props.getAllBeneficiary(token);
    this.props.unseenNotification(token);
  };

  deleteModal = (beneficiaryId) => {
    this.setState({beneficiaryId, confirmValue: true});
  };

  deleteBeneficiary = () => {
    axios({
      method: 'delete',
      url: `${baseurl}beneficiary/${this.state.beneficiaryId}/`,
      headers: {Authorization: `Token ${this.state.token}`},
    })
      .then((response) => {
        this.setState({confirmValue: false});
        if (response.status == 204) {
          this.props.getAllBeneficiary(this.state.token);
        }
      })
      .catch((err) => {
        this.setState({modalValue: true, message: 'Something went wrong'});
      });
  };

  getBeneficiaryDetail = async (beneficiaryId) => {
    await AsyncStorage.setItem('beneficiaryId', beneficiaryId.toString());
    this.props.navigation.navigate('BeneficiaryDetail');
  };

  pageRefresh = () => {
    this.props.getAllBeneficiary(this.state.token);
  };

  render() {
    const {beneficiaryArray, modalValue, message, unseenValue} = this.props;
    const {confirmValue} = this.state;

    return (
      <View style={{backgroundColor: '#fff', height: '100%', width: '100%'}}>
        <SafeAreaView />
        <View style={{height: '89%', backgroundColor: '#fff'}}>
          <Header
            middleText={'Beneficiaries'}
            notification={true}
            notifyPress={() => this.props.navigation.navigate('Notification')}
          />
          <ConfirmModal
            confirmValue={confirmValue}
            deleteValue={() => this.deleteBeneficiary()}
            closeModal={() => this.setState({confirmValue: false})}
          />
          <AlertModal
            modalValue={modalValue}
            closeModal={() => this.setState({modalValue: false})}
            message={message}
          />
          {this.props.loading ? (
            <LoadingView heightValue={1.2} />
          ) : beneficiaryArray.length < 1 ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
              }}
              refreshControl={
                <RefreshControl
                  refreshing={false}
                  onRefresh={this.pageRefresh}
                  tintColor="#004ACE"
                />
              }>
              <Image
                source={require('../../Assets/Images/beneficiary.png')}
                style={{width: width / 1.6, height: height / 2.4}}
                resizeMode="contain"
              />
              <Text
                style={{
                  fontFamily: FontStyle.regular,
                  fontSize: 23,
                  color: '#575757',
                  textAlign: 'center',
                }}>
                You don't have any beneficiaries.
              </Text>
            </ScrollView>
          ) : (
            <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={false}
                  onRefresh={this.pageRefresh}
                  tintColor="#004ACE"
                />
              }
              data={beneficiaryArray}
              contentContainerStyle={{width: '100%'}}
              showsVerticalScrollIndicator={false}
              renderItem={({item: beneficiaryData}) => {
                console.log(beneficiaryData, 'bene');
                return (
                  <View style={[Styles.smallContainer]}>
                    <TouchableOpacity
                      onPress={() =>
                        this.getBeneficiaryDetail(beneficiaryData.id)
                      }
                      style={{width: '80%'}}>
                      <View style={styles.normalView}>
                        <Image
                          source={require('../../Assets/Images/smalluser.png')}
                          style={styles.imageStyle}
                        />
                        <Text
                          style={{
                            fontFamily: FontStyle.bold,
                            fontSize: 13,
                            color: '#10275A',
                            left: 5,
                          }}>
                          {beneficiaryData.name}
                        </Text>
                      </View>
                      <View style={styles.normalView}>
                        <Image
                          source={require('../../Assets/Images/smallgroup.png')}
                          style={styles.imageStyle}
                        />
                        <Text style={styles.normalText}>
                          {beneficiaryData.relation}
                        </Text>
                      </View>
                      <View style={styles.normalView}>
                        <Image
                          source={require('../../Assets/Images/smallcalendar.png')}
                          style={styles.imageStyle}
                        />
                        <Text style={styles.normalText}>
                          {/* {beneficiaryData.created_at} */}
                          {'Date of last call : '}
                          {moment(beneficiaryData.last_call).format(
                            'MMM,DD YYYY ',
                          )}
                        </Text>
                      </View>
                      <View style={styles.normalView}>
                        <Image
                          source={require('../../Assets/Images/smallcompanion.png')}
                          style={styles.imageStyle}
                        />
                        <Text style={styles.normalText}>
                          {'Companion Operator : '}
                          {beneficiaryData.operator__first_name
                            ? beneficiaryData.operator__first_name
                            : ' waiting to be assigned'}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => this.deleteModal(beneficiaryData.id)}>
                      <Image
                        source={require('../../Assets/Images/delete.png')}
                        style={{height: 50, width: 50, resizeMode: 'contain'}}
                      />
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          )}

          <Button
            onPress={() => this.props.navigation.navigate('Subscription')}>
            ADD NEW BENEFICIARY
          </Button>
        </View>

        <Footer
          footerValue={'benificiary'}
          dashboardPress={() => this.props.navigation.navigate('Dashboard')}
          callLogPress={() => this.props.navigation.navigate('CallLogs')}
          settingPress={() => this.props.navigation.navigate('Setting')}
          chatPress={() => this.props.navigation.navigate('ChatList')}
          unseenValue={unseenValue}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  normalView: {flexDirection: 'row', height: 20, alignItems: 'center'},
  normalText: {
    fontFamily: FontStyle.regular,
    color: '#004ACE',
    fontSize: 11,
    left: 5,
  },
  imageStyle: {
    width: 8,
    height: 11,
    resizeMode: 'contain',
  },
});

function mapStateToProps(state) {
  return {
    beneficiaryArray: state.GetBeneficiary.data,
    loading: state.GetBeneficiary.loading,
    unseenValue: state.unseenNotification.chat,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getAllBeneficiary, unseenNotification}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Benificiary);
