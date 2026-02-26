import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuthStore } from '../../store/useAuthStore';
import { Screen } from '../../components/Screen';

export const RegisterScreen = (): JSX.Element => {
  const register = useAuthStore((state) => state.register);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <Screen>
      <View style={styles.card}>
        <Text style={styles.title}>Create your account</Text>
        <Text style={styles.subtitle}>Track chants, alarms, and your spiritual streak.</Text>

        <Text style={styles.label}>Name</Text>
        <TextInput value={name} onChangeText={setName} style={styles.input} placeholder="Your name" />

        <Text style={styles.label}>Email</Text>
        <TextInput autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} style={styles.input} placeholder="you@example.com" />

        <Text style={styles.label}>Password</Text>
        <TextInput secureTextEntry value={password} onChangeText={setPassword} style={styles.input} placeholder="Minimum 8 characters" />

        <Button
          title={loading ? 'Registering...' : 'Register'}
          disabled={loading}
          onPress={async () => {
            if (!name || !email || password.length < 8) {
              Alert.alert('Invalid input', 'Enter name, valid email, and password with at least 8 characters.');
              return;
            }

            setLoading(true);
            try {
              await register(name.trim(), email.trim(), password);
            } catch {
              Alert.alert('Registration failed', 'Please check your input and try again.');
            } finally {
              setLoading(false);
            }
          }}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    elevation: 1
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
    color: '#1F2937'
  },
  subtitle: {
    color: '#6B7280',
    marginBottom: 14
  },
  label: {
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    backgroundColor: '#FAFAFA'
  }
});
