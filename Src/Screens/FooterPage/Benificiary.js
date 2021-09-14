import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import FontStyle from '../../Assets/Fonts/FontStyle';
import Footer from '../../Common/Footer';
import Header from '../../Common/Header';
import Button from '../../Common/Button';
import Styles from '../../Common/Style';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getAllBeneficiary} from '../../store/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import axios from 'axios';

import {baseurl} from '../../Common/Baseurl';
import AlertModal from '../../Common/AlertModal';

class Benificiary extends Component {
  state = {
    beneficiaryArray: [],
  };

  componentDidMount = async () => {
    const token = await AsyncStorage.getItem('token');
    this.setState({token});
    this.props.getAllBeneficiary(token);
  };

  deleteBeneficiary = (beneficiaryId) => {
    axios({
      method: 'delete',
      url: `${baseurl}beneficiary/${beneficiaryId}/`,
      headers: {Authorization: `Token ${this.state.token}`},
    })
      .then((response) => {
        if (response.status == 204) {
          this.props.getAllBeneficiary(this.state.token);
        }
      })
      .catch((err) => {
        console.log(err.response);
        this.setState({modalValue: true, message: 'Something went wrong'});
      });
  };

  getBeneficiaryDetail = async (beneficiaryId) => {
    await AsyncStorage.setItem('beneficiaryId', beneficiaryId.toString());
    this.props.navigation.navigate('BeneficiaryDetail');
  };

  render() {
    const {beneficiaryArray, modalValue, message} = this.props;

    return (
      <View style={{backgroundColor: '#fff', height: '100%', width: '100%'}}>
        <SafeAreaView />
        <View style={{height: '86%', backgroundColor: '#fff'}}>
          <Header
            middleText={'Beneficiaries'}
            notification={true}
            notifyPress={() => this.props.navigation.navigate('Notification')}
          />
          <AlertModal
            modalValue={modalValue}
            closeModal={() => this.setState({modalValue: false})}
            message={message}
          />

          <FlatList
            data={beneficiaryArray}
            contentContainerStyle={{width: '100%'}}
            showsVerticalScrollIndicator={false}
            renderItem={({item: beneficiaryData}) => {
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
                        {moment(beneficiaryData.created_at).format(
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
                        {/* {beneficiaryData.companionOperator}
                         */}
                        companionOperator: Operator 1
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.deleteBeneficiary(beneficiaryData.id)}>
                    <Image
                      source={require('../../Assets/Images/delete.png')}
                      style={{height: 50, width: 50, resizeMode: 'contain'}}
                    />
                  </TouchableOpacity>
                </View>
              );
            }}
          />
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
          chatPress={() => this.props.navigation.navigate('Chat')}
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
  console.log(state.GetBeneficiary);
  return {
    beneficiaryArray: state.GetBeneficiary,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getAllBeneficiary}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Benificiary);
