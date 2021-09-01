import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import FontStyle from '../Assets/Fonts/FontStyle';
import Footer from '../Common/Footer';
import Header from '../Common/Header';
import Button from '../Common/Button';

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
        <Header
          leftIcon={true}
          middleText={'Account Information'}
          notification={true}
        />
        <View style={{height: '73%'}}>
          <FlatList
            data={beneficiaryArray}
            contentContainerStyle={{width: '100%'}}
            showsVerticalScrollIndicator={false}
            renderItem={({item: beneficiaryData}) => {
              return (
                <View style={[styles.containerStyle]}>
                  <View>
                    <View style={styles.normalView}>
                      <Image
                        source={require('../Assets/Images/smalluser.png')}
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
                        source={require('../Assets/Images/smallgroup.png')}
                        style={styles.imageStyle}
                      />
                      <Text style={styles.normalText}>
                        {beneficiaryData.relationship}
                      </Text>
                    </View>
                    <View style={styles.normalView}>
                      <Image
                        source={require('../Assets/Images/smallcalendar.png')}
                        style={styles.imageStyle}
                      />
                      <Text style={styles.normalText}>
                        {beneficiaryData.callDate}
                      </Text>
                    </View>
                    <View style={styles.normalView}>
                      <Image
                        source={require('../Assets/Images/smallcompanion.png')}
                        style={styles.imageStyle}
                      />
                      <Text style={styles.normalText}>
                        {beneficiaryData.companionOperator}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity>
                    <Image
                      source={require('../Assets/Images/delete.png')}
                      style={{height: 50, width: 50, resizeMode: 'contain'}}
                    />
                  </TouchableOpacity>
                </View>
              );
            }}
          />
          <Button> ADD NEW BENEFICIARY </Button>
        </View>
        <Footer
          footerValue={'benificiary'}
          dashboardPress={() => this.props.navigation.navigate('Dashboard')}
          callLogPress={() => this.props.navigation.navigate('CallLogs')}
          settingPress={() => this.props.navigation.navigate('Setting')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 78,
    maxHeight: 'auto',
    borderLeftWidth: 4,
    borderLeftColor: '#004ACE',
    width: '90%',
    backgroundColor: '#fff',
    marginVertical: '2%',
    padding: '2%',
    alignSelf: 'center',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.27,
    shadowRadius: 2.65,

    elevation: 2,
  },
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
