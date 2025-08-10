// src/component/IsCompletedChip.tsx
import React, { ReactElement } from "react";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../constant/Colors";

interface Props {
  isCompleted?: boolean; // true -> green, false -> red

  style?: ViewStyle; // style override
}

export default function IsCompletedChip({
  isCompleted = false,

  style,
}: Props): ReactElement {
  const bg = isCompleted ? Colors.LIGHT.success : Colors.LIGHT.error;
  const label = isCompleted ? "Complete" : "Incomplete";

  return (
    <Pressable style={[styles.chipContainer, { backgroundColor: bg }]}>
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
  },
});
