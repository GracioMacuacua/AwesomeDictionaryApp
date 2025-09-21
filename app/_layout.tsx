import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { _useTheme, ThemeProvider } from "@context/ThemeContext";
import { SystemBars } from "react-native-edge-to-edge";
import { loadAssets } from "@hooks/loadAssets";
import { Stack } from "expo-router";
import React from "react";

const RootLayout = () => {
  const loaded = loadAssets();

  if (!loaded) return null;

  return (
    <ThemeProvider>
      <SystemBars
        style={{ statusBar: "light", navigationBar: "light" }}
        hidden={{ statusBar: false, navigationBar: true }}
      />
      <RootLayoutWithTheme />
    </ThemeProvider>
  );
};

const RootLayoutWithTheme = () => {
  const { theme } = _useTheme();

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: theme.background }}
        edges={{
          top: "maximum",
          bottom: "maximum",
        }}
      >
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="meaning" />
          <Stack.Screen name="history" />
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default RootLayout;
