import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
  ActivityIndicator,
} from "react-native";
import React, { ReactElement, useState, useEffect, use } from "react";
import { Colors } from "../../constant/Colors";
import ImageContainer from "../../component/ImageContainer";

import { Size } from "../../constant/Size";
import CustomTextInput from "../../component/CutomTextInput";
import CustomButton from "../../component/CustomButton";
import { styles } from "./styles";
import { signIn } from "../../store/feature/auth/authThunks";
import { useAppDispatch, useAppSelector } from "../../store/store";

interface PropTypes {
  navigation: any;
}

export default function Login({ navigation }: PropTypes): ReactElement {
  const colorSchema = useColorScheme();
  const dispatch = useAppDispatch();
  const { error, user, ready } = useAppSelector((s) => s.auth);

  const [email, setEmail] = useState("aksinha8989@gmail.com");
  const [password, setPassword] = useState("Hellohowru123@@@");
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = Boolean(email.trim() && password.trim());

  async function onLoginPress() {
    if (!canSubmit || submitting) return;
    try {
      setSubmitting(true);
      await dispatch(signIn({ email, password }) as any).unwrap();
    } catch (e) {
      console.warn(e);
    } finally {
      setSubmitting(false);
    }
  }

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
        {/* ??? TOP CONTAINER ??? */}
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
              value={email}
              onChangeText={setEmail}
              placeholder="email"
            />

            <CustomTextInput
              value={password}
              onChangeText={setPassword}
              placeholder="password"
              secureTextEntry
            />
          </View>

          <View style={styles.loginBtnContainer}>
            <CustomButton
              onPress={onLoginPress}
              disabled={!canSubmit || submitting}
              style={{ backgroundColor: Colors.LIGHT.accent }}
            >
              {submitting ? "Logging in…" : "Login"}
            </CustomButton>
            {submitting ? <ActivityIndicator style={{ marginTop: 8 }} /> : null}
          </View>
          {error ? (
            <Text style={{ color: "red", textAlign: "center", marginTop: 8 }}>
              {String(error)}
            </Text>
          ) : null}

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
