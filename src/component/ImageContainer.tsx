import {
  Image,
  ImageResizeMode,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { ReactElement } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

interface PropTypes {
  src: ImageSourcePropType;
  resizeMode?: ImageResizeMode;
}

export default function ImageContainer({
  src,
  resizeMode = "center",
}: PropTypes): ReactElement {
  return (
    <Image
      source={src}
      style={{ width: wp("100"), height: hp("50") }}
      resizeMode={resizeMode}
    />
  );
}

const styles = StyleSheet.create({});
