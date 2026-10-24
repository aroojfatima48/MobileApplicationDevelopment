import React, { useState } from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../theme/colors';

import HomeScreen from '../screens/HomeScreen';
import ShopScreen from '../screens/ShopScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import OrderConfirmScreen from '../screens/OrderConfirmScreen';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const [expanded, setExpanded] = useState(null);
  const toggleExpand = (gender) => setExpanded(expanded === gender ? null : gender);
  
  const handleNavigate = (gender, category) => {
    props.navigation.closeDrawer();
    props.navigation.navigate('Shop', { gender, category });
  };

  const renderSubCategories = (gender) => {
    if (expanded !== gender) return null;
    const categories = gender === 'Men' ? ['All', 'Clothes', 'Watches'] : ['All', 'Clothes', 'Bags', 'Makeup'];
    return (
      <View style={styles.subCategoryContainer}>
        {categories.map((cat) => (
          <TouchableOpacity key={cat} style={styles.subItem} onPress={() => handleNavigate(gender, cat)}>
            <Text style={styles.subItemText}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1, backgroundColor: COLORS.background }}>
      <View style={styles.drawerHeader}><Text style={styles.drawerTitle}>NAQSH</Text></View>
      
      <View style={styles.drawerSection}>
        {/* WOMEN ACCORDION */}
        <TouchableOpacity style={styles.mainOption} onPress={() => toggleExpand('Women')}>
          <Text style={[styles.mainOptionText, expanded === 'Women' && {color: COLORS.primary}]}>Women</Text>
          <Ionicons name={expanded === 'Women' ? "chevron-up" : "chevron-down"} size={18} color={COLORS.textDark} />
        </TouchableOpacity>
        {renderSubCategories('Women')}

        <View style={styles.divider} />

        {/* MEN ACCORDION */}
        <TouchableOpacity style={styles.mainOption} onPress={() => toggleExpand('Men')}>
          <Text style={[styles.mainOptionText, expanded === 'Men' && {color: COLORS.primary}]}>Men</Text>
          <Ionicons name={expanded === 'Men' ? "chevron-up" : "chevron-down"} size={18} color={COLORS.textDark} />
        </TouchableOpacity>
        {renderSubCategories('Men')}
      </View>

      <View style={{ flex: 1 }} />

      <View style={styles.bottomDrawerSection}>
        <View style={styles.divider} />
        <DrawerItem label="My Cart" icon={({size}) => <Ionicons name="bag-outline" size={size} color={COLORS.primary} />} labelStyle={styles.bottomItemText} onPress={() => props.navigation.navigate('Cart')} />
        <DrawerItem label="Profile" icon={({size}) => <Ionicons name="person-outline" size={size} color={COLORS.primary} />} labelStyle={styles.bottomItemText} onPress={() => props.navigation.navigate('Profile')} />
      </View>
    </DrawerContentScrollView>
  );
}

function MainDrawer() {
  return (
    <Drawer.Navigator 
      drawerContent={(props) => <CustomDrawerContent {...props} />} 
      initialRouteName="Home" 
      screenOptions={{ headerShown: false, drawerStyle: { width: 280, backgroundColor: COLORS.background } }}
    >
      {/* Home ab Drawer mein visible nahi hoga */}
      <Drawer.Screen name="Home" component={HomeScreen} options={{ drawerLabel: () => null, title: null }} />
      <Drawer.Screen name="Shop" component={ShopScreen} />
      <Drawer.Screen name="Cart" component={CartScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={MainDrawer} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="OrderConfirm" component={OrderConfirmScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerHeader: { paddingHorizontal: 20, paddingTop: 30, paddingBottom: 20 },
  drawerTitle: { fontSize: 24, fontWeight: '800', color: COLORS.primary, letterSpacing: 3 },
  drawerSection: { paddingHorizontal: 15 },
  mainOption: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 10 },
  mainOptionText: { fontSize: 18, fontWeight: '600', color: COLORS.textDarker },
  subCategoryContainer: { paddingLeft: 20, paddingBottom: 10 },
  subItem: { paddingVertical: 10, paddingHorizontal: 10 },
  subItemText: { fontSize: 15, color: COLORS.textDark, fontWeight: '500' },
  divider: { height: 1, backgroundColor: COLORS.secondary, marginVertical: 10 },
  bottomDrawerSection: { marginBottom: 20, paddingHorizontal: 10 },
  bottomItemText: { fontSize: 15, fontWeight: '500', color: COLORS.textDarker }
});