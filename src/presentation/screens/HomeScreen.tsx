import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Platform,
  ActivityIndicator,
  StatusBar,
  TextInput,
  Alert,
  useWindowDimensions,
} from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { getUsername, removeToken } from "../../shared/storage/authStorage";
import { useProductViewModel } from "../../viewmodel/ProductViewModel";
import { useCartViewModel } from "../../viewmodel/CartViewModel";
import { useUserViewModel } from "../../viewmodel/UserViewModel";
import { getCategoriesService } from "../../services/categoryService";
import { Banner, getBannersService } from "../../services/bannerService";
import { Category } from "../../model/Category";
import { api } from "../../services/api";
import type { UserProfile } from "../../services/userService";
import { homeStyles as styles } from "../styles/home.styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type HomeTabKey = "inicio" | "pedidos" | "entrega" | "usuario";
type ProfileFormState = {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  address: string;
  role: string;
};

type IconProps = {
  color: string;
};

function HomeIcon({ color }: IconProps) {
  return (
    <View style={styles.iconHomeWrap}>
      <View style={[styles.iconHomeRoof, { borderBottomColor: color }]} />
      <View style={[styles.iconHomeBody, { borderColor: color }]} />
    </View>
  );
}

function UserIcon({ color }: IconProps) {
  return (
    <View style={styles.iconUserWrap}>
      <View style={[styles.iconUserHead, { borderColor: color }]} />
      <View style={[styles.iconUserBody, { borderColor: color }]} />
    </View>
  );
}

function DeliveryIcon({ color = "#0f172a" }: { color?: string }) {
  return (
    <View style={styles.deliveryIconWrap}>
      <View style={styles.deliveryIconLines}>
        <View style={[styles.deliveryIconLineLong, { backgroundColor: color }]} />
        <View style={[styles.deliveryIconLineShort, { backgroundColor: color }]} />
      </View>
      <View style={[styles.deliveryIconBox, { borderColor: color }]}>
        <View style={[styles.deliveryIconTape, { backgroundColor: color }]} />
      </View>
    </View>
  );
}

function CartIcon({ color = "#0f172a" }: { color?: string }) {
  return (
    <View style={styles.cartIconWrap}>
      <View style={[styles.cartIconHandle, { backgroundColor: color }]} />
      <View style={[styles.cartIconBasket, { borderColor: color }]} />
      <View style={styles.cartIconWheels}>
        <View style={[styles.cartIconWheel, { backgroundColor: color }]} />
        <View style={[styles.cartIconWheel, { backgroundColor: color }]} />
      </View>
    </View>
  );
}

