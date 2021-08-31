import React, {Component} from 'react';
import {View, Text, SafeAreaView, TextInput, FlatList} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import FontStyle from '../Assets/Fonts/FontStyle';
import Header from '../Common/Header';
import Button from '../Common/Button';

class AddBenificiaryPage2 extends Component {
  state = {
    checkbox: false,
    select_checkbox: [],
    checked: 'checked',
    seekingOption: [
      {id: '0', option: 'Companionship'},
      {id: '1', option: 'Health and wellness checks'},
    ],
  };
  render() {
    const {seekingOption, checkbox} = this.state;
    return (
      <View
        style={{
          height: '100%',
          width: '100%',
          backgroundColor: '#fff',
        }}>
        <SafeAreaView />

        <Header leftIcon={true} middleText={'Add Beneficiary'} />
        <View style={{width: '100%', alignItems: 'center'}}>
          <TextInput
            placeholder="Tell us something about the person"
            maxLength={300}
            placeholderTextColor="#707070"
            style={{
              width: '90%',
              height: 200,
              borderWidth: 1,
              borderColor: '#004ACE',
              borderRadius: 5,
              padding: '5%',
            }}
            multiline={true}
            textAlignVertical="top"
          />
          <View style={{width: '100%', paddingHorizontal: '5%'}}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: FontStyle.medium,
                color: '#004ACE',
                marginVertical: '5%',
              }}>
              What are you seeking from Cheerio
            </Text>
          </View>
          <FlatList
            data={seekingOption}
            style={{width: '90%'}}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',
                    height: 50,
                  }}>
                  <CheckBox
                    tintColors={({true: '#F79535'}, {false: '#FFF'})}
                    value={this.state.select_checkbox.some(
                      (value) => (value.UserId = item.post.id),
                    )}
                    onCheckColor="#fff"
                    boxType="square"
                    onFillColor="#004ACE"
                    onValueChange={() => this.setState({checkbox: !checkbox})}
                  />
                  <Text
                    style={{
                      fontFamily: FontStyle.regular,
                      fontSize: 16,
                      color: '#2E426E',
                      paddingLeft: '5%',
                    }}>
                    {item.option}
                  </Text>
                </View>
              );
            }}
          />
          <View style={{width: '100%', paddingHorizontal: '5%', height: 150}}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: FontStyle.medium,
                color: '#004ACE',
                marginVertical: '5%',
              }}>
              leave a comment
            </Text>
            <TextInput
              placeholder="Write here"
              maxLength={300}
              placeholderTextColor="#707070"
              style={{
                width: '100%',
                minHeight: 70,
                maxHeight: 140,
                borderWidth: 1,
                borderColor: '#004ACE',
                borderRadius: 5,
                padding: '5%',
              }}
              multiline={true}
              textAlignVertical="top"
            />
          </View>
          <View style={{width: '100%', top: '10%'}}>
            <Button
              onPress={() =>
                this.props.navigation.navigate('AddBenificiaryPage3')
              }>
              NEXT
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

export default AddBenificiaryPage2;
