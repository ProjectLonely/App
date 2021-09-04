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
const {height, width} = Dimensions.get('screen');

class Benificiary extends Component {
  state = {
    beneficiaryArray: [
      {
        id: '0',
        benificiaryName: 'Martin Bravo',
        relationship: 'Father',
        callDate: 'Aug 04, 2021',
        companionOperator: 'Operator 1',
      },
      {
        id: '1',
        benificiaryName: 'Jhonny Bravo',
        relationship: 'Self',
        callDate: 'Aug 05, 2021',
        companionOperator: 'Operator 2',
      },
      {
        id: '2',
        benificiaryName: 'Martin Bravo',
        relationship: 'Mother',
        callDate: 'Aug 06, 2021',
        companionOperator: 'Operator 3',
      },
    ],
  };
  render() {
    const {beneficiaryArray} = this.state;
    return (
      <View style={{backgroundColor: '#fff', height: '100%', width: '100%'}}>
        <SafeAreaView />
        <View style={{height: '86%', backgroundColor: '#fff'}}>
          <Header
            middleText={'Beneficiaries'}
            notification={true}
            notifyPress={() => this.props.navigation.navigate('Notification')}
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
                      this.props.navigation.navigate('BeneficiaryDetail')
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
                        {beneficiaryData.benificiaryName}
                      </Text>
                    </View>
                    <View style={styles.normalView}>
                      <Image
                        source={require('../../Assets/Images/smallgroup.png')}
                        style={styles.imageStyle}
                      />
                      <Text style={styles.normalText}>
                        {beneficiaryData.relationship}
                      </Text>
                    </View>
                    <View style={styles.normalView}>
                      <Image
                        source={require('../../Assets/Images/smallcalendar.png')}
                        style={styles.imageStyle}
                      />
                      <Text style={styles.normalText}>
                        {beneficiaryData.callDate}
                      </Text>
                    </View>
                    <View style={styles.normalView}>
                      <Image
                        source={require('../../Assets/Images/smallcompanion.png')}
                        style={styles.imageStyle}
                      />
                      <Text style={styles.normalText}>
                        {beneficiaryData.companionOperator}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity>
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

export default Benificiary;
