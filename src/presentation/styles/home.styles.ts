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

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 34,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  glowTop: {
    position: "absolute",
    top: -70,
    right: -45,
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: "#22d3ee",
    opacity: 0.17,
  },
  glowBottom: {
    position: "absolute",
    bottom: -130,
    left: -90,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: "#0ea5e9",
    opacity: 0.15,
  },

  header: {
    marginTop: 6,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(15, 23, 42, 0.78)",
    borderWidth: 1,
    borderColor: "#1e293b",
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  brandStack: {
    marginLeft: 10,
  },

  logo: {
    width: 44,
    height: 44,
    resizeMode: "contain",
  },

  title: {
    fontSize: 17,
    fontWeight: "800",
    color: "#f8fafc",
    fontFamily: titleFont,
  },

  tagline: {
    fontSize: 10,
    color: "#60a5fa",
    marginTop: 2,
    fontFamily: bodyFont,
  },

  welcomeCard: {
    backgroundColor: "#0b1220",
    borderWidth: 1,
    borderColor: "#1e293b",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 12,
  },

  welcomeKicker: {
    fontSize: 12,
    color: "#93c5fd",
    marginBottom: 2,
    fontFamily: bodyFont,
  },

  welcomeText: {
    fontSize: 22,
    color: "#eff6ff",
    fontWeight: "800",
    fontFamily: titleFont,
  },

  card: {
    backgroundColor: "#0f172a",
    borderRadius: 14,
    padding: 20,
    elevation: 4,
  },

  welcome: {
    fontSize: 22,
    fontWeight: "700",
    color: "#e2e8f0",
    marginBottom: 8,
    textAlign: "center",
  },

  description: {
    fontSize: 14,
    color: "#cbd5e1",
    textAlign: "center",
    marginBottom: 20,
  },

  /* ========================= */
  /* 🔽 ESTILOS QUE FALTABAN */
  /* ========================= */

  sectionTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#f8fafc",
    marginBottom: 12,
    fontFamily: titleFont,
  },

  error: {
    color: "#fda4af",
    marginBottom: 10,
    textAlign: "center",
    fontFamily: bodyFont,
  },

  productCard: {
    backgroundColor: "#0f172a",
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#1f2a44",
  },

  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 4,
    minHeight: 40,
    fontFamily: bodyFont,
  },

  /* ========================= */

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  actionCard: {
    backgroundColor: "#0f172a",
    width: "48%",
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#1f2a44",
  },

  actionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#e2e8f0",
    marginBottom: 4,
    fontFamily: titleFont,
  },

  actionText: {
    fontSize: 13,
    color: "#94a3b8",
    fontFamily: bodyFont,
  },

  logoutButton: {
    backgroundColor: "#dc2626",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 16,
  },

  logoutText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: titleFont,
  },

  /* =========================*/
  /* 🔼 Boton de Carrito */

  addButton: {
    backgroundColor: "#00e5ff",
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
    shadowColor: "#00e5ff",
    shadowOpacity: 0.28,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },

  addButtonText: {
    color: "#001018",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: titleFont,
  },

  addButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  addButtonIcon: {
    width: 15,
    height: 15,
    resizeMode: "contain",
    tintColor: "#001018",
  },

  addButtonIconText: {
    fontSize: 15,
    lineHeight: 16,
  },

  cartIconWrap: {
    width: 16,
    height: 15,
    alignItems: "center",
    justifyContent: "flex-end",
    marginRight: 1,
  },

  cartIconHandle: {
    position: "absolute",
    top: 1,
    left: 0,
    width: 6,
    height: 2,
    backgroundColor: "#0f172a",
    borderRadius: 2,
    transform: [{ rotate: "20deg" }],
  },

  cartIconBasket: {
    width: 12,
    height: 7,
    borderWidth: 2,
    borderColor: "#0f172a",
    borderRadius: 2,
    backgroundColor: "transparent",
  },

  cartIconWheels: {
    width: 10,
    marginTop: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  cartIconWheel: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: "#0f172a",
  },

  cartIconStrokeLight: {
    borderColor: "#ecfeff",
    backgroundColor: "#ecfeff",
  },

  cartIconFillLight: {
    backgroundColor: "#ecfeff",
  },

  deliveryIconWrap: {
    width: 18,
    height: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  deliveryIconLines: {
    marginRight: 2,
    alignItems: "flex-end",
    justifyContent: "center",
  },

  deliveryIconLineLong: {
    width: 6,
    height: 2,
    borderRadius: 1,
    marginBottom: 2,
  },

  deliveryIconLineShort: {
    width: 4,
    height: 2,
    borderRadius: 1,
  },

  deliveryIconBox: {
    width: 10,
    height: 8,
    borderWidth: 2,
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },

  deliveryIconTape: {
    width: 2,
    height: 6,
    borderRadius: 1,
  },

  success: {
    color: "#16a34a",
    textAlign: "center",
    marginBottom: 8,
    fontFamily: bodyFont,
  },

/* =========================*/
/* 🔼 Estilos del Grid de Productos */

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logoutPill: {
    backgroundColor: "#38bdf8",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#7dd3fc",
  },

  logoutMini: {
    color: "#082f49",
    fontWeight: "700",
    fontFamily: titleFont,
  },
  cartShortcutButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#7dd3fc",
    backgroundColor: "#e0f2fe",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  cartShortcutBadge: {
    position: "absolute",
    top: -4,
    right: -5,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    paddingHorizontal: 3,
    backgroundColor: "#ef4444",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#fca5a5",
  },
  cartShortcutBadgeText: {
    color: "#fef2f2",
    fontSize: 9,
    fontWeight: "800",
    fontFamily: titleFont,
  },

  bannerShell: {
    marginBottom: 14,
  },

  bannerCard: {
    height: 170,
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#1f2937",
    backgroundColor: "#0b1220",
  },

  bannerImage: {
    width: "100%",
    height: "100%",
  },

  bannerImageFallback: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
    backgroundColor: "#111827",
  },

  bannerFallbackCard: {
    height: 120,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1e293b",
    backgroundColor: "#0f172a",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },

  bannerFallbackTitle: {
    color: "#f8fafc",
    fontSize: 16,
    fontFamily: titleFont,
    fontWeight: "800",
    textAlign: "center",
  },

  bannerFallbackText: {
    color: "#cbd5e1",
    marginTop: 6,
    fontSize: 13,
    fontFamily: bodyFont,
    textAlign: "center",
  },

  bannerDotsRow: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  bannerDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginHorizontal: 3,
    backgroundColor: "#475569",
  },

  bannerDotActive: {
    width: 18,
    backgroundColor: "#f8fafc",
  },

  categoriesRow: {
    paddingRight: 10,
    paddingBottom: 14,
  },

  categoryItem: {
    width: 94,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 10,
    paddingBottom: 8,
    paddingHorizontal: 6,
    marginRight: 10,
    borderRadius: 16,
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },

  categoryImageWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    overflow: "hidden",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginBottom: 8,
  },

  categoryImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  categoryActive: {
    backgroundColor: "#dbeafe",
    borderColor: "#38bdf8",
  },

  categoryText: {
    color: "#334155",
    fontWeight: "600",
    fontSize: 12,
    textAlign: "center",
    fontFamily: bodyFont,
  },

  categoryTextActive: {
    color: "#0f172a",
    fontFamily: titleFont,
  },

