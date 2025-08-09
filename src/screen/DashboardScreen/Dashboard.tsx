import { StyleSheet, Text, useColorScheme, View } from "react-native";
import React, { ReactElement } from "react";
import { Colors } from "../../constant/Colors";
import Feather from "@expo/vector-icons/Feather";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Octicons from "@expo/vector-icons/Octicons";
import DashboardTaskTile from "../../component/DashboardTaskTile";
import { styles } from "./styles";

interface PropTypes {}

export default function Dashboard({}: PropTypes): ReactElement {
  const schemeColor = useColorScheme();

  return (
    <View
      style={[
        styles.screen,
        {
          backgroundColor:
            schemeColor === "dark"
              ? Colors.DARK.background
              : Colors.LIGHT.background,
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
        <View style={styles.topIconContainer}>
          <Octicons name="bell" size={24} color="black" />
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.tileContainer}>
          <DashboardTaskTile count={2} label="In progress" />
        </View>

        <View style={styles.tileContainer}>
          <DashboardTaskTile count={5} label="Completed" />
        </View>

        <View style={styles.tileContainer}>
          <DashboardTaskTile count={10} label="Incomplete" />
        </View>
      </View>
    </View>
  );
}
