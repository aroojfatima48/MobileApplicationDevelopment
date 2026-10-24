import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Modal, FlatList, Alert, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../theme/colors';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CustomHeader from '../components/CustomHeader';

const CITIES = ['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar', 'Quetta'];

export default function CheckoutScreen({ navigation }) {
  const { clearCart, cartTotal } = useCart();
  const { user } = useAuth();
  const [selectedCity, setSelectedCity] = useState('');
  const [isCityModalVisible, setCityModalVisible] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const deliveryCharges = 250;
  const discountAmount = Math.round((cartTotal * 20) / 100);
  const finalTotal = cartTotal + deliveryCharges - discountAmount;

  const handlePlaceOrder = () => {
    if (!selectedCity) {
      Alert.alert('Missing Info', 'Please select your city to proceed.');
      return;
    }
    clearCart();
    navigation.replace('OrderConfirm');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader navigation={navigation} title="Checkout" showMenu={false} />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Shipping Address</Text>
        <View style={styles.card}>
          <TextInput style={styles.inputBare} placeholder="Full Name" placeholderTextColor={COLORS.textDark} value={user?.name || ''} />
          <View style={styles.divider} />
          <TextInput style={styles.inputBare} placeholder="Email Address" placeholderTextColor={COLORS.textDark} keyboardType="email-address" value={user?.email || ''} />
          <View style={styles.divider} />
          <TextInput style={styles.inputBare} placeholder="Contact Number (e.g., 0300 1234567)" placeholderTextColor={COLORS.textDark} keyboardType="phone-pad" />
          <View style={styles.divider} />
          <TextInput style={styles.inputBare} placeholder="Street Address (House, Block, Area)" placeholderTextColor={COLORS.textDark} />
          <View style={styles.divider} />
          <TouchableOpacity style={styles.dropdownBtn} onPress={() => setCityModalVisible(true)}>
            <Text style={[styles.inputBare, { color: selectedCity ? COLORS.textDarker : COLORS.textDark }]}>{selectedCity || "Select City"}</Text>
            <Ionicons name="chevron-down" size={20} color={COLORS.textDark} />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Payment Method</Text>
        {['card', 'cod', 'wallet'].map((method) => (
          <TouchableOpacity key={method} style={[styles.paymentOption, paymentMethod === method && styles.paymentOptionActive]} onPress={() => setPaymentMethod(method)}>
            <Ionicons name={method === 'card' ? 'card-outline' : method === 'cod' ? 'cash-outline' : 'wallet-outline'} size={24} color={paymentMethod === method ? COLORS.primary : COLORS.textDark} />
            <Text style={[styles.paymentText, paymentMethod === method && styles.paymentTextActive]}>
              {method === 'card' ? 'Credit / Debit Card' : method === 'cod' ? 'Cash on Delivery' : 'Easypaisa / JazzCash'}
            </Text>
            <Ionicons name={paymentMethod === method ? "checkmark-circle" : "ellipse-outline"} size={24} color={paymentMethod === method ? COLORS.primary : COLORS.border} />
          </TouchableOpacity>
        ))}

        <View style={styles.billBox}>
          <View style={styles.billRow}><Text style={styles.billLabel}>Subtotal</Text><Text style={styles.billValue}>Rs. {cartTotal}</Text></View>
          <View style={styles.billRow}><Text style={styles.billLabel}>Delivery Charges</Text><Text style={styles.billValue}>Rs. {deliveryCharges}</Text></View>
          <View style={styles.billRow}><Text style={styles.billLabel}>Discount (20%)</Text><Text style={[styles.billValue, { color: '#2D6A4F' }]}>- Rs. {discountAmount}</Text></View>
          <View style={styles.billDivider} />
          <View style={styles.billRow}><Text style={styles.totalLabel}>Total to pay</Text><Text style={styles.totalValue}>Rs. {finalTotal}</Text></View>
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.btn} onPress={handlePlaceOrder}>
          <Text style={styles.btnText}>Place Order • Rs. {finalTotal}</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={isCityModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select City</Text>
            <FlatList data={CITIES} keyExtractor={(item) => item} renderItem={({ item }) => (
              <TouchableOpacity style={styles.cityItem} onPress={() => { setSelectedCity(item); setCityModalVisible(false); }}>
                <Text style={[styles.cityText, selectedCity === item && { color: COLORS.primary, fontWeight: 'bold' }]}>{item}</Text>
                {selectedCity === item && <Ionicons name="checkmark" size={20} color={COLORS.primary} />}
              </TouchableOpacity>
            )} />
            <TouchableOpacity style={styles.closeModalBtn} onPress={() => setCityModalVisible(false)}>
              <Text style={styles.closeModalText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  container: { padding: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: COLORS.textDarker, marginBottom: 10, marginTop: 10 },
  card: { backgroundColor: COLORS.cardBg, borderRadius: 12, paddingHorizontal: 15, marginBottom: 25, borderWidth: 1, borderColor: COLORS.border },
  inputBare: { paddingVertical: 15, fontSize: 14, color: COLORS.textDarker },
  divider: { height: 1, backgroundColor: COLORS.border },
  dropdownBtn: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15 },
  paymentOption: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.cardBg, borderRadius: 12, padding: 15, marginBottom: 10, borderWidth: 1, borderColor: COLORS.border },
  paymentOptionActive: { borderColor: COLORS.primary, backgroundColor: '#FFF5F2' },
  paymentText: { flex: 1, marginLeft: 15, fontSize: 15, fontWeight: '500', color: COLORS.textDarker },
  paymentTextActive: { color: COLORS.primary, fontWeight: '700' },
  billBox: { backgroundColor: COLORS.cardBg, borderRadius: 12, padding: 20, marginTop: 20, borderWidth: 1, borderColor: COLORS.border },
  billRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  billLabel: { fontSize: 14, color: COLORS.textDark, fontWeight: '500' },
  billValue: { fontSize: 14, color: COLORS.textDarker, fontWeight: '600' },
  billDivider: { height: 1, backgroundColor: COLORS.border, marginVertical: 8 },
  totalLabel: { fontSize: 18, fontWeight: '700', color: COLORS.textDarker },
  totalValue: { fontSize: 20, fontWeight: '800', color: COLORS.primary },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, backgroundColor: COLORS.background, borderTopWidth: 1, borderTopColor: COLORS.border },
  btn: { backgroundColor: COLORS.primary, padding: 18, borderRadius: 12, alignItems: 'center' },
  btnText: { color: COLORS.white, fontSize: 16, fontWeight: '700' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '80%', backgroundColor: COLORS.cardBg, borderRadius: 16, padding: 20, maxHeight: '70%' },
  modalTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textDarker, marginBottom: 15, textAlign: 'center' },
  cityItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  cityText: { fontSize: 15, color: COLORS.textDarker },
  closeModalBtn: { marginTop: 15, padding: 12, alignItems: 'center', backgroundColor: COLORS.primaryLight, borderRadius: 8 },
  closeModalText: { color: COLORS.primary, fontWeight: '700', fontSize: 15 }
});