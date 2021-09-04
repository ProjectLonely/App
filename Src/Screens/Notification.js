import React, {Component} from 'react';
import {View, Text, SafeAreaView, FlatList} from 'react-native';
import FontStyle from '../Assets/Fonts/FontStyle';
import Header from '../Common/Header';
import Styles from '../Common/Style';

class Notification extends Component {
  state = {
    notificationArray: [
      {
        id: '0',
        message: 'Payment Sucessfull',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing',
        time: '10 min ago',
      },
      {
        id: '1',
        message: 'Call log',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing',
        time: '2 hours ago',
      },
      {
        id: '2',
        message: 'Payment Sucessfull',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing',
        time: '2 hours ago',
      },
    ],
  };
  render() {
    const {notificationArray} = this.state;
    return (
      <View style={{backgroundColor: '#fff', height: '100%', width: '100%'}}>
        <SafeAreaView />
        <Header leftIcon={true} middleText={'Notification'} />
        <FlatList
          data={notificationArray}
          showsVerticalScrollIndicator={false}
          renderItem={({item: notifyData}) => {
            return (
              <View
                style={[
                  Styles.smallContainer,
                  {flexDirection: 'column', alignItems: 'flex-start'},
                ]}>
                <Text
                  style={{
                    fontFamily: FontStyle.medium,
                    fontSize: 14,
                    color: '#333333',
                  }}>
                  {notifyData.message}
                </Text>
                <Text
                  style={{
                    fontFamily: FontStyle.regular,
                    fontSize: 14,
                    color: '#777777',
                  }}>
                  {notifyData.description}
                </Text>
                <Text
                  style={{
                    fontFamily: FontStyle.medium,
                    fontSize: 12,
                    color: '#777777',
                  }}>
                  {notifyData.time}
                </Text>
              </View>
            );
          }}
        />
      </View>
    );
  }
}

export default Notification;
