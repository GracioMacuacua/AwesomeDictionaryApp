import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useTheme, ThemeProvider } from "@context/ThemeContext";
import { SystemBars } from "react-native-edge-to-edge";
import { loadAssets } from "@hooks/loadAssets";
import { SQLiteProvider } from "expo-sqlite";
import { Stack } from "expo-router";
import React from "react";

const RootLayout = () => {
  const loaded = loadAssets();

  if (!loaded) return null;

  return (
    <ThemeProvider>
      <SystemBars
        style={{ statusBar: "inverted", navigationBar: "inverted" }}
        hidden={{ statusBar: false, navigationBar: false }}
      />
      <RootLayoutWithTheme />
    </ThemeProvider>
  );
};

const RootLayoutWithTheme = () => {
  const { theme } = useTheme();

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: theme.background }}
        edges={{
          top: "maximum",
          bottom: "maximum",
        }}
      >
        <SQLiteProvider
          databaseName="db.sqlite"
          assetSource={{ assetId: require("../assets/database/db.sqlite") }}
        >
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="meaning" />
            <Stack.Screen name="history" />
          </Stack>
        </SQLiteProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default RootLayout;
