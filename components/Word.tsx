import React, { useState } from "react";
import { StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";

type WordProps = {
  id: number;
  word: string;
  meaning: string;
  favorited: string;
};

const Word = React.memo((data: WordProps) => {
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable style={styles.botao}>
      <Link
        href={{ pathname: "/meaning", params: data }}
        style={[styles.text, pressed ? styles.onPress : null]}
      >
        {data.word}
      </Link>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  botao: {
    borderBottomWidth: 0.29,
    borderBottomColor: "#E3DFE3",
    paddingVertical: 5,
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    fontFamily: "Montserrat-Regular",
    paddingVertical: 8,
    paddingLeft: 3,
  },
  onPress: {
    backgroundColor: "lightgray",
  },
});

export { WordProps, Word };
