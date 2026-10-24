import React, { useState } from "react";

import {
  View,
  Text,
  Switch,
  TouchableOpacity,
} from "react-native";

import globalStyles from "../styles/globalStyles";

export default function SettingsScreen({ navigation }) {

  const [darkMode, setDarkMode] = useState(false);

  return (
    <View
      style={[
        globalStyles.container,
        {
          backgroundColor: darkMode
            ? "#222"
            : "#f5f5f5",
        },
      ]}
    >

      <TouchableOpacity
        style={globalStyles.backButton}
        onPress={() => navigation.navigate("Main")}
      >

        <Text
          style={[
            globalStyles.backText,
            {
              color: darkMode
                ? "white"
                : "#007AFF",
            },
          ]}
        >
          ← Back
        </Text>

      </TouchableOpacity>

      <Text
        style={[
          globalStyles.title,
          {
            color: darkMode
              ? "white"
              : "black",
          },
        ]}
      >
        Settings
      </Text>

      <Text
        style={{
          fontSize: 20,
          marginBottom: 15,
          color: darkMode
            ? "white"
            : "black",
        }}
      >
        Dark Mode
      </Text>

      <Switch
        value={darkMode}
        onValueChange={setDarkMode}
      />

      <Text
        style={{
          marginTop: 20,
          fontSize: 18,
          color: darkMode
            ? "white"
            : "black",
        }}
      >
        {darkMode
          ? "Dark Mode Enabled"
          : "Light Mode Enabled"}
      </Text>

    </View>
  );
}

/*
export default function SettingsScreen({ goToHome }) {

  const [darkMode, setDarkMode] = useState(false);

  return (
    <View
      style={[
        globalStyles.container,
        {
          backgroundColor: darkMode
            ? "#222"
            : "#f5f5f5",
        },
      ]}
    >

      <TouchableOpacity
        style={globalStyles.backButton}
        onPress={goToHome}
      >

        <Text
          style={[
            globalStyles.backText,
            {
              color: darkMode
                ? "white"
                : "#007AFF",
            },
          ]}
        >
          ← Back
        </Text>

      </TouchableOpacity>

      <Text
        style={[
          globalStyles.title,
          {
            color: darkMode
              ? "white"
              : "black",
          },
        ]}
      >
        Settings
      </Text>

      <Text
        style={{
          fontSize: 20,
          marginBottom: 15,
          color: darkMode
            ? "white"
            : "black",
        }}
      >
        Dark Mode
      </Text>

      <Switch
        value={darkMode}
        onValueChange={setDarkMode}
      />

      <Text
        style={{
          marginTop: 20,
          fontSize: 18,
          color: darkMode
            ? "white"
            : "black",
        }}
      >
        {darkMode
          ? "Dark Mode Enabled"
          : "Light Mode Enabled"}
      </Text>

    </View>
  );
}
*/