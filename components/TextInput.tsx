import React, {
  useRef,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { useTheme } from "@context/ThemeContext";
import { TextInputProps } from "@/types/textinput";
import { View, TextInput, Animated, StyleSheet, Easing } from "react-native";

const _TextInput = ({ label, state, setState }: TextInputProps) => {
  const { theme } = useTheme();
  const focusAnim = useRef(new Animated.Value(0)).current;
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: isFocused ? 1 : 0,
      duration: 150,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: false,
    }).start();
  }, [focusAnim, isFocused]);

  useEffect(() => {
    if (state) {
      setIsFocused(true);
    } else {
      setIsFocused(false);
    }
  }, [state]);

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[
          styles.text,
          {
            bottom: focusAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [9, 46],
            }),
            fontSize: focusAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [16, 12],
            }),
          },
        ]}
      >
        {label}
      </Animated.Text>
      <TextInput
        style={[
          styles.textinput,
          {
            borderBottomColor: isFocused ? theme.background : "lightgray",
          },
        ]}
        value={state}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          !state && setIsFocused(false);
        }}
        onChangeText={setState}
      />
    </View>
  );
};

export { _TextInput };

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flexDirection: "column",
  },
  text: {
    position: "absolute",
    letterSpacing: 0.3,
  },
  textinput: {
    position: "absolute",
    bottom: 8,
    width: `100%`,
    borderBottomWidth: 1,
    fontSize: 16,
  },
});
