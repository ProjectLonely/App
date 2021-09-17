import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import Header from '../../Common/Header';
import AlertModal from '../../Common/AlertModal';
import axios from 'axios';
import {baseurl} from '../../Common/Baseurl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Styles from '../../Common/Style';
import FontStyle from '../../Assets/Fonts/FontStyle';
import moment from 'moment';
import Footer from '../../Common/Footer';

class ChatList extends Component {
  state = {modalValue: false, operatorArray: []};

  componentDidMount = async () => {
    const token = await AsyncStorage.getItem('token');
    axios({
      method: 'get',
      url: `${baseurl}chat/api/all-rooms/`,
      headers: {Authorization: `Token ${token}`},
    })
      .then((response) => {
        console.log(response);
        this.setState({operatorArray: response.data});
      })
      .catch((err) => {
        console.log(err);
      });
  };

  selectChat = (operatorId, operatorName) => {
    this.props.navigation.navigate('Chat', {operatorId, operatorName});
  };

  render() {
    const {modalValue, message, operatorArray} = this.state;
    return (
      <View style={{backgroundColor: '#fff', height: '100%', width: '100%'}}>
        <SafeAreaView />
        <View style={{height: '86%', backgroundColor: '#fff'}}>
          <Header
            middleText={'Chat List'}
            notification={true}
            notifyPress={() => this.props.navigation.navigate('Notification')}
          />
          <AlertModal
            modalValue={modalValue}
            closeModal={() => this.setState({modalValue: false})}
            message={message}
          />

          <FlatList
            data={operatorArray}
            contentContainerStyle={{width: '100%'}}
            showsVerticalScrollIndicator={false}
            renderItem={({item: operatorData}) => {
              return (
                <View style={[Styles.smallContainer]}>
                  <TouchableOpacity
                    onPress={() =>
                      this.selectChat(operatorData.id, operatorData.name)
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
                        {operatorData.name}
                      </Text>
                    </View>
                    <View style={styles.normalView}>
                      <Image
                        source={require('../../Assets/Images/smallgroup.png')}
                        style={styles.imageStyle}
                      />

                      {operatorData.beneficiary.map((data) => (
                        <Text style={styles.normalText}>{data.name}, </Text>
                      ))}
                    </View>
                    <View style={styles.normalView}>
                      <Image
                        source={require('../../Assets/Images/smallcalendar.png')}
                        style={styles.imageStyle}
                      />
                      <Text style={styles.normalText}>
                        {moment(operatorData.created_at).format('MMM,DD YYYY ')}
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
                </View>
              );
            }}
          />
        </View>
        <Footer
          footerValue={'chat'}
          dashboardPress={() => this.props.navigation.navigate('Dashboard')}
          callLogPress={() => this.props.navigation.navigate('CallLogs')}
          settingPress={() => this.props.navigation.navigate('Setting')}
          chatPress={() => this.props.navigation.navigate('ChatList')}
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

export default ChatList;
