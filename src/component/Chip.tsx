import { StyleSheet, Text, View } from "react-native";
import React, { ReactElement } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Priority } from "../data/DATA";
import { Size } from "../constant/Size";

interface PropTypes {
  priority?: Priority;
  isCompleted?: boolean;
}

export default function Chip({
  priority = "low",
  isCompleted = true,
}: PropTypes): ReactElement {
  return (
    <View
      style={[
        styles.chipContainer,
        { backgroundColor: isCompleted ? "green" : "lightgrey" },
      ]}
    >
      {isCompleted ? (
        <Text style={styles.chipTitle}>
          {isCompleted ? "Complete" : "Incomplete"}
        </Text>
      ) : (
        <Text style={[styles.chipTitle]}>{priority}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  chipContainer: {
    width: wp(25),
    minHeight: hp(5),
    borderRadius: wp(20),
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    padding: wp(2),
    elevation: 5,
    marginHorizontal: wp(0.7),
  },
  chipTitle: {
    fontSize: hp(1.8),
    fontWeight: "500",
  },

  isCompletedChipStyle: {},
});
