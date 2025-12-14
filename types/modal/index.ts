import { ModalProps, TextProps, TouchableOpacityProps } from "react-native";

export interface CustomModalProps extends ModalProps {}

export interface ModalTextProps extends TextProps {
  variant?: "light" | "dark";
}

export interface ModalButtonProps extends TouchableOpacityProps {
  variant?: "primary" | "secondary";
  filled?: boolean;
}
