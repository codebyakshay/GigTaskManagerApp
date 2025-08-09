import { StyleSheet, Text, View } from "react-native";
import React, { ReactElement } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../../screen/LoginScreen/Login";
import Signup from "../../screen/SignupScreen/Signup";

const Stack = createStackNavigator();

interface PropTypes {}

export default function Local({}: PropTypes): ReactElement {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
