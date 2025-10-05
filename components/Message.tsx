import { Animated, Text, StyleSheet, Easing } from "react-native";
import React, { useEffect, useRef } from "react";
import { MessageProps } from "@/types/message";

const Message = ({
  visible,
  type = "info",
  message,
  duration,
  onDismiss,
}: MessageProps) => {
  const messageAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(messageAnim, {
      toValue: visible ? 1 : 0,
      duration: 250,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start((result) => {
      if (result.finished && visible) {
        setTimeout(() => {
          onDismiss();
        }, duration ?? 2500);
      }
    });
  }, [messageAnim, visible]);

  const getMessageText = () => {
    if (message) return message;
    return type === "error" ? "Ocorreu um erro inesperado" : "";
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            {
              translateY: messageAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -55],
              }),
            },
          ],
          backgroundColor: type === "error" ? "#ff000088" : "#00Ff0088",
        },
      ]}
    >
      <Text style={styles.text}>{getMessageText()}</Text>
    </Animated.View>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    flexDirection: "row",
    alignSelf: "center",
    padding: 8,
    borderRadius: 8,
  },
  text: {
    flex: 1,
    fontSize: 18,
    color: "white",
    textAlign: "center",
    fontFamily: "Cabin-Regular",
  },
});
