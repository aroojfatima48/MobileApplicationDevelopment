import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../theme/colors';
import CustomHeader from '../components/CustomHeader';
import { useAuth } from '../context/AuthContext';

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useAuth();

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader navigation={navigation} title="My Profile" showMenu={false} />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.avatarContainer}><Ionicons name="person" size={60} color={COLORS.white} /></View>
        <Text style={styles.name}>{user?.name || 'Guest User'}</Text>
        <Text style={styles.email}>{user?.email || 'Not logged in'}</Text>

        <View style={styles.infoBox}>
          <View style={styles.infoRow}><Ionicons name="mail-outline" size={20} color={COLORS.primary} /><Text style={styles.infoText}>{user?.email}</Text></View>
          <View style={styles.divider} />
          <View style={styles.infoRow}><Ionicons name="call-outline" size={20} color={COLORS.primary} /><Text style={styles.infoText}>+92 300 0000000</Text></View>
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Ionicons name="log-out-outline" size={20} color={COLORS.white} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  container: { flexGrow: 1, alignItems: 'center', padding: 30, paddingTop: 50 },
  avatarContainer: { width: 120, height: 120, borderRadius: 60, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  name: { fontSize: 26, fontWeight: '700', color: COLORS.textDarker, marginBottom: 5, textAlign: 'center' },
  email: { fontSize: 15, color: COLORS.textDark, marginBottom: 40, textAlign: 'center' },
  infoBox: { width: '100%', maxWidth: 500, backgroundColor: COLORS.cardBg, borderRadius: 16, padding: 20, borderWidth: 1, borderColor: COLORS.border },
  infoRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  infoText: { fontSize: 15, marginLeft: 15, color: COLORS.textDarker },
  divider: { height: 1, backgroundColor: COLORS.border, marginVertical: 5 },
  logoutBtn: { flexDirection: 'row', marginTop: 40, backgroundColor: COLORS.primary, paddingVertical: 15, paddingHorizontal: 40, borderRadius: 12, alignItems: 'center' },
  logoutText: { color: COLORS.white, fontSize: 16, fontWeight: '700', marginLeft: 8 }
});