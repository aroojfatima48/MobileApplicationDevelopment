import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SettingsScreen from "./screens/SettingsScreen";
import ContactScreen from "./screens/ContactScreen";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#007AFF",
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Contact" component={ContactScreen} />
    </Tab.Navigator>
  );
}

function AppDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#007AFF" },
        headerTintColor: "white",
      }}
    >
      <Drawer.Screen
        name="Main"
        component={TabNavigator}
        options={{ title: "Home" }}
      />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <AppDrawer />
    </NavigationContainer>
  );
}

/*
import React, { useState } from "react";

import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SettingsScreen from "./screens/SettingsScreen";
import ContactScreen from "./screens/ContactScreen";

export default function App() {

  const [screen, setScreen] = useState("HomeScreen");

  const goToHome = () => {
    setScreen("HomeScreen");
  };

  const goToProfile = () => {
    setScreen("ProfileScreen");
  };

  const goToSettings = () => {
    setScreen("SettingsScreen");
  };

  const goToContact = () => {
    setScreen("ContactScreen");
  };

  if (screen === "HomeScreen") {
    return (
      <HomeScreen
        goToProfile={goToProfile}
        goToSettings={goToSettings}
        goToContact={goToContact}
      />
    );
  }

  if (screen === "ProfileScreen") {
    return (
      <ProfileScreen
        goToHome={goToHome}
      />
    );
  }

  if (screen === "SettingsScreen") {
    return (
      <SettingsScreen
        goToHome={goToHome}
      />
    );
  }

  if (screen === "ContactScreen") {
    return (
      <ContactScreen
        goToHome={goToHome}
      />
    );
  }
}
*/