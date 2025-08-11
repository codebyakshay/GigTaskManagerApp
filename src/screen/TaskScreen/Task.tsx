import {
  FlatList,
  Text,
  useColorScheme,
  View,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React, { ReactElement, useEffect, useState } from "react";
import { Colors } from "../../constant/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { styles } from "./styles";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  deleteTask,
  fetchTasksOnce,
} from "../../store/feature/tasks/taskThunks";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { BottomTabsParamList } from "../../navigation/BottomTabs/BottomTabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigation/AuthNavigators/Auth";
import { Priority, TaskEntity } from "../../models/task";
import RnPaperChip from "../../component/RnPaperChip";
import TaskItems from "../../component/TaskItems/TaskItems";

interface PropTypes {}

type Nav = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabsParamList>,
  NativeStackNavigationProp<AuthStackParamList>
>;

type Status = "completed" | "incomplete";

export default function Task({}: PropTypes): ReactElement {
  const colorScheme = useColorScheme();
  const navigation = useNavigation<Nav>();
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((s) => s.tasks);

  const [selectedStatus, setSelectedStatus] = useState<Set<Status>>(new Set());
  const [selectedPriorities, setSelectedPriorities] = useState<Set<Priority>>(
    new Set()
  );

  const toggleStatus = (v: Status) =>
    setSelectedStatus((prev) => {
      const next = new Set(prev);
      next.has(v) ? next.delete(v) : next.add(v);
      return next;
    });

  const togglePriority = (p: Priority) =>
    setSelectedPriorities((prev) => {
      const next = new Set(prev);
      next.has(p) ? next.delete(p) : next.add(p);
      return next;
    });

  const matches = (t: TaskEntity) => {
    const statusOK =
      selectedStatus.size === 0 ||
      (selectedStatus.has("completed") && t.completed) ||
      (selectedStatus.has("incomplete") && !t.completed);

    const priorityOK =
      selectedPriorities.size === 0 || selectedPriorities.has(t.priority);

    return statusOK && priorityOK;
  };

  const filtered = items
    .filter(matches)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));

  const handleDelete = async (id: string) => {
    try {
      await (dispatch(deleteTask(id)) as any).unwrap();
      // optional refresh if your slice doesn't optimistically remove
      await dispatch(fetchTasksOnce() as any);
    } catch (e) {
      console.warn("Delete failed:", e);
    }
  };

  useEffect(() => {
    dispatch(fetchTasksOnce() as any);
  }, [dispatch]);

  return (
    <>
      <View
        style={[
          styles.screen,
          {
            backgroundColor:
              colorScheme === "dark"
                ? Colors.DARK.background
                : Colors.LIGHT.background,
          },
        ]}
      >
        <View style={styles.topContainer}>
          <View style={{ justifyContent: "center", marginHorizontal: wp(2) }}>
            <FontAwesome name="tasks" size={22} color="black" />
          </View>
          <View style={styles.topTextContainer}>
            <Text style={{ fontSize: 30, fontWeight: "500" }}>Task list</Text>
          </View>
        </View>

        <View style={styles.topFilterStackContainer}>
          <View style={styles.filterItemContainer}>
            <RnPaperChip
              selected={selectedStatus.has("completed")}
              onPress={() => toggleStatus("completed")}
            >
              Complete
            </RnPaperChip>

            <RnPaperChip
              selected={selectedStatus.has("incomplete")}
              onPress={() => toggleStatus("incomplete")}
            >
              Incomplete
            </RnPaperChip>
          </View>
          <View style={styles.filterItemContainer}>
            <RnPaperChip
              selected={selectedPriorities.has("low")}
              onPress={() => togglePriority("low")}
            >
              Low
            </RnPaperChip>

            <RnPaperChip
              selected={selectedPriorities.has("medium")}
              onPress={() => togglePriority("medium")}
            >
              Medium
            </RnPaperChip>

            <RnPaperChip
              selected={selectedPriorities.has("high")}
              onPress={() => togglePriority("high")}
            >
              High
            </RnPaperChip>
          </View>
        </View>

        <View style={styles.bottomContainer}>
          {loading ? <ActivityIndicator style={{ marginTop: 12 }} /> : null}
          {error ? (
            <Text
              style={{ color: "red", textAlign: "center", marginVertical: 8 }}
            >
              {String(error)}
            </Text>
          ) : null}

          <View style={{ height: hp(65) }}>
            <FlatList
              data={filtered}
              keyExtractor={(item) => String(item.id)}
              style={{ height: hp(65) }}
              renderItem={({ item }) => (
                <TaskItems
                  id={item.id}
                  title={item.title}
                  priority={item.priority}
                  description={item.description}
                  dueDate={new Date(item.dueDate)}
                  isCompleted={item.completed}
                  onDelete={handleDelete}
                />
              )}
            />
          </View>
        </View>

        <View style={styles.addBtnContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.addbtnStyle,
              { opacity: pressed ? 0.6 : 1 },
            ]}
            onPress={() => navigation.navigate("AddTask")}
          >
            <AntDesign name="pluscircle" size={44} color="white" />
          </Pressable>
        </View>
      </View>
    </>
  );
}
