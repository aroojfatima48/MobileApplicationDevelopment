import React from "react";

import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import globalStyles from "../styles/globalStyles";

export default function HomeScreen({ navigation }) {

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
      }}
      style={styles.background}
      resizeMode="cover"
    >

      <View style={styles.overlay}>

        <Text style={styles.title}>
          Student App
        </Text>

        <Text style={styles.subtitle}>
          Welcome to My Student Application
        </Text>

        <TouchableOpacity
          style={globalStyles.button}
          onPress={() => navigation.navigate("Profile")}
        >

          <Text style={globalStyles.buttonText}>
            Go to Profile
          </Text>

        </TouchableOpacity>

        <TouchableOpacity
          style={globalStyles.button}
          onPress={() => navigation.getParent()?.navigate("Settings")}
        >

          <Text style={globalStyles.buttonText}>
            Go to Settings
          </Text>

        </TouchableOpacity>

        <TouchableOpacity
          style={globalStyles.button}
          onPress={() => navigation.navigate("Contact")}
        >

          <Text style={globalStyles.buttonText}>
            Contact Us
          </Text>

        </TouchableOpacity>

      </View>

    </ImageBackground>
  );
}

/*
export default function HomeScreen({
  goToProfile,
  goToSettings,
  goToContact,
}) {

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
      }}
      style={styles.background}
      resizeMode="cover"
    >

      <View style={styles.overlay}>

        <Text style={styles.title}>
          Student App
        </Text>

        <Text style={styles.subtitle}>
          Welcome to My Student Application
        </Text>

        <TouchableOpacity
          style={globalStyles.button}
          onPress={goToProfile}
        >

          <Text style={globalStyles.buttonText}>
            Go to Profile
          </Text>

        </TouchableOpacity>

        <TouchableOpacity
          style={globalStyles.button}
          onPress={goToSettings}
        >

          <Text style={globalStyles.buttonText}>
            Go to Settings
          </Text>

        </TouchableOpacity>

        <TouchableOpacity
          style={globalStyles.button}
          onPress={goToContact}
        >

          <Text style={globalStyles.buttonText}>
            Contact Us
          </Text>

        </TouchableOpacity>

      </View>

    </ImageBackground>
  );
}
*/

const styles = StyleSheet.create({

  background: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
    marginBottom: 15,
    fontFamily: "serif",
  },

  subtitle: {
    fontSize: 18,
    color: "white",
    marginBottom: 30,
    textAlign: "center",
  },

});