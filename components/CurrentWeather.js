import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function CurrentWeather(props) {
  const { name, main, weather } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.whiteText}>Now</Text>

      <Text style={styles.temp}>
        {Math.round(main.temp)}°, {weather[0].main}
      </Text>
      <Text style={styles.city}>in {name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  whiteText: {
    color: "#FFFFFF",
    fontSize: 24,
  },
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
