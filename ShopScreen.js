import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ActivityIndicator, SafeAreaView, Dimensions } from 'react-native';
import { COLORS } from '../theme/colors';
import { fetchProducts } from '../api/products';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CustomHeader from '../components/CustomHeader';

const { width } = Dimensions.get('window');
const SPACING = 10;
const CARD_WIDTH = (width - (SPACING * 4)) / 3;
const IMAGE_HEIGHT = CARD_WIDTH * 1.25;

export default function ShopScreen({ navigation, route }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const selectedGender = route.params?.gender || 'Women';
  const selectedCategory = route.params?.category || 'All';
  const { addToCart } = useCart();
  const { user } = useAuth();

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    const data = await fetchProducts();
    setProducts(data);
    setLoading(false);
  };

  const handleAddToCart = (product) => {
    if (!user) navigation.navigate('Login');
    else { addToCart(product); alert(`${product.title} added to cart!`); }
  };

  const filteredProducts = products.filter(p =>
    p.gender === selectedGender && (selectedCategory === 'All' || p.subCategory === selectedCategory)
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.metaText} numberOfLines={1}>{item.subCategory}</Text>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.price}>Rs. {item.price}</Text>
      </View>
      <TouchableOpacity style={styles.addToCartBtn} onPress={() => handleAddToCart(item)}>
        <Text style={styles.addToCartText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader navigation={navigation} title="NAQSH" showMenu={true} />
      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id}
        numColumns={3}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<Text style={styles.mainTitle}>{selectedGender}'s {selectedCategory === 'All' ? 'Collection' : selectedCategory}</Text>}
        renderItem={renderItem}
        ListEmptyComponent={loading ? <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 50 }} /> : null}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  listContainer: { paddingHorizontal: SPACING, paddingBottom: 40 },
  mainTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textDarker, marginTop: 10, marginBottom: 15, marginLeft: 5 },
  row: { justifyContent: 'flex-start', gap: SPACING, marginBottom: SPACING },
  card: { width: CARD_WIDTH, backgroundColor: COLORS.cardBg, borderRadius: 12, padding: 8, borderWidth: 1, borderColor: COLORS.border },
  imageContainer: { width: '100%', height: IMAGE_HEIGHT, backgroundColor: '#F9F6F2', borderRadius: 8, marginBottom: 8, padding: 5, justifyContent: 'center', alignItems: 'center' },
  image: { width: '100%', height: '100%', borderRadius: 8 },
  infoContainer: { marginBottom: 8 },
  metaText: { fontSize: 9, color: COLORS.textDark, marginBottom: 2, textTransform: 'uppercase' },
  title: { fontSize: 11, fontWeight: '600', color: COLORS.textDarker, marginBottom: 2 },
  price: { fontSize: 12, fontWeight: '700', color: COLORS.primary },
  addToCartBtn: { backgroundColor: COLORS.primary, borderRadius: 6, paddingVertical: 6, alignItems: 'center', justifyContent: 'center', width: '100%' },
  addToCartText: { color: COLORS.white, fontSize: 10, fontWeight: '600' }
});