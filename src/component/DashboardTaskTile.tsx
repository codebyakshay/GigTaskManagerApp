// src/components/DashboardTaskTile.tsx
import React from "react";
import {
  Image,
  ImageBackground,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Size } from "../constant/Size";
import { Colors } from "../constant/Colors";

interface Props {
  count?: number;
  label?: string;
  tint?: string;
  onMenuPress?: () => void;
}

export default function DashboardTaskTile({
  count = 24,
  label = "In Progress",
  tint = Colors.LIGHT.purple,
  onMenuPress,
}: Props) {
  return (
    <View style={[styles.card, { backgroundColor: tint }]}>
      {/* Decorative wave image clipped by borderRadius */}
      <Image
        source={require("../../assets/image/abstract1.jpg")}
        style={styles.wave}
        resizeMode="cover"
      />

      <View style={styles.headerRow}>
        <View>
          <Text style={styles.count}>{count}</Text>
          <Text style={styles.subLabel}>{label}</Text>
        </View>

        <Pressable onPress={onMenuPress} style={styles.menuBtn} hitSlop={8}>
          <MaterialCommunityIcons
            name="dots-horizontal"
            size={18}
            color="#fff"
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: wp("40%"),
    height: hp("15%"),
    borderRadius: Size.radius.lg,
    padding: Size.spacing.md,
    overflow: "hidden",
  },

  // Full-bleed decorative image anchored to the bottom
  wave: {
    ...StyleSheet.absoluteFillObject,
    top: undefined,
    bottom: 0,
    width: wp("45%"),
    height: hp("20%"),
    opacity: 0.3,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  count: {
    fontSize: 30,
    fontWeight: "700",
    color: "white",
  },

  subLabel: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: "500",
    color: "white",
  },

  menuBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
});
