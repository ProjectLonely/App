import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import SignIn from '../SignIn';
import ForgotPassword from '../ForgotPassword';
import VerificationCode from '../VerificationCode';
import SignUp from '../SignUp';
const LoginStack = createStackNavigator();

const screenNames = {
    login: "Login",
    signUp: "Sign Up",
    forgotPassword: "Forgot Password",
    verificationCode: "Verification Code",

};

function LoginStackScreen({ navigation, route }) {
    const tabHiddenRoutes = ["InnerDetails"];
    useEffect(() => {
        if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
            navigation.setOptions({ tabBarVisible: false });
        } else {
            navigation.setOptions({ tabBarVisible: true });
        }
    }, [navigation, route]);
    return (
        <LoginStack.Navigator
            headerMode="none"
            screenOptions={{
                gestureEnabled: true,
                gestureDirection: "horizontal",
            }}
            initialRouteName={screenNames.login}
        >
            <LoginStack.Screen
                name={screenNames.login}
                component={SignIn}
                options={{ gestureEnabled: false }}
            />
            <LoginStack.Screen
                name={screenNames.forgotPassword}
                component={ForgotPassword}
                options={{ gestureEnabled: false }}
            />
            <LoginStack.Screen
                name={screenNames.verificationCode}
                component={VerificationCode}
                options={{ gestureEnabled: false }}
            />
            <LoginStack.Screen
                name={screenNames.signUp}
                component={SignUp}
                options={{ gestureEnabled: false }}
            />
        </LoginStack.Navigator>
    );
}

export default LoginStackScreen;
