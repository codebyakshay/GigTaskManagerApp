import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from "react-native";
import React, { ReactElement, useState } from "react";
import { Colors } from "../../constant/Colors";
import ImageContainer from "../../component/ImageContainer";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { Size } from "../../constant/Size";
import CustomTextInput from "../../component/CutomTextInput";
import CustomButton from "../../component/CustomButton";

interface PropTypes {}

export default function Login({ navigation }: PropTypes): ReactElement {
  const colorSchema = useColorScheme();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        style={[
          styles.screen,
          {
            backgroundColor:
              colorSchema === "dark"
                ? Colors.DARK.background
                : Colors.LIGHT.background,
          },
        ]}
      >
        {/* ??? TOP CONTAINE ??? */}
        <View style={styles.topContainer}>
          <ImageContainer
            src={require("../../../assets/image/login_img.jpg")}
          />
        </View>

        {/* ??? BOTTOM CONTAINER ??? */}
        <View style={styles.bottomContainer}>
          <View style={styles.dividerLine} />

          <View style={styles.inputFieldContainer}>
            <CustomTextInput
              value={username}
              onChangeText={setUsername}
              placeholder="username"
            />

            <CustomTextInput
              value={password}
              onChangeText={setPassword}
              placeholder="password"
            />
          </View>

          <View style={styles.loginBtnContainer}>
            <CustomButton
              style={{
                backgroundColor: Colors.LIGHT.accent,
              }}
            >
              Login
            </CustomButton>
          </View>

          <View style={styles.bottomInfoText}>
            <Text
              style={{ textAlign: "center", fontSize: 16, fontWeight: "300" }}
            >
              Don't have and account?
              <Text
                style={{
                  textDecorationLine: "underline",
                  color: Colors.LIGHT.textSecondary,
                }}
                onPress={() => {
                  return navigation.replace("Signup");
                }}
              >
                Create a new account
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
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

  inputFieldContainer: {
    width: wp(90),
    marginVertical: hp(3),
  },

  loginBtnContainer: {
    width: wp(90),
  },

  bottomInfoText: {
    width: wp(50),
    marginVertical: hp(2),
  },
});
