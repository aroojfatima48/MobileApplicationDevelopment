import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator, SafeAreaView, Dimensions, ScrollView } from 'react-native';
import { COLORS } from '../theme/colors';
import { fetchProducts } from '../api/products';
import CustomHeader from '../components/CustomHeader';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await fetchProducts();
    setProducts(data);
    setLoading(false);
  };

  const popularItems = products.filter(p => p.gender === 'Women' || p.gender === 'Men').slice(0, 12);

  const groupedItems = [];
  for (let i = 0; i < popularItems.length; i += 4) {
    groupedItems.push(popularItems.slice(i, i + 4));
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader navigation={navigation} title="NAQSH" showMenu={true} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* --- HERO SECTION --- */}
        <View style={styles.heroContainer}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop' }} 
            style={styles.heroImage} 
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>New Arrivals</Text>
            <Text style={styles.heroSubtitle}>Discover your everyday style</Text>
            <TouchableOpacity 
              style={styles.heroBtn} 
              onPress={() => navigation.navigate('Shop', { gender: 'Women', category: 'All' })}
            >
              <Text style={styles.heroBtnText}>Shop Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* --- POPULAR COLLECTIONS SECTION --- */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Collections</Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} style={{ marginVertical: 20 }} />
        ) : (
          <View style={styles.popularGrid}>
            {groupedItems.map((group, index) => (
              <View key={index} style={styles.groupCard}>
                <View style={styles.gridContainer}>
                  {group.map((prod, idx) => (
                    <Image key={idx} source={{ uri: prod.image }} style={styles.gridImage} />
                  ))}
                  {group.length < 4 && [1, 2, 3].slice(0, 4 - group.length).map((_, i) => (
                    <View key={`empty-${i}`} style={styles.emptyGrid} />
                  ))}
                </View>
                <Text style={styles.groupTitle}>Popular Picks</Text>
              </View>
            ))}
          </View>
        )}

        {/* --- CATEGORY SECTION --- */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Shop by Category</Text>
        </View>

        <View style={styles.categoryRow}>
          <TouchableOpacity 
            style={styles.categoryCard} 
            onPress={() => navigation.navigate('Shop', { gender: 'Women', category: 'All' })}
          >
            <Image source={{ uri: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=400&auto=format&fit=crop' }} style={styles.categoryImage} />
            <View style={styles.categoryOverlay}>
              <Text style={styles.categoryText}>Women</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.categoryCard} 
            onPress={() => navigation.navigate('Shop', { gender: 'Men', category: 'All' })}
          >
            <Image source={{ uri: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=400&auto=format&fit=crop' }} style={styles.categoryImage} />
            <View style={styles.categoryOverlay}>
              <Text style={styles.categoryText}>Men</Text>
            </View>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { paddingBottom: 40 },

  // --- HERO SECTION ---
  heroContainer: { 
    width: '100%', 
    height: width * 0.55, 
    position: 'relative',
    marginBottom: 10,
    overflow: 'hidden'
  },
  heroImage: { 
    width: '100%', 
    height: '100%', 
    resizeMode: 'cover' 
  },
  heroOverlay: { 
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.45)', 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20 
  },
  heroTitle: { 
    fontSize: 28, 
    fontWeight: '800', 
    color: COLORS.white, 
    marginBottom: 4, 
    textAlign: 'center' 
  },
  heroSubtitle: { 
    fontSize: 14, 
    color: COLORS.white, 
    marginBottom: 16, 
    textAlign: 'center' 
  },
  heroBtn: { 
    backgroundColor: COLORS.primaryLight, 
    paddingVertical: 10, 
    paddingHorizontal: 28, 
    borderRadius: 25 
  },
  heroBtnText: { 
    color: COLORS.primary, 
    fontWeight: '700', 
    fontSize: 14 
  },

  // --- SECTION HEADERS ---
  sectionHeader: { 
    paddingHorizontal: 20, 
    marginTop: 20,
    marginBottom: 12 
  },
  sectionTitle: { 
    fontSize: 20, 
    fontWeight: '700', 
    color: COLORS.textDarker 
  },

  // --- POPULAR SECTION ---
  popularGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    paddingHorizontal: 20, 
    justifyContent: 'space-between' 
  },
  groupCard: { 
    width: (width - 40 - 20) / 3, 
    marginBottom: 10 
  },
  gridContainer: { 
    width: '100%', 
    aspectRatio: 1, 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    borderRadius: 10, 
    overflow: 'hidden', 
    borderWidth: 1, 
    borderColor: COLORS.border, 
    backgroundColor: COLORS.cardBg 
  },
  gridImage: { 
    width: '50%', 
    height: '50%', 
    resizeMode: 'cover' 
  },
  emptyGrid: { 
    width: '50%', 
    height: '50%', 
    backgroundColor: COLORS.primaryLight 
  },
  groupTitle: { 
    fontSize: 12, 
    fontWeight: '600', 
    color: COLORS.textDarker, 
    marginTop: 8, 
    textAlign: 'center' 
  },

  // --- CATEGORY SECTION ---
  categoryRow: { 
    flexDirection: 'row', 
    paddingHorizontal: 20, 
    justifyContent: 'space-between' 
  },
  categoryCard: { 
    width: (width - 40 - 15) / 2, 
    height: 180, 
    borderRadius: 15, 
    overflow: 'hidden', 
    position: 'relative' 
  },
  categoryImage: { 
    width: '100%', 
    height: '100%', 
    resizeMode: 'cover' 
  },
  categoryOverlay: { 
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  categoryText: { 
    fontSize: 22, 
    fontWeight: '800', 
    color: COLORS.white, 
    letterSpacing: 1 
  },
});