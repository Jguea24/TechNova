import { View, Text, TouchableOpacity, Image } from "react-native";
import { homeStyles as styles } from "../styles/home.styles";

export function BenefitsScreen({ navigation }: any) {
  return (
    <View style={styles.benefitsContainer}>
      {/* TÍTULO */}
      <Text style={styles.benefitsTitle}>
        ¿Por qué usar TechNova Store?
      </Text>

      <Text style={styles.benefitsSubtitle}>
        Tecnología, comodidad y seguridad en una sola aplicación
      </Text>

      {/* CARDS DE BENEFICIOS */}
      <View style={styles.benefitsGrid}>
        <View style={styles.benefitCard}>
          <Image
            source={require("../../shared/assets/cart.png")}
            style={styles.benefitIcon}
          />
          <Text style={styles.benefitTitle}>
            Compra inteligente
          </Text>
          <Text style={styles.benefitText}>
            Adquiere dispositivos electrónicos de forma rápida y sencilla.
          </Text>
        </View>

        <View style={styles.benefitCard}>
          <Image
            source={require("../../shared/assets/offer.png")}
            style={styles.benefitIcon}
          />
          <Text style={styles.benefitTitle}>
            Ofertas exclusivas
          </Text>
          <Text style={styles.benefitText}>
            Accede a promociones, descuentos y nuevos lanzamientos.
          </Text>
        </View>

        <View style={styles.benefitCard}>
          <Image
            source={require("../../shared/assets/shield.png")}
            style={styles.benefitIcon}
          />
          <Text style={styles.benefitTitle}>
            Pagos seguros
          </Text>
          <Text style={styles.benefitText}>
            Tus compras están protegidas con sistemas de pago confiables.
          </Text>
        </View>

        <View style={styles.benefitCard}>
          <Image
            source={require("../../shared/assets/clock.png")}
            style={styles.benefitIcon}
          />
          <Text style={styles.benefitTitle}>
            Ahorro de tiempo
          </Text>
          <Text style={styles.benefitText}>
            Compra y gestiona tus pedidos sin desplazarte.
          </Text>
        </View>
      </View>

      {/* BOTÓN CONTINUAR */}
      <TouchableOpacity
        style={styles.benefitsButton}
        onPress={() => navigation.navigate("Permissions")}
        activeOpacity={0.85}
      >
        <Text style={styles.benefitsButtonText}>
          Continuar
        </Text>
      </TouchableOpacity>
    </View>
  );
}
