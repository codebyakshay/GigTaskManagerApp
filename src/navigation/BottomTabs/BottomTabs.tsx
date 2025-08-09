// src/navigation/BottomTabs/BottomTabs.tsx
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Dashboard from "../../screen/DashboardScreen/Dashboard";
import CustomBottomTabs from "./CustomBottomTabs/CustomBottomTabs";
import Task from "../../screen/TaskScreen/Task";

export type BottomTabsParamList = {
  Dashboard: undefined;
  Task: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<BottomTabsParamList>();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomBottomTabs {...props} />}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Task" component={Task} />
    </Tab.Navigator>
  );
}
