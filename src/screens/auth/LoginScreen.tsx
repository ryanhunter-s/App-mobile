import { View, Text, Platform, TouchableOpacity, Pressable, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useState } from 'react';
import { login } from "~/services/authService";
import { saveToken } from "~/utils/storage";
import { Styles, Colors, Button } from "~/utils/styles";
import { useForm } from 'react-hook-form';
import { FormInput } from "~/components/ui/FormInput";
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '~/lib/validations/auth.schema';
import { z } from "zod";
import { Eye, EyeOff } from 'lucide-react-native';


export default function LoginScreen({ navigation }: { navigation: any }) {
  const [attempts, setAttempts] = useState<number>(0);
  const [locked, setLocked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);

  const formLogin = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    if (locked) return;

    try {
      setLoading(true);

      const data = await login(values);

      setAttempts(0);
      if (data.token) {
        await saveToken(data.token);
        navigation.replace('Dashboard');
      } else {
        alert('Credenciales incorrectas');
      }
    } catch (error) {
      setAttempts(attempts + 1);
      
      if (attempts + 1 >= 5) {
      setLocked(true);

      setTimeout(() => {
        setLocked(false);
        setAttempts(0);
      }, 60000);
    }
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{...Styles.container}}>
          <View style={Styles.container_md}>
            <Text style={{
              ...Styles.text_3xl,
              fontWeight: 'bold',
              textAlign: 'center',
              color: Colors.primary,
              marginBottom: 5,
            }}>Sign In</Text>
            <Text style={{ textAlign: 'center', color: '#858585ff', marginBottom: 24 }}>Hi! Welcome back, you've been missed</Text>

            <Text style={{ marginBottom: 5, fontWeight: '500' }}>Email</Text>
            <FormInput
              control={formLogin.control}
              name="email"
              placeholder="example@gmail.com"
              error={formLogin.formState.errors.email}
            />

            <View style={{ position: 'relative' }}>
              <View>
                <Text style={{ marginBottom: 5, fontWeight: '500' }}>Password</Text>
                <FormInput
                  control={formLogin.control}
                  name="password"
                  placeholder="Password"
                  error={formLogin.formState.errors.password}
                  type="password"
                  secure={!showPassword}
                />
              </View>
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={{  position: "absolute",
                right: 10,
                top: "50%",
                transform: [{ translateY: -10 }] }}
              >
                <Text>{showPassword ? <EyeOff /> : <Eye />}</Text>
              </TouchableOpacity>
            </View>

            <Text style={{
              marginTop: 10, 
              color: Colors.primary, 
              textDecorationLine: 'underline', 
              marginBottom: 15, 
              marginLeft: 'auto' 
            }}>Forgot password?</Text>

            <Pressable
              onPress={formLogin.handleSubmit(onSubmit)}
              style={({ pressed }) => ({
                ...Button('primary', 'lg', 'solid', true).container,
                opacity: pressed ? 0.8 : 1,
              })}
            >
              <Text style={Button('primary', 'lg', 'solid', true).text}>
                Login
              </Text>
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}