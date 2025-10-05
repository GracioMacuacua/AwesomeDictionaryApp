import React, { StyleSheet } from "react-native";
import { Container } from "./Container";
import { Button } from "./Button";
import { IconProps } from "./Icon";

const BottomTabBar = ({ state, navigation }: any) => {
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

        return (
          <Button
            key={index}
            icon={icons[index]}
            text={route.name}
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
