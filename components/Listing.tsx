import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { Icon } from "./Icon";
import { Word } from "./Word";
import { Container } from "./Container";
import { WordProps } from "@/types/word";
import React, { useRef, useState } from "react";
import { useTheme } from "@context/ThemeContext";

const ListEmptyComponent = () => {
  return (
    <View style={{ marginTop: Dimensions.get("window").height / 2 - 82 }}>
      <Text style={[styles.text]}>Sem dados para exibir</Text>
    </View>
  );
};

const Listing = ({ data }: { data: WordProps[] }) => {
  const [scrollY, setScrollY] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const { theme } = useTheme();

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
        renderItem={({ item, index }) => (
          <Word
            id={item.id}
            word={item.word}
            meaning={item.meaning}
            favorite={item.favorite}
            selfcreated={item.selfcreated}
          />
        )}
        keyExtractor={(item, index) => `${item.id}_${item.word}_${index}`}
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
          <Icon name="fa-angles-up" size={17} />
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
