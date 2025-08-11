import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Size } from "../../constant/Size";

export const styles = StyleSheet.create({
  itemContainer: {
    minHeight: hp(10),
    padding: wp(Size.spacing.xs),
    marginVertical: hp(1),
    backgroundColor: "white",
    borderRadius: wp(4),
    borderWidth: wp(0.3),

    //shadow
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { height: 5, width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },

  toptitleContainer: {
    flexDirection: "row",
  },

  titleContainer: {
    width: wp(60),
    alignItems: "flex-start",
    justifyContent: "center",
  },

  titleText: {
    fontSize: wp(5.5),
    fontWeight: "600",
  },

  iconContainer: {
    width: wp(20),
    alignItems: "flex-end",
    justifyContent: "center",
  },

  middleContainer: {
    marginTop: hp(2),
    flexDirection: "row",
  },

  dateContainer: {
    flexDirection: "row",
    marginTop: hp(1.8),
    padding: wp(1),
  },

  dateTextContainer: {
    justifyContent: "center",
    marginHorizontal: wp(1),
  },

  optionContainer: {
    width: wp(30),
    minHeight: hp(8),
    position: "absolute",
    backgroundColor: "white",
    right: wp(8),
    top: hp(6),
    borderRadius: wp(3),
    borderWidth: wp(0.3),
    padding: wp(2),

    //
    elevation: 5,
    shadowOffset: { height: 0, width: 0 },
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },

  optionItemContainer: {
    borderRadius: wp(1),
    borderWidth: wp(0.3),
    flexDirection: "row",
    marginVertical: hp(0.5),
    alignItems: "center",
  },
});
