import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../theme/colors';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CustomHeader from '../components/CustomHeader';

export default function CartScreen({ navigation }) {
  const { cart, removeFromCart, cartTotal } = useCart();
  const { user } = useAuth();
  const shipping = cart.length > 0 ? 250 : 0;
  const finalTotal = cartTotal + shipping;

  const handleCheckout = () => {
    if (user) navigation.navigate('Checkout');
    else navigation.navigate('Login', { redirectToCheckout: true });
  };

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.price}>Rs. {item.price} x {item.qty}</Text>
      </View>
      <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.deleteBtn}>
        <Ionicons name="trash-outline" size={20} color={COLORS.textDark} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader navigation={navigation} title="My Cart" showMenu={false} />
      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="bag-outline" size={60} color={COLORS.textDark} />
          <Text style={styles.emptyText}>Your cart is empty.</Text>
          <TouchableOpacity style={styles.shopNowBtn} onPress={() => navigation.navigate('Main', { screen: 'Home' })}>
            <Text style={styles.shopNowText}>Go to Shop</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList data={cart} keyExtractor={item => item.id} renderItem={renderItem} contentContainerStyle={styles.listContainer} />
          <View style={styles.summary}>
            <View style={styles.row}><Text style={styles.summaryText}>Subtotal</Text><Text style={styles.summaryValue}>Rs. {cartTotal}</Text></View>
            <View style={styles.row}><Text style={styles.summaryText}>Shipping</Text><Text style={styles.summaryValue}>Rs. {shipping}</Text></View>
            <View style={styles.divider} />
            <View style={styles.row}><Text style={styles.totalText}>Total</Text><Text style={styles.totalValue}>Rs. {finalTotal}</Text></View>
            <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
              <Text style={styles.btnText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  listContainer: { padding: 20 },
  cartItem: { flexDirection: 'row', backgroundColor: COLORS.cardBg, padding: 12, borderRadius: 12, marginBottom: 15, alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },
  image: { width: 70, height: 70, borderRadius: 8, backgroundColor: COLORS.primaryLight, resizeMode: 'contain' },
  details: { flex: 1, marginLeft: 15 },
  title: { fontSize: 14, fontWeight: '500', color: COLORS.textDarker, marginBottom: 5 },
  price: { fontSize: 13, color: COLORS.textDark },
  deleteBtn: { padding: 10 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { marginTop: 15, fontSize: 16, color: COLORS.textDark, marginBottom: 20 },
  shopNowBtn: { backgroundColor: COLORS.primary, paddingHorizontal: 30, paddingVertical: 12, borderRadius: 8 },
  shopNowText: { color: COLORS.white, fontWeight: '600', fontSize: 16 },
  summary: { backgroundColor: COLORS.cardBg, padding: 20, borderTopLeftRadius: 24, borderTopRightRadius: 24, borderTopWidth: 1, borderTopColor: COLORS.border },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  summaryText: { fontSize: 14, color: COLORS.textDark },
  summaryValue: { fontSize: 14, color: COLORS.textDarker, fontWeight: '500' },
  divider: { height: 1, backgroundColor: COLORS.secondary, marginVertical: 10 },
  totalText: { fontSize: 16, fontWeight: '600', color: COLORS.textDarker },
  totalValue: { fontSize: 18, fontWeight: '700', color: COLORS.primary },
  checkoutBtn: { backgroundColor: COLORS.primary, padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 15 },
  btnText: { color: COLORS.white, fontSize: 16, fontWeight: '700' },
});