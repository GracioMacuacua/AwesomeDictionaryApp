import {
  CustomModalProp,
  ModalButtonProps,
  ModalTextProps,
} from "@/types/modal";
import {
  View,
  Text,
  Modal,
  Image,
  StyleSheet,
  ViewProps,
  ImageProps,
  TouchableOpacity,
} from "react-native";
import React, { useMemo } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useDimensions } from "@/hooks/useDimensions";

const ModalComponent = React.memo<CustomModalProp>((props) => {
  const { children, variant, ...otherProps } = props;

  return (
    <Modal animationType="fade" transparent={true} {...otherProps}>
      <View style={styles.overlay}>
        <View style={styles.wrapper}>{children}</View>
      </View>
    </Modal>
  );
});

const ModalHeader = React.memo<ViewProps>((props) => {
  const { children, style, ...otherProps } = props;

  return (
    <View style={[styles.header, style]} {...otherProps}>
      {children}
    </View>
  );
});

const ModalBody = React.memo<ViewProps>((props) => {
  const { children, style, ...otherProps } = props;

  return (
    <View style={[styles.body, style]} {...otherProps}>
      {children}
    </View>
  );
});

const ModalFooter = React.memo<ViewProps>((props) => {
  const { children, style, ...otherProps } = props;

  return (
    <View style={[styles.footer, style]} {...otherProps}>
      {children}
    </View>
  );
});

const ModalImage = React.memo<ImageProps>((props) => {
  const { style, ...otherProps } = props;
  const { width, height, isPortrait } = useDimensions();

  const imageStyle = useMemo(() => {
    const size = isPortrait ? width * 0.4 : height * 0.4;
    return { width: size, height: size };
  }, [isPortrait, width, height]);

  return (
    <View>
      <Image style={[styles.image, imageStyle, style]} {...otherProps} />
    </View>
  );
});

const ModalText = React.memo<ModalTextProps>((props) => {
  const { children, style, variant, ...otherProps } = props;

  const styleWithVariant = useMemo(
    () => (variant === "light" ? { color: "#FFF" } : {}),
    [variant]
  );

  return (
    <Text style={[styles.text, styleWithVariant, style]} {...otherProps}>
      {children}
    </Text>
  );
});

const ModalButton = React.memo<ModalButtonProps>((props) => {
  const { theme } = useTheme();
  const { width, height, isPortrait } = useDimensions();
  const { children, style, variant = "primary", filled, ...otherProps } = props;

  const styleWithVariant = useMemo(
    () =>
      variant === "primary"
        ? {
            backgroundColor: filled ? theme.background : "transparent",
            borderWidth: 1,
            borderRadius: 8,
            borderColor: theme.background,
          }
        : {},
    [variant, filled, theme.background]
  );

  const finalStyle = useMemo(
    () => ({
      ...styleWithVariant,
      minWidth: isPortrait ? width * 0.3 : width * 0.15,
    }),
    [styleWithVariant, isPortrait, width]
  );

  return (
    <TouchableOpacity
      style={[styles.button, finalStyle, style]}
      {...otherProps}
    >
      {children}
    </TouchableOpacity>
  );
});

const CustomModal = Object.assign(ModalComponent, {
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
  Image: ModalImage,
  Text: ModalText,
  Button: ModalButton,
});

export default CustomModal;

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  wrapper: {
    padding: 30,
    borderRadius: 32,
    elevation: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
    backgroundColor: "#fff",
  },
  header: {
    gap: 10,
  },
  body: {
    gap: 10,
  },
  footer: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {},
  text: {
    maxWidth: 500,
    fontFamily: "Montserrat-Regular",
    textAlign: "center",
    fontSize: 16,
    color: "#091629",
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
});
