import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';
import { useAuthStore } from '../../store/useAuthStore';
import { Screen } from '../../components/Screen';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export const LoginScreen = ({ navigation }: Props): JSX.Element => {
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <Screen>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome to Vedamitra</Text>
        <Text style={styles.subtitle}>Login to continue your daily sadhana.</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} style={styles.input} placeholder="you@example.com" />

        <Text style={styles.label}>Password</Text>
        <TextInput secureTextEntry value={password} onChangeText={setPassword} style={styles.input} placeholder="••••••••" />

        <Button
          title={loading ? 'Logging in...' : 'Login'}
          disabled={loading}
          onPress={async () => {
            if (!email || !password) {
              Alert.alert('Missing fields', 'Please enter email and password.');
              return;
            }

            setLoading(true);
            try {
              await login(email.trim(), password);
            } catch {
              Alert.alert('Login failed', 'Please check your credentials.');
            } finally {
              setLoading(false);
            }
          }}
        />

        <View style={styles.secondaryAction}>
          <Button title="Create account" onPress={() => navigation.navigate('Register')} />
        </View>
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
  },
  secondaryAction: {
    marginTop: 12
  }
});
