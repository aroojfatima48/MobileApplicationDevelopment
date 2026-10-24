import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform, StatusBar, Dimensions } from 'react-native';
import { COLORS } from '../theme/colors';

const { width } = Dimensions.get('window');
const circleSize = Math.min(width * 0.65, 280);

export default function SplashScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <View style={styles.centerContainer}>
        <View style={styles.logoCircle}><Text style={styles.fallbackLogo}>نقش</Text></View>
        <Text style={styles.brandName}>NAQSH</Text>
        <Text style={styles.tagline}>A little more you. Every day.</Text>
      </View>
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Everyday finds. Thoughtfully chosen.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background, alignItems: 'center', justifyContent: 'space-between', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0 },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: -30 },
  logoCircle: { width: circleSize, height: circleSize, borderRadius: circleSize / 2, backgroundColor: '#F6EBE6', justifyContent: 'center', alignItems: 'center', marginBottom: 30, ...Platform.select({ web: { boxShadow: '0px 4px 20px rgba(0,0,0,0.04)' }, default: { elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10 } }) },
  fallbackLogo: { fontSize: 64, color: COLORS.primary, fontWeight: 'bold', textAlign: 'center' },
  brandName: { fontSize: 32, fontWeight: '700', color: COLORS.textDark, letterSpacing: 3, marginBottom: 10, textAlign: 'center' },
  tagline: { fontSize: 14, color: COLORS.textLight, letterSpacing: 0.5, textAlign: 'center' },
  footerContainer: { alignItems: 'center', width: '100%', paddingBottom: 40 },
  footerText: { fontSize: 12, color: '#A0A0A0', letterSpacing: 0.5, marginBottom: 30, textAlign: 'center' },
});