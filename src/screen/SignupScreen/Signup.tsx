import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
  ActivityIndicator,
} from "react-native";
import React, { ReactElement, useState } from "react";
import { Colors } from "../../constant/Colors";
import ImageContainer from "../../component/ImageContainer";

import { Size } from "../../constant/Size";
import CustomTextInput from "../../component/CutomTextInput";
import CustomButton from "../../component/CustomButton";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { signUp } from "../../store/feature/auth/authThunks";
import { styles } from "./styles";

interface PropTypes {
  navigation: any;
}

export default function Signup({ navigation }: PropTypes): ReactElement {
  const colorSchema = useColorScheme();
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((s) => s.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const canSubmit = Boolean(email.trim() && password.trim());

  async function onSignupPress() {
    if (!canSubmit || submitting) return;
    try {
      setSubmitting(true);
      await dispatch(signUp({ email, password }) as any).unwrap();
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

          <View style={styles.legendContainer}>
            <Text style={styles.legendText}>Signup</Text>
          </View>

          <View style={styles.inputFieldContainer}>
            <CustomTextInput
              value={email}
              onChangeText={setEmail}
              placeholder="email"
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <CustomTextInput
              value={password}
              onChangeText={setPassword}
              placeholder="password"
              secureTextEntry
              textContentType="password"
            />
          </View>

          <View style={styles.loginBtnContainer}>
            <CustomButton
              onPress={onSignupPress}
              disabled={!canSubmit || submitting}
              style={{
                backgroundColor: Colors.LIGHT.accent,
              }}
            >
              {submitting ? "Creating account…" : "Sign-up"}
            </CustomButton>
          </View>

          {submitting ? <ActivityIndicator style={{ marginTop: 8 }} /> : null}

          {error ? (
            <Text style={{ color: "red", textAlign: "center", marginTop: 8 }}>
              {String(error)}
            </Text>
          ) : null}

          <View style={styles.bottomInfoText}>
            <Text
              style={{ textAlign: "center", fontSize: 16, fontWeight: "300" }}
            >
              Already have an account?
              <Text
                style={{
                  textDecorationLine: "underline",
                  color: Colors.LIGHT.textSecondary,
                }}
                onPress={() => {
                  return navigation.replace("Login");
                }}
              >
                Login to an existing account.
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
