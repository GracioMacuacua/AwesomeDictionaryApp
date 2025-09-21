import React, { useState, useEffect } from "react";
import { Platform, Keyboard } from "react-native";
import { BottomTabBar } from "./BottomTabBar";

const CustomBottomTabBar = (props) => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    let keyboardEventListener: any[];

    if (Platform.OS === "android") {
      keyboardEventListener = [
        Keyboard.addListener("keyboardDidShow", () =>
          setIsKeyboardVisible(true)
        ),
        Keyboard.addListener("keyboardDidHide", () =>
          setIsKeyboardVisible(false)
        ),
      ];
    }

    return () => {
      if (Platform.OS === "android") {
        keyboardEventListener &&
          keyboardEventListener.forEach((keyboardListener) =>
            keyboardListener.remove()
          );
      }
    };
  }, []);

  const render = () => {
    if (isKeyboardVisible && Platform.OS === "android") return null;

    return <BottomTabBar state={props.state} navigation={props.navigation} />;
  };

  return render();
};

export { CustomBottomTabBar };
