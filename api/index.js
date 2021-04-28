import axios from "axios";
import { Alert } from "react-native";
import env from "../config";
const apiKey = env.openweatherApiKey;

export async function getForecast({ latitude, longitude }) {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&exclude=minutely`;
  const res = await axios
    .get(url)
    .then(({ data }) => data)
    .catch((error) => {
      Alert.alert(error.message);
      return {};
    });
  return res;
}

export async function getCurrentWeather({ latitude, longitude }) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  const res = await axios
    .get(url)
    .then(({ data }) => data)
    .catch((error) => {
      Alert.alert(error.message);
      return {};
    });
  return res;
}
