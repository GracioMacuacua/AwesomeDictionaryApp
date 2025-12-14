import { Icon } from "@components/Icon";
import { WordProps } from "@/types/word";
import { Screen } from "@components/Screen";
import { TopBar } from "@components/TopBar";
import { Listing } from "@components/Listing";
import { useDatabase } from "@hooks/useDatabase";
import { LoadingComponent } from "@components/Loading";
import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import CustomModal from "@/components/Modal";
import { useTheme } from "@/context/ThemeContext";

const History = () => {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { getHistory, clearHistory } = useDatabase();
  const [history, setHistory] = useState<WordProps[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      setIsLoading(true);
      try {
        const result = await getHistory();
        setHistory(result);
      } catch (error) {
        ToastAndroid.show("Erro ao carregar histórico", ToastAndroid.LONG);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const toggleShowModal = () => {
    setShowModal((prev) => !prev);
  };

  const handleRemoveAll = useCallback(async () => {
    try {
      await clearHistory();
      setHistory([]);
      toggleShowModal();
    } catch (error) {
      ToastAndroid.show("Erro ao remover histórico", ToastAndroid.LONG);
    }
  }, []);

  return (
    <Screen>
      <TopBar>
        <View style={styles.button}>{""}</View>
        <Text style={[styles.text, { color: "#FFF" }]}>Histórico</Text>
        <TouchableOpacity style={styles.button} onPress={toggleShowModal}>
          <Icon name="fa-solid fa-trash" style={{ color: "#fff" }} size={17} />
        </TouchableOpacity>
      </TopBar>
      {isLoading ? <LoadingComponent /> : <Listing data={history || []} />}

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
          <CustomModal.Text>Deseja limpar o histórico?</CustomModal.Text>
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

export default History;

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
