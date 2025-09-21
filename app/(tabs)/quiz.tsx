import React, { StyleSheet, Text, View } from "react-native";
import { Container } from "@components/Container";
import { Screen } from "@components/Screen";
import { TopBar } from "@components/TopBar";

const QuizScreen = () => {
  return (
    <Screen>
      <TopBar>
        <></>
        <Text style={styles.text}>QUIZ</Text>
        <></>
      </TopBar>
      <Container customStyle={{ flex: 1 }}>
        <View></View>
      </Container>
    </Screen>
  );
};

export default QuizScreen;

const styles = StyleSheet.create({
  text: {
    flex: 1,
    textAlign: "center",
    fontFamily: "Cabin-Regular",
    paddingVertical: 5,
    fontSize: 20,
    color: "white",
  },
});
