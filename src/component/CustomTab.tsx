// src/component/CustomTab.tsx
import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "../constant/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

interface PropTypes {
  isFocused?: boolean;
  tabName?: string;
  isProfile?: boolean;
  onPress?: () => void;
  IconComponent: React.ReactElement;
}

export default function CustomTab({
  isFocused = false,
  tabName = "TabName",
  isProfile = false,
  onPress,
  IconComponent,
}: PropTypes) {
  const theme = Colors.LIGHT; // or pass theme in props if you want dark support

  const iconColor = isFocused ? theme.primary : theme.textSecondary;

  return (
    <Pressable
      style={[
        styles.tabContainer,
        isFocused && [styles.isFocusedStyle, { backgroundColor: theme.accent }],
      ]}
      onPress={onPress}
    >
      <View style={styles.iconContainer}>
        {/* swap icon per tab if you want (see mapping below) */}
        {IconComponent}
      </View>

      {isFocused && (
        <View style={styles.tabNameContainer}>
          <Text style={{ fontSize: wp("4%"), color: theme.textPrimary }}>
            {tabName}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: hp("6%"),
    paddingHorizontal: wp("3%"),
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: hp("20%"),
  },
  isFocusedStyle: {},
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: wp("1%"),
  },
  tabNameContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
