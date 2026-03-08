import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert,
} from "react-native";
import { useState } from "react";
import { useAuthViewModel } from "../../viewmodel/AuthViewModel";
import { loginStyles as styles } from "../styles/login.styles";

export function LoginScreen({ navigation }: any) {
  const { login, loading, error } = useAuthViewModel();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const success = await login(username.trim(), password);
    if (success) {
      Alert.alert("Ingreso", "Ingreso correctamente", [
        { text: "OK", onPress: () => navigation.replace("Home") },
      ]);
    }
  };

  const isValid = username.trim().length > 0 && password.length > 0;

  return (
    <View style={styles.container}>
      <View style={styles.background} pointerEvents="none">
        <View style={styles.glowTop} />
        <View style={styles.glowBottom} />
      </View>
      {/* HEADER */}
      <View style={styles.header}>
        <Image
          source={require("../../shared/assets/logo.png")}
          style={styles.logo}
        />

        <Text style={styles.title}>TechNova Store</Text>
        <Text style={styles.subtitle}>
          Inicia sesión para acceder a tus compras
        </Text>
      </View>

      {/* CARD DE LOGIN */}
      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Usuario o correo electrónico"
          autoCapitalize="none"
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {error && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity
          style={[
            styles.button,
            (!isValid || loading) && styles.buttonDisabled,
          ]}
          disabled={!isValid || loading}
          onPress={handleLogin}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Iniciar sesión</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.registerText}>
            ¿No tienes cuenta? Regístrate
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
