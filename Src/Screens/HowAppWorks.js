import React, {Component} from 'react';
import {View, Text, ImageBackground} from 'react-native';
import FontStyle from '../Assets/Fonts/FontStyle';
import Button from '../Common/Button';

class HowAppWorks extends Component {
  render() {
    return (
      <ImageBackground
        source={require('../Assets/Images/splashWhite.png')}
        style={{
          height: '100%',
          width: '100%',
        }}
        resizeMode="contain">
        <View style={{height: '100%', width: '100%', paddingHorizontal: '5%'}}>
          <View
            style={{height: '12%', width: '100%', justifyContent: 'flex-end'}}>
            <Text style={{fontFamily: FontStyle.bold, fontSize: 28}}>
              Hi, Jhonny
            </Text>
            <Text
              style={{
                fontFamily: FontStyle.bold,
                fontSize: 14,
                color: '#575757',
              }}>
              Let’s get you connected
            </Text>
          </View>
          <View
            style={{
              height: '68%',
              width: '100%',
              backgroundColor: '#D5FAFB',
              marginTop: '10%',
              borderRadius: 10,
              padding: '5%',
            }}>
            <Text
              style={{
                color: '#223E6D',
                fontFamily: FontStyle.bold,
                fontSize: 18,
              }}>
              How this app works
            </Text>
            <Text
              style={{
                fontFamily: FontStyle.regular,
                fontSize: 15,
                color: '#3A3A3A',
                paddingVertical: '5%',
                textAlign: 'justify',
              }}>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam
              voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
              Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
              dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
              elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
              magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
              justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
              takimata sanctus est Lorem.
            </Text>
          </View>
          <Button
            onPress={() =>
              this.props.navigation.navigate('AddBenificiaryPage1')
            }>
            CONTINUE
          </Button>
        </View>
      </ImageBackground>
    );
  }
}

export default HowAppWorks;
