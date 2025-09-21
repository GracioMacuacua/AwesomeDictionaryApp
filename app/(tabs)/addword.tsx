import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { TopBar } from "@components/TopBar";
import { Container } from "@components/Container";
import { _TextInput as TextInput } from "@components/TextInput";
import { CheckBox } from "@components/CheckBox";
import { _useTheme } from "@context/ThemeContext";
import { Icon } from "@components/Icon";
import { Screen } from "@components/Screen";
import { useFocusEffect } from "expo-router";

const AddWord = () => {
  const { theme } = _useTheme();
  const [palavra, setPalavra] = useState("");
  const [significado, setSignificado] = useState("");
  const [checked, setChecked] = useState(false);

  const toggleChecked = () => setChecked((previousState) => !previousState);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setPalavra("");
        setSignificado("");
        setChecked(false);
      };
    }, [])
  );

  return (
    <Screen>
      <TopBar>
        <></>
        <Text style={styles.text}>Adicionar Palavra</Text>
        <></>
      </TopBar>
      <Container customStyle={{ flex: 1, marginTop: 50 }}>
        <View style={{ flex: 1 }}>
          <View style={styles.textinputContainer}>
            <TextInput label="Palavra" state={palavra} setState={setPalavra} />
            <TextInput
              label="Significado"
              state={significado}
              setState={setSignificado}
            />
          </View>
          <View style={styles.actionsContainer}>
            <View style={styles.checkbox}>
              <CheckBox size={27} state={checked} handlePress={toggleChecked} />
              <Text style={{ fontSize: 16 }} onPress={toggleChecked}>
                Marcar como favorito
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: theme.background }]}
            >
              <Icon
                name="fa-solid fa-square-plus"
                customStyle={{ color: "#fff" }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Container>
    </Screen>
  );
};

export default AddWord;

const styles = StyleSheet.create({
  textinputContainer: {
    marginTop: 20,
    flexDirection: "column",
    rowGap: 60,
  },
  text: {
    flex: 1,
    textAlign: "center",
    fontFamily: "Cabin-Regular",
    fontSize: 20,
    color: "white",
  },
  actionsContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 60,
  },
  checkbox: {
    flexDirection: "row",
    alignSelf: "flex-start",
    columnGap: 8,
    marginTop: 10,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
