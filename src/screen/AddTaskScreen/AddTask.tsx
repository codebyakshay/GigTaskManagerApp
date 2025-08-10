import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Pressable,
  ScrollView,
} from "react-native";
import React, { ReactElement, useState } from "react";
import { Colors } from "../../constant/Colors";

import { Size } from "../../constant/Size";
import CustomTextInput from "../../component/CutomTextInput";
import type { Priority } from "../../models/task";
import Chip from "../../component/Chip";
import { Checkbox, RadioButton, Switch } from "react-native-paper";
import { styles } from "./styles";
import CustomButton from "../../component/CustomButton";
import { AuthStackParamList } from "../../navigation/AuthNavigators/Auth";
import { useNavigation } from "@react-navigation/native";

import DatePicker from "react-native-date-picker";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { useAppDispatch } from "../../store/store";
import {
  createTask,
  fetchTasksOnce,
  toggleCompleted,
} from "../../store/feature/tasks/taskThunks";

// errors
type FormErrors = {
  title?: string;
  description?: string;
  priority?: string;
};

export default function AddTask({}): ReactElement {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  const dispatch = useAppDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [isCompleted, setIsCompleted] = useState(false);
  const [dueDate, setDueDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const [errors, setErrors] = useState<FormErrors>({});

  function validate(): FormErrors {
    const e: FormErrors = {};
    if (!title.trim()) e.title = "Title is required";
    if (!description.trim()) e.description = "Description is required";

    const ALLOWED = ["low", "medium", "high"] as const; // readonly tuple
    if (!ALLOWED.includes(priority)) e.priority = "Pick a priority";

    return e;
  }

  const canSubmit = !!title.trim() && !!description.trim();

  async function handleSubmit() {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    try {
      // create task in Firestore
      const id = await dispatch(
        createTask({
          title: title.trim(),
          description: description.trim(),
          dueDate,
          priority,
        }) as any
      ).unwrap();

      // if user marked completed at creation time, toggle it
      if (isCompleted) {
        await dispatch(
          toggleCompleted({ id, completed: true }) as any
        ).unwrap();
      }

      // refresh local list and close sheet
      await dispatch(fetchTasksOnce() as any);

      await navigation.goBack();
    } catch (err) {
      console.warn("Create task failed:", err);
    }
  }

  return (
    <ScrollView
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
        <Text style={styles.topTextStyle}>New Task</Text>
      </View>

      <View style={styles.inputFieldContainer}>
        <CustomTextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Title"
        />

        <CustomTextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Description"
          multiline
        />

        {/* simple priority selector */}
        <View style={styles.priorityRow}>
          {(["low", "medium", "high"] as Priority[]).map((p) => (
            <Chip
              key={p}
              priority={p}
              selected={priority === p}
              onPress={() => setPriority(p)}
            />
          ))}
        </View>

        <View style={styles.markAsCompletedContainer}>
          <View style={styles.markAsCompletedLable}>
            <Text style={styles.markAsCompleteText}>Mask as completed</Text>
          </View>

          <View style={styles.checkBoxContainer}>
            <Switch
              value={isCompleted}
              onValueChange={setIsCompleted} // or (v) => setIsCompleted(v)
              color={Colors.LIGHT.success} // on-state color (optional)
            />
          </View>
        </View>

        <View style={styles.dueDateContainer}>
          <View style={styles.dueDateTextContainer}>
            <Text
              style={{
                fontSize: 18,
                marginLeft: wp(3),
                fontWeight: "300",
              }}
            ></Text>
          </View>
          <View style={styles.dueDateDatePickerBtnContainer}>
            <CustomButton onPress={() => setOpen(true)}>Due Date</CustomButton>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton onPress={() => navigation.goBack()}>
            Cancel
          </CustomButton>

          <CustomButton onPress={handleSubmit} disabled={!canSubmit}>
            Confirm
          </CustomButton>
        </View>
      </View>

      <DatePicker
        modal
        open={open}
        date={dueDate}
        mode="date" // 'time' | 'datetime'
        onConfirm={(d) => {
          setOpen(false);
          setDueDate(d);
        }}
        onCancel={() => setOpen(false)}
      />
    </ScrollView>
  );
}
