import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable, StyleSheet, Text } from "react-native";
import { LoginScreen } from "../presentation/screens/LoginScreen";
import { RegisterScreen } from "../presentation/screens/RegisterScreen";

const Stack = createNativeStackNavigator();

type HeaderBackButtonProps = {
  onPress: () => void;
};

function HeaderBackButton({ onPress }: HeaderBackButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Volver"
      style={styles.backButton}
    >
      <Text style={styles.backButtonText}>{"\u2190"}</Text>
    </Pressable>
  );
}

const renderBackButton = (onPress: () => void) => () =>
  <HeaderBackButton onPress={onPress} />;

export function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={({ navigation }) => ({
          title: "",
          headerBackVisible: false,
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "#e5e7eb" },
          headerLeft: renderBackButton(navigation.goBack),
        })}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  backButton: {
    width: 52,
    height: 40,
    backgroundColor: "#e5e7eb",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2,
  },
  backButtonText: {
    fontSize: 28,
    color: "#111827",
    lineHeight: 28,
  },
});
