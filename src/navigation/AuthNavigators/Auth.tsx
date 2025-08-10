import { Platform, StyleSheet } from "react-native";
import React, { ReactElement } from "react";
import BottomTabs from "../BottomTabs/BottomTabs";
import AddTask from "../../screen/AddTaskScreen/AddTask";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type AuthStackParamList = {
  BottomTabNavigators: undefined;
  AddTask: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function Auth(): ReactElement {
  return (
    <Stack.Navigator initialRouteName="BottomTabNavigators">
      <Stack.Screen
        name="BottomTabNavigators"
        component={BottomTabs}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="AddTask"
        component={AddTask}
        options={{
          headerShown: false,
          // ✅ iOS sheet presenter, Android still shows fullscreen
          presentation: Platform.OS === "ios" ? "formSheet" : "modal",

          // ✅ numeric detents (your current types want numbers)
          sheetAllowedDetents: [0.7, 1.0], // 70% and full
          sheetGrabberVisible: true,
          sheetCornerRadius: 24,
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
