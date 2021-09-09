import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import FontStyle from '../../Assets/Fonts/FontStyle';
import Button from '../../Common/Button';
const {height, width} = Dimensions.get('window');
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {completeBeneficiary} from '../../store/actions/index';
class AddBenificiaryPage4 extends Component {
  continue = (value) => {
    this.props.completeBeneficiary();
    if (value == 'addNew') {
      this.props.navigation.navigate('Subscription');
    } else {
      this.props.navigation.navigate('Dashboard');
    }
  };

  render() {
    return (
      <ImageBackground
        source={require('../../Assets/Images/splashWhite.png')}
        style={{height: height, width: width}}
        resizeMode="cover">
        <View
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={require('../../Assets/Images/blueLogo.png')}
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
          <Button onPress={() => this.continue()}>CONTINUE</Button>
          <TouchableOpacity onPress={() => this.continue('addNew')}>
            <Text
              style={{
                fontFamily: FontStyle.regular,
                fontSize: 20,
                color: '#3A3A3A',
              }}>
              Or Add another beneficiary
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

function mapStateToProps(state) {
  return {
    beneficiaryData: state.AddBeneficiaryReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({completeBeneficiary}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddBenificiaryPage4);
