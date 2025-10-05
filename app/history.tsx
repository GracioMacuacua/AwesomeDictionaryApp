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

const History = () => {
  const [isLoading, setIsLoading] = useState(false);
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

  const handleRemoveAll = useCallback(async () => {
    try {
      await clearHistory();
      setHistory([]);
      ToastAndroid.show("Todo o histórico removido", ToastAndroid.LONG);
    } catch (error) {
      ToastAndroid.show("Erro ao remover histórico", ToastAndroid.LONG);
    }
  }, []);

  return (
    <Screen>
      <TopBar>
        <View style={styles.button}>{""}</View>
        <Text style={[styles.text, { color: "#FFF" }]}>Histórico</Text>
        <TouchableOpacity style={styles.button} onPress={handleRemoveAll}>
          <Icon
            name="fa-solid fa-trash"
            customStyle={{ color: "#fff" }}
            size={17}
          />
        </TouchableOpacity>
      </TopBar>
      {isLoading ? <LoadingComponent /> : <Listing data={history || []} />}
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
