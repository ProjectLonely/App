import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import Setting from '../FooterPage/Setting';
import AccountInformation from '../SettingPage/AccountInformation';
import AboutApp from '../SettingPage/AboutApp';
import Billing from '../SettingPage/Billing';
import Support from '../SettingPage/Support';

const SettingsStack = createStackNavigator();

const screenNames = {
  settings: "Settings",
  accountInformation: "Account Information",
  about: "About",
  billing: "Billing",
  support: "Support",
};

function SettingsStackScreen({ navigation, route }) {
  const tabHiddenRoutes = ["InnerDetails"];
  useEffect(() => {
    if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
      navigation.setOptions({ tabBarVisible: false });
    } else {
      navigation.setOptions({ tabBarVisible: true });
    }
  }, [navigation, route]);


  return (
    <SettingsStack.Navigator
      headerMode="none"
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: "horizontal",
      }}
      initialRouteName={screenNames.settings}
    >
      <SettingsStack.Screen name={screenNames.settings} component={Setting} />
      <SettingsStack.Screen
        name={screenNames.accountInformation}
        component={AccountInformation}
      />
      <SettingsStack.Screen name={screenNames.about} component={AboutApp} />
      <SettingsStack.Screen name={screenNames.billing} component={Billing} />
      <SettingsStack.Screen name={screenNames.support} component={Support} />
    </SettingsStack.Navigator>
  );
}

export default SettingsStackScreen;
