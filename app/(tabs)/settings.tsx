import { StyleSheet, View, Text, Switch, Linking, Share } from "react-native";
import { CustomButton } from "@/components/CustomButton";
import { Container } from "@components/Container";
import { useSettings } from "@/hooks/useSettings";
import { useTheme } from "@context/ThemeContext";
import { TopBar } from "@components/TopBar";
import { Screen } from "@components/Screen";
import { COLOR } from "@/types/theme/color";
import { THEMES } from "@constants/Themes";
import { Color } from "@components/Color";
import React, { useState } from "react";
import { Icon } from "@components/Icon";

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const { buttonList, isSwitchEnabled, toggleSwitch } = useSettings();

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
            style={{ color: theme.background, marginRight: 10 }}
          />
          <Text style={[styles.text, { fontSize: 16 }]}>Tema</Text>
        </View>
        <View style={styles.themesContainer}>
          {Object.entries(THEMES).map((_theme, key) => (
            <Color
              key={key}
              color={{ name: _theme[0] as COLOR, code: _theme[1].background }}
              onSelect={toggleTheme}
              selected={theme.name}
            />
          ))}
        </View>
        <View style={styles.buttonsContainer}>
          {buttonList.map((button, id) => (
            <CustomButton
              key={id}
              icon={{
                name: button.icon.name,
                style: { color: theme.background },
              }}
              text={button.text}
              onPress={button.fn}
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
            <Text
              style={[
                styles.text,
                { textAlign: "left", marginBottom: 5, color: "#000" },
              ]}
            >
              Notificação
            </Text>
            <Text>Notificações diárias desactivadas</Text>
          </View>
          <Switch
            thumbColor={isSwitchEnabled ? theme.background : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isSwitchEnabled}
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
    marginVertical: 25,
  },
  notification: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
