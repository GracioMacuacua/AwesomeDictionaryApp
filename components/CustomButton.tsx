import React, {
  StyleSheet,
  Text,
  ViewStyle,
  TouchableOpacity,
} from "react-native";
import { Icon } from "./Icon";
import { useTheme } from "@context/ThemeContext";
import { CustomButtonProps } from "@/types/custombutton";

const CustomButton = ({
  icon,
  text,
  isFocused,
  customStyle,
  onPress,
  onLongPress,
}: CustomButtonProps) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity
      key={Date.now().toString()}
      style={[styles.container, customStyle]}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <Icon
        name={icon.name}
        customStyle={{
          color:
            isFocused != null
              ? isFocused === true
                ? theme.background
                : "#6F707B"
              : "#FFF",
        }}
        size={20}
      />
      {isFocused != null ? (
        isFocused === true && <Text style={styles.text}>{text}</Text>
      ) : (
        <Text style={[styles.text, { color: "#FFF", fontSize: 16 }]}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export { CustomButton };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 13,
    fontFamily: "Cabin-Regular",
    fontWeight: "200",
  },
});
