import React, { StyleProp, StyleSheet, View } from "react-native";
import { PropsWithChildren } from "react";

type ContainerProps = PropsWithChildren & {
  customStyle?: StyleProp<React.ViewStyle>;
};

const Container = ({ children, customStyle }: ContainerProps) => {
  return <View style={[styles.container, customStyle]}>{children}</View>;
};

export { Container };

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
  },
});
