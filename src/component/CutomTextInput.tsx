// src/components/CustomTextInput.tsx

import React from "react";
import { StyleSheet, StyleProp, ViewStyle } from "react-native";
import {
  TextInput,
  TextInputProps,
  useTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { Size } from "../constant/Size";
import { Colors } from "../constant/Colors";

export interface CustomTextInputProps extends Partial<TextInputProps> {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  style?: StyleProp<ViewStyle>;
}

export default function CustomTextInput({
  placeholder = "",
  value,
  onChangeText,
  secureTextEntry = false,
  style,
}: CustomTextInputProps) {
  return (
    <TextInput
      mode="outlined"
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      style={[styles.input, style]}
      autoCapitalize="none"
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.LIGHT.background,
    marginVertical: Size.spacing.xs,
  },
});
