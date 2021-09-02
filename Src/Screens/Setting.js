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
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import FontStyle from '../Assets/Fonts/FontStyle';

class Setting extends Component {
  state = {
    settingArray: [
      {
        id: '0',
        settingName: 'Account Information',
        image: require('../Assets/Images/settingImage/pencil.png'),
        pageName: 'AccountInformation',
      },
      {
        id: '1',
        settingName: 'About This App',
        image: require('../Assets/Images/settingImage/user.png'),
        pageName: 'AboutApp',
      },
      {
        id: '2',
        settingName: 'Billing',
        image: require('../Assets/Images/settingImage/billing.png'),
        pageName: 'Billing',
      },
      {
        id: '3',
        settingName: 'Support',
        image: require('../Assets/Images/settingImage/support.png'),
        pageName: 'Support',
      },
      {
        id: '4',
        settingName: 'Sign Out',
        image: require('../Assets/Images/settingImage/signout.png'),
        pageName: 'SignIn',
      },
    ],
  };

  selectOption = (pageName) => {
    this.props.navigation.navigate(pageName);
  };
  render() {
    const {settingArray} = this.state;
    return (
      <View style={{backgroundColor: '#fff'}}>
        <SafeAreaView />
        <Header
          leftIcon={true}
          middleText={'Settings'}
          notification={true}
          notifyPress={() => this.props.navigation.navigate('Notification')}
        />
        <View style={{height: '74%'}}>
          <FlatList
            data={settingArray}
            numColumns={3}
            contentContainerStyle={{alignItems: 'center'}}
            scrollEnabled={false}
            renderItem={({item: settingData}) => {
              return (
                <TouchableOpacity
                  onPress={() => this.selectOption(settingData.pageName)}
                  style={styles.containerStyle}>
                  <Image
                    source={settingData.image}
                    style={{resizeMode: 'contain', height: 32, width: 32}}
                  />
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 18,
                      color: '#004ACE',
                      fontFamily: FontStyle.regular,
                    }}>
                    {settingData.settingName}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <Footer
          footerValue={'setting'}
          dashboardPress={() => this.props.navigation.navigate('Dashboard')}
          benificiaryPress={() => this.props.navigation.navigate('Benificiary')}
          callLogPress={() => this.props.navigation.navigate('CallLogs')}
          chatPress={() => this.props.navigation.navigate('Chat')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    height: 115,
    width: 115,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4F7FF',
    marginVertical: '5%',
    marginHorizontal: '2%',
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
});

export default Setting;
