import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";

import globalStyles from "../styles/globalStyles";

export default function ProfileScreen({ navigation }) {

  const [name, setName] = useState("");
  const [age, setAge] = useState("");

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
        Profile
      </Text>

      <Image
        source={{
          uri: "https://randomuser.me/api/portraits/men/32.jpg",
        }}
        style={globalStyles.image}
      />

      <TextInput
        style={globalStyles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={globalStyles.input}
        placeholder="Enter your age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        inputMode="numeric"
      />

      <Text style={globalStyles.liveText}>
        Name: {name}
      </Text>

      <Text style={globalStyles.liveText}>
        Age: {age}
      </Text>

    </View>
  );
}

/*
export default function ProfileScreen({ goToHome }) {

  const [name, setName] = useState("");
  const [age, setAge] = useState("");

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
        Profile
      </Text>

      <Image
        source={{
          uri: "https://randomuser.me/api/portraits/men/32.jpg",
        }}
        style={globalStyles.image}
      />

      <TextInput
        style={globalStyles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={globalStyles.input}
        placeholder="Enter your age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        inputMode="numeric"
      />

      <Text style={globalStyles.liveText}>
        Name: {name}
      </Text>

      <Text style={globalStyles.liveText}>
        Age: {age}
      </Text>

    </View>
  );
}
*/