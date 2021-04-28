import React, { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  StatusBar,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import Loading from "./components/Loading";
import * as Location from "expo-location";
import CurrentWeather from "./components/CurrentWeather";
import { LinearGradient } from "expo-linear-gradient";
import { getCurrentWeather, getForecast } from "./api";
import DailyForecast from "./components/DailyForecast";
import HourlyForecast from "./components/HourlyForecast";

export default function App() {
  const [coordinates, setCoordinates] = useState(null);
  const [activeTab, setActiveTab] = useState("daily");
  const [forecast, setForecast] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission to access location was denied");
          // setLocation(null);
          return;
        }

        let {
          coords: { latitude, longitude },
        } = await Location.getCurrentPositionAsync({ accuracy: 6 });

        const coords = { latitude, longitude };
        setCoordinates(coords);

        const forecastData = await getForecast(coords);
        setForecast(forecastData);

        const weatherData = await getCurrentWeather(coords);
        setCurrentWeather(weatherData);
      } catch (error) {
        console.error("🚀error", error);
        Alert.alert("Permission to access location was denied");
      }
    })();
  }, []);

  function renderTabs() {
    switch (activeTab) {
      case "hourly":
        return <HourlyForecast {...forecast} />;

      default:
        return <DailyForecast {...forecast} />;
    }
  }

  return (
    <LinearGradient colors={["#84fab0", "#8fd3f4"]} style={styles.container}>
      <StatusBar barStyle="light-content" />

      {currentWeather && <CurrentWeather {...currentWeather} />}
      {forecast ? renderTabs() : <Loading />}

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            activeTab === "daily" ? styles.activeButton : {},
          ]}
          onPress={() => setActiveTab("daily")}
        >
          <Text style={styles.buttonText}>Daily</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            activeTab === "hourly" ? styles.activeButton : {},
          ]}
          onPress={() => setActiveTab("hourly")}
        >
          <Text style={styles.buttonText}>Hourly</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    marginHorizontal: 5,
    marginBottom: 15,
    borderRadius: 4,
  },
  activeButton: {
    backgroundColor: "#1bb0dc",
  },
  buttonText: {
    fontSize: 24,
  },
});
