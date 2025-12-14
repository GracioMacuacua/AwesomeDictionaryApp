import React, {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import { LoadingComponent } from "@components/Loading";
import { useDatabase } from "@hooks/useDatabase";
import { Listing } from "@components/Listing";
import { TopBar } from "@components/TopBar";
import { Screen } from "@components/Screen";
import { WordProps } from "@/types/word";
import { Icon } from "@components/Icon";
import CustomModal from "@/components/Modal";
import { useTheme } from "@/context/ThemeContext";

const Favorite = () => {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { getFavorites, clearFavorites } = useDatabase();
  const [favorites, setFavorites] = useState<WordProps[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      setIsLoading(true);
      try {
        const result = await getFavorites();
        setFavorites(result);
      } catch (error) {
        ToastAndroid.show("Erro ao carregar favoritos", ToastAndroid.LONG);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const toggleShowModal = () => {
    setShowModal((prev) => !prev);
  };

  const handleRemoveAll = useCallback(async () => {
    try {
      await clearFavorites();
      setFavorites([]);
      toggleShowModal();
    } catch (error) {
      ToastAndroid.show(
        "Ocorreu um erro ao remover favoritos.",
        ToastAndroid.LONG
      );
    }
  }, []);


  return (
    <Screen>
      <TopBar>
        <View style={styles.button}>{""}</View>
        <Text style={[styles.text, { color: "#FFF" }]}>Favoritas</Text>
        <TouchableOpacity style={styles.button} onPress={toggleShowModal}>
          <Icon name="fa-solid fa-trash" style={{ color: "#fff" }} size={17} />
        </TouchableOpacity>
      </TopBar>
      {isLoading ? <LoadingComponent /> : <Listing data={favorites || []} />}

      <CustomModal visible={showModal} onDismiss={toggleShowModal}>
        <CustomModal.Header
          style={{
            padding: 16,
            backgroundColor: theme.background,
            borderRadius: 32,
          }}
        >
          <Icon name="fa-solid fa-trash" style={{ color: "#FFF" }} size={24} />
        </CustomModal.Header>
        <CustomModal.Body>
          <CustomModal.Text>
            Deseja limpar o histórico de favoritos?
          </CustomModal.Text>
        </CustomModal.Body>
        <CustomModal.Footer>
          <CustomModal.Button variant="primary" onPress={toggleShowModal}>
            <CustomModal.Text>Não</CustomModal.Text>
          </CustomModal.Button>

          <CustomModal.Button
            variant="primary"
            filled
            onPress={handleRemoveAll}
          >
            <CustomModal.Text variant="light">Sim</CustomModal.Text>
          </CustomModal.Button>
        </CustomModal.Footer>
      </CustomModal>
    </Screen>
  );
};

export default Favorite;

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    fontFamily: "Cabin-Regular",
    fontSize: 20,
    flex: 1,
  },
  button: {
    minWidth: 40,
    minHeight: 40,
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
