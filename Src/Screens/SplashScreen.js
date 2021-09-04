import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  Animated,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
const {height, width} = Dimensions.get('window');
class SplashScreen extends Component {
  state = {
    opacity_animation: new Animated.Value(0),
  };

  componentDidMount = () => {
    this.fade_animation();
  };

  fade_animation = () => {
    Animated.timing(this.state.opacity_animation, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start(() => this.props.navigation.navigate('SignIn'));
  };
  render() {
    const Fade_animation = {
      opacity: this.state.opacity_animation,
    };
    return (
      <ImageBackground
        source={require('../Assets/Images/splashScreen.png')}
        style={{height: height, width: width}}
        resizeMode="cover">
        <Animated.View style={[styles.main_view, Fade_animation]}>
          <Image
            source={require('../Assets/Images/logo.png')}
            style={{width: '60%', height: '25%', resizeMode: 'contain'}}
          />
        </Animated.View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  main_view: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SplashScreen;
