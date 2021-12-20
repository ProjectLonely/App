import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import Header from '../../Common/Header';
import Input from '../../Common/Input';
import FontStyle from '../../Assets/Fonts/FontStyle';
import Button from '../../Common/Button';
import ModalDropdown from 'react-native-modal-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addBenificiary} from '../../store/actions/index';
import AlertModal from '../../Common/AlertModal';
import ImageModal from '../../Common/ImageModal';
import ImagePicker from 'react-native-image-crop-picker';
import Styles from '../../Common/Style';

class AddBenificiaryPage1 extends Component {
  state = {
    relationOption: ['Myself', 'My Mother', 'My Father', 'My Spouse', 'Someone else'],
    relationShipId: 2,
    genderOption: ['Male', 'Female', 'Other'],
    genderId: 0,
    selectedItems: '',
    imageModal: false,
    sourceURL: '',
    timeZoneOption: [
      'Central Daylight Time Chicago (GMT-5)',
      'Mountain Daylight Time Denver (GMT-6)',
      'Mountain Standard Time Phoenix (GMT-7)',
      'Pacific Daylight Time Los Angeles (GMT-7)',
      'Alaska Daylight Time Anchorage (GMT-8)',
      'Hawaii-Aleutian Standard Time Honolulu (GMT-10)',
    ],
    relationShipArray: [
      {
        id: 1,
        name: 'Self',
      },
      {
        id: 2,
        name: 'Mother',
      },
      {
        id: 3,
        name: 'Father',
      },
      {
        id: 4,
        name: 'Spouse',
      },
      {
        id: 5,
        name: 'Other',
      },
    ],
  };

  next = () => {
    const {beneficiaryData} = this.props;
    if (beneficiaryData.name == '') {
      this.setState({
        modalValue: true,
        message: 'Please fill out the name field',
      });
    } else if (beneficiaryData.age == '') {
      this.setState({
        modalValue: true,
        message: 'Please fill out the age field',
      });
    } else if (beneficiaryData.timeZone == '') {
      this.setState({
        modalValue: true,
        message: 'Please fill out the timezone field',
      });
    } else if (beneficiaryData.phoneNumber == '') {
      this.setState({
        modalValue: true,
        message: 'please fill out the phone number field',
      });
    } else {
      this.props.navigation.navigate('AddBenificiaryPage2');
    }
  };

