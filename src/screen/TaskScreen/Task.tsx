import { FlatList, StyleSheet, Text, useColorScheme, View } from "react-native";
import React, { ReactElement, useMemo } from "react";
import { Colors } from "../../constant/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Size } from "../../constant/Size";
import TaskItems from "../../component/TaskItems";
import { Data as rawData } from "../../data/DATA";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface PropTypes {}

export default function Task({}: PropTypes): ReactElement {
  const colorScheme = useColorScheme();

  const sortedData = useMemo(
    () =>
      rawData.slice().sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime()),
    [rawData]
  );

  return (
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
        <FlatList
          data={sortedData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TaskItems title={item.title} dueDate={item.dueDate} />
          )}
          style={{ height: hp(100) }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: wp(Size.spacing.xs),
  },

  topContainer: {
    flexDirection: "row",
    marginTop: hp(4),
    width: wp(100),
  },
  topTextContainer: {
    width: wp(70),
    alignItems: "flex-start",
    justifyContent: "center",
  },
  topIconContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
    width: wp(22),
  },

  bottomContainer: {
    marginTop: Size.spacing.md,
  },
});
