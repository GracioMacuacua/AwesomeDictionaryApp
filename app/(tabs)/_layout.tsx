import React from "react";
import { Tabs } from "expo-router";
import { CustomBottomTabBar } from "@components/CustomBottomTabBar";

const TabLayout = () => {
  return (
    <Tabs
      tabBar={(props) => <CustomBottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" options={{ title: "INÍCIO" }} />
      <Tabs.Screen name="quiz" options={{ title: "QUIZ" }} />
      <Tabs.Screen name="addword" options={{ title: "ADDWORD" }} />
      <Tabs.Screen name="favorite" options={{ title: "FAVORITOS" }} />
      <Tabs.Screen name="settings" options={{ title: "DEFINIÇÕES" }} />
    </Tabs>
  );
};

export default TabLayout;
