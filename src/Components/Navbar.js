import React from "react";
import { Platform, StyleSheet, View } from "react-native";

import { UIText } from "./UI/Text";

import { THEME } from "../theme";

export default function NavBar({ title }) {
  return (
    <View style={{...styles.navbar, ...Platform.select({
      ios: styles.navBarIos,
      android: styles.navBarAndroid
    })}}>
      <UIText isBold inlineStyles={styles.text}>{title}</UIText>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 10,
  },
  text: {
    fontSize: 20,
  },
  navBarAndroid: {
    backgroundColor: THEME.MAIN_COLOR,
  },
  navBarIos: {
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 1,
  }
});
