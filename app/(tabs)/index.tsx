import {
  View,
  Text,
  Alert,
  TextInput,
  StyleSheet,
  BackHandler,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import axios from "axios";
import React from "react";
import debounce from "lodash.debounce";
import { Icon } from "@components/Icon";
import { TopBar } from "@components/TopBar";
import { useFocusEffect } from "expo-router";
import { Screen } from "@components/Screen";
import { LoadingComponent } from "@components/Loading";
import { DataProps, Listing } from "@components/Listing";
import { useCallback, useEffect, useRef, useState, useMemo } from "react";

const Home = () => {
  const [search, setSearch] = useState("");
  const inputRef = useRef<TextInput>(null);
  const [words, setWords] = useState<DataProps>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSearchbar, setShowSearchbar] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        if (showSearchbar) {
          setShowSearchbar(false);
          setSearch("");
          return true;
        } else {
          Alert.alert(
            "Sair do aplicativo",
            "Você deseja realmente sair do aplicativo?",
            [
              {
                text: "Cancelar",
                onPress: () => null,
                style: "cancel",
              },
              {
                text: "Sair",
                onPress: () => BackHandler.exitApp(),
                style: "destructive",
              },
            ]
          );
          return true;
        }
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => {
        subscription.remove();
      };
    }, [showSearchbar])
  );

  useFocusEffect(
    useCallback(() => {
      return () => {
        setSearch("");
        setShowSearchbar(false);
      };
    }, [])
  );

  useEffect(() => {
    if (showSearchbar) {
      const timeout = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [showSearchbar]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(process.env.EXPO_PUBLIC_API_HOST + `/data`)
      .then((response) => {
        setWords(response.data);
      })
      .catch((error) => {
        ToastAndroid.show(
          "Não foi possível carregar os dados. Verifique a sua ligação à internet!.",
          ToastAndroid.LONG
        );
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    debounceSearch(search);
    return () => {
      debounceSearch.cancel(); // limpa o timer anterior
    };
  }, [search]);

  const filteredWords = useMemo(() => {
    return words?.filter((word) =>
      word.word.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [debouncedSearch, words]);

  const openSearchbar = useCallback(() => {
    setShowSearchbar((prev) => !prev);
  }, []);

  const debounceSearch = useMemo(() => {
    return debounce((value) => {
      setDebouncedSearch(value);
    }, 500);
  }, [search]);

  const clearSearch = useCallback(() => {
    setSearch("");
  }, []);

  return (
    <Screen>
      <TopBar>
        {!showSearchbar ? (
          <>
            <View style={styles.button}>{""}</View>
            <Text style={styles.text}>Dicionário da Língua Portuguesa</Text>
            <TouchableOpacity style={styles.button} onPress={openSearchbar}>
              <Icon
                name="fa-solid fa-magnifying-glass"
                customStyle={{ color: "#fff" }}
                size={17}
              />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity style={styles.button} onPress={openSearchbar}>
              <Icon
                name="fa-solid fa-arrow-left"
                customStyle={{ color: "#fff" }}
                size={17}
              />
            </TouchableOpacity>
            <TextInput
              ref={inputRef}
              style={styles.searchBar}
              placeholder="Pesquisar..."
              placeholderTextColor={"#fff"}
              onChangeText={setSearch}
              value={search}
            />
            <TouchableOpacity onPress={clearSearch}>
              {search.length > 0 ? (
                <Icon
                  name="fa-solid fa-x"
                  customStyle={{ color: "#fff" }}
                  size={17}
                />
              ) : null}
            </TouchableOpacity>
          </>
        )}
      </TopBar>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <Listing data={filteredWords ?? []} />
      )}
    </Screen>
  );
};

export default Home;

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    fontFamily: "Cabin-Regular",
    fontSize: 20,
    color: "#fff",
    flex: 1,
  },
  searchBar: {
    flex: 1,
    color: "white",
    fontSize: 18,
    paddingBottom: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "white",
    marginHorizontal: 10,
  },
  button: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
