import { PropsWithChildren } from "react";
import React, { StyleSheet } from "react-native";
import { Container } from "./Container";
import { _useTheme } from "@context/ThemeContext";

const TopBar = ({ children }: PropsWithChildren) => {
  const { theme } = _useTheme();
  return (
    <Container
      customStyle={[styles.topBar, { backgroundColor: "green" }]}
    >
      {children}
    </Container>
  );
};

export { TopBar };

const styles = StyleSheet.create({
  topBar: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    textAlignVertical: "center",
    // alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: -15,
    // paddingVertical: 10
  },
});
