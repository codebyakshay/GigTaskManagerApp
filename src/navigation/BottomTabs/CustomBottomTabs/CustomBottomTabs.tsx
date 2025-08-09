// src/navigation/BottomTabs/CustomBottomTabs/CustomBottomTabs.tsx
import React from "react";
import { View, StyleSheet, useColorScheme } from "react-native";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import CustomTab from "../../../component/CustomTab"; // <-- adjust path
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Size } from "../../../constant/Size";
import { Colors } from "../../../constant/Colors";

import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";

// optional: map route → label/icon name
const routeMeta: Record<
  string,
  { label: string; icon?: string; isProfile?: boolean }
> = {
  Dashboard: { label: "Dashboard", icon: "home" },
  Tasks: { label: "Tasks", icon: "profile" },
  Profile: { label: "Profile", icon: "user", isProfile: true },
};

export default function CustomBottomTabs({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();

  const DashboardIcon = <Feather name="codesandbox" size={24} color="black" />;
  const TaskIcon = <FontAwesome name="tasks" size={22} color="black" />;

  const iconByRoute: Record<string, React.ReactElement> = {
    Dashboard: DashboardIcon,
    Task: TaskIcon,
  };

  return (
    <View
      style={[
        styles.bar,
        {
          paddingBottom: Math.max(insets.bottom, 8),
          backgroundColor:
            colorScheme == "dark"
              ? Colors.DARK.background
              : Colors.LIGHT.background,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented)
            navigation.navigate(route.name);
        };

        const opt = descriptors[route.key]?.options || {};
        const label =
          (typeof opt.tabBarLabel === "string" && opt.tabBarLabel) ||
          (typeof opt.title === "string" && opt.title) ||
          routeMeta[route.name]?.label ||
          route.name;

        const isProfile = routeMeta[route.name]?.isProfile ?? false;

        return (
          <CustomTab
            IconComponent={iconByRoute[route.name]}
            key={route.key}
            isFocused={isFocused}
            tabName={label}
            isProfile={isProfile}
            onPress={onPress}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: Size.spacing.md,
    paddingHorizontal: 12,
  },
});
