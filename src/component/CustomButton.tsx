import React, { ReactElement } from "react";
import { StyleSheet, StyleProp, ViewStyle } from "react-native";
import { Button } from "react-native-paper";

interface PropTypes {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  onPress?: () => void;
  icon?: string;
  mode?: "text" | "outlined" | "contained" | "elevated" | "contained-tonal";
  disabled?: boolean;
  isPrimary?: boolean;
}

export default function CustomButton({
  style,
  children,
  onPress,
  icon,
  mode = "contained",
  disabled,
}: PropTypes): ReactElement {
  return (
    <Button
      icon={icon}
      mode={mode}
      onPress={onPress}
      style={[style]}
      disabled={disabled}
    >
      {children}
    </Button>
  );
}

const styles = StyleSheet.create({});
