import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import FontStyle from '../Assets/Fonts/FontStyle';
const {height, width} = Dimensions.get('window');
import Button from '../Common/Button';
class Subscription extends Component {
  state = {
    subscriptionArray: [
      {
        id: '1',
        name: 'Tier 1',
        descriptionArray: [
          {id: '1', description: 'up to one call a week'},
          {id: '2', description: '*limited outbound calls'},
        ],
        price: '60',
        duration: 'month',
        image: require('../Assets/Images/callcenter.png'),
      },
      {
        id: '2',
        name: 'Tier 2',
        descriptionArray: [
          {id: '3', description: 'up to 3 scheduled calls per week'},
          {id: '4', description: 'Plus limited on-demand calls'},
        ],
        price: '150',
        duration: 'month',
        image: require('../Assets/Images/callcenter.png'),
      },
      {
        id: '3',
        name: 'Tier 3',
        descriptionArray: [
          {id: '5', description: 'up to 7 scheduled calls per week'},
          {id: '6', description: 'Plus limited on-demand calls'},
        ],
        price: '300',
        duration: 'month',
        image: require('../Assets/Images/callcenter.png'),
      },
    ],
  };
  render() {
    const {subscriptionArray} = this.state;
    return (
      <ImageBackground
        source={require('../Assets/Images/splashWhite.png')}
        style={{height: '100%', width: '100%'}}
        resizeMode="cover">
        <SafeAreaView />

        <View style={{height: '90%', alignItems: 'center'}}>
          <FlatList
            data={subscriptionArray}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <View style={styles.productView}>
                  <View style={{flexDirection: 'row', height: '100%'}}>
                    <Image source={item.image} style={styles.imageStyle} />
                    <View
                      style={{
                        width: '80%',
                        height: '100%',
                        paddingLeft: '5%',
                      }}>
                      <Text
                        style={{
                          fontFamily: FontStyle.bold,
                          fontSize: 18,
                          paddingLeft: '12%',
                        }}>
                        {item.name}
                      </Text>
                      {item.descriptionArray.map((description) => {
                        return (
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Image
                              source={require('../Assets/Images/right.png')}
                              style={{
                                height: 20,
                                width: 20,
                                resizeMode: 'contain',
                                marginVertical: 5,
                              }}
                            />
                            <Text
                              ellipsizeMode={'tail'}
                              numberOfLines={2}
                              style={{
                                fontFamily: FontStyle.regular,
                                fontSize: 14,
                                color: '#3A3A3A',
                                paddingLeft: 5,
                                width: '80%',
                              }}>
                              {description.description}
                            </Text>
                          </View>
                        );
                      })}
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text
                          style={{
                            fontFamily: FontStyle.bold,
                            fontSize: 36,
                            color: '#0F0A39',
                          }}>
                          ${item.price}{' '}
                        </Text>
                        <Text
                          style={{
                            fontFamily: FontStyle.regular,
                            fontSize: 22,
                            color: '#0F0A39',
                          }}>
                          Per {item.duration}
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontFamily: FontStyle.regular,
                          color: '#004ACE',
                          fontsize: 16,
                        }}>
                        For one Beneficiary
                      </Text>
                      <Button
                        btnheight={40}
                        btnwidth={'70%'}
                        onPress={() =>
                          this.props.navigation.navigate('AddBenificiaryPage1')
                        }>
                        SELECT
                      </Button>
                    </View>
                  </View>
                </View>
              );
            }}
          />
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Dashboard')}
            style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontFamily: FontStyle.regular,
                fontsize: 16,
                color: '#7B7890',
              }}>
              Not ready to subscribe,
            </Text>
            <Text
              style={{
                fontFamily: FontStyle.regular,
                fontsize: 16,
                color: '#004ACE',
              }}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  productView: {
    height: 220,
    width: width / 1.1,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.27,
    shadowRadius: 2.65,

    elevation: 2,
    padding: '5%',
  },
  imageStyle: {
    height: 90,
    width: 90,
  },
});

export default Subscription;