bestSellerCard: {
  width: 178,
  backgroundColor: "#f8fafc",
  borderRadius: 16,
  padding: 12,
  position: "relative",
  marginRight: 12,
  borderWidth: 1,
  borderColor: "#cbd5e1",
  shadowColor: "#0f172a",
  shadowOpacity: 0.2,
  shadowRadius: 10,
  shadowOffset: { width: 0, height: 4 },
},

bestSellerImage: {
  width: "100%",
  height: 88,
  resizeMode: "contain",
  marginBottom: 8,
},

bestSellerName: {
  fontSize: 13,
  fontWeight: "600",
  color: "#1e293b",
  marginBottom: 4,
  minHeight: 32,
  fontFamily: bodyFont,
},

bestSellerRating: {
  fontSize: 11,
  color: "#f59e0b",
  marginBottom: 8,
  letterSpacing: 0.2,
  fontFamily: bodyFont,
},

bestSellerPrice: {
  fontSize: 16,
  fontWeight: "700",
  color: "#0f172a",
  fontFamily: titleFont,
},

bestSellerFooter: {
  marginTop: 2,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
},

productRow: {
  justifyContent: "space-between",
},

productGridCard: {
  flex: 0.48,
  backgroundColor: "#f8fafc",
  borderRadius: 16,
  padding: 12,
  position: "relative",
  marginBottom: 12,
  elevation: 3,
  borderWidth: 1,
  borderColor: "#cbd5e1",
  shadowColor: "#0f172a",
  shadowOpacity: 0.18,
  shadowRadius: 8,
  shadowOffset: { width: 0, height: 6 },
},

