import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  FlatList,
  Image,
  LayoutAnimation,
  Platform,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import FontStyle from '../Assets/Fonts/FontStyle';
import Header from '../Common/Header';
import Button from '../Common/Button';
import Slider from '@react-native-community/slider';

class AddBenificiaryPage3 extends Component {
  state = {
    dayId: '',
    expandValue: false,
    dayOption: [
      {id: '0', day: 'Monday'},
      {id: '1', day: 'Tuesday'},
      {id: '2', day: 'Wednesday'},
      {id: '3', day: 'Thursday'},
      {id: '4', day: 'Friday'},
      {id: '5', day: 'Saturday'},
      {id: '6', day: 'Sunday'},
    ],
  };

  expandOption = (dayId) => {
    this.setState({dayId: dayId});
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  render() {
    const {dayOption, dayId} = this.state;
    return (
      <View
        style={{
          height: '100%',
          width: '100%',
          backgroundColor: '#fff',
        }}>
        <SafeAreaView />
        <Header leftIcon={true} middleText={'Set up a call schedule'} />
        <View style={{height: '70%'}}>
          <FlatList
            data={dayOption}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <View
                  style={[
                    styles.expandview,
                    {
                      height: dayId == item.id ? 200 : 50,
                      overflow: 'hidden',
                    },
                  ]}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      justifyContent: 'space-between',
                    }}
                    onPress={() => this.expandOption(item.id)}>
                    <Text>{item.day}</Text>
                    {item.id == dayId ? (
                      <Image
                        source={require('../Assets/Images/cross.png')}
                        style={{height: 24, width: 24, resizeMode: 'contain'}}
                      />
                    ) : (
                      <Image
                        source={require('../Assets/Images/plus.png')}
                        style={{height: 24, width: 24, resizeMode: 'contain'}}
                      />
                    )}
                  </TouchableOpacity>
                  {item.id == dayId ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: '10%',
                        marginBottom: '5%',
                      }}>
                      <View
                        style={{
                          width: 84,
                          height: 28,
                          borderWidth: 1,
                          borderColor: '#004ACE',
                          borderRadius: 10,
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: '#fff',
                          marginHorizontal: '5%',
                        }}>
                        <Text>10PM-1PM</Text>
                      </View>
                    </View>
                  ) : null}
                  {item.id == dayId ? (
                    <Slider
                      thumbTintColor="#004ACE"
                      style={{
                        width: '100%',
                        height: 40,
                      }}
                      minimumValue={0}
                      maximumValue={1}
                      minimumTrackTintColor="#FFFFFF"
                      maximumTrackTintColor="#FFFFFF"
                    />
                  ) : null}
                </View>
              );
            }}
          />
        </View>

        <Button> NEXT </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  expandview: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#D5FAFB',
    marginVertical: '1%',
    borderRadius: 20,
    paddingTop: '3.5%',
    paddingHorizontal: '5%',
  },
});

export default AddBenificiaryPage3;
