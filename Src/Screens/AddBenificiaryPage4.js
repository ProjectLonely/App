import React, {Component} from 'react';
import {View, Text, ImageBackground, Image, Dimensions} from 'react-native';
import FontStyle from '../Assets/Fonts/FontStyle';
import Button from '../Common/Button';
const {height, width} = Dimensions.get('window');
class AddBenificiaryPage4 extends Component {
  render() {
    return (
      <ImageBackground
        source={require('../Assets/Images/splashWhite.png')}
        style={{height: height, width: width}}
        resizeMode="contain">
        <View
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={require('../Assets/Images/blueLogo.png')}
            style={{width: '60%', height: '25%', resizeMode: 'contain'}}
          />

          <Text
            style={{
              fontFamily: FontStyle.bold,
              color: '#1E8705',
              fontSize: 27,
              textAlign: 'center',
              marginBottom: '15%',
            }}>
            {`Beneficiary\n Added Sucessfully`}
          </Text>
          <Button>CONTINUE</Button>
          <Text
            style={{
              fontFamily: FontStyle.regular,
              fontSize: 20,
              color: '#3A3A3A',
            }}>
            Or Add another beneficiary
          </Text>
        </View>
      </ImageBackground>
    );
  }
}

export default AddBenificiaryPage4;
