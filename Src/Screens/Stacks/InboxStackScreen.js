import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import Chat from '../FooterPage/Chat';
import Inbox from '../FooterPage/Inbox';

const InboxStack = createStackNavigator();

const screenNames = {
    chat: "chat",
    inbox: "Inbox",
};

function InboxStackScreen({ navigation, route }) {
    const tabHiddenRoutes = ["InnerDetails"];
    useEffect(() => {
        if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
            navigation.setOptions({ tabBarVisible: false });
        } else {
            navigation.setOptions({ tabBarVisible: true });
        }
    }, [navigation, route]);
    return (
        <InboxStack.Navigator
            headerMode="none"
            screenOptions={{
                gestureEnabled: true,
                gestureDirection: "horizontal",
            }}
            initialRouteName={screenNames.inbox}
        >
            <InboxStack.Screen name={screenNames.chat} component={Chat} />
            <InboxStack.Screen
                name={screenNames.inbox}
                component={Inbox}
            />
        </InboxStack.Navigator>
    );
}

export default InboxStackScreen;
