import { Dimensions, StyleSheet, Text, View } from "react-native";

export const LoadingComponent = () => {
  return (
    <View style={{ marginTop: Dimensions.get("window").height / 2 - 82 }}>
      <Text style={[styles.loading]}>A carregar dados...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    textAlign: "center",
    fontFamily: "Cabin-Regular",
    fontSize: 20,
  },
});
