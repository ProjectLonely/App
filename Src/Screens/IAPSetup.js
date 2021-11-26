import React, {Component} from 'react';

import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  SafeAreaView,
  FlatList,
} from 'react-native';
import RNIap, {
  InAppPurchase,
  PurchaseError,
  SubscriptionPurchase,
  acknowledgePurchaseAndroid,
  consumePurchaseAndroid,
  finishTransaction,
  finishTransactionIOS,
  // purchaseErrorListener,
  // purchaseUpdatedListener,
} from 'react-native-iap';

// set your IN APP PURCHASE Product id's
const itemSkus = Platform.select({
  ios: ['org.digimonk.cheerio.Tier1'],
  // android: [
  //   'android.test.purchased',
  //   'android.test.canceled',
  //   'android.test.refunded',
  //   'android.test.item_unavailable',
  // ]
});
const itemSubs = Platform.select({
  ios: [
    'org.digimonk.cheerio.Tier1',
    // 'com.cooni.point5000', // dooboolab
  ],
  android: [
    'test.sub1', // subscription
  ],
});

let purchaseUpdatedListener;
let purchaseErrorListener;

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      receipt: '',
      availableItemsMessage: '',
      subscriptionList: [],
      Purchase: false,
    };
  }

  async componentDidMount() {
    RNIap.initConnection()
      .catch((error) => {
        console.log(error, 'Connection Error');
      })
      .then(async () => {
        //////////////////// get the subscription list here ////////////////
        const purchases = await RNIap.getProducts(itemSkus)
          .catch(() => console.log(error, 'Error to get the product '))
          .then((result) => {
            console.log(result, 'Subscription List');
            if (result.length > 0) {
              this.setState({
                subscriptionList: result,
              });
            }
          });
      });
    purchaseUpdatedListener = RNIap.purchaseUpdatedListener((purchase) => {
      try {
        console.log(purchase.transactionReceipt, 'purchases');

        // TODO : Validate reciept
      } catch (error) {
        console.log(error, 'Error while purchaseing');
        this.setState({
          Purchase: true,
        });
      }
    });
    purchaseErrorListener = RNIap.purchaseErrorListener((error) => {
      console.log(error, 'test error');
    });
    // purchaseUpdate = purchaseUpdatedListener(
    //   async (purchase: InAppPurchase | SubscriptionPurchase) => {
    //     console.info('purchase', purchase);
    //     const receipt = purchase.transactionReceipt
    //       ? purchase.transactionReceipt
    //       : purchase.originalJson;
    //     console.info(receipt, 'ppppppppppp');
    //     if (receipt) {
    //       try {
    //         const ackResult = await finishTransaction(purchase);
    //         console.info('ackResult', ackResult);
    //       } catch (ackErr) {
    //         console.warn('ackErr', ackErr);
    //       }

    //       // this.setState({receipt}, () => this.goNext());
    //     }
    //   },
    // );
  }

  /////// FUNCTION TO GET THE SUBSCRIPTION INFO /////////////////

  /////// FUNCTION TO PURCHASE THE SUBSCRIPTION  /////////////////
  PurchaseSubscription = async (productId) => {
    try {
      RNIap.requestSubscription(productId);
      console.log('working properly');
    } catch (err) {
      Alert.alert(err.message);
    }
  };

  render() {
    return (
      <SafeAreaView>
        {!this.state.Purchase ? (
          <View style={{width: '100%', height: '100%', padding: 10}}>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                backgroundColor: 'green',
                padding: 10,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}>
              <Text style={{color: '#fff'}}>Get Subscription info</Text>
            </TouchableOpacity>
            <FlatList
              data={this.state.subscriptionList}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    style={{padding: 10, borderWidth: 1}}
                    onPress={() => this.PurchaseSubscription(item.productId)}>
                    <Text>{item.productId}</Text>
                    <Text>{item.localizedPrice}</Text>
                    <Text>{item.price}</Text>
                    <Text>{item.subscriptionPeriodUnitIOS}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        ) : (
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text>Now you have a subscription</Text>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

export default Page;