productPreviewArea: {
  borderRadius: 12,
},

productImage: {
  width: "100%",
  height: 100,
  resizeMode: "contain",
  marginBottom: 8,
},

productStock: {
  color: "#64748b",
  fontSize: 12,
  fontFamily: bodyFont,
  marginBottom: 10,
},

productRatingText: {
  color: "#f59e0b",
  fontSize: 11,
  marginBottom: 4,
  letterSpacing: 0.2,
  fontFamily: bodyFont,
},

productPrice: {
  fontSize: 16,
  fontWeight: "700",
  marginBottom: 4,
  color: "#0f172a",
  fontFamily: titleFont,
},

productCardFooter: {
  marginTop: 2,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
},

productCardFooterHint: {
  color: "#64748b",
  fontSize: 12,
  fontFamily: bodyFont,
},

productMiniCartButton: {
  width: 28,
  height: 28,
  borderRadius: 14,
  borderWidth: 1,
  borderColor: "#bae6fd",
  backgroundColor: "#ecfeff",
  alignItems: "center",
  justifyContent: "center",
},

productStarButton: {
  position: "absolute",
  top: 8,
  right: 8,
  zIndex: 12,
  width: 24,
  height: 24,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: "#e2e8f0",
  backgroundColor: "#ffffff",
  alignItems: "center",
  justifyContent: "center",
},

productStarText: {
  color: "#94a3b8",
  fontSize: 14,
  lineHeight: 16,
  fontFamily: titleFont,
},

productStarTextActive: {
  color: "#f59e0b",
},

/* ========================= */
/*   WELCOME / ONBOARDING   */
/* ========================= */

welcomeContainer: {
  flex: 1,
  backgroundColor: "#0f172a",
  alignItems: "center",
  justifyContent: "center",
  padding: 24,
},

welcomeLogo: {
  width: 140,
  height: 140,
  resizeMode: "contain",
  marginBottom: 24,
},

welcomeTitle: {
  fontSize: 30,
  fontWeight: "800",
  color: "#ffffff",
  marginBottom: 8,
  textAlign: "center",
},

welcomeSubtitle: {
  fontSize: 15,
  color: "#cbd5e1",
  textAlign: "center",
  marginBottom: 40,
  paddingHorizontal: 10,
},

welcomeButton: {
  backgroundColor: "#dc2626",
  paddingVertical: 16,
  paddingHorizontal: 40,
  borderRadius: 14,
  elevation: 6,
},

welcomeButtonText: {
  color: "#ffffff",
  fontSize: 16,
  fontWeight: "700",
},

welcomeFooter: {
  position: "absolute",
  bottom: 20,
  fontSize: 12,
  color: "#94a3b8",
},

/* ========================= */
/*     PERMISSIONS SCREEN   */
/* ========================= */

permissionsContainer: {
  flex: 1,
  backgroundColor: "#0f172a",
  alignItems: "center",
  justifyContent: "center",
  padding: 24,
},

permissionsIcon: {
  width: 110,
  height: 110,
  resizeMode: "contain",
  marginBottom: 20,
},

permissionsTitle: {
  fontSize: 26,
  fontWeight: "800",
  color: "#ffffff",
  marginBottom: 16,
  textAlign: "center",
},

permissionsCard: {
  backgroundColor: "#020617",
  borderRadius: 14,
  padding: 20,
  marginBottom: 30,
},

