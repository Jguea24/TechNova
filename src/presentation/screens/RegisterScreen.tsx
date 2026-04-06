import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView,
  Switch,
  Alert,
} from "react-native";
import { useState } from "react";
import { useAuthViewModel } from "../../viewmodel/AuthViewModel";
import { registerStyles as styles } from "../styles/register.styles";

export function RegisterScreen({ navigation }: any) {
  const { register, loading, error } = useAuthViewModel();
  const defaultRole = "cliente";

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isStaff, setIsStaff] = useState(false);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const success = await register(
      username.trim(),
      email.trim(),
      password,
      firstName.trim(),
      lastName.trim(),
      isStaff,
      defaultRole,
      phone.trim(),
      address.trim()
    );
    if (success) {
      Alert.alert("Registro", "Se registro correctamente", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    }
  };

  const isValid =
    username.trim().length > 0 &&
    email.trim().length > 0 &&
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    phone.trim().length > 0 &&
    address.trim().length > 0 &&
    password.trim().length > 0;

  return (
    <View style={styles.container}>
      <View style={styles.background} pointerEvents="none">
        <View style={styles.glowTop} />
        <View style={styles.glowBottom} />
      </View>
      <ScrollView
        contentContainerStyle={styles.containerContent}
        keyboardShouldPersistTaps="handled"
      >
      {/* HEADER CON LOGO */}
      <View style={styles.header}>
        <Image
          source={require("../../shared/assets/logo.png")}
          style={styles.logo}
        />

        <Text style={styles.title}>Crear cuenta</Text>
        <Text style={styles.subtitle}>
          Regístrate para comprar en TechNova Store
        </Text>
      </View>

      {/* CARD DE REGISTRO */}
      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Usuario"
          placeholderTextColor="#9ca3af"
          autoCapitalize="none"
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          placeholderTextColor="#9ca3af"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Nombre"
          placeholderTextColor="#9ca3af"
          autoCapitalize="words"
          value={firstName}
          onChangeText={setFirstName}
        />

        <TextInput
          style={styles.input}
          placeholder="Apellido"
          placeholderTextColor="#9ca3af"
          autoCapitalize="words"
          value={lastName}
          onChangeText={setLastName}
        />

        <TextInput
          style={styles.input}
          placeholder="Teléfono"
          placeholderTextColor="#9ca3af"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />

        <TextInput
          style={[styles.input, styles.inputMultiline]}
          placeholder="Dirección"
          placeholderTextColor="#9ca3af"
          value={address}
          onChangeText={setAddress}
          multiline
          numberOfLines={3}
          textAlignVertical="top"
        />

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Es staff</Text>
          <Switch value={isStaff} onValueChange={setIsStaff} />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#9ca3af"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* MENSAJE DE ERROR */}
        {error && <Text style={styles.error}>{error}</Text>}

        {/* BOTÓN REGISTRAR */}
        <TouchableOpacity
          style={[
            styles.button,
            (!isValid || loading) && styles.buttonDisabled,
          ]}
          disabled={!isValid || loading}
          onPress={handleRegister}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Registrarse</Text>
          )}
        </TouchableOpacity>

        {/* VOLVER A LOGIN */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>
            ¿Ya tienes cuenta? Inicia sesión
          </Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </View>
  );
}
