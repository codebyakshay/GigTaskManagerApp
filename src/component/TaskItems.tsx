import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { ReactElement, useState } from "react";
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
import IsCompletedChip from "./IsCompletedChip";
import { formatDueDate } from "../utils/date";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Feather from "@expo/vector-icons/Feather";

interface PropTypes {
  id: string;
  title: string;
  priority?: Priority;

  dueDate?: Date | string;
  description?: string;
  isCompleted: boolean;
}

export default function TaskItems({
  id,
  title,
  priority,
  dueDate,
  description,
  isCompleted,
}: PropTypes): ReactElement {
  const [deleteOptionVisible, setDeleteOptionVisible] = useState(false);

  function handleOption() {
    setDeleteOptionVisible((prev) => !prev);
  }
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
              onPress={handleOption}
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
        <Chip priority={priority} />
        <IsCompletedChip isCompleted={isCompleted} />
      </View>

      <View style={styles.dateContainer}>
        <View>
          <Ionicons name="calendar-clear-outline" size={wp(5)} color="black" />
        </View>

        <View style={styles.dateTextContainer}>
          <Text style={{ fontSize: wp(4) }}>{formatDueDate(dueDate)}</Text>
        </View>
      </View>

      {deleteOptionVisible && (
        <ScrollView style={styles.optionContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.optionItemContainer,
              { opacity: pressed ? 0.7 : 1 },
            ]}
            onPress={() => {}}
          >
            <Feather name="trash-2" size={24} color="black" />
            <Text>Delete</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.optionItemContainer,
              { opacity: pressed ? 0.7 : 1 },
            ]}
            onPress={() => {}}
          >
            <Feather name="edit" size={24} color="black" />
            <Text>Edit</Text>
          </Pressable>
        </ScrollView>
      )}
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

  optionContainer: {
    width: wp(30),
    minHeight: hp(10),
    backgroundColor: "rgba(156, 156, 156, 0.5)",
    position: "absolute",
    right: wp(8),
    top: hp(5),
    borderRadius: wp(3),
    borderWidth: wp(0.3),
    padding: wp(1),

    //
    elevation: 5,
    shadowOffset: { height: 0, width: 0 },
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },

  optionItemContainer: {
    borderRadius: wp(1),
    borderWidth: wp(0.3),
    flexDirection: "row",
    marginVertical: hp(0.2),
    alignItems: "center",
  },
});