  selectImageFromGallery() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then((image) => {
      this.props.addBenificiary({
        sourceURL: image.sourceURL,
        base64: image.data,
      });
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
      includeExif: true,
      mediaType: 'photo',
    }).then((image) => {
      console.log(image, 'camera');
      this.props.addBenificiary({
        sourceURL: image.path,
        base64: image.data,
      });
      this.setState({
        // sourceURL: image.sourceURL,
        imageModal: false,
      });
    });
  }
  openModal = () => {
    this.setState({imageModal: true});
  };

  render() {
    const {
      genderOption,
      relationOption,
      modalValue,
      message,
      imageModal,
      timeZoneOption,
    } = this.state;

    return (
      <View
        style={{
          height: '100%',
          width: '100%',
          alignItems: 'center',
          backgroundColor: '#fff',
        }}>
        {/* <SafeAreaView /> */}
        <Header leftIcon={true} middleText={'Add Beneficiary'} />
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          style={{height: '100%', width: '100%', paddingTop: '4%'}}
          contentContainerStyle={{alignItems: 'center', paddingBottom: '20%'}}>
          <AlertModal
            modalValue={modalValue}
            closeModal={() => this.setState({modalValue: false})}
            message={message}
          />
          <Text style={Styles.labelText}>Who will receive companionship?</Text>
          <ModalDropdown
            options={relationOption}
            onSelect={(relationShipId) =>
              this.props.addBenificiary({
                relationShipId: relationOption[relationShipId],
              })
            }
            isFullWidth={true}
            showsVerticalScrollIndicator={false}
            dropdownStyle={{
              backgroundColor: '#fff',
              paddingHorizontal: '1%',
              borderColor: '#004ACE',
              borderWidth: 1,
              height: 180,
              width: '88%',
              marginHorizontal: '1%',
            }}
            dropdownTextStyle={{
              fontSize: 18,
              fontFamily: FontStyle.regular,
              color: '#707070',
              paddingHorizontal: '5%',
            }}
            textStyle={{
              fontSize: 20,
              fontFamily: FontStyle.bold,
              color: '#707070',
              paddingHorizontal: '5%',
            }}
            style={{
              width: '90%',
              height: 45,
              justifyContent: 'flex-end',
              borderWidth: 1,
              borderColor: '#004ACE',
              borderRadius: 5,
              marginBottom: '2.5%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: '2.5%',
              }}>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: FontStyle.regular,
                  color: '#707070',
                }}>
                {this.props.beneficiaryData.relationShipId}
              </Text>
              <Icon name="chevron-down" size={24} color={'grey'} />
            </View>
          </ModalDropdown>
          <Text style={[Styles.labelText, {top: 10}]}>Beneficiary Name</Text>
          <Input
            placeholder="Enter Name"
            onChangeText={(name) => this.props.addBenificiary({name})}
            value={this.props.beneficiaryData.name}
            maxLength={40}
          />
          <Text style={[Styles.labelText, {top: 10}]}>Beneficiary Age</Text>
          <Input
            placeholder="Enter Age"
            onChangeText={(age) => this.props.addBenificiary({age: age})}
            keyboardType={'number-pad'}
            maxLength={3}
            value={this.props.beneficiaryData.age}
          />
          <Text style={[Styles.labelText, {top: 10}]}>Beneficiary gender</Text>
          <ModalDropdown
            onSelect={(genderId) =>
              this.props.addBenificiary({genderId: genderOption[genderId]})
            }
            isFullWidth={true}
            showsVerticalScrollIndicator={false}
            dropdownStyle={{
              backgroundColor: '#fff',
              paddingHorizontal: '1%',
              borderColor: '#004ACE',
              borderWidth: 1,
              height: 130,
              width: '88%',
              marginHorizontal: '1%',
            }}
            dropdownTextStyle={{
              fontSize: 18,
              fontFamily: FontStyle.regular,
              color: '#707070',
              paddingHorizontal: '5%',
            }}
            textStyle={{
              fontSize: 20,
              fontFamily: FontStyle.bold,
              color: '#707070',
              paddingHorizontal: '5%',
            }}
            style={{
              width: '90%',
              height: 45,
              justifyContent: 'flex-end',
              borderWidth: 1,
              borderColor: '#004ACE',
              borderRadius: 5,
              marginTop: '5%',
            }}
            options={genderOption}>
            <View
              style={{
                flexDirection: 'row',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: '2.5%',
              }}>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: FontStyle.regular,
                  color: '#707070',
                }}>
                {this.props.beneficiaryData.genderId}
              </Text>
              <Icon name="chevron-down" size={24} color={'grey'} />
            </View>
          </ModalDropdown>
          <Text style={[Styles.labelText, {top: 18}]}>
            Beneficiary timezone
          </Text>
          <ModalDropdown
            onSelect={(timeZoneId) =>
              this.props.addBenificiary({timeZone: timeZoneOption[timeZoneId]})
            }
            isFullWidth={true}
            showsVerticalScrollIndicator={false}
            dropdownStyle={{
              backgroundColor: '#fff',
              paddingHorizontal: '1%',
              borderColor: '#004ACE',
              borderWidth: 1,

              height: 180,
              width: '88%',
              marginHorizontal: '1%',
            }}
            dropdownTextStyle={{
              fontSize: 18,
              fontFamily: FontStyle.regular,
              color: '#707070',
              paddingHorizontal: '5%',
            }}
            textStyle={{
              fontSize: 20,
              fontFamily: FontStyle.bold,
              color: '#707070',
              paddingHorizontal: '5%',
            }}
            style={{
              width: '90%',
              height: 55,
              justifyContent: 'flex-end',
              borderWidth: 1,
              borderColor: '#004ACE',
              borderRadius: 5,
              marginTop: '7.5%',
            }}
            options={timeZoneOption}>
            <View
              style={{
                flexDirection: 'row',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: '2.5%',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: FontStyle.regular,
                  color: '#707070',
                }}>
                {this.props.beneficiaryData.timeZone}
              </Text>
              <Icon name="chevron-down" size={24} color={'grey'} />
            </View>
          </ModalDropdown>
          <Text style={[Styles.labelText, {top: 22}]}>
            Beneficiary phone number
          </Text>
          <Input
            placeholder="Phone Number"
            keyboardType={'number-pad'}
            maxLength={10}
            marginTop="7.5%"
            onChangeText={(phoneNumber) =>
              this.props.addBenificiary({phoneNumber})
            }
            value={this.props.beneficiaryData.phoneNumber}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '95%',
            }}>
            <Text style={styles.headingText}>Add Beneficiary Picture</Text>
            <TouchableOpacity onPress={this.openModal} style={styles.imageView}>
              {this.props.beneficiaryData.sourceURL == '' ? (
                <Image
                  source={require('../../Assets/Images/group.png')}
                  style={{height: 100, width: 100, borderRadius: 50}}
                />
              ) : (
                <Image
                  source={{uri: this.props.beneficiaryData.sourceURL}}
                  style={{height: 100, width: 100, borderRadius: 50}}
                />
              )}
            </TouchableOpacity>
          </View>
          <ImageModal
            imageModal={imageModal}
            closeModal={() => this.setState({imageModal: false})}
            galleryPress={() => this.selectImageFromGallery()}
            cameraPress={() => this.selectImageFromCamera()}
          />
          <View style={{width: '100%'}}>
            <Button onPress={() => this.next()}>NEXT</Button>
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

function mapStateToProps(state) {
  return {
    beneficiaryData: state.AddBeneficiaryReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({addBenificiary}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddBenificiaryPage1);
