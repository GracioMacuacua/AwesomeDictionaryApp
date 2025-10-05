import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { CustomButton } from "./CustomButton";
import { StyleSheet } from "react-native";
import { IconProps } from "@/types/icon";
import { Container } from "./Container";
import React from "react";

const BottomTabBar = ({
  state,
  navigation,
  descriptors,
}: Omit<BottomTabBarProps, "insets">) => {
  const icons: IconProps[] = [
    { name: "fa-solid fa-book" },
    { name: "fa-solid fa-circle-question" },
    { name: "fa-solid fa-circle-plus" },
    { name: "fa-solid fa-heart" },
    { name: "fa-solid fa-gear" },
  ];

  return (
    <Container customStyle={styles.navigationBar}>
      {state.routes.slice(0, 5).map((route, index) => {
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        const options = descriptors[route.key].options;
        const buttonTitle = options.title || route.name;

        return (
          <CustomButton
            key={route.key}
            icon={icons[index]}
            text={buttonTitle}
            customStyle={{ paddingTop: 20 }}
            isFocused={isFocused}
            onPress={onPress}
            onLongPress={onLongPress}
          />
        );
      })}
    </Container>
  );
};

export { BottomTabBar };

const styles = StyleSheet.create({
  navigationBar: {
    flexDirection: "row",
    flexWrap: "nowrap",
    backgroundColor: "#fff",
    paddingBottom: 15,
    paddingHorizontal: 5,
  },
});
