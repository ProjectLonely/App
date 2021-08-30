import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from './SplashScreen';
import SignIn from './SignIn';
import ForgotPassword from './ForgotPassword';
import VerificationCode from './VerificationCode';
import SignUp from './SignUp';
import HowAppWorks from './HowAppWorks';
import Beneficiary from './Beneficiary';
import Subscription from './Subscription';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={false} initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="VerificationCode" component={VerificationCode} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="HowAppWorks" component={HowAppWorks} />
        <Stack.Screen name="Beneficiary" component={Beneficiary} />
        <Stack.Screen name="Subscription" component={Subscription} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
