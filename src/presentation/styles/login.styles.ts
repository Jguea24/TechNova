import { Platform, StyleSheet } from "react-native";

const titleFont = Platform.select({
  ios: "AvenirNext-DemiBold",
  android: "sans-serif-condensed",
  default: "sans-serif-medium",
});

const bodyFont = Platform.select({
  ios: "AvenirNext-Regular",
  android: "sans-serif",
  default: "sans-serif",
});

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#070b12",
    padding: 20,
    justifyContent: "center",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  glowTop: {
    position: "absolute",
    top: -120,
    right: -80,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: "#00e5ff",
    opacity: 0.25,
  },
  glowBottom: {
    position: "absolute",
    bottom: -140,
    left: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "#00f5d4",
    opacity: 0.18,
  },
  header: {
    marginBottom: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#e2e8f0",
    fontFamily: titleFont,
  },
  subtitle: {
    fontSize: 14,
    color: "#94a3b8",
    marginTop: 6,
    fontFamily: bodyFont,
  },
  card: {
    backgroundColor: "#0f172a",
    borderRadius: 16,
    padding: 20,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#1f2a44",
    shadowColor: "#00e5ff",
    shadowOpacity: 0.25,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
  },
  input: {
    borderWidth: 1,
    borderColor: "#1f2a44",
    backgroundColor: "#0b1220",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    marginBottom: 14,
    color: "#e2e8f0",
    fontFamily: bodyFont,
  },
  button: {
    backgroundColor: "#00e5ff",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#00e5ff",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  buttonDisabled: {
    backgroundColor: "#334155",
  },
  buttonText: {
    color: "#001018",
    fontWeight: "600",
    fontSize: 16,
    fontFamily: titleFont,
  },
  error: {
    color: "#dc2626",
    fontSize: 13,
    marginBottom: 8,
    textAlign: "center",
    fontFamily: bodyFont,
  },
  registerText: {
    color: "#22d3ee",
    textAlign: "center",
    marginTop: 16,
    fontSize: 14,
    fontWeight: "500",
    fontFamily: bodyFont,
  },
  
  logo: {
  width: 110,
  height: 110,
  marginBottom: 12,
  resizeMode: "contain",
},

});
