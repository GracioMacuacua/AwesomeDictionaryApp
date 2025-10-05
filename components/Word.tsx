import { StyleSheet, Pressable } from "react-native";
import { WordProps } from "@/types/word";
import React, { useState } from "react";
import { Link } from "expo-router";

const Word = React.memo((data: WordProps) => {
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable style={styles.botao}>
      <Link
        href={{
          pathname: "/meaning",
          params: {
            id: data.id,
            word: data.word,
            meaning: data.meaning,
            favorite: data.favorite ? "true" : "false",
            selfcreated: data.selfcreated ? "true" : "false",
          },
        }}
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

export { Word };
