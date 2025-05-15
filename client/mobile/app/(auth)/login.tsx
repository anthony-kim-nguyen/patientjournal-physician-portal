import { useState, useEffect } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

export default function LoginScreen() {
  const { setUser } = useAuth();

  // Form field states
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  // Backend API base URL
  const API_URL = 'https://eh7tt3obg4.execute-api.us-west-1.amazonaws.com';

  // Auto-login on app launch if credentials are stored
  useEffect(() => {
    const loadStoredToken = async () => {
      const token = await SecureStore.getItemAsync('token');
      const storedUsername = await SecureStore.getItemAsync('username');
      if (token && storedUsername) {
        setUser({ token, username: storedUsername });
        console.log('🔑 Auto-login with stored token');
      }
    };
    loadStoredToken();
  }, []);

  // Handles both login and registration
  const handleAuth = async () => {
    console.log('🔐 Auth attempt:', { username, password, email, isRegistering });

    // Validate required fields
    if (!username || !password || (isRegistering && (!email || !firstName || !lastName))) {
      Alert.alert('Missing Fields', 'Please fill in all required fields.');
      return;
    }

    try {
      if (isRegistering) {
        // 🔧 Registration flow
        console.log('📨 Sending registration request...');
        const res = await axios.post(`${API_URL}/register`, {
          username,
          password,
          email,
          role: 'patient',
          first_name: firstName,
          last_name: lastName,
        });

        console.log('📥 Registration response:', res.data);
        Alert.alert('Success', 'Account created. Please log in.');
        setIsRegistering(false);
        return;
      }

      // 🔐 Login flow
      console.log('📨 Sending login request...');
      const form = new URLSearchParams();
      form.append('username', username);
      form.append('password', password);

      const res = await axios.post(`${API_URL}/token`, form.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      console.log('📥 Login response:', res.data);

      // ✅ Securely store token and username
      const token = res.data.access_token;
      await SecureStore.setItemAsync('token', token);
      await SecureStore.setItemAsync('username', username);

      // Set user in context
      setUser({ token, username });
      console.log('✅ User logged in!');
    } catch (err: any) {
      const msg = err.response?.data?.detail || err.message || 'Login failed';
      console.error('❌ Auth error:', msg);
      Alert.alert('Auth Failed', msg);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Image
        source={require('../../assets/images/PatientJournal_Logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>{isRegistering ? 'Create Account' : 'Welcome Back'}</Text>

      {/* Registration-only fields */}
      {isRegistering && (
        <>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            placeholderTextColor="#888"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            placeholderTextColor="#888"
            value={lastName}
            onChangeText={setLastName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#888"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </>
      )}

      {/* Shared input fields */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#888"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Auth button */}
      <TouchableOpacity style={styles.button} onPress={handleAuth}>
        <Text style={styles.buttonText}>{isRegistering ? 'Register' : 'Log In'}</Text>
      </TouchableOpacity>

      {/* Switch between login and register */}
      <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
        <Text style={styles.link}>
          {isRegistering ? 'Already have an account? Log In' : 'New here? Register'}
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

// Your existing styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    padding: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#61dafb',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    color: '#007AFF',
    marginTop: 20,
  },
});
