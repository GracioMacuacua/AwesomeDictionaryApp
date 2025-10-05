import React, { StyleSheet, TouchableOpacity } from "react-native";
import { ColorProps } from "@/types/color";
import { Icon } from "./Icon";


const Color = ({ color, onSelect, selected }: ColorProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color.code }]}
      onPress={() => onSelect(color.name)}
    >
      {selected === color.name && (
        <Icon
          name="fa-solid fa-check"
          customStyle={{ color: "#fff" }}
          size={25}
        />
      )}
    </TouchableOpacity>
  );
};

export { Color };

const styles = StyleSheet.create({
  button: {
    flex: 1,
    flexBasis: 50,
    alignItems: "center",
    justifyContent: "center",
    height: 50
  },
});
