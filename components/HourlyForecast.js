import React, { Fragment } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Weather from "./Weather";

function formatDate(timestamp) {
  const d = new Date(timestamp * 1000);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  let hour = "" + d.getHours();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  if (hour.length < 2) hour = "0" + hour;

  return `${day}/${month} ${hour}:00`;
}

export default function HourlyForecast({ hourly }) {
  return hourly?.length ? (
    <Fragment>
      <Text style={styles.title}>Hourly Forecast</Text>
      <ScrollView horizontal>
        <View style={styles.scrollView}>
          {hourly.map((item) => (
            <Weather
              key={item.dt}
              {...item}
              condition={item.weather?.[0]}
              date={formatDate(item.dt)}
            />
          ))}
        </View>
      </ScrollView>
    </Fragment>
  ) : (
    <Text style={styles.errorText}>ERROR</Text>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    color: "#fff",
  },
  errorText: {
    color: "red",
  },
});
