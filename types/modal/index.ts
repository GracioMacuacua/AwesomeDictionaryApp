import { ModalProps, TextProps, TouchableOpacityProps } from "react-native";

export interface CustomModalProp extends ModalProps {
  variant?: "a" | "b";
}

export interface ModalTextProps extends TextProps {
  variant?: "light" | "dark";
}

export interface ModalButtonProps extends TouchableOpacityProps {
  variant?: "primary" | "secondary";
  filled?: boolean;
}
