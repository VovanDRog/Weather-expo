import React from "react";
import { StyleSheet, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Temperature from "./Temperature";
import getWeatherOptions from "../helpers/getWeatherOptions";

export default function Weather(props) {
  const { date, temp, condition } = props;

  const currentOption = getWeatherOptions(condition.main);

  return (
    <LinearGradient colors={currentOption.gradient} style={styles.container}>
      <MaterialCommunityIcons
        name={currentOption.iconName}
        size={96}
        color={currentOption.iconColor || "white"}
      />
      <Text style={styles.date}>{date}</Text>
      <Temperature temp={temp} />
      <Text style={styles.title}>{condition.main}</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 30,
    marginHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  date: {
    color: "#fff",
  },
  title: {
    fontSize: 32,
    color: "#fff",
  },
});
