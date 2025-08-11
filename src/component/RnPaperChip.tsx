import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Chip } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

type Props = {
  onPress?: () => void;
  children?: React.ReactNode;
  selected?: boolean;
  mode?: "outlined" | "flat";
  selectedColor?: string; // <- label/icon color when selected
  style?: StyleProp<ViewStyle>;
  compact?: boolean;
  showSelectedOverlay?: boolean;
  iconWhenSelected?: string; // optional check glyph
};

export default function RnPaperChip({
  onPress,
  children,
  selected,
  mode = "outlined",
  selectedColor,
  style,
  compact = true,
  showSelectedOverlay = true,
  iconWhenSelected = "check",
}: Props) {
  return (
    <Chip
      mode={mode}
      selected={selected}
      onPress={onPress}
      selectedColor={selectedColor}
      showSelectedOverlay={showSelectedOverlay}
      compact={compact}
      icon={selected ? iconWhenSelected : undefined}
      rippleColor="transparent"
      style={[style]} // use this to add margin/background/border tweaks
    >
      {children}
    </Chip>
  );
}
