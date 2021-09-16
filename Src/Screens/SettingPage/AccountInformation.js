import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Header from '../../Common/Header';
import Input from '../../Common/Input';
import ImageModal from '../../Common/ImageModal';
import FontStyle from '../../Assets/Fonts/FontStyle';
import Button from '../../Common/Button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import {baseurl} from '../../Common/Baseurl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
import AlertModal from '../../Common/AlertModal';

class AccountInformation extends Component {
  state = {
    token: '',
    password: '',
    confirmPassword: '',
    sourceURL: '',
    imageModal: false,
  };

  componentDidMount = async () => {
    this.setState({token: await AsyncStorage.getItem('token')});
    this.getProfileData();
  };

  getProfileData = () => {
    axios({
      method: 'get',
      url: `${baseurl}profile/`,
      headers: {Authorization: `Token ${this.state.token}`},
    })
      .then((response) => {
        this.setState({
          firstName: response.data.first_name,
          email: response.data.email,
        });
        AsyncStorage.setItem('email', response.data.email);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  updateProfileData = () => {
    const {password, confirmPassword} = this.state;
    const strongPassword =
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (password != confirmPassword) {
      this.setState({
        message: 'Password & confirm password not matched',
        modalValue: true,
      });
    } else if (!strongPassword.test(password) && password != '') {
      this.setState({
        modalValue: true,
        message:
          'Password must be 8 characters long and contain one uppercase, one lowercase, one numeric & one special character.  ',
      });
    } else {
      axios({
        method: 'post',
        url: `${baseurl}profile/`,
        headers: {Authorization: `Token ${this.state.token}`},
        data: {
          first_name: this.state.firstName,
          password: this.state.password,
          password1: this.state.confirmPassword,
        },
      })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  };

  selectImageFromGallery() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then((image) => {
      console.log(image, 'image');
      this.setState({
        sourceURL: image.sourceURL,
        imageModal: false,
      });
    });
  }
  selectImageFromCamera() {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then((image) => {
      this.setState({
        sourceURL: image.sourceURL,
        imageModal: false,
      });
    });
  }
  openModal = () => {
    this.setState({imageModal: true});
  };

  render() {
    const {
      password,
      confirmPassword,
      sourceURL,
      imageModal,
      modalValue,
      message,
    } = this.state;

    return (
      <View style={{backgroundColor: '#fff', height: '100%', width: '100%'}}>
        <SafeAreaView />
        <AlertModal
          modalValue={modalValue}
          closeModal={() => this.setState({modalValue: false})}
          message={message}
        />
        <Header
          leftIcon={true}
          middleText={'Account Information'}
          notification={true}
          notifyPress={() => this.props.navigation.navigate('Notification')}
        />
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          style={{height: '100%', width: '100%'}}>
          <View
            style={{
              alignItems: 'center',
              width: '100%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '95%',
              }}>
              <Text style={styles.headingText}>Edit Profile</Text>
              <TouchableOpacity
                onPress={this.openModal}
                style={styles.imageView}>
                {sourceURL == '' ? (
                  <Image
                    source={require('../../Assets/Images/group.png')}
                    style={{height: 100, width: 100, borderRadius: 50}}
                  />
                ) : (
                  <Image
                    source={{uri: sourceURL}}
                    style={{height: 100, width: 100, borderRadius: 50}}
                  />
                )}
              </TouchableOpacity>
            </View>
            <Input
              placeholder="Name"
              onChangeText={(text) => this.setState({firstName: text})}
              secureTextEntry={false}
              value={this.state.firstName}
            />
            <Input
              placeholder="Email"
              onChangeText={(text) => this.setState({email: text})}
              secureTextEntry={false}
              value={this.state.email}
              editable={false}
            />
          </View>
          <View
            style={{
              alignItems: 'center',
              width: '100%',
            }}>
            <Text style={styles.headingText}>Change Password</Text>
            <Input
              placeholder="Password"
              onChangeText={(text) => this.setState({password: text})}
              secureTextEntry={true}
            />
            <Input
              placeholder="Confirm Password"
              onChangeText={(text) => this.setState({confirmPassword: text})}
              secureTextEntry={true}
            />
          </View>
          <ImageModal
            imageModal={imageModal}
            closeModal={() => this.setState({imageModal: false})}
            galleryPress={() => this.selectImageFromGallery()}
            cameraPress={() => this.selectImageFromCamera()}
          />
          <View style={{paddingTop: '20%'}}>
            <Button onPress={this.updateProfileData}>UPDATE</Button>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headingText: {
    fontFamily: FontStyle.bold,
    fontSize: 20,
    color: '#12175E',
    alignSelf: 'flex-start',
    paddingHorizontal: '5%',
    marginVertical: '5%',
  },
  imageView: {
    backgroundColor: '#fff',
    height: 100,
    width: 100,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 11,
  },
});

export default AccountInformation;
