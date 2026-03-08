import { View, Text, TouchableOpacity, Image } from "react-native";
import { homeStyles as styles } from "../styles/home.styles";

export function WelcomeScreen({ navigation }: any) {
  return (
    <View style={styles.welcomeContainer}>
      {/* LOGO */}
      <Image
        source={require("../../shared/assets/logo.png")}
        style={styles.welcomeLogo}
      />

      {/* TEXTO */}
      <Text style={styles.welcomeTitle}>
        TechNova Store
      </Text>

      <Text style={styles.welcomeSubtitle}>
        Tu tienda de tecnología, rápida, segura y confiable
      </Text>

      {/* BOTÓN */}
      <TouchableOpacity
        style={styles.welcomeButton}
        onPress={() => navigation.navigate("Benefits")}
        activeOpacity={0.8}
      >
        <Text style={styles.welcomeButtonText}>
          Comenzar
        </Text>
      </TouchableOpacity>

      {/* FOOTER */}
      <Text style={styles.welcomeFooter}>
        Tecnología confiable • Compras seguras
      </Text>
    </View>
  );
}
