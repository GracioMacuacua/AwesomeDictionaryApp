import {
  View,
  Text,
  Alert,
  Linking,
  TextInput,
  StyleSheet,
  BackHandler,
  TouchableOpacity,
} from "react-native";
import React from "react";
import debounce from "lodash.debounce";
import { Icon } from "@components/Icon";
import { WordProps } from "@/types/word";
import { TopBar } from "@components/TopBar";
import { Screen } from "@components/Screen";
import BoyImage from "@assets/boy-image.png";
import { useFocusEffect } from "expo-router";
import CustomModal from "@/components/Modal";
import { Listing } from "@components/Listing";
import { useDatabase } from "@hooks/useDatabase";
import { LoadingComponent } from "@components/Loading";
import { useCallback, useEffect, useRef, useState, useMemo } from "react";

const Home = () => {
  const { getWords } = useDatabase();
  const [search, setSearch] = useState("");
  const inputRef = useRef<TextInput>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [words, setWords] = useState<WordProps[]>([]);
  const [showSearchbar, setShowSearchbar] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        if (showSearchbar) {
          setShowSearchbar(false);
          setSearch("");
          return true;
        } else if (!showModal) {
          toggleShowModal();
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
    const fetchWords = async () => {
      setIsLoading(true);
      try {
        const result = await getWords();
        const transformedWords =
          result
            ?.map((word, index) => ({
              id: word.id || index,
              word: word.word,
              meaning: word.meaning,
              favorite: Boolean(word.favorite),
              selfcreated: Boolean(word.selfcreated),
            }))
            .filter((word) => word.id !== undefined) || [];
        setWords(transformedWords);
      } catch (error) {
        console.error("Error fetching words:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWords();
  }, []);

  useEffect(() => {
    debounceSearch(search);
    return () => {
      debounceSearch.cancel();
    };
  }, [search]);

  const filteredWords = useMemo(() => {
    return words?.filter((word) =>
      word.word.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [debouncedSearch, words]);

  const openSearchbar = () => {
    setShowSearchbar((prev) => !prev);
  };

  const debounceSearch = useMemo(() => {
    return debounce((value) => {
      setDebouncedSearch(value);
    }, 500);
  }, [search]);

  const clearSearch = () => {
    setSearch("");
  };

  const toggleShowModal = () => {
    setShowModal((prev) => !prev);
  };

  const handleExit = () => {
    toggleShowModal();
    BackHandler.exitApp();
  };

  const handleRateApp = async () => {
    let url = "https://example.com/rate-us";
    let suported = await Linking.canOpenURL(url);

    if (suported) {
      toggleShowModal();
      await Linking.openURL(url);
    }
  };

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
                style={{ color: "#fff" }}
                size={17}
              />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity style={styles.button} onPress={openSearchbar}>
              <Icon
                name="fa-solid fa-arrow-left"
                style={{ color: "#fff" }}
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
                  style={{ color: "#fff" }}
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

      <CustomModal visible={showModal} onDismiss={toggleShowModal}>
        <CustomModal.Header>
          <CustomModal.Image source={BoyImage} />
        </CustomModal.Header>
        <CustomModal.Body>
          <CustomModal.Text>
            Se você gostou do aplicativo, por favor, considere avaliá-lo com 5
            estrelas. Isso nos encorajará a continuar o melhorando!
          </CustomModal.Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              gap: 8,
            }}
          >
            {Array(5)
              .fill(null)
              .map((_, i) => (
                <Icon
                  key={i}
                  name="fa-solid fa-star"
                  style={styles.modalIcon}
                  size={24}
                />
              ))}
          </View>
        </CustomModal.Body>
        <CustomModal.Footer>
          <CustomModal.Button variant="primary" onPress={handleExit}>
            <CustomModal.Text>Sair</CustomModal.Text>
          </CustomModal.Button>

          <CustomModal.Button variant="primary" filled onPress={handleRateApp}>
            <CustomModal.Text variant="light">Avaliar</CustomModal.Text>
          </CustomModal.Button>
        </CustomModal.Footer>
      </CustomModal>
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
  modalIcon: {
    color: "#FFD700",
  },
});
