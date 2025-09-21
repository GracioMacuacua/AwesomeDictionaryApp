import { StyleSheet, TouchableOpacity } from "react-native";
import { _useTheme } from "@context/ThemeContext";
import { Icon } from "./Icon";
import React from "react";

type CheckBoxProps = {
  state: boolean;
  handlePress: () => void;
  size?: number;
};

const CheckBox = ({ state, handlePress, size }: CheckBoxProps) => {
  const { theme } = _useTheme();
  return (
    <TouchableOpacity
      style={[
        styles.checkboxBase,
        {
          width: size || 20,
          height: size || 20,
          borderRadius: 5,
        },
      ]}
      onPress={handlePress}
    >
      {state && (
        <Icon
          name="fa-solid fa-square-check"
          customStyle={{ color: theme.background }}
          size={size}
        />
      )}
    </TouchableOpacity>
  );
};

export { CheckBox };

const styles = StyleSheet.create({
  checkboxBase: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
  },
});
