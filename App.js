import React, { Fragment, useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  StatusBar,
  View,
  ScrollView,
  Text,
} from "react-native";
import Loading from "./components/Loading";
import * as Location from "expo-location";
import axios from "axios";
import Weather from "./components/Weather";
import CurrentWeather from "./components/CurrentWeather";
import { LinearGradient } from "expo-linear-gradient";

const apiKey = "b6a887fe49dc7573ef276205139ba88a";

export default function App() {
  const [forecast, setForecast] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);

  function getForecast({ latitude, longitude }) {
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&exclude=minutely`;

    axios
      .get(url)
      .then(({ data }) => {
        console.log("🚀 data", data);
        setForecast(data);
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  }

  function getCurrentWeather({ latitude, longitude }) {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    axios
      .get(url)
      .then(({ data }) => {
        console.log("🚀 setCurrentWeather", data);
        setCurrentWeather(data);
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  }

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
        getForecast({ latitude, longitude });
        getCurrentWeather({ latitude, longitude });
      } catch (error) {
        console.log("🚀error", error);
        Alert.alert("Permission to access location was denied");
      }
    })();
  }, []);

  return (
    <LinearGradient colors={["#84fab0", "#8fd3f4"]} style={styles.container}>
      <StatusBar barStyle="light-content" />

      {currentWeather && <CurrentWeather {...currentWeather} />}
      {forecast ? (
        <Fragment>
          <Text style={styles.forecast}>7 Days Forecast</Text>
          <ScrollView horizontal>
            <View style={styles.scrollView}>
              {forecast.daily.map((item) => (
                <Weather
                  key={item.dt}
                  {...item}
                  condition={item.weather?.[0]}
                />
              ))}
            </View>
          </ScrollView>
        </Fragment>
      ) : (
        <Loading />
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    flexDirection: "row",
    alignItems: "center",
  },
  forecast: {
    fontSize: 26,
    color: "#fff",
  },
});
