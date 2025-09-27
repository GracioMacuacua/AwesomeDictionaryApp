import {
  View,
  Text,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import { _TextInput as TextInput } from "@components/TextInput";
import React, { useState, useCallback, useRef } from "react";
import { Container } from "@components/Container";
import { _useTheme } from "@context/ThemeContext";
import { useDatabase } from "@hooks/useDatabase";
import { CheckBox } from "@components/CheckBox";
import { useFocusEffect } from "expo-router";
import { TopBar } from "@components/TopBar";
import { Screen } from "@components/Screen";
import Message from "@components/Message";
import { Icon } from "@components/Icon";
import * as z from "zod";

const WordSchema = z.object({
  word: z.string().min(1, "A palavra não pode estar vazia"),
  meaning: z.string().min(1, "O significado não pode estar vazio"),
  favorite: z.boolean("O estado favorito deve ser um booleano"),
});

const AddWord = () => {
  const { theme } = _useTheme();
  const { saveWord } = useDatabase();
  const [word, setWord] = useState("");
  const [message, setMessage] = useState("");
  const [meaning, setMeaning] = useState("");
  const [checked, setChecked] = useState(false);
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [messageType, setMessageType] = useState<"error" | "info">("error");

  const toggleChecked = useCallback(
    () => setChecked((previousState) => !previousState),
    []
  );

  const handleErrorDismiss = useCallback(() => setIsMessageVisible(false), []);

  const handleSaveWord = useCallback(async () => {
    try {
      WordSchema.parse({ word, meaning, favorite: checked });
      await saveWord(word, meaning, checked);
      setMessageType("info");
      setMessage("Palavra registrada com sucesso!");
      setIsMessageVisible(true);
      clearForm();
    } catch (error) {
      if (error instanceof z.ZodError) {
        setMessageType("error");
        setMessage(error?.issues.shift()?.message!);
        setIsMessageVisible(true);
        return;
      }

      ToastAndroid.show("Ocorreu um erro: " + error, ToastAndroid.LONG);
    }
  }, [word, meaning, checked]);

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
        <View style={styles.messageContainer}>
          <Message
            type={messageType}
            message={message}
            visible={isMessageVisible}
            onDismiss={handleErrorDismiss}
          />
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
  messageContainer: {
    position: "relative",
  },
});
