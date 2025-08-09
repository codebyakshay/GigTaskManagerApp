import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { ReactElement } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Size } from "../constant/Size";
import { Priority } from "../data/DATA";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Colors } from "../constant/Colors";
import Chip from "./Chip";
import Ionicons from "@expo/vector-icons/Ionicons";

interface PropTypes {
  title: string;
  priority?: Priority;
  isCompleted?: boolean;
  dueDate?: Date | string;
}

export default function TaskItems({
  title,
  priority,
  isCompleted,
  dueDate,
}: PropTypes): ReactElement {
  const dueDateText =
    dueDate instanceof Date
      ? dueDate.toLocaleDateString("en-IN", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : dueDate ?? " ";
  return (
    <View style={styles.itemContainer}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.toptitleContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{title}</Text>
          </View>

          <View style={styles.iconContainer}>
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: "white",
                  borderRadius: 99,
                  padding: 2,
                  opacity: pressed ? 0.6 : 1,
                },
              ]}
            >
              <MaterialCommunityIcons
                name="dots-horizontal"
                size={24}
                color="black"
              />
            </Pressable>
          </View>
        </View>
      </View>

      <View style={styles.middleContainer}>
        <Chip isCompleted={true} />
        <Chip isCompleted={false} priority="high" />
      </View>

      <View style={styles.dateContainer}>
        <View>
          <Ionicons name="calendar-clear-outline" size={wp(5)} color="black" />
        </View>

        <View style={styles.dateTextContainer}>
          <Text style={{ fontSize: wp(4) }}>{dueDateText}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    minHeight: hp(10),
    padding: wp(Size.spacing.xs),
    marginVertical: hp(1),
    backgroundColor: "white",
    borderRadius: wp(4),
    borderWidth: wp(0.3),

    //shadow
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { height: 5, width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },

  toptitleContainer: {
    flexDirection: "row",
  },
  titleContainer: {
    width: wp(60),

    alignItems: "flex-start",
    justifyContent: "center",
  },

  titleText: {
    fontSize: wp(5.5),
    fontWeight: "600",
  },

  iconContainer: {
    width: wp(20),
    alignItems: "flex-end",
    justifyContent: "center",
  },

  middleContainer: {
    marginTop: hp(2),
    flexDirection: "row",
  },

  dateContainer: {
    flexDirection: "row",
    marginTop: hp(1.8),
    padding: wp(1),
  },

  dateTextContainer: {
    justifyContent: "center",
    marginHorizontal: wp(1),
  },
});
