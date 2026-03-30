import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { login } from "../../services/authService";
import { saveToken } from '../../utils/storage';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const data = await login(email, password);

      if (data.token) {
        await saveToken(data.token);
        navigation.replace('Dashboard');
      } else {
        alert('Credenciales incorrectas');
      }
    } catch (error) {
      console.log(error);
      alert('Error al iniciar sesión');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>
        Iniciar sesión
      </Text>

      <Text>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="correo@email.com"
        style={{
          borderWidth: 1,
          marginBottom: 15,
          padding: 10,
          borderRadius: 5,
        }}
      />

      <Text>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="******"
        style={{
          borderWidth: 1,
          marginBottom: 20,
          padding: 10,
          borderRadius: 5,
        }}
      />

      <TouchableOpacity
        onPress={handleLogin}
        style={{
          backgroundColor: 'black',
          padding: 15,
          borderRadius: 5,
        }}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>
          Login
        </Text>
      </TouchableOpacity>
    </View>
  );
}