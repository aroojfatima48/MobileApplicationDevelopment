import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../theme/colors';
import CustomHeader from '../components/CustomHeader';

const { width } = Dimensions.get('window');

export default function OrderConfirmScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader navigation={navigation} title="Success" showMenu={false} />
      
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Ionicons name="checkmark" size={60} color={COLORS.white} />
        </View>
        <Text style={styles.title}>Order Confirmed!</Text>
        <Text style={styles.subtitle}>Thank you for shopping with Naqsh. Your order is being prepared.</Text>
        
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Main', { screen: 'Shop' })}>
          <Text style={styles.btnText}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  iconContainer: { width: 100, height: 100, backgroundColor: COLORS.primary, borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 28, fontWeight: '600', color: COLORS.textDarker, marginBottom: 10 },
  subtitle: { fontSize: 15, color: COLORS.textDark, textAlign: 'center', lineHeight: 22, paddingHorizontal: 20, marginBottom: 40 },
  btn: { backgroundColor: COLORS.primary, paddingVertical: 18, paddingHorizontal: 40, borderRadius: 12, width: width * 0.8, alignItems: 'center' },
  btnText: { color: COLORS.white, fontSize: 16, fontWeight: '600' },
});