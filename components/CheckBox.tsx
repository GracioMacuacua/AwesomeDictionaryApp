import { StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@context/ThemeContext";
import { CheckBoxProps } from "@/types/checkbox";
import { Icon } from "./Icon";
import React from "react";

const CheckBox = ({ state, handlePress, size }: CheckBoxProps) => {
  const { theme } = useTheme();
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
