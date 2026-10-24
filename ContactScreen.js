import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

import globalStyles from "../styles/globalStyles";

export default function ContactScreen({ navigation }) {

  const [email, setEmail] = useState("");

  const handleSubmit = () => {

    if (email.trim() === "") {

      Alert.alert(
        "Error",
        "Please enter your email address."
      );

      return;
    }

    Alert.alert(
      "Success",
      `Email submitted: ${email}`
    );

    setEmail("");
  };

  return (
    <View style={globalStyles.container}>

      <TouchableOpacity
        style={globalStyles.backButton}
        onPress={() => navigation.navigate("Home")}
      >

        <Text style={globalStyles.backText}>
          ← Back
        </Text>

      </TouchableOpacity>

      <Text style={globalStyles.title}>
        Contact Us
      </Text>

      <Text
        style={{
          fontSize: 30,
          marginBottom: 10,
        }}
      >
        ✉
      </Text>

      <TextInput
        style={globalStyles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        inputMode="email"
        autoCapitalize="none"
      />

      <TouchableOpacity
        style={globalStyles.button}
        onPress={handleSubmit}
      >

        <Text style={globalStyles.buttonText}>
          Submit
        </Text>

      </TouchableOpacity>

    </View>
  );
}

/*
export default function ContactScreen({ goToHome }) {

  const [email, setEmail] = useState("");

  const handleSubmit = () => {

    if (email.trim() === "") {

      Alert.alert(
        "Error",
        "Please enter your email address."
      );

      return;
    }

    Alert.alert(
      "Success",
      `Email submitted: ${email}`
    );

    setEmail("");
  };

  return (
    <View style={globalStyles.container}>

      <TouchableOpacity
        style={globalStyles.backButton}
        onPress={goToHome}
      >

        <Text style={globalStyles.backText}>
          ← Back
        </Text>

      </TouchableOpacity>

      <Text style={globalStyles.title}>
        Contact Us
      </Text>

      <Text
        style={{
          fontSize: 30,
          marginBottom: 10,
        }}
      >
        ✉
      </Text>

      <TextInput
        style={globalStyles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        inputMode="email"
        autoCapitalize="none"
      />

      <TouchableOpacity
        style={globalStyles.button}
        onPress={handleSubmit}
      >

        <Text style={globalStyles.buttonText}>
          Submit
        </Text>

      </TouchableOpacity>

    </View>
  );
}
*/