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
import Header from '../../Common/Header';
import Footer from '../../Common/Footer';
import FontStyle from '../../Assets/Fonts/FontStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {baseurl} from '../../Common/Baseurl';
import {StackActions} from '@react-navigation/native';
import {unseenNotification} from '../../store/actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
const {width, height} = Dimensions.get('screen');

class Setting extends Component {
  state = {
    settingArray: [
      {
        id: '0',
        settingName: 'Account Information',
        image: require('../../Assets/Images/settingImage/pencil.png'),
        pageName: 'AccountInformation',
      },
      {
        id: '1',
        settingName: 'About This App',
        image: require('../../Assets/Images/settingImage/user.png'),
        pageName: 'AboutApp',
      },
      {
        id: '2',
        settingName: 'Billing',
        image: require('../../Assets/Images/settingImage/billing.png'),
        pageName: 'Billing',
      },
      {
        id: '3',
        settingName: 'Support',
        image: require('../../Assets/Images/settingImage/support.png'),
        pageName: 'Support',
      },
      {
        id: '4',
        settingName: 'Sign Out',
        image: require('../../Assets/Images/settingImage/signout.png'),
        pageName: 'SignOut',
      },
    ],
  };

  componentDidMount = async () => {
    const token = await AsyncStorage.getItem('token');
    this.props.unseenNotification(token);
  };

  selectOption = async (pageName) => {
    const token = await AsyncStorage.getItem('token');
    if (pageName == 'SignOut') {
      axios({
        method: 'get',
        url: `${baseurl}logout/`,
        headers: {Authorization: `Token ${token}`},
      })
        .then(async (response) => {
          AsyncStorage.getAllKeys().then((keys) =>
            AsyncStorage.multiRemove('token', 'name'),
          );
          this.props.navigation.dispatch(StackActions.replace('SignIn'));
        })
        .catch((err) => {
          AsyncStorage.clear();
          this.props.navigation.navigate('SignIn');
        });
    } else {
      this.props.navigation.navigate(pageName);
    }
  };
  render() {
    const {settingArray} = this.state;
    const {unseenValue} = this.props;
    return (
      <View style={{backgroundColor: '#fff', height: '100%', width: '100%'}}>
        <View style={{height: height / 1.09, backgroundColor: '#fff'}}>
          <Header
            leftIcon={true}
            middleText={'Settings'}
            notification={true}
            notifyPress={() => this.props.navigation.navigate('Notification')}
          />
          <View style={{height: '76%', backgroundColor: '#fff'}}>
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
        </View>
        <Footer
          footerValue={'setting'}
          dashboardPress={() => this.props.navigation.navigate('Dashboard')}
          benificiaryPress={() => this.props.navigation.navigate('Benificiary')}
          callLogPress={() => this.props.navigation.navigate('CallLogs')}
          chatPress={() => this.props.navigation.navigate('ChatList')}
          unseenValue={unseenValue}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    height: 115,
    width: width / 3.5,
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

function mapStateToProps(state) {
  return {
    unseenValue: state.unseenNotification.chat,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({unseenNotification}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
