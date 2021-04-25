import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Temperature({ min, max }) {
  return (
    <View style={styles.container}>
      <View style={styles.tempItem}>
        <Text style={styles.tempLabel}>мін</Text>
        <Text style={styles.tempValue}>{Math.round(min)}°</Text>
      </View>
      <View style={styles.tempItem}>
        <Text style={styles.tempLabel}>макс</Text>
        <Text style={styles.tempValue}>{Math.round(max)}°</Text>
      </View>
    </View>
  );
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
