import React, {Component} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import Footer from '../Common/Footer';
import Header from '../Common/Header';

class CallLogs extends Component {
  render() {
    return (
      <View style={{backgroundColor: '#fff', height: '100%', width: '100%'}}>
        <SafeAreaView />
        <Header leftIcon={true} middleText={'Call Log'} notification={true} />

        <Footer
          footerValue={'call'}
          dashboardPress={() => this.props.navigation.navigate('Dashboard')}
          callLogPress={() => this.props.navigation.navigate('CallLogs')}
          settingPress={() => this.props.navigation.navigate('Setting')}
        />
      </View>
    );
  }
}

export default CallLogs;
