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
import BeneficiaryDetail from './BeneficiaryDetail';
import Notification from './Notification';
import Chat from './Chat';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={false} initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{gestureEnabled: false}}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{gestureEnabled: false}}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{gestureEnabled: false}}
        />
        <Stack.Screen
          name="VerificationCode"
          component={VerificationCode}
          options={{gestureEnabled: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{gestureEnabled: false}}
        />
        <Stack.Screen
          name="HowAppWorks"
          component={HowAppWorks}
          options={{gestureEnabled: false}}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{gestureEnabled: false}}
        />
        <Stack.Screen
          name="Subscription"
          component={Subscription}
          options={{gestureEnabled: false}}
        />
        <Stack.Screen
          name="AddBenificiaryPage1"
          component={AddBenificiaryPage1}
          options={{gestureEnabled: false}}
        />
        <Stack.Screen
          name="AddBenificiaryPage2"
          component={AddBenificiaryPage2}
          options={{gestureEnabled: false}}
        />
        <Stack.Screen
          name="AddBenificiaryPage3"
          component={AddBenificiaryPage3}
          options={{gestureEnabled: false}}
        />
        <Stack.Screen
          name="AddBenificiaryPage4"
          component={AddBenificiaryPage4}
          options={{gestureEnabled: false}}
        />
        <Stack.Screen
          name="Setting"
          component={Setting}
          options={{gestureEnabled: false}}
        />
        <Stack.Screen
          name="AccountInformation"
          component={AccountInformation}
          options={{gestureEnabled: false}}
        />
        <Stack.Screen
          name="AboutApp"
          component={AboutApp}
          options={{gestureEnabled: false}}
        />
        <Stack.Screen
          name="Billing"
          component={Billing}
          options={{gestureEnabled: false}}
        />
        <Stack.Screen
          name="Support"
          component={Support}
          options={{gestureEnabled: false}}
        />
        <Stack.Screen
          name="Benificiary"
          component={Benificiary}
          options={{gestureEnabled: false}}
        />
        <Stack.Screen
          name="CallLogs"
          component={CallLogs}
          options={{gestureEnabled: false}}
        />
        <Stack.Screen
          name="BeneficiaryDetail"
          component={BeneficiaryDetail}
          options={{gestureEnabled: false}}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{gestureEnabled: false}}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{gestureEnabled: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
