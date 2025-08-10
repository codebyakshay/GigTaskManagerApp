import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Size } from "../../constant/Size";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: wp(Size.spacing.xs),
  },
  topContainer: {
    flexDirection: "row",
    marginTop: hp(4),
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  topTextContainer: {
    width: wp(60),
    alignItems: "flex-start",
    justifyContent: "center",
  },
  topIconContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
    width: wp(10),
    marginHorizontal: wp(1),
  },

  bottomContainer: {
    marginTop: Size.spacing.md,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  tileContainer: {
    margin: wp(1.5),
  },
});
