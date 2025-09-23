import {
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { _TextInput as TextInput } from "@components/TextInput";
import React, { useState, useCallback } from "react";
import { Container } from "@components/Container";
import { _useTheme } from "@context/ThemeContext";
import { useDatabase } from "@hooks/useDatabase";
import { CheckBox } from "@components/CheckBox";
import { useFocusEffect } from "expo-router";
import { TopBar } from "@components/TopBar";
import { Screen } from "@components/Screen";
import { Icon } from "@components/Icon";

const AddWord = () => {
  const { theme } = _useTheme();
  const { saveWord } = useDatabase();
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [checked, setChecked] = useState(false);

  const toggleChecked = () => setChecked((previousState) => !previousState);

  const handleSaveWord = async () => {
    try {
      await saveWord(word, meaning, checked);
      ToastAndroid.show("Palavra salva com sucesso", ToastAndroid.LONG);
      clearForm();
    } catch (error) {
      ToastAndroid.show("Erro ao salvar palavra", ToastAndroid.LONG);
    }
  };

  const clearForm = useCallback(() => {
    setWord("");
    setMeaning("");
    setChecked(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () => clearForm();
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
            <TextInput label="Palavra" state={word} setState={setWord} />
            <TextInput
              label="Significado"
              state={meaning}
              setState={setMeaning}
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
              onPress={handleSaveWord}
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
