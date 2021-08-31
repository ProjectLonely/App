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
import AddBenificiaryPage1 from './AddBenificiaryPage1';
import AddBenificiaryPage2 from './AddBenificiaryPage2';
import AddBenificiaryPage3 from './AddBenificiaryPage3';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode={false}
        initialRouteName="AddBenificiaryPage1">
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="VerificationCode" component={VerificationCode} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="HowAppWorks" component={HowAppWorks} />
        <Stack.Screen name="Beneficiary" component={Beneficiary} />
        <Stack.Screen name="Subscription" component={Subscription} />
        <Stack.Screen
          name="AddBenificiaryPage1"
          component={AddBenificiaryPage1}
        />
        <Stack.Screen
          name="AddBenificiaryPage2"
          component={AddBenificiaryPage2}
        />
        <Stack.Screen
          name="AddBenificiaryPage3"
          component={AddBenificiaryPage3}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