permissionsText: {
  fontSize: 14,
  color: "#cbd5e1",
  textAlign: "center",
  marginBottom: 10,
  lineHeight: 20,
},

permissionsButton: {
  backgroundColor: "#dc2626",
  paddingVertical: 16,
  paddingHorizontal: 40,
  borderRadius: 14,
  elevation: 6,
},

permissionsButtonText: {
  color: "#ffffff",
  fontSize: 16,
  fontWeight: "700",
},

permissionsFooter: {
  position: "absolute",
  bottom: 20,
  fontSize: 12,
  color: "#94a3b8",
},

/* ========================= */
/*     BENEFITS SCREEN      */
/* ========================= */

benefitsContainer: {
  flex: 1,
  backgroundColor: "#0f172a",
  padding: 24,
},

benefitsTitle: {
  fontSize: 26,
  fontWeight: "800",
  color: "#ffffff",
  textAlign: "center",
  marginTop: 20,
},

benefitsSubtitle: {
  fontSize: 14,
  color: "#cbd5e1",
  textAlign: "center",
  marginBottom: 30,
},

benefitsGrid: {
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
},

benefitCard: {
  width: "48%",
  backgroundColor: "#020617",
  borderRadius: 16,
  padding: 16,
  marginBottom: 16,
  alignItems: "center",
},

benefitIcon: {
  width: 48,
  height: 48,
  resizeMode: "contain",
  marginBottom: 10,
},

benefitTitle: {
  fontSize: 15,
  fontWeight: "700",
  color: "#ffffff",
  marginBottom: 6,
  textAlign: "center",
},

benefitText: {
  fontSize: 13,
  color: "#cbd5e1",
  textAlign: "center",
},

benefitsButton: {
  backgroundColor: "#dc2626",
  paddingVertical: 16,
  borderRadius: 14,
  alignItems: "center",
  marginTop: 10,
},

benefitsButtonText: {
  color: "#ffffff",
  fontSize: 16,
  fontWeight: "700",
},

/* ========================= */
/*       ACCESS SCREEN      */
/* ========================= */

accessContainer: {
  flex: 1,
  backgroundColor: "#0f172a",
  alignItems: "center",
  justifyContent: "center",
  padding: 24,
},

accessLogo: {
  width: 120,
  height: 120,
  resizeMode: "contain",
  marginBottom: 20,
},

accessTitle: {
  fontSize: 26,
  fontWeight: "800",
  color: "#ffffff",
  marginBottom: 6,
},

accessSubtitle: {
  fontSize: 14,
  color: "#cbd5e1",
  textAlign: "center",
  marginBottom: 36,
},

accessPrimaryButton: {
  backgroundColor: "#dc2626",
  paddingVertical: 16,
  paddingHorizontal: 40,
  borderRadius: 14,
  width: "100%",
  alignItems: "center",
  marginBottom: 14,
},

accessPrimaryText: {
  color: "#ffffff",
  fontSize: 16,
  fontWeight: "700",
},

accessSecondaryButton: {
  borderWidth: 1,
  borderColor: "#dc2626",
  paddingVertical: 16,
  paddingHorizontal: 40,
  borderRadius: 14,
  width: "100%",
  alignItems: "center",
},

accessSecondaryText: {
  color: "#dc2626",
  fontSize: 16,
  fontWeight: "700",
},

