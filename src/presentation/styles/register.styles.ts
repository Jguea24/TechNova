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

export const registerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#070b12",
  },
  containerContent: {
    padding: 20,
    paddingBottom: 30,
    flexGrow: 1,
    justifyContent: "center",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  glowTop: {
    position: "absolute",
    top: -140,
    right: -90,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: "#00e5ff",
    opacity: 0.22,
  },
  glowBottom: {
    position: "absolute",
    bottom: -160,
    left: -110,
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: "#00f5d4",
    opacity: 0.16,
  },
  header: {
    marginBottom: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
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
  inputMultiline: {
    minHeight: 80,
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
    paddingHorizontal: 4,
  },
  switchLabel: {
    fontSize: 15,
    color: "#e2e8f0",
    fontWeight: "500",
    fontFamily: bodyFont,
  },
  roleSection: {
    marginBottom: 14,
  },
  roleLabel: {
    fontSize: 14,
    color: "#e2e8f0",
    fontWeight: "600",
    marginBottom: 8,
    fontFamily: titleFont,
  },
  roleOptions: {
    flexDirection: "row",
  },
  roleOption: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#1f2a44",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#0b1220",
  },
  roleOptionLeft: {
    marginRight: 10,
  },
  roleOptionActive: {
    borderColor: "#00e5ff",
    backgroundColor: "#02212b",
  },
  roleOptionText: {
    color: "#e2e8f0",
    fontWeight: "500",
    fontFamily: bodyFont,
  },
  roleOptionTextActive: {
    color: "#00e5ff",
    fontWeight: "700",
    fontFamily: titleFont,
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
  backText: {
    color: "#22d3ee",
    textAlign: "center",
    marginTop: 16,
    fontSize: 14,
    fontWeight: "500",
    fontFamily: bodyFont,
  },

  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
    resizeMode: "contain",
  },

});
