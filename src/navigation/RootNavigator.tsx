import { StyleSheet, Text, View } from "react-native";
import React, { ReactElement, useEffect } from "react";
import Auth from "./AuthNavigators/Auth";
import Local from "./AuthNavigators/Local";

import { startAuthListener } from "../store/feature/auth/authThunks";
import { useAppDispatch, useAppSelector } from "../store/store";

interface PropTypes {}

export default function RootNavigator({}: PropTypes): ReactElement {
  const dispatch = useAppDispatch();
  const { user, ready } = useAppSelector((s) => s.auth);

  useEffect(() => {
    const unsub = (dispatch as any)(startAuthListener());
    return unsub;
  }, [dispatch]);

  if (!ready) {
    return (
      <View style={styles.splash}>
        <Text>Loading…</Text>
      </View>
    );
  }

  const isAuthenticated = !!user;
  return isAuthenticated ? <Auth /> : <Local />;
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
