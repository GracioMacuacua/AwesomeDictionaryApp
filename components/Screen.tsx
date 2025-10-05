import { useTheme } from "@context/ThemeContext";
import { View, ViewProps } from "react-native";
import React from "react";

export const Screen = (props: ViewProps) => {
  const { children, style, ...otherProps } = props;

  return <View style={{ flex: 1, backgroundColor: "white" }}>{children}</View>;
};
