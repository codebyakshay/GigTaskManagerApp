import { StyleSheet, Text, View } from "react-native";
import React, { ReactElement } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Dashboard from "../../screen/DashboardScreen/Dashboard";
import BottomTabs from "../BottomTabs/BottomTabs";

const Stack = createStackNavigator();
interface PropTypes {}

export default function Auth({}: PropTypes): ReactElement {
  return (
    <Stack.Navigator initialRouteName="BottomTabNavigators">
      <Stack.Screen
        name="BottomTabNavigators"
        component={BottomTabs}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
