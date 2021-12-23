import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import AddBenificiaryPage1 from '../BeneficiaryPage/AddBenificiaryPage1';
import AddBenificiaryPage2 from '../BeneficiaryPage/AddBenificiaryPage2';
import AddBenificiaryPage3 from '../BeneficiaryPage/AddBenificiaryPage3';
import AddBenificiaryPage4 from '../BeneficiaryPage/AddBenificiaryPage4';
import BeneficiaryDetail from '../BeneficiaryDetail';
import Benificiary from "../FooterPage/Benificiary";
import Subscription from "../Subscription";

const BeneficiariesStack = createStackNavigator();

const screenNames = {
    chat: "chat",
    inbox: "Inbox",
    beneficiaries: "Beneficiaries",
    addBenificiaryPage1: "Add Beneficiary",
    addBenificiaryPage2: "Add Beneficiary",
    addBenificiaryPage3: "Add Beneficiary",
    addBenificiaryPage4: "Add Beneficiary",
};

function BeneficiariesStackScreen({ navigation, route }) {
    const tabHiddenRoutes = ["InnerDetails"];
    useEffect(() => {
        if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
            navigation.setOptions({ tabBarVisible: false });
        } else {
            navigation.setOptions({ tabBarVisible: true });
        }
    }, [navigation, route]);
    return (
        <BeneficiariesStack.Navigator
            headerMode="none"
            screenOptions={{
                gestureEnabled: true,
                gestureDirection: "horizontal",
            }}
            initialRouteName={screenNames.beneficiaries}
        >
            <BeneficiariesStack.Screen
                name="AddBenificiaryPage1"
                component={AddBenificiaryPage1}
                options={{ gestureEnabled: false }}
            />
            <BeneficiariesStack.Screen
                name="AddBenificiaryPage2"
                component={AddBenificiaryPage2}
                options={{ gestureEnabled: false }}
            />
            <BeneficiariesStack.Screen
                name="AddBenificiaryPage3"
                component={AddBenificiaryPage3}
                options={{ gestureEnabled: false }}
            />
            <BeneficiariesStack.Screen
                name="AddBenificiaryPage4"
                component={AddBenificiaryPage4}
                options={{ gestureEnabled: false }}
            />
            <BeneficiariesStack.Screen
                name="BeneficiaryDetail"
                component={BeneficiaryDetail}
                options={{ gestureEnabled: false }}
            />
            <BeneficiariesStack.Screen
                name={screenNames.beneficiaries}
                component={Benificiary}
                options={{ gestureEnabled: false }}
            />
            <BeneficiariesStack.Screen
                name="Subscription"
                component={Subscription}
                options={{ gestureEnabled: false }}
            />
        </BeneficiariesStack.Navigator>
    );
}

export default BeneficiariesStackScreen;
