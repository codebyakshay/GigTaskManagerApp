import { StyleSheet, Text, View } from "react-native";
import React, { ReactElement } from "react";
import Auth from "./AuthNavigators/Auth";
import Local from "./AuthNavigators/Local";

interface PropTypes {}

export default function RootNavigator({}: PropTypes): ReactElement {
  const isAuthenticated = false;
  return isAuthenticated ? <Auth /> : <Local />;
}

const styles = StyleSheet.create({});
