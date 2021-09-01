import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from './SplashScreen';
import SignIn from './SignIn';
import ForgotPassword from './ForgotPassword';
import VerificationCode from './VerificationCode';
import SignUp from './SignUp';
import HowAppWorks from './HowAppWorks';
import Dashboard from './Dashboard';
import Subscription from './Subscription';
import AddBenificiaryPage1 from './AddBenificiaryPage1';
import AddBenificiaryPage2 from './AddBenificiaryPage2';
import AddBenificiaryPage3 from './AddBenificiaryPage3';
import AddBenificiaryPage4 from './AddBenificiaryPage4';
import Setting from './Setting';
import AccountInformation from './AccountInformation';
import AboutApp from './AboutApp';
import Billing from './Billing';
import Support from './Support';
import Benificiary from './Benificiary';
import CallLogs from './CallLogs';

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
        <Stack.Screen name="Dashboard" component={Dashboard} />
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
        <Stack.Screen
          name="AddBenificiaryPage4"
          component={AddBenificiaryPage4}
        />
        <Stack.Screen name="Setting" component={Setting} />
        <Stack.Screen
          name="AccountInformation"
          component={AccountInformation}
        />
        <Stack.Screen name="AboutApp" component={AboutApp} />
        <Stack.Screen name="Billing" component={Billing} />
        <Stack.Screen name="Support" component={Support} />
        <Stack.Screen name="Benificiary" component={Benificiary} />
        <Stack.Screen name="CallLogs" component={CallLogs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
