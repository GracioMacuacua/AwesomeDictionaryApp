import { ViewProps, ViewStyle } from "react-native";
import { IconProps } from "../icon";

export interface CustomButtonProps {
  icon: IconProps;
  text: string;
  isFocused?: boolean;
  customStyle?: ViewStyle;
  onPress: () => void;
  onLongPress?: () => void;
}
