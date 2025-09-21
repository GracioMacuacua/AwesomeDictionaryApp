import React, {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { DataProps, Listing } from "@components/Listing";
import { LoadingComponent } from "@components/Loading";
import { TopBar } from "@components/TopBar";
import { Screen } from "@components/Screen";
import { useEffect, useState } from "react";
import { Icon } from "@components/Icon";

const Favorite = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState<DataProps>([]);

  useEffect(() => {
  }, []);

  return (
    <Screen>
      <TopBar>
        <View style={styles.button}>{""}</View>
        <Text style={[styles.text, { color: "#FFF" }]}>Favoritas</Text>
        <TouchableOpacity style={styles.button}>
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
