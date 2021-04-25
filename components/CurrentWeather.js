import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function CurrentWeather(props) {
  const { name, main, weather } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.city}>{name}</Text>
      <Text style={styles.temp}>
        Now - {Math.round(main.temp)}°, {weather[0].main}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  city: {
    color: "#FFFFFF",
    fontSize: 40,
  },
  temp: {
    color: "#FFFFFF",
    fontSize: 30,
  },
});
