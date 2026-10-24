import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { COLORS } from '../theme/colors';
import CustomHeader from '../components/CustomHeader';
import { useAuth } from '../context/AuthContext';

export default function SignUpScreen({ navigation }) {
  const { signUp } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    const result = await signUp(name, email, password);
    if (result.success) {
      Alert.alert('Success', result.message);
      navigation.replace('Login');
    } else {
      Alert.alert('Error', result.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader navigation={navigation} title="Sign Up" showMenu={false} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Create account.</Text>
            <Text style={styles.subtitle}>A little more you. Every day.</Text>
            <Text style={styles.label}>Full Name</Text>
            <TextInput style={styles.input} placeholder="Jane Doe" placeholderTextColor={COLORS.textDark} value={name} onChangeText={setName} />
            <Text style={styles.label}>Email Address</Text>
            <TextInput style={styles.input} placeholder="hello@example.com" placeholderTextColor={COLORS.textDark} keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
            <Text style={styles.label}>Password</Text>
            <TextInput style={styles.input} placeholder="••••••••" secureTextEntry placeholderTextColor={COLORS.textDark} value={password} onChangeText={setPassword} />
            <TouchableOpacity style={styles.btn} onPress={handleSignUp}><Text style={styles.btnText}>Sign Up</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}><Text style={styles.linkText}>Already have an account? <Text style={styles.linkAccent}>Log In</Text></Text></TouchableOpacity>
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
  label: { fontSize: 13, fontWeight: '600', color: COLORS.textDarker, marginBottom: 6, marginLeft: 4 },
  input: { backgroundColor: COLORS.cardBg, borderRadius: 12, padding: 18, marginBottom: 15, borderWidth: 1, borderColor: COLORS.border, color: COLORS.textDarker },
  btn: { backgroundColor: COLORS.primary, padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  btnText: { color: COLORS.white, fontSize: 16, fontWeight: '600' },
  linkText: { textAlign: 'center', marginTop: 20, color: COLORS.textDark },
  linkAccent: { color: COLORS.primary, fontWeight: '600' },
});