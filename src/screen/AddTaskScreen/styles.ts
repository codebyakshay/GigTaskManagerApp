import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StyleSheet } from "react-native";
import { Size } from "../../constant/Size";

export const styles = StyleSheet.create({
  screen: {
    padding: wp(Size.spacing.sm),
    height: hp(100),
  },
  topContainer: {
    justifyContent: "center",
  },
  topTextStyle: {
    textAlign: "left",
    fontSize: 32,
    fontWeight: "500",
  },
  inputFieldContainer: {
    width: wp(90),
    alignSelf: "center",
    marginVertical: hp(3),
  },
  priorityRow: {
    flexDirection: "row",
    gap: wp(2),
    marginTop: hp(3),
  },
  priorityChip: {
    paddingVertical: hp(0.8),
    paddingHorizontal: wp(3),
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  markAsCompletedContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginVertical: hp(2),
  },

  markAsCompletedLable: {
    justifyContent: "flex-start",
    width: wp(70),
  },

  markAsCompleteText: {
    fontSize: 22,
    fontWeight: "300",
  },

  checkBoxContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: wp(1),
  },

  dueDateContainer: {
    marginVertical: hp(1),
    flexDirection: "row",
  },

  dueDateTextContainer: {
    width: wp(50),
    justifyContent: "center",
  },
  dueDateDatePickerBtnContainer: {
    width: wp(40),
    alignItems: "flex-end",
    justifyContent: "center",
  },
});
