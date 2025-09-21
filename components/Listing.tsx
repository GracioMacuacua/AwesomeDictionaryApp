import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Container } from "./Container";
import { Word } from "./Word";
import { Icon } from "./Icon";
import { _useTheme } from "@context/ThemeContext";

const ListEmptyComponent = () => {
  return (
    <View style={{ marginTop: Dimensions.get("window").height / 2 - 82 }}>
      <Text style={[styles.text]}>Sem dados para exibir</Text>
    </View>
  );
};

export type DataProps = {
  id: number;
  word: string;
  meaning: string;
  favorited: boolean;
  seen: boolean;
  selfcreated: boolean;
}[];

type ListingProps = {
  data: DataProps;
};

const Listing = ({ data }: ListingProps) => {
  const [scrollY, setScrollY] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const { theme } = _useTheme();

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setScrollY(event.nativeEvent.contentOffset.y);
  };

  const moveToTop = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index: 0, animated: true });
    }
  };

  return (
    <Container customStyle={styles.container}>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={({ item }) => (
          <Word
            id={item.id}
            word={item.word}
            meaning={item.meaning}
            favorited={item.favorited}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={ListEmptyComponent}
        showsVerticalScrollIndicator={false}
        initialNumToRender={15}
        onScroll={handleScroll}
      />
      {scrollY > 17 && (
        <TouchableOpacity
          style={[{ backgroundColor: theme.background }, styles.upButton]}
          onPress={moveToTop}
        >
          <Icon
            name="fa-angles-up"
            customStyle={{ color: theme.background }}
            size={17}
          />
        </TouchableOpacity>
      )}
    </Container>
  );
};

export { Listing };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  upButton: {
    position: "absolute",
    bottom: 40,
    right: 20,
    padding: 12,
    borderRadius: 25,
    elevation: 0.5,
  },
  text: {
    textAlign: "center",
    fontFamily: "Cabin-Regular",
    fontSize: 20,
  },
});
