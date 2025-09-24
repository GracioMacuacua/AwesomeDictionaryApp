import React, {
  Text,
  View,
  Share,
  Alert,
  StyleSheet,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Container } from "@components/Container";
import { _useTheme } from "@context/ThemeContext";
import { useDatabase } from "@hooks/useDatabase";
import { useFocusEffect } from "expo-router";
import { TopBar } from "@components/TopBar";
import { Screen } from "@components/Screen";
import { Icon } from "@components/Icon";
import * as Speech from "expo-speech";

const Meaning = () => {
  const { theme } = _useTheme();
  const { saveFavorite, deleteFavorite } = useDatabase();
  let { id, word, meaning, favorite } = useLocalSearchParams();
  const [isFavorite, setIsFavorite] = useState<boolean>(favorite == "true");

  useFocusEffect(
    useCallback(() => {
      return () => {
        Speech.stop();
      };
    }, [])
  );

  const handleFavorite = useCallback(async () => {
    try {
      if (!isFavorite) {
        await saveFavorite(Number(id));
        ToastAndroid.show(
          "Palavra adicionada aos favoritos",
          ToastAndroid.LONG
        );
        setIsFavorite(true);
      } else {
        await deleteFavorite(Number(id));
        ToastAndroid.show("Palavra removida dos favoritos", ToastAndroid.LONG);
        setIsFavorite(false);
      }
    } catch (error) {
      ToastAndroid.show("Erro ao favoritar palavra", ToastAndroid.LONG);
    }
  }, [isFavorite, id]);

  const handleSpeech = useCallback(async () => {
    const isSpeeking = await Speech.isSpeakingAsync();
    if (isSpeeking) {
      Speech.stop();
      return;
    }

    await Speech.speak(word as string);
    setTimeout(() => {
      Speech.speak(meaning as string);
    }, 1500);
  }, [word, meaning]);

  const handleShare = useCallback(() => {
    try {
      Share.share({
        message: `Palavra: \n`
          .concat(word as string)
          .concat("\n\nSignificado:\n")
          .concat(meaning as string)
          .concat("\n\nBaixe a aplicação Dicionário da Língua Portuguesa:")
          .concat(
            "https://play.google.com/store/apps/details?id=com.dicionariodalinguaportuguesa"
          ),
      });
    } catch (error) {
      Alert.alert(`Ocorreu um erro inesperdo: ${error}`);
    }
  }, [word, meaning]);

  return (
    <Screen>
      <TopBar>
        <View style={styles.leftButtons}>
          <TouchableOpacity style={styles.iconButton} onPress={handleShare}>
            <Icon
              name="fa-solid fa-share-nodes"
              customStyle={{ color: "#fff" }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleFavorite}>
            <Icon
              name={`${isFavorite ? "fa-solid" : "fa-regular"} fa-heart`}
              customStyle={{ color: "#fff" }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.spacer} />
        <TouchableOpacity style={styles.iconButton} onPress={handleSpeech}>
          <Icon name="fa-solid fa-microphone" customStyle={{ color: "#fff" }} />
        </TouchableOpacity>
      </TopBar>
      <Container customStyle={{ flex: 1, flexDirection: "column" }}>
        <View
          style={[styles.wordContainer, { backgroundColor: theme.background }]}
        >
          <Text style={styles.word}>{word}</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={[styles.meaning, { color: "#000" }]}>{meaning}</Text>
        </ScrollView>
      </Container>
    </Screen>
  );
};

export default Meaning;

const styles = StyleSheet.create({
  wordContainer: {
    marginHorizontal: -12,
    paddingBottom: 60,
    marginBottom: 5,
  },
  word: {
    fontFamily: "Montserrat-Regular",
    fontSize: 29,
    fontWeight: "100",
    textAlign: "center",
    letterSpacing: 0.5,
    color: "#fff",
  },
  meaning: {
    fontFamily: "Montserrat-Regular",
    fontSize: 17,
    letterSpacing: 0.5,
  },
  leftButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  iconButton: {
    minWidth: 40,
    minHeight: 40,
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  spacer: {
    flex: 1,
  },
});
