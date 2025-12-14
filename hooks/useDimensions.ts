import React from "react";
import { useWindowDimensions } from "react-native";

const useDimensions = () => {
  const { width, height, fontScale } = useWindowDimensions();
  const isPortrait = height >= width;

  return { width, height, fontScale, isPortrait };
};

export { useDimensions };
