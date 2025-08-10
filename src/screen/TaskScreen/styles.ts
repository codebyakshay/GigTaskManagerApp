import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Size } from "../../constant/Size";
import { Colors } from "../../constant/Colors";

export const styles = StyleSheet.create({
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

  addBtnContainer: {
    position: "absolute",
    zIndex: 99,
    bottom: wp(8),
    right: wp(5),
    justifyContent: "center",
    alignItems: "center",
  },

  addbtnStyle: {
    backgroundColor: Colors.LIGHT.accent,
    padding: wp(2),
    borderRadius: wp(3),
    justifyContent: "center",
    alignItems: "center",
  },
});
