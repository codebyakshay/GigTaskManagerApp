import {
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import React, { ReactElement, useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Colors } from "../../constant/Colors";
import Feather from "@expo/vector-icons/Feather";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Octicons from "@expo/vector-icons/Octicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import DashboardTaskTile from "../../component/DashboardTaskTile";
import { styles } from "./styles";
import CustomButton from "../../component/CustomButton";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { logOut } from "../../store/feature/auth/authThunks";
import { fetchTasksOnce } from "../../store/feature/tasks/taskThunks";

interface PropTypes {}

export default function Dashboard({}: PropTypes): ReactElement {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((s) => s.tasks.items);
  const schemeColor = useColorScheme();
  const bg =
    schemeColor === "dark" ? Colors.DARK.background : Colors.LIGHT.background;

  const [submitting, setSubmitting] = useState(false);

  async function onLogoutPress() {
    if (submitting) return;
    try {
      setSubmitting(true);
      await dispatch(logOut()).unwrap();
      // RootNavigator will flip to <Local /> automatically via the auth listener
    } finally {
      setSubmitting(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchTasksOnce());
      return undefined;
    }, [dispatch])
  );

  const completedCount = tasks.filter((t) => t.completed).length;
  const incompleteCount = tasks.filter((t) => !t.completed).length;

  return (
    <View
      style={[
        styles.screen,
        {
          backgroundColor: bg,
        },
      ]}
    >
      <View style={styles.topContainer}>
        <View style={{ justifyContent: "center", marginHorizontal: wp(2) }}>
          <Feather name="codesandbox" size={24} color="black" />
        </View>
        <View style={styles.topTextContainer}>
          <Text style={{ fontSize: 30, fontWeight: "500" }}>Dashboard</Text>
        </View>
        <Pressable style={styles.topIconContainer}>
          <Octicons name="bell" size={24} color="black" />
        </Pressable>

        <Pressable style={styles.topIconContainer} onPress={onLogoutPress}>
          <MaterialCommunityIcons name="exit-to-app" size={30} color="black" />
        </Pressable>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.tileContainer}>
          <DashboardTaskTile count={completedCount} label="Completed" />
        </View>

        <View style={styles.tileContainer}>
          <DashboardTaskTile count={incompleteCount} label="Incomplete" />
        </View>
      </View>
    </View>
  );
}
