import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { ReactElement, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Size } from "../../constant/Size";
import { Priority } from "../../data/DATA";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Colors } from "../../constant/Colors";
import Chip from "../Chip";
import Ionicons from "@expo/vector-icons/Ionicons";
import IsCompletedChip from "../IsCompletedChip";
import { formatDueDate } from "../../utils/date";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Feather from "@expo/vector-icons/Feather";
import { styles } from "./styles";

interface PropTypes {
  id: string;
  title: string;
  priority?: Priority;

  dueDate?: Date | string;
  description?: string;
  isCompleted: boolean;
  onDelete?: (id: string) => void;
}

export default function TaskItems({
  id,
  title,
  priority,
  dueDate,
  description,
  isCompleted,
  onDelete,
}: PropTypes): ReactElement {
  const [deleteOptionVisible, setDeleteOptionVisible] = useState(false);
  const [currentId, setCurrentId] = useState("");

  function toggleOption() {
    setDeleteOptionVisible((prev) => !prev);
  }

  async function handleDelete(idToDelete = currentId) {
    if (!idToDelete) return;
    Alert.alert("Delete task?", "This cannot be undone.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => onDelete?.(idToDelete),
      },
    ]);
    setDeleteOptionVisible(false);
  }

  return (
    <TouchableWithoutFeedback onPress={() => setDeleteOptionVisible(false)}>
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

                    opacity: pressed ? 0.6 : 1,
                    borderWidth: wp(0.2),
                  },
                ]}
                onPress={() => {
                  setCurrentId(id);
                  toggleOption();
                }}
              >
                <MaterialCommunityIcons
                  name="dots-horizontal"
                  size={24}
                  color="balck"
                />
              </Pressable>
            </View>
          </View>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>{description}</Text>
        </View>

        <View style={styles.middleContainer}>
          <Chip priority={priority} />
          <IsCompletedChip isCompleted={isCompleted} />
        </View>

        <View style={styles.dateContainer}>
          <View>
            <Ionicons
              name="calendar-clear-outline"
              size={wp(5)}
              color="black"
            />
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
              onPress={() => {
                handleDelete();
              }}
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
    </TouchableWithoutFeedback>
  );
}