export function HomeScreen({ navigation }: any) {
  const [username, setUsername] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const [activeTab, setActiveTab] = useState<HomeTabKey>("inicio");
  const [banners, setBanners] = useState<Banner[]>([]);
  const [bannersLoading, setBannersLoading] = useState(false);
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);
  const [favorites, setFavorites] = useState<Record<number, boolean>>({});
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [profileForm, setProfileForm] = useState<ProfileFormState>({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
    address: "",
    role: "cliente",
  });
  const [profileSavedMessage, setProfileSavedMessage] =
    useState<string | null>(null);
  const insets = useSafeAreaInsets();
  const { width: screenWidth } = useWindowDimensions();
  const scrollRef = useRef<ScrollView>(null);
  const bannerRef = useRef<FlatList<Banner>>(null);

  const { products, loadProducts, loading, error } = useProductViewModel();
  const {
    addToCart,
    clearCart,
    loadCart,
    cartItems,
    cartSubtotal,
    cartTotalItems,
    cartCount,
    cartDistinctItems,
    cartLoading,
    cartError,
    updateCartItemQuantity,
    removeCartItem,
  } = useCartViewModel();
  const {
    getMe,
    updateMe,
    loading: profileSaving,
    error: profileUpdateError,
    profileLoading,
    profileError,
  } = useUserViewModel();
  const bestSellers = products.slice(0, Math.min(6, products.length));
  const bannerCardWidth = Math.max(screenWidth - 32, 260);

  useEffect(() => {
    getUsername().then(setUsername);
  }, []);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategoriesService();
        setCategories(
          data.length > 0 ? data : [{ id: 0, name: "Todos" }]
        );
      } catch {
        setCategories([{ id: 0, name: "Todos" }]);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    const loadBanners = async () => {
      try {
        setBannersLoading(true);
        const data = await getBannersService();
        setBanners(data);
        setActiveBannerIndex(0);
      } catch {
        setBanners([]);
      } finally {
        setBannersLoading(false);
      }
    };

    loadBanners();
  }, []);

  useEffect(() => {
    loadProducts(selectedCategoryId);
  }, [loadProducts, selectedCategoryId]);

  const logout = () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Estás seguro de que deseas cerrar sesión?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Cerrar sesión",
          style: "destructive",
          onPress: async () => {
            await removeToken();
            navigation.replace("Auth");
          },
        },
      ]
    );
  };

  const resolveApiImageUri = (raw?: string | null) => {
    if (!raw) {
      return null;
    }

    if (raw.startsWith("http://") || raw.startsWith("https://")) {
      if (Platform.OS !== "android") {
        return raw;
      }

      const isLocalhostUri =
        raw.includes("://localhost") || raw.includes("://127.0.0.1");
      if (!isLocalhostUri) {
        return raw;
      }

      const baseURL = api.defaults.baseURL ?? "";
      const baseHostMatch = baseURL.match(/^https?:\/\/[^/]+/i);
      if (!baseHostMatch) {
        return raw;
      }

      return raw.replace(
        /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/i,
        baseHostMatch[0]
      );
    }

    const baseURL = api.defaults.baseURL ?? "";
    if (!baseURL) {
      return raw;
    }

    const cleanBase = baseURL.endsWith("/")
      ? baseURL.slice(0, -1)
      : baseURL;
    const cleanPath = raw.startsWith("/") ? raw : `/${raw}`;
    return `${cleanBase}${cleanPath}`;
  };

  const getCategoryImageUri = (category: Category) => {
    return resolveApiImageUri(category.image_url ?? category.image);
  };

  const getBannerImageUri = (banner: Banner) => {
    return resolveApiImageUri(banner.image_url ?? banner.image);
  };

  const getProductImageUri = (image?: string | null) => {
    return resolveApiImageUri(image);
  };

  const formatPrice = (value: number) => {
    return `$${Number(value).toFixed(2)}`;
  };

  const getProductRating = (productId: number) => 3 + (productId % 3);

  const getRatingStars = (productId: number) => {
    const filled = getProductRating(productId);
    return `${"\u2605".repeat(filled)}${"\u2606".repeat(5 - filled)}`;
  };

  const onBannerSnap = (offsetX: number) => {
    if (bannerCardWidth <= 0) {
      return;
    }

    const index = Math.round(offsetX / bannerCardWidth);
    const safeIndex = Math.max(0, Math.min(index, banners.length - 1));
    setActiveBannerIndex(safeIndex);
  };

  const handleTabPress = (tab: HomeTabKey) => {
    setActiveTab(tab);
    if (tab === "inicio") {
      scrollRef.current?.scrollTo({ y: 0, animated: true });
    }
  };

  const getTabColor = (tab: HomeTabKey) =>
    activeTab === tab ? "#1d4ed8" : "#60a5fa";

  const toProfileForm = useCallback(
    (profile: UserProfile | null): ProfileFormState => ({
      username: profile?.username ?? username ?? "",
      email: profile?.email ?? "",
      first_name: profile?.first_name ?? "",
      last_name: profile?.last_name ?? "",
      phone: profile?.phone ?? "",
      address: profile?.address ?? "",
      role: profile?.role ?? (profile?.is_staff ? "staff" : "cliente"),
    }),
    [username]
  );

  const loadUserProfile = useCallback(async () => {
    const data = await getMe();
    if (data) {
      setProfileForm(toProfileForm(data));
    }
    setProfileLoaded(true);
  }, [getMe, toProfileForm]);

  useEffect(() => {
    if (activeTab === "usuario" && !profileLoaded) {
      loadUserProfile();
    }
  }, [activeTab, profileLoaded, loadUserProfile]);

  useEffect(() => {
    if (activeTab === "pedidos" || activeTab === "entrega") {
      loadCart();
    }
  }, [activeTab, loadCart]);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  useEffect(() => {
    if (activeTab !== "inicio" || banners.length <= 1) {
      return;
    }

    const timer = setInterval(() => {
      setActiveBannerIndex((prev) => {
        const next = (prev + 1) % banners.length;
        bannerRef.current?.scrollToIndex({ index: next, animated: true });
        return next;
      });
    }, 3500);

    return () => clearInterval(timer);
  }, [activeTab, banners.length]);

  const handleProfileFieldChange = (
    field: keyof ProfileFormState,
    value: string
  ) => {
    setProfileSavedMessage(null);
    setProfileForm((prev) => ({ ...prev, [field]: value }));
  };

  const fullName = [profileForm.first_name, profileForm.last_name]
    .map((part) => (part ?? "").trim())
    .filter((part) => part.length > 0)
    .join(" ");

  const profileDisplayName =
    fullName ||
    (profileForm.username.trim() || username || "Usuario");

  const profileEmail =
    profileForm.email.trim() || "Correo no disponible";

  const profileRole = profileForm.role.trim() || "cliente";

  const profileInitial =
    profileDisplayName.trim().charAt(0).toUpperCase() || "U";

  const handleSaveProfile = async () => {
    const payload = {
      username: profileForm.username.trim(),
      first_name: profileForm.first_name.trim(),
      last_name: profileForm.last_name.trim(),
      phone: profileForm.phone.trim(),
      address: profileForm.address.trim(),
      role: profileForm.role.trim(),
    };

    const data = await updateMe(payload);
    if (data) {
      const normalized = data as UserProfile;
      setProfileForm(toProfileForm(normalized));
      setProfileSavedMessage("Datos guardados correctamente.");
    }
  };

  const handleReloadProfile = () => {
    setProfileSavedMessage(null);
    setProfileLoaded(false);
    loadUserProfile();
  };

  const handleCheckout = () => {
    Alert.alert(
      "Pago",
      `Total del pedido: ${formatPrice(cartSubtotal)}`
    );
  };

  const handleDecreaseCartItem = async (
    cartItemId: number,
    quantity: number
  ) => {
    const nextQuantity = quantity - 1;
    await updateCartItemQuantity(cartItemId, nextQuantity);
  };

  const handleIncreaseCartItem = async (
    cartItemId: number,
    quantity: number
  ) => {
    await updateCartItemQuantity(cartItemId, quantity + 1);
  };

  const handleRemoveCartItem = async (cartItemId: number) => {
    await removeCartItem(cartItemId);
  };

  const handleToggleFavorite = (productId: number) => {
    setFavorites((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const handleClearCart = () => {
    Alert.alert(
      "Vaciar carrito",
      "Se eliminaran todos los productos del carrito.",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Vaciar", style: "destructive", onPress: clearCart },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#020617" />
      <View style={styles.background} pointerEvents="none">
        <View style={styles.glowTop} />
        <View style={styles.glowBottom} />
      </View>
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={[styles.content, styles.contentWithBottomNav]}
        showsVerticalScrollIndicator={false}
      >
        {activeTab !== "usuario" && (
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Image
                source={require("../../shared/assets/logo.png")}
                style={styles.logo}
              />
              <View style={styles.brandStack}>
                <Text style={styles.title}>TechNova Store</Text>
                <Text style={styles.tagline}>
                  Electronicos premium y gadgets
                </Text>
              </View>
            </View>
            <View style={styles.headerActions}>
              <TouchableOpacity
                style={styles.cartShortcutButton}
                onPress={() => handleTabPress("pedidos")}
                activeOpacity={0.85}
              >
                <DeliveryIcon color="#0284c7" />
                {cartCount > 0 && (
                  <View style={styles.cartShortcutBadge}>
                    <Text style={styles.cartShortcutBadgeText}>
                      {cartCount > 99 ? "99+" : cartCount}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>

              <TouchableOpacity style={styles.logoutPill} onPress={logout}>
                <Text style={styles.logoutMini}>Salir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {activeTab === "inicio" && (
          <View style={styles.bannerShell}>
            {bannersLoading && (
              <View style={styles.bannerFallbackCard}>
                <ActivityIndicator size="small" color="#f8fafc" />
              </View>
            )}

            {!bannersLoading && banners.length === 0 && (
              <View style={styles.bannerFallbackCard}>
                <Text style={styles.bannerFallbackTitle}>
                  Ofertas especiales TechNova
                </Text>
                <Text style={styles.bannerFallbackText}>
                  Smartphones, laptops y gadgets con descuento.
                </Text>
              </View>
            )}

            {!bannersLoading && banners.length > 0 && (
              <>
                <FlatList
                  ref={bannerRef}
                  data={banners}
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item) => String(item.id)}
                  onMomentumScrollEnd={(event) =>
                    onBannerSnap(event.nativeEvent.contentOffset.x)
                  }
                  onScrollToIndexFailed={({ index }) => {
                    setTimeout(() => {
                      bannerRef.current?.scrollToIndex({
                        index,
                        animated: true,
                      });
                    }, 120);
                  }}
                  getItemLayout={(_, index) => ({
                    length: bannerCardWidth,
                    offset: bannerCardWidth * index,
                    index,
                  })}
                  renderItem={({ item }) => {
                    const imageUri = getBannerImageUri(item);
                    return (
                      <View style={[styles.bannerCard, { width: bannerCardWidth }]}>
                        {imageUri ? (
                          <Image
                            source={{ uri: imageUri }}
                            style={styles.bannerImage}
                            resizeMode="cover"
                          />
                        ) : (
                          <View style={styles.bannerImageFallback}>
                            <Text style={styles.bannerFallbackTitle}>
                              {item.title || "Banner"}
                            </Text>
                          </View>
                        )}
                      </View>
                    );
                  }}
                />

                <View style={styles.bannerDotsRow}>
                  {banners.map((item, index) => (
                    <View
                      key={`dot-${item.id}`}
                      style={[
                        styles.bannerDot,
                        index === activeBannerIndex && styles.bannerDotActive,
                      ]}
                    />
                  ))}
                </View>
              </>
            )}
          </View>
        )}

        {activeTab === "inicio" && (
          <>
            <Text style={styles.sectionTitle}>Categorias</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesRow}
            >
              {categories.length === 0 && (
                <View style={styles.loadingBox}>
                  <ActivityIndicator size="small" color="#22d3ee" />
                </View>
              )}
              {categories.map((cat) => {
                const imageUri = getCategoryImageUri(cat);
                return (
                  <TouchableOpacity
                    key={cat.id}
                    style={[
                      styles.categoryItem,
                      selectedCategoryId === cat.id && styles.categoryActive,
                    ]}
                    onPress={() => setSelectedCategoryId(cat.id)}
                    activeOpacity={0.85}
                  >
                    <View style={styles.categoryImageWrap}>
                      {imageUri ? (
                        <Image
                          source={{ uri: imageUri }}
                          style={styles.categoryImage}
                        />
                      ) : (
                        <Image
                          source={require("../../shared/assets/product.png")}
                          style={styles.categoryImage}
                        />
                      )}
                    </View>
                    <Text
                      style={[
                        styles.categoryText,
                        selectedCategoryId === cat.id &&
                          styles.categoryTextActive,
                      ]}
                      numberOfLines={2}
                    >
                      {cat.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <Text style={styles.sectionTitle}>Mas vendidos</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {loading && bestSellers.length === 0 && (
                <View style={styles.loadingBox}>
                  <ActivityIndicator size="small" color="#22d3ee" />
                </View>
              )}
              {bestSellers.map((item) => {
                const imageUri = getProductImageUri(item.image_url ?? item.image);
                const isFavorite = Boolean(favorites[item.id]);
                return (
                  <View
                    key={item.id}
                    style={styles.bestSellerCard}
                  >
                    <TouchableOpacity
                      style={styles.productStarButton}
                      onPress={() => handleToggleFavorite(item.id)}
                      activeOpacity={0.8}
                    >
                      <Text
                        style={[
                          styles.productStarText,
                          isFavorite && styles.productStarTextActive,
                        ]}
                      >
                        {isFavorite ? "★" : "☆"}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() =>
                        navigation.navigate("ProductDetail", {
                          product: item,
                        })
                      }
                    >
                      {imageUri ? (
                        <Image
                          source={{
                            uri: imageUri,
                          }}
                          style={styles.bestSellerImage}
                        />
                      ) : (
                        <Image
                          source={require("../../shared/assets/product.png")}
                          style={styles.bestSellerImage}
                        />
                      )}
                      <Text style={styles.bestSellerName} numberOfLines={2}>
                        {item.name}
                      </Text>
                      <Text style={styles.bestSellerRating}>
                        {getRatingStars(item.id)}
                      </Text>
                    </TouchableOpacity>

                    <View style={styles.bestSellerFooter}>
                      <Text style={styles.bestSellerPrice}>
                        {formatPrice(item.price)}
                      </Text>
                      <TouchableOpacity
                        style={styles.productMiniCartButton}
                        onPress={() => addToCart(item.id)}
                        activeOpacity={0.85}
                      >
                        <CartIcon color="#0284c7" />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </ScrollView>

            <Text style={styles.sectionTitle}>En tendencia</Text>
            {error && (
              <Text style={styles.error}>{error}</Text>
            )}
            {loading && products.length === 0 && (
              <View style={styles.loadingState}>
                <ActivityIndicator size="small" color="#22d3ee" />
                <Text style={styles.loadingText}>
                  Cargando productos...
                </Text>
              </View>
            )}
            {!loading && products.length === 0 && (
              <View style={styles.emptyState}>
                <Text style={styles.emptyTitle}>
                  No hay productos en esta categoria
                </Text>
                <Text style={styles.emptyText}>
                  Prueba con otra categoria para ver opciones.
                </Text>
              </View>
            )}
            <FlatList
              data={products}
              numColumns={2}
              scrollEnabled={false}
              keyExtractor={(item) => item.id.toString()}
              columnWrapperStyle={styles.productRow}
              contentContainerStyle={styles.flatListContent}
              renderItem={({ item }) => {
                const imageUri = getProductImageUri(item.image_url ?? item.image);
                const isFavorite = Boolean(favorites[item.id]);
                return (
                  <View style={styles.productGridCard}>
                    <TouchableOpacity
                      style={styles.productStarButton}
                      onPress={() => handleToggleFavorite(item.id)}
                      activeOpacity={0.8}
                    >
                      <Text
                        style={[
                          styles.productStarText,
                          isFavorite && styles.productStarTextActive,
                        ]}
                      >
                        {isFavorite ? "★" : "☆"}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.productPreviewArea}
                      activeOpacity={0.9}
                      onPress={() =>
                        navigation.navigate("ProductDetail", {
                          product: item,
                        })
                      }
                    >
                      {imageUri ? (
                        <Image
                          source={{
                            uri: imageUri,
                          }}
                          style={styles.productImage}
                        />
                      ) : (
                        <Image
                          source={require("../../shared/assets/product.png")}
                          style={styles.productImage}
                        />
                      )}

                      <Text style={styles.productName} numberOfLines={2}>
                        {item.name}
                      </Text>
                      <Text style={styles.productRatingText}>
                        {getRatingStars(item.id)}
                      </Text>
                      <Text style={styles.productPrice}>
                        {formatPrice(item.price)}
                      </Text>
                      <Text style={styles.productStock}>
                        Stock: {item.stock}
                      </Text>
                    </TouchableOpacity>

                    <View style={styles.productCardFooter}>
                      <Text style={styles.productCardFooterHint}>Agregar</Text>
                      <TouchableOpacity
                        style={styles.productMiniCartButton}
                        onPress={() => addToCart(item.id)}
                        activeOpacity={0.85}
                      >
                        <CartIcon color="#0284c7" />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
            />
          </>
        )}

        {activeTab === "pedidos" && (
          <View style={styles.ordersTemplateShell}>
            <View style={styles.ordersHeaderRow}>
              <Text style={styles.sectionTitle}>Mis pedidos</Text>
              <TouchableOpacity
                style={styles.ordersRefreshButton}
                onPress={loadCart}
                activeOpacity={0.85}
              >
                <Text style={styles.ordersRefreshText}>Actualizar</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.ordersSummaryCard}>
              <View style={styles.ordersSummaryItem}>
                <Text style={styles.ordersSummaryLabel}>Productos</Text>
                <Text style={styles.ordersSummaryValue}>{cartTotalItems}</Text>
              </View>
              <View style={styles.ordersSummaryDivider} />
              <View style={styles.ordersSummaryItem}>
                <Text style={styles.ordersSummaryLabel}>
                  Subtotal ({cartDistinctItems} items)
                </Text>
                <Text style={styles.ordersSummaryValue}>
                  {formatPrice(cartSubtotal)}
                </Text>
              </View>
            </View>

            {cartError && (
              <Text style={styles.error}>{cartError}</Text>
            )}

            {cartLoading && (
              <View style={styles.cartStateBox}>
                <ActivityIndicator size="small" color="#38bdf8" />
                <Text style={styles.cartStateText}>Cargando carrito...</Text>
              </View>
            )}

            {!cartLoading && cartItems.length === 0 && (
              <View style={styles.cartStateBox}>
                <Text style={styles.cartStateTitle}>Carrito vacio</Text>
                <Text style={styles.cartStateText}>
                  Agrega productos desde Inicio para verlos aqui.
                </Text>
                <TouchableOpacity
                  style={styles.cartGoShopButton}
                  activeOpacity={0.85}
                  onPress={() => handleTabPress("inicio")}
                >
                  <Text style={styles.cartGoShopText}>Ir a comprar</Text>
                </TouchableOpacity>
              </View>
            )}

            {!cartLoading && cartItems.length > 0 && (
              <>
                <TouchableOpacity
                  style={styles.cartClearButton}
                  onPress={handleClearCart}
                  activeOpacity={0.85}
                >
                  <Text style={styles.cartClearButtonText}>Vaciar carrito</Text>
                </TouchableOpacity>

                {cartItems.map((item) => {
                  const cartItemImage = resolveApiImageUri(item.image);
                  return (
                    <View key={String(item.id)} style={styles.cartItemCardReal}>
                      <View style={styles.cartItemThumbWrap}>
                        {cartItemImage ? (
                          <Image
                            source={{ uri: cartItemImage }}
                            style={styles.cartItemThumb}
                          />
                        ) : (
                          <Image
                            source={require("../../shared/assets/product.png")}
                            style={styles.cartItemThumb}
                          />
                        )}
                      </View>
                      <View style={styles.cartItemBody}>
                        <Text style={styles.cartItemName} numberOfLines={1}>
                          {item.name}
                        </Text>
                        <Text style={styles.cartItemMeta}>
                          Cantidad: {item.quantity}
                        </Text>
                        <Text style={styles.cartItemMeta}>
                          Precio: {formatPrice(item.price)}
                        </Text>
                        <View style={styles.cartQtyRow}>
                          <TouchableOpacity
                            style={styles.cartQtyButton}
                            onPress={() =>
                              handleDecreaseCartItem(item.id, item.quantity)
                            }
                            activeOpacity={0.85}
                          >
                            <Text style={styles.cartQtyButtonText}>-</Text>
                          </TouchableOpacity>
                          <Text style={styles.cartQtyValue}>{item.quantity}</Text>
                          <TouchableOpacity
                            style={styles.cartQtyButton}
                            onPress={() =>
                              handleIncreaseCartItem(item.id, item.quantity)
                            }
                            activeOpacity={0.85}
                          >
                            <Text style={styles.cartQtyButtonText}>+</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.cartRemoveButton}
                            onPress={() => handleRemoveCartItem(item.id)}
                            activeOpacity={0.85}
                          >
                            <Text style={styles.cartRemoveButtonText}>Quitar</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      <Text style={styles.cartItemAmount}>
                        {formatPrice(item.subtotal)}
                      </Text>
                    </View>
                  );
                })}

                <TouchableOpacity
                  style={styles.cartCheckoutButton}
                  activeOpacity={0.88}
                  onPress={handleCheckout}
                >
                  <CartIcon color="#ecfeff" />
                  <Text style={styles.cartCheckoutText}>
                    Finalizar pedido ({formatPrice(cartSubtotal)})
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        )}

        {activeTab === "entrega" && (
          <View style={styles.infoTemplateCard}>
            <Text style={styles.sectionTitle}>Entrega</Text>
            <Text style={styles.infoTemplateTitle}>Seguimiento de entrega</Text>
            <Text style={styles.infoTemplateText}>
              Aqui podras ver el estado de envio de tus pedidos y el tiempo estimado
              de entrega.
            </Text>
          </View>
        )}

        {activeTab === "usuario" && (
          <View style={styles.profileSection}>
            <View style={styles.profileHeaderRow}>
              <Text style={styles.sectionTitle}>Datos del usuario</Text>
              <TouchableOpacity
                style={styles.profileReloadButton}
                onPress={handleReloadProfile}
                activeOpacity={0.85}
                disabled={profileLoading}
              >
                <Text style={styles.profileReloadText}>
                  {profileLoading ? "Cargando..." : "Actualizar"}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.profileHero}>
              <View style={styles.profileAvatar}>
                <Text style={styles.profileAvatarText}>{profileInitial}</Text>
              </View>
              <View style={styles.profileHeroContent}>
                <Text style={styles.profileHeroName}>{profileDisplayName}</Text>
                <Text style={styles.profileHeroEmail}>{profileEmail}</Text>
                <View style={styles.profileRoleChip}>
                  <Text style={styles.profileRoleChipText}>
                    Rol: {profileRole}
                  </Text>
                </View>
              </View>
            </View>

            {profileError && (
              <Text style={styles.error}>{profileError}</Text>
            )}
            {profileUpdateError && (
              <Text style={styles.error}>{profileUpdateError}</Text>
            )}
            {profileSavedMessage && (
              <Text style={styles.profileSuccessText}>{profileSavedMessage}</Text>
            )}

            {!profileLoaded && profileLoading && (
              <View style={styles.profileLoadingBox}>
                <ActivityIndicator size="small" color="#22d3ee" />
              </View>
            )}

            <View style={styles.profileFormCard}>
              <View style={styles.profileInputGroup}>
                <Text style={styles.profileInputLabel}>Usuario</Text>
                <TextInput
                  style={styles.profileInput}
                  placeholder="Usuario"
                  placeholderTextColor="#94a3b8"
                  value={profileForm.username}
                  autoCapitalize="none"
                  onChangeText={(value) =>
                    handleProfileFieldChange("username", value)
                  }
                />
              </View>

              <View style={styles.profileInputGroup}>
                <Text style={styles.profileInputLabel}>Correo</Text>
                <TextInput
                  style={[styles.profileInput, styles.profileInputDisabled]}
                  placeholder="Correo"
                  placeholderTextColor="#94a3b8"
                  value={profileForm.email}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  editable={false}
                  selectTextOnFocus={false}
                />
              </View>

              <View style={styles.profileRowInline}>
                <View style={styles.profileInputHalf}>
                  <Text style={styles.profileInputLabel}>Nombre</Text>
                  <TextInput
                    style={styles.profileInput}
                    placeholder="Nombre"
                    placeholderTextColor="#94a3b8"
                    value={profileForm.first_name}
                    onChangeText={(value) =>
                      handleProfileFieldChange("first_name", value)
                    }
                  />
                </View>
                <View style={styles.profileInputHalf}>
                  <Text style={styles.profileInputLabel}>Apellido</Text>
                  <TextInput
                    style={styles.profileInput}
                    placeholder="Apellido"
                    placeholderTextColor="#94a3b8"
                    value={profileForm.last_name}
                    onChangeText={(value) =>
                      handleProfileFieldChange("last_name", value)
                    }
                  />
                </View>
              </View>

              <View style={styles.profileInputGroup}>
                <Text style={styles.profileInputLabel}>Telefono</Text>
                <TextInput
                  style={styles.profileInput}
                  placeholder="Telefono"
                  placeholderTextColor="#94a3b8"
                  value={profileForm.phone}
                  keyboardType="phone-pad"
                  onChangeText={(value) =>
                    handleProfileFieldChange("phone", value)
                  }
                />
              </View>

              <View style={styles.profileInputGroup}>
                <Text style={styles.profileInputLabel}>Direccion</Text>
                <TextInput
                  style={[styles.profileInput, styles.profileInputMultiline]}
                  placeholder="Direccion"
                  placeholderTextColor="#94a3b8"
                  value={profileForm.address}
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                  onChangeText={(value) =>
                    handleProfileFieldChange("address", value)
                  }
                />
              </View>

              <View style={styles.profileInputGroup}>
                <Text style={styles.profileInputLabel}>Rol</Text>
                <TextInput
                  style={styles.profileInput}
                  placeholder="Rol"
                  placeholderTextColor="#94a3b8"
                  value={profileForm.role}
                  autoCapitalize="none"
                  onChangeText={(value) =>
                    handleProfileFieldChange("role", value)
                  }
                />
              </View>

              <TouchableOpacity
                style={[
                  styles.profileSaveButton,
                  profileSaving && styles.profileSaveButtonDisabled,
                ]}
                onPress={handleSaveProfile}
                activeOpacity={0.88}
                disabled={profileSaving}
              >
                {profileSaving ? (
                  <ActivityIndicator size="small" color="#eff6ff" />
                ) : (
                  <Text style={styles.profileSaveButtonText}>
                    Guardar datos
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>

      <View
        style={[
          styles.bottomNavShell,
          { paddingBottom: Math.max(insets.bottom, 10) },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.bottomTabButton,
            activeTab === "inicio" && styles.bottomTabButtonActive,
          ]}
          activeOpacity={0.85}
          onPress={() => handleTabPress("inicio")}
        >
          <HomeIcon color={getTabColor("inicio")} />
          <Text
            style={[
              styles.bottomTabLabel,
              activeTab === "inicio" && styles.bottomTabLabelActive,
            ]}
          >
            Inicio
          </Text>
          {activeTab === "inicio" && <View style={styles.bottomTabIndicator} />}
        </TouchableOpacity>
        <View style={styles.bottomTabDivider} />

        <TouchableOpacity
          style={[
            styles.bottomTabButton,
            activeTab === "pedidos" && styles.bottomTabButtonActive,
          ]}
          activeOpacity={0.85}
          onPress={() => handleTabPress("pedidos")}
        >
          <CartIcon color={getTabColor("pedidos")} />
          <Text
            style={[
              styles.bottomTabLabel,
              activeTab === "pedidos" && styles.bottomTabLabelActive,
            ]}
          >
            Pedidos
          </Text>
          {activeTab === "pedidos" && (
            <View style={styles.bottomTabIndicator} />
          )}
        </TouchableOpacity>
        <View style={styles.bottomTabDivider} />

        <TouchableOpacity
          style={[
            styles.bottomTabButton,
            activeTab === "entrega" && styles.bottomTabButtonActive,
          ]}
          activeOpacity={0.85}
          onPress={() => handleTabPress("entrega")}
        >
          <DeliveryIcon color={getTabColor("entrega")} />
          <Text
            style={[
              styles.bottomTabLabel,
              activeTab === "entrega" && styles.bottomTabLabelActive,
            ]}
          >
            Entrega
          </Text>
          {activeTab === "entrega" && (
            <View style={styles.bottomTabIndicator} />
          )}
        </TouchableOpacity>
        <View style={styles.bottomTabDivider} />

        <TouchableOpacity
          style={[
            styles.bottomTabButton,
            activeTab === "usuario" && styles.bottomTabButtonActive,
          ]}
          activeOpacity={0.85}
          onPress={() => handleTabPress("usuario")}
        >
          <UserIcon color={getTabColor("usuario")} />
          <Text
            style={[
              styles.bottomTabLabel,
              activeTab === "usuario" && styles.bottomTabLabelActive,
            ]}
          >
            Usuario
          </Text>
          {activeTab === "usuario" && (
            <View style={styles.bottomTabIndicator} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}


