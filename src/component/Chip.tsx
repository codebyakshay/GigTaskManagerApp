// src/component/Chip.tsx
import React from "react";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../constant/Colors";
import type { Priority } from "../models/task";

interface Props {
  priority?: Priority; // one of 'low' | 'medium' | 'high'
  selected?: boolean; // highlighted state for the chosen priority
  onPress?: () => void; // tap handler
  style?: ViewStyle;
}

export default function Chip({
  priority = "high",
  selected = false,
  onPress,
  style,
}: Props) {
  const bg = (() => {
    if (selected) return "#rgba(166, 166, 166, 0.4)";
    switch (priority) {
      case "low":
        return "#d9ffe3ff"; // soft tan
      case "medium":
        return "#ffffa2ff"; // neutral
      case "high":
        return Colors.LIGHT.error; // coral
      default:
        return "#eee";
    }
  })();

  const label = priority;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chipContainer,
        { backgroundColor: bg, opacity: pressed ? 0.8 : 1 },
        style,
      ]}
    >
      <Text style={styles.chipTitle}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chipContainer: {
    minWidth: wp(20),
    minHeight: hp(4.6),
    borderRadius: wp(20),
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: hp(0.8),
    paddingHorizontal: wp(3),
    marginHorizontal: wp(0.7),
    borderWidth: wp(0.3),
    // light shadow
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  chipTitle: {
    fontSize: hp(1.8),
    fontWeight: "500",
    color: Colors.LIGHT.textPrimary,
    textTransform: "capitalize",
  },
});
