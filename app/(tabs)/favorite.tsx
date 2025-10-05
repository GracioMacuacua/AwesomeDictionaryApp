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

const Favorite = () => {
  const [isLoading, setIsLoading] = useState(false);
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

  const handleRemoveAll = useCallback(async () => {
    try {
      await clearFavorites();
      setFavorites([]);
      ToastAndroid.show("Todos os favoritos removidos", ToastAndroid.LONG);
    } catch (error) {
      ToastAndroid.show("Erro ao remover favoritos", ToastAndroid.LONG);
    }
  }, []);

  return (
    <Screen>
      <TopBar>
        <View style={styles.button}>{""}</View>
        <Text style={[styles.text, { color: "#FFF" }]}>Favoritas</Text>
        <TouchableOpacity style={styles.button} onPress={handleRemoveAll}>
          <Icon
            name="fa-solid fa-trash"
            customStyle={{ color: "#fff" }}
            size={17}
          />
        </TouchableOpacity>
      </TopBar>
      {isLoading ? <LoadingComponent /> : <Listing data={favorites || []} />}
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
