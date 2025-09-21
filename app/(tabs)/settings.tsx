import { StyleSheet, View, Text, Switch } from "react-native";
import { COLORS, THEMES } from "@constants/Themes";
import { Container } from "@components/Container";
import { _useTheme } from "@context/ThemeContext";
import { TopBar } from "@components/TopBar";
import { Button } from "@components/Button";
import { Screen } from "@components/Screen";
import { Color } from "@components/Color";
import React, { useState } from "react";
import { Icon } from "@components/Icon";

const Settings = () => {
  const { theme, toggleTheme } = _useTheme();
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled(!isEnabled);

  const buttonList = new Array(
    {
      icon: { name: "fa-solid fa-share-nodes" },
      text: "Partilhar App",
    },
    { icon: { name: "fa-solid fa-square-plus" }, text: "Mais Apps" },
    { icon: { name: "fa-solid fa-clock-rotate-left" }, text: "Histórico" }
  );

  return (
    <Screen>
      <TopBar>
        <View></View>
        <Text style={styles.text}>Definições</Text>
        <View></View>
      </TopBar>
      <Container customStyle={styles.container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 30,
          }}
        >
          <Icon
            name="fa-solid fa-palette"
            customStyle={{ color: theme.background, marginRight: 10 }}
          />
          <Text style={[styles.text, { fontSize: 16 }]}>Tema</Text>
        </View>
        <View style={styles.themesContainer}>
          {Object.entries(THEMES).map((_theme, key) => (
            <Color
              key={key}
              color={{ name: _theme[0] as COLORS, code: _theme[1].background }}
              onSelect={toggleTheme}
              selected={theme.name}
            />
          ))}
        </View>
        <View style={styles.buttonsContainer}>
          {buttonList.map((button, id) => (
            <Button
              key={id}
              icon={{
                name: button.icon.name,
                customStyle: { color: theme.background },
              }}
              text={button.text}
              onPress={() => {}}
              onLongPress={() => {}}
              customStyle={{
                backgroundColor: theme.background,
                paddingVertical: 12,
                borderRadius: 10,
              }}
            />
          ))}
        </View>
        <View style={styles.notification}>
          <View style={{ flexDirection: "column" }}>
            <Text style={[styles.text, { textAlign: "left", marginBottom: 5, color: "#000" }]}>
              Notificação
            </Text>
            <Text>Notificações diárias desactivadas</Text>
          </View>
          <Switch
            thumbColor={isEnabled ? theme.background : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
            style={{ padding: 0 }}
          />
        </View>
      </Container>
    </Screen>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: 15,
  },
  text: {
    textAlign: "center",
    fontFamily: "Cabin-Regular",
    fontSize: 20,
    color: "#fff",
    flex: 1,
  },
  themesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: 10,
    marginVertical: 25
  },
  notification: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
