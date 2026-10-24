import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, Alert, ScrollView } from 'react-native';
import { COLORS } from '../theme/colors';
import CustomHeader from '../components/CustomHeader';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen({ navigation, route }) {
  const { login } = useAuth();
  const { redirectToCheckout } = route.params || {};
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    const success = await login(email, password);
    if (success) {
      if (redirectToCheckout) navigation.navigate('Checkout');
      else navigation.navigate('Main', { screen: 'Home' });
    } else {
      Alert.alert('Login Failed', 'Invalid email or password. If you are a new user, please Sign Up first.', [
        { text: 'Try Again', style: 'cancel' },
        { text: 'Sign Up', onPress: () => navigation.navigate('SignUp') }
      ]);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader navigation={navigation} title="Log In" showMenu={false} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Welcome back.</Text>
            <Text style={styles.subtitle}>Log in to continue.</Text>
            <TextInput style={styles.input} placeholder="Email Address" placeholderTextColor={COLORS.textDark} keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
            <TextInput style={styles.input} placeholder="Password" secureTextEntry placeholderTextColor={COLORS.textDark} value={password} onChangeText={setPassword} />
            <TouchableOpacity style={styles.btn} onPress={handleLogin}><Text style={styles.btnText}>Log In</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}><Text style={styles.linkText}>Don't have an account? <Text style={styles.linkAccent}>Sign Up</Text></Text></TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  container: { flexGrow: 1, padding: 30, justifyContent: 'center', alignItems: 'center' },
  formContainer: { width: '100%', maxWidth: 450 },
  title: { fontSize: 32, fontWeight: '600', color: COLORS.textDarker, marginBottom: 10 },
  subtitle: { fontSize: 16, color: COLORS.textDark, marginBottom: 30 },
  input: { backgroundColor: COLORS.cardBg, borderRadius: 12, padding: 18, marginBottom: 15, borderWidth: 1, borderColor: COLORS.border, color: COLORS.textDarker },
  btn: { backgroundColor: COLORS.primary, padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  btnText: { color: COLORS.white, fontSize: 16, fontWeight: '600' },
  linkText: { textAlign: 'center', marginTop: 20, color: COLORS.textDark },
  linkAccent: { color: COLORS.primary, fontWeight: '600' },
});