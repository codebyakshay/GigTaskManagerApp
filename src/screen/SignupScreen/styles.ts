import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { StyleSheet } from "react-native";
import { Size } from "../../constant/Size";
import { Colors } from "../../constant/Colors";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  topContainer: {
    flex: 1,
  },

  bottomContainer: {
    flex: 2.5,
    alignItems: "center",
    padding: Size.responsive.width(2),
    backgroundColor: Colors.LIGHT.cardBackgroud,
    borderStartStartRadius: wp(4),
    borderStartEndRadius: wp(4),

    //shadows
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { height: 0, width: 2 },
    shadowOpacity: 1,
    shadowRadius: 20,
  },

  dividerLine: {
    height: hp(0.29),
    width: wp(40),
    backgroundColor: "black",
    borderRadius: 10,
  },

  legendContainer: {
    justifyContent: "flex-start",
    alignContent: "flex-start",
    width: wp(100),
    padding: Size.responsive.width(2),
  },

  legendText: {
    textAlign: "left",
    fontSize: wp(8),
    marginLeft: wp(4),
    fontWeight: "600",
  },

  inputFieldContainer: {
    width: wp(90),
    marginVertical: hp(3),
  },

  loginBtnContainer: {
    width: wp(90),
  },

  bottomInfoText: {
    width: wp(45),
    marginVertical: hp(2),
  },
});