accessFooter: {
  position: "absolute",
  bottom: 20,
  fontSize: 12,
  color: "#94a3b8",
},

  flatListContent: {
    marginTop: 8,
    paddingBottom: 20,
  },

  loadingBox: {
    width: 80,
    alignItems: "center",
    justifyContent: "center",
  },

  loadingState: {
    backgroundColor: "#0f172a",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1e293b",
    paddingVertical: 14,
    marginBottom: 12,
    alignItems: "center",
  },

  loadingText: {
    marginTop: 8,
    color: "#cbd5e1",
    fontSize: 13,
    fontFamily: bodyFont,
  },

  emptyState: {
    backgroundColor: "#0f172a",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1e293b",
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginBottom: 12,
  },

  emptyTitle: {
    color: "#e2e8f0",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 6,
    fontFamily: titleFont,
    textAlign: "center",
  },

  emptyText: {
    color: "#94a3b8",
    fontSize: 13,
    fontFamily: bodyFont,
    textAlign: "center",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(2, 6, 23, 0.7)",
    justifyContent: "center",
    paddingHorizontal: 14,
  },

  modalCard: {
    maxHeight: "82%",
    backgroundColor: "#f8fafc",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    padding: 14,
  },

  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0f172a",
    fontFamily: titleFont,
  },

  modalClose: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#e2e8f0",
  },

  modalCloseText: {
    color: "#0f172a",
    fontSize: 12,
    fontWeight: "700",
    fontFamily: titleFont,
  },

  modalContent: {
    paddingBottom: 4,
  },

  modalImage: {
    width: "100%",
    height: 190,
    resizeMode: "contain",
    borderRadius: 14,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginBottom: 12,
  },

  modalProductName: {
    fontSize: 20,
    color: "#0f172a",
    fontWeight: "800",
    marginBottom: 8,
    fontFamily: titleFont,
  },

  modalCategory: {
    fontSize: 13,
    color: "#334155",
    marginBottom: 4,
    fontFamily: bodyFont,
  },

  modalPrice: {
    fontSize: 16,
    color: "#0f172a",
    fontWeight: "700",
    marginBottom: 4,
    fontFamily: titleFont,
  },

  modalStock: {
    fontSize: 13,
    color: "#334155",
    marginBottom: 10,
    fontFamily: bodyFont,
  },

  modalDescriptionTitle: {
    fontSize: 14,
    color: "#0f172a",
    fontWeight: "700",
    marginBottom: 4,
    fontFamily: titleFont,
  },

  modalDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: "#334155",
    marginBottom: 14,
    fontFamily: bodyFont,
  },

  modalAddButton: {
    backgroundColor: "#22d3ee",
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#67e8f9",
  },

  modalAddButtonText: {
    color: "#083344",
    fontSize: 14,
    fontWeight: "700",
    fontFamily: titleFont,
  },

  infoTemplateCard: {
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "#1e293b",
    borderRadius: 14,
    padding: 14,
    marginTop: 6,
  },

  infoTemplateTitle: {
    fontSize: 16,
    color: "#e2e8f0",
    fontWeight: "700",
    marginBottom: 6,
    fontFamily: titleFont,
  },

  infoTemplateText: {
    fontSize: 13,
    lineHeight: 20,
    color: "#94a3b8",
    fontFamily: bodyFont,
  },

  cartPreviewShell: {
    marginTop: 4,
    backgroundColor: "#f3f4f6",
    borderRadius: 22,
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  cartPreviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  cartPreviewBrand: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  cartPreviewBrandLogo: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 10,
    resizeMode: "cover",
  },

  cartPreviewBrandText: {
    color: "#0ea5e9",
    fontSize: 28,
    fontWeight: "800",
    fontFamily: titleFont,
  },

  cartPreviewActions: {
    flexDirection: "row",
    alignItems: "center",
  },

  cartPreviewActionBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e0f2fe",
    marginLeft: 8,
  },

  cartPreviewActionBtnSoft: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fee2e2",
    marginLeft: 8,
  },

  cartPreviewActionText: {
    color: "#0284c7",
    fontSize: 16,
    fontFamily: titleFont,
    fontWeight: "800",
  },

  cartPreviewActionTextSoft: {
    color: "#ef4444",
    fontSize: 16,
    fontFamily: titleFont,
    fontWeight: "800",
  },

  cartSearchBar: {
    backgroundColor: "#e5e7eb",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#d1d5db",
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  cartSearchIcon: {
    color: "#9ca3af",
    fontSize: 16,
    marginRight: 8,
    fontFamily: titleFont,
  },

  cartSearchPlaceholder: {
    flex: 1,
    color: "#9ca3af",
    fontSize: 16,
    fontFamily: bodyFont,
  },

  cartFilterText: {
    color: "#9ca3af",
    fontSize: 14,
    fontFamily: titleFont,
  },

  cartSectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  cartSectionTitle: {
    color: "#0f172a",
    fontSize: 20,
    fontFamily: titleFont,
    fontWeight: "800",
    marginBottom: 10,
  },

  cartSectionButton: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#f8fafc",
  },

  cartSectionButtonText: {
    color: "#6b7280",
    fontSize: 13,
    fontFamily: titleFont,
    fontWeight: "700",
  },

  cartCategoryRow: {
    paddingRight: 4,
    marginBottom: 14,
  },

  cartCategoryCard: {
    width: 104,
    borderRadius: 14,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginRight: 10,
    padding: 8,
    alignItems: "center",
  },

  cartCategoryImageWrap: {
    width: 78,
    height: 68,
    borderRadius: 12,
    backgroundColor: "#f3f4f6",
    overflow: "hidden",
    marginBottom: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  cartCategoryImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  cartCategoryName: {
    color: "#111827",
    fontSize: 13,
    fontWeight: "700",
    fontFamily: titleFont,
  },

  cartStoreCard: {
    width: 186,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#d1d5db",
    backgroundColor: "#ffffff",
    marginRight: 12,
    overflow: "hidden",
  },

  cartStoreImageWrap: {
    width: "100%",
    height: 108,
    backgroundColor: "#111827",
  },

  cartStoreImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  cartStoreOpenBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#22c55e",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },

  cartStoreOpenText: {
    color: "#f0fdf4",
    fontSize: 11,
    fontFamily: titleFont,
    fontWeight: "700",
  },

  cartStoreBody: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  cartStoreName: {
    color: "#111827",
    fontSize: 17,
    fontWeight: "800",
    fontFamily: titleFont,
    marginBottom: 2,
  },

  cartStoreMeta: {
    color: "#9ca3af",
    fontSize: 12,
    fontFamily: bodyFont,
  },

  cartDealsTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
  },

  cartDealsIcon: {
    width: 22,
    height: 22,
    resizeMode: "contain",
    marginRight: 8,
  },

  cartDealsRow: {
    marginTop: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  cartDealCard: {
    width: "54%",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#ffffff",
    height: 110,
  },

  cartDealImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  cartMyOrderButton: {
    width: "42%",
    height: 80,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#d1d5db",
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  cartMyOrderIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    tintColor: "#0ea5e9",
    marginRight: 8,
  },

  cartMyOrderText: {
    color: "#0ea5e9",
    fontSize: 15,
    fontFamily: titleFont,
    fontWeight: "800",
  },

  ordersTemplateShell: {
    marginTop: 4,
    backgroundColor: "#f3f4f6",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  ordersHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  ordersRefreshButton: {
    backgroundColor: "#dbeafe",
    borderWidth: 1,
    borderColor: "#93c5fd",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  ordersRefreshText: {
    color: "#1e40af",
    fontSize: 12,
    fontWeight: "700",
    fontFamily: titleFont,
  },

  ordersSummaryCard: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 14,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 12,
  },

  ordersSummaryItem: {
    flex: 1,
  },

  ordersSummaryLabel: {
    color: "#6b7280",
    fontSize: 12,
    marginBottom: 2,
    fontFamily: bodyFont,
  },

  ordersSummaryValue: {
    color: "#111827",
    fontSize: 18,
    fontWeight: "800",
    fontFamily: titleFont,
  },

  ordersSummaryDivider: {
    width: 1,
    height: 34,
    backgroundColor: "#e5e7eb",
    marginHorizontal: 10,
  },

  cartStateBox: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 14,
    backgroundColor: "#ffffff",
    paddingVertical: 14,
    paddingHorizontal: 12,
    alignItems: "center",
  },

  cartStateTitle: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "800",
    fontFamily: titleFont,
    marginBottom: 4,
  },

  cartStateText: {
    color: "#6b7280",
    fontSize: 13,
    textAlign: "center",
    fontFamily: bodyFont,
    marginTop: 6,
  },

  cartGoShopButton: {
    marginTop: 12,
    backgroundColor: "#0ea5e9",
    borderWidth: 1,
    borderColor: "#38bdf8",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },

  cartGoShopText: {
    color: "#ecfeff",
    fontSize: 13,
    fontWeight: "700",
    fontFamily: titleFont,
  },

  cartSummaryCard: {
    marginTop: 4,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 14,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 12,
  },

  cartSummaryItem: {
    flex: 1,
  },

  cartSummaryLabel: {
    color: "#6b7280",
    fontSize: 12,
    marginBottom: 2,
    fontFamily: bodyFont,
  },

  cartSummaryValue: {
    color: "#111827",
    fontSize: 18,
    fontWeight: "800",
    fontFamily: titleFont,
  },

  cartSummaryDivider: {
    width: 1,
    height: 34,
    backgroundColor: "#e5e7eb",
    marginHorizontal: 10,
  },
  cartClearButton: {
    alignSelf: "flex-end",
    marginBottom: 10,
    backgroundColor: "#fee2e2",
    borderWidth: 1,
    borderColor: "#fecaca",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  cartClearButtonText: {
    color: "#b91c1c",
    fontSize: 12,
    fontWeight: "700",
    fontFamily: titleFont,
  },

  cartItemCardReal: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 14,
    backgroundColor: "#ffffff",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  cartItemThumbWrap: {
    width: 56,
    height: 56,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#f3f4f6",
    marginRight: 10,
  },

  cartItemThumb: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  cartItemBody: {
    flex: 1,
  },

  cartItemName: {
    color: "#111827",
    fontSize: 14,
    fontWeight: "700",
    fontFamily: titleFont,
    marginBottom: 2,
  },

  cartItemMeta: {
    color: "#6b7280",
    fontSize: 12,
    fontFamily: bodyFont,
  },
  cartQtyRow: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  cartQtyButton: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#bfdbfe",
    backgroundColor: "#eff6ff",
    alignItems: "center",
    justifyContent: "center",
  },
  cartQtyButtonText: {
    color: "#1d4ed8",
    fontSize: 16,
    lineHeight: 16,
    fontWeight: "700",
    fontFamily: titleFont,
  },
  cartQtyValue: {
    minWidth: 24,
    textAlign: "center",
    color: "#0f172a",
    fontSize: 13,
    fontWeight: "700",
    fontFamily: titleFont,
    marginHorizontal: 6,
  },
  cartRemoveButton: {
    marginLeft: 8,
    backgroundColor: "#fee2e2",
    borderWidth: 1,
    borderColor: "#fecaca",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  cartRemoveButtonText: {
    color: "#b91c1c",
    fontSize: 11,
    fontWeight: "700",
    fontFamily: titleFont,
  },

  cartItemAmount: {
    color: "#0f172a",
    fontSize: 15,
    fontWeight: "800",
    fontFamily: titleFont,
    marginLeft: 10,
  },

  cartCheckoutButton: {
    marginTop: 2,
    marginBottom: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#38bdf8",
    backgroundColor: "#0ea5e9",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
  },

  cartCheckoutIcon: {
    width: 18,
    height: 18,
    resizeMode: "contain",
    tintColor: "#ecfeff",
    marginRight: 8,
  },

  cartCheckoutIconText: {
    fontSize: 17,
    lineHeight: 18,
    marginRight: 8,
  },

  cartCheckoutText: {
    color: "#ecfeff",
    fontSize: 14,
    fontWeight: "800",
    fontFamily: titleFont,
  },

  profileSection: {
    marginTop: 8,
  },

  profileHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  profileReloadButton: {
    backgroundColor: "#1e40af",
    borderWidth: 1,
    borderColor: "#60a5fa",
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },

  profileReloadText: {
    color: "#eff6ff",
    fontSize: 12,
    fontFamily: titleFont,
    fontWeight: "700",
  },

  profileHero: {
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "#1e293b",
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  profileAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#1d4ed8",
    borderWidth: 2,
    borderColor: "#93c5fd",
    alignItems: "center",
    justifyContent: "center",
  },

  profileAvatarText: {
    color: "#eff6ff",
    fontSize: 24,
    fontFamily: titleFont,
    fontWeight: "800",
  },

  profileHeroContent: {
    flex: 1,
    marginLeft: 10,
  },

  profileHeroName: {
    color: "#f8fafc",
    fontSize: 18,
    fontFamily: titleFont,
    fontWeight: "800",
    marginBottom: 2,
  },

  profileHeroEmail: {
    color: "#93c5fd",
    fontSize: 12,
    fontFamily: bodyFont,
    marginBottom: 7,
  },

  profileRoleChip: {
    alignSelf: "flex-start",
    backgroundColor: "#dbeafe",
    borderWidth: 1,
    borderColor: "#93c5fd",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },

  profileRoleChipText: {
    color: "#1e3a8a",
    fontSize: 11,
    fontFamily: titleFont,
    fontWeight: "700",
  },

  profileLoadingBox: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
  },

  profileSuccessText: {
    color: "#86efac",
    textAlign: "center",
    marginBottom: 10,
    fontSize: 13,
    fontFamily: bodyFont,
  },

  profileFormCard: {
    backgroundColor: "#f9fbff",
    borderWidth: 1,
    borderColor: "#bfdbfe",
    borderRadius: 18,
    padding: 14,
    shadowColor: "#0f172a",
    shadowOpacity: 0.16,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  profileInputGroup: {
    marginBottom: 11,
  },

  profileInputLabel: {
    fontSize: 12,
    color: "#475569",
    marginBottom: 4,
    fontFamily: bodyFont,
  },

  profileInput: {
    borderWidth: 1,
    borderColor: "#bfdbfe",
    borderRadius: 12,
    backgroundColor: "#ffffff",
    color: "#0f172a",
    fontFamily: bodyFont,
    fontSize: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  profileInputDisabled: {
    backgroundColor: "#e2e8f0",
    color: "#64748b",
    borderColor: "#cbd5e1",
  },

  profileInputMultiline: {
    minHeight: 76,
  },

  profileRowInline: {
    flexDirection: "row",
    gap: 10,
  },

  profileInputHalf: {
    flex: 1,
    marginBottom: 11,
  },

  profileSaveButton: {
    marginTop: 4,
    backgroundColor: "#1d4ed8",
    borderWidth: 1,
    borderColor: "#60a5fa",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 13,
  },

  profileSaveButtonDisabled: {
    backgroundColor: "#60a5fa",
  },

  profileSaveButtonText: {
    color: "#eff6ff",
    fontFamily: titleFont,
    fontWeight: "700",
    fontSize: 15,
  },

  contentWithBottomNav: {
    paddingBottom: 122,
  },

  bottomNavShell: {
    position: "absolute",
    left: 14,
    right: 14,
    bottom: 10,
    backgroundColor: "#f8fbff",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#bfdbfe",
    paddingTop: 9,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: "#1d4ed8",
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 10,
  },

  bottomTabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 7,
    borderRadius: 14,
    backgroundColor: "#f8fbff",
  },

  bottomTabButtonActive: {
    backgroundColor: "#e8f1ff",
  },

  bottomTabDivider: {
    width: 1,
    marginVertical: 8,
    backgroundColor: "#dbeafe",
  },

  bottomTabLabel: {
    marginTop: 5,
    fontSize: 12,
    color: "#3b82f6",
    fontFamily: bodyFont,
    fontWeight: "600",
  },

  bottomTabLabelActive: {
    color: "#1d4ed8",
    fontFamily: titleFont,
  },

  bottomTabIndicator: {
    width: 14,
    height: 3,
    borderRadius: 2,
    backgroundColor: "#1d4ed8",
    marginTop: 4,
  },

  iconHomeWrap: {
    width: 24,
    height: 20,
    alignItems: "center",
    justifyContent: "flex-start",
  },

  iconHomeRoof: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 8,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    marginBottom: 2,
  },

  iconHomeBody: {
    width: 14,
    height: 10,
    borderWidth: 2,
    borderTopWidth: 0,
    borderRadius: 2,
  },

  iconPinWrap: {
    width: 24,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  iconPinCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },

  iconPinDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },

  iconPinTail: {
    width: 2,
    height: 5,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
  },

  iconUserWrap: {
    width: 24,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  iconUserHead: {
    width: 9,
    height: 9,
    borderRadius: 5,
    borderWidth: 2,
    marginBottom: 2,
  },

  iconUserBody: {
    width: 15,
    height: 8,
    borderWidth: 2,
    borderRadius: 8,
  },

});
