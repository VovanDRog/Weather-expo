import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Temperature({ temp }) {
  if (typeof temp === "number") {
    return <Text style={styles.tempValue}>{Math.round(temp)}°</Text>;
  }
  return typeof temp === "object" && "max" in temp ? (
    <View style={styles.container}>
      <View style={styles.tempItem}>
        <Text style={styles.tempLabel}>min</Text>
        <Text style={styles.tempValue}>{Math.round(temp.min)}°</Text>
      </View>
      <View style={styles.tempItem}>
        <Text style={styles.tempLabel}>max</Text>
        <Text style={styles.tempValue}>{Math.round(temp.max)}°</Text>
      </View>
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
  },
  tempItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginHorizontal: 8,
  },
  tempLabel: {
    color: "#ffffff",
  },
  tempValue: {
    paddingLeft: 3,
    color: "#ffffff",
    fontSize: 20,
  },
});
