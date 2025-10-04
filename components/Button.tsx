import React, {
  StyleSheet,
  Text,
  ViewStyle,
  TouchableOpacity,
} from "react-native";
import { Icon, IconProps } from "./Icon";
import { _useTheme } from "@context/ThemeContext";

interface _ButtonProps {
  icon: IconProps;
  text: string;
  isFocused?: boolean;
  customStyle?: ViewStyle;
  onPress: () => void;
  onLongPress?: () => void;
}

const Button = ({
  icon,
  text,
  isFocused,
  customStyle,
  onPress,
  onLongPress,
}: _ButtonProps) => {
  const { theme } = _useTheme();
  return (
    <TouchableOpacity
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

export type { _ButtonProps };
export { Button };

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
