import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigationState } from '@react-navigation/native';
import { COLORS } from '../theme/colors';

export default function CustomHeader({ navigation, title = 'NAQSH', showMenu = false }) {
  // Current screen ka naam pata karne ke liye
  const currentRouteName = useNavigationState((state) => {
    // Deep nested state se current route nikalna
    const route = state.routes[state.index];
    if (route.state) {
      return route.state.routes[route.state.index].name;
    }
    return route.name;
  });

  const isHome = currentRouteName === 'Home';
  const isCart = currentRouteName === 'Cart';

  return (
    <SafeAreaView style={styles.headerSafeArea}>
      <View style={styles.topNavBar}>
        {/* Left: Menu or Back Arrow */}
        <TouchableOpacity 
          onPress={() => showMenu ? navigation.openDrawer() : navigation.goBack()} 
          style={styles.navIconBtn}
        >
          <Ionicons name={showMenu ? "menu-outline" : "arrow-back"} size={26} color={COLORS.white} />
        </TouchableOpacity>
        
        {/* Center: Title */}
        <Text style={styles.topNavTitle}>{title}</Text>
        
        {/* Right: Home + Cart Icons */}
        <View style={styles.rightIcons}>
          <TouchableOpacity 
            onPress={() => navigation.navigate('Main', { screen: 'Home' })} 
            style={styles.navIconBtn}
          >
            {/* Agar Home par hain toh solid icon, warna outline */}
            <Ionicons name={isHome ? "home" : "home-outline"} size={22} color={COLORS.white} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={() => navigation.navigate('Main', { screen: 'Cart' })} 
            style={styles.navIconBtn}
          >
            {/* Agar Cart par hain toh solid icon, warna outline */}
            <Ionicons name={isCart ? "bag-handle" : "bag-handle-outline"} size={22} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerSafeArea: { backgroundColor: COLORS.primary, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  topNavBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 12, backgroundColor: COLORS.primary },
  topNavTitle: { fontSize: 18, fontWeight: '800', color: COLORS.white, letterSpacing: 2 },
  rightIcons: { flexDirection: 'row', gap: 12 },
  navIconBtn: { padding: 4 },
});