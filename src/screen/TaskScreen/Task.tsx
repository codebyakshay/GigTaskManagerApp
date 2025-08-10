import {
  FlatList,
  Text,
  useColorScheme,
  View,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React, { ReactElement, useEffect } from "react";
import { Colors } from "../../constant/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import TaskItems from "../../component/TaskItems/TaskItems";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { styles } from "./styles";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  deleteTask,
  fetchTasksOnce,
} from "../../store/feature/tasks/taskThunks";
import CustomButton from "../../component/CustomButton";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { BottomTabsParamList } from "../../navigation/BottomTabs/BottomTabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigation/AuthNavigators/Auth";

interface PropTypes {}

type Nav = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabsParamList>,
  NativeStackNavigationProp<AuthStackParamList>
>;

export default function Task({}: PropTypes): ReactElement {
  const colorScheme = useColorScheme();
  const navigation = useNavigation<Nav>();

  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((s) => s.tasks);

  useEffect(() => {
    dispatch(fetchTasksOnce() as any);
  }, [dispatch]);

  // console.log(`isLoading ${loading}, items ${items}, erros ${error}`);

  const handleDelete = async (id: string) => {
    try {
      await (dispatch(deleteTask(id)) as any).unwrap();
      // optional refresh if your slice doesn't optimistically remove
      await dispatch(fetchTasksOnce() as any);
    } catch (e) {
      console.warn("Delete failed:", e);
    }
  };

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

        <View style={styles.bottomContainer}>
          {loading ? <ActivityIndicator style={{ marginTop: 12 }} /> : null}
          {error ? (
            <Text
              style={{ color: "red", textAlign: "center", marginVertical: 8 }}
            >
              {String(error)}
            </Text>
          ) : null}

          <View style={{ height: hp(75) }}>
            <FlatList
              data={items}
              keyExtractor={(item) => String(item.id)}
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
              style={{}}
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
