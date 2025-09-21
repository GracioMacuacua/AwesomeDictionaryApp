import { PropsWithChildren } from "react";
import React, { StyleSheet, Dimensions, View } from "react-native";
import { _useTheme } from "@context/ThemeContext";

const { width: screenWidth } = Dimensions.get("window");

const TopBar = ({ children }: PropsWithChildren) => {
  const { theme } = _useTheme();
  const styles = StyleSheet.create({
    topBar: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: theme.background,
      paddingHorizontal: Math.max(screenWidth * 0.04, 12),
      paddingVertical: Math.max(screenWidth * 0.025, 10),
      height: Math.max(screenWidth * 0.15, 56), // Altura FIXA para garantir consistência
    },
  });

  return <View style={styles.topBar}>{children}</View>;
};

export { TopBar };
