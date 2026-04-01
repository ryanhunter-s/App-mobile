import { Controller } from 'react-hook-form';
import { TextInput, Text, View } from 'react-native';
import { Styles } from "~/utils/styles";

export const FormInput = ({ control, name, placeholder, error, secure = false }: any) => (
  <View style={{ marginBottom: 10 }}>
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <TextInput
          placeholder={placeholder}
          onChangeText={onChange}
          value={value}
          style={{...Styles.input, marginBottom: 15}}
          secureTextEntry={secure}
        />
      )}
    />
    {error && <Text style={{ color: 'red' }}>{error.message}</Text>}
  </View>
);