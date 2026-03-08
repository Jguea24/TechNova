import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  ActivityIndicator,
  StatusBar,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../navigation/AppNavigator";
import { productDetailStyles as styles } from "../styles/productDetail.styles";
import { api } from "../../services/api";
import { useCartViewModel } from "../../viewmodel/CartViewModel";
import { useProductViewModel } from "../../viewmodel/ProductViewModel";

type Props = NativeStackScreenProps<RootStackParamList, "ProductDetail">;

export function ProductDetailScreen({ route, navigation }: Props) {
  const { product } = route.params;
  const [favorites, setFavorites] = useState<Record<number, boolean>>({});
  const { addToCart, loading, message } = useCartViewModel();
  const {
    products: apiProducts,
    loadProducts,
    loading: loadingProducts,
  } = useProductViewModel();

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

  const imageUri = resolveApiImageUri(product.image_url ?? product.image);

  const categoryName = (() => {
    if (product.category_name) {
      return product.category_name;
    }

    if (
      product.category &&
      typeof product.category === "object" &&
      "name" in product.category
    ) {
      return product.category.name;
    }

    return "Sin categoria";
  })();

  const formattedPrice = `$${Number(product.price).toFixed(2)}`;
  const displayPrice = `$${Number(product.price).toFixed(0)}/kg`;
  const hasStock = product.stock > 0;
  const canAddToCart = hasStock && !loading;
  const isErrorMessage = message?.toLowerCase().includes("error");
  const categoryLine = categoryName === "Sin categoria"
    ? "Producto fresco"
    : categoryName;
  const isMainFavorite = Boolean(favorites[product.id]);

  const getProductRating = (productId: number) => 3 + (productId % 3);

  const getRatingStars = (productId: number) => {
    const filled = getProductRating(productId);
    return `${"\u2605".repeat(filled)}${"\u2606".repeat(5 - filled)}`;
  };

  useEffect(() => {
    loadProducts(0);
  }, [loadProducts]);

  const moreProducts = apiProducts.filter((item) => item.id !== product.id);

  const handleBuyNow = async () => {
    if (!hasStock) {
      Alert.alert("Sin stock", "Este producto no tiene stock disponible.");
      return;
    }

    await addToCart(product.id);
    Alert.alert("Compra rapida", "Producto agregado, continua al pago.");
  };

  const addSuggestedProductToCart = async (productId: number) => {
    await addToCart(productId);
  };

  const handleToggleFavorite = (productId: number) => {
    setFavorites((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
          accessibilityLabel="Volver"
        >
          <Text style={styles.backText}>{"\u2190"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalle del producto</Text>
      </View>
      <View style={styles.headerAccent} />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.productCard}>
          <View style={styles.imageWrap}>
            <TouchableOpacity
              style={styles.imageFavoriteButton}
              activeOpacity={0.8}
              onPress={() => handleToggleFavorite(product.id)}
            >
              <Text
                style={[
                  styles.imageFavoriteText,
                  isMainFavorite && styles.imageFavoriteTextActive,
                ]}
              >
                {isMainFavorite ? "\u2605" : "\u2606"}
              </Text>
            </TouchableOpacity>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.productImage} />
            ) : (
              <Image
                source={require("../../shared/assets/product.png")}
                style={styles.productImage}
              />
            )}
          </View>

          <View style={styles.titleRow}>
            <View style={styles.nameBlock}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productSubtitle}>{categoryLine}</Text>
              <Text style={styles.productRating}>
                {getRatingStars(product.id)}
              </Text>
            </View>
            <Text style={styles.productPrice}>{displayPrice}</Text>
          </View>

          <Text style={styles.sectionTitle}>Descripcion</Text>
          <Text style={styles.descriptionText}>
            {product.description?.trim() ||
              "Este producto no tiene descripcion disponible."}
          </Text>

          <View style={styles.inlineMetaRow}>
            <Text style={styles.inlineMetaLabel}>Stock: {product.stock}</Text>
            <Text style={styles.inlineMetaLabel}>{formattedPrice}</Text>
          </View>
        </View>

        <View style={styles.moreCard}>
          <Text style={styles.moreTitle}>Mas productos</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.moreRow}
          >
            {loadingProducts && (
              <View style={styles.moreLoadingBox}>
                <ActivityIndicator size="small" color="#0284c7" />
              </View>
            )}

            {!loadingProducts && moreProducts.length === 0 && (
              <Text style={styles.moreEmptyText}>
                No hay mas productos disponibles.
              </Text>
            )}

            {moreProducts.map((item) => {
              const itemImageUri = resolveApiImageUri(item.image_url ?? item.image);
              const isFavorite = Boolean(favorites[item.id]);
              return (
                <View key={item.id} style={styles.moreItem}>
                  <TouchableOpacity
                    style={styles.moreItemFavoriteButton}
                    activeOpacity={0.8}
                    onPress={() => handleToggleFavorite(item.id)}
                  >
                    <Text
                      style={[
                        styles.moreItemFavoriteText,
                        isFavorite && styles.moreItemFavoriteTextActive,
                      ]}
                    >
                      {isFavorite ? "\u2605" : "\u2606"}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.moreItemPressArea}
                    activeOpacity={0.88}
                    onPress={() =>
                      navigation.push("ProductDetail", { product: item })
                    }
                  >
                    {itemImageUri ? (
                      <Image
                        source={{ uri: itemImageUri }}
                        style={styles.moreItemImage}
                      />
                    ) : (
                      <Image
                        source={require("../../shared/assets/product.png")}
                        style={styles.moreItemImage}
                      />
                    )}
                    <Text style={styles.moreItemText} numberOfLines={1}>
                      {item.name}
                    </Text>
                    <Text style={styles.moreItemRating}>
                      {getRatingStars(item.id)}
                    </Text>
                  </TouchableOpacity>

                  <View style={styles.moreItemFooter}>
                    <Text style={styles.moreItemPrice}>
                      ${Number(item.price).toFixed(0)}
                    </Text>
                    <TouchableOpacity
                      style={styles.moreItemCartButton}
                      activeOpacity={0.85}
                      onPress={() => addSuggestedProductToCart(item.id)}
                    >
                      <Text style={styles.moreItemCartIcon}>{"\ud83d\uded2"}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[
              styles.addButton,
              !canAddToCart && styles.addButtonDisabled,
            ]}
            onPress={() => addToCart(product.id)}
            activeOpacity={0.88}
            disabled={!canAddToCart}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#1f2937" />
            ) : (
              <Text style={styles.addButtonText}>
                {hasStock ? "Agregar al carrito" : "Sin stock"}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.buyNowButton,
              !canAddToCart && styles.buyNowDisabled,
            ]}
            onPress={handleBuyNow}
            activeOpacity={0.9}
            disabled={!canAddToCart}
          >
            <Text style={styles.buyNowText}>Comprar ahora</Text>
          </TouchableOpacity>
        </View>

        {message && (
          <View
            style={[
              styles.feedbackBox,
              isErrorMessage && styles.feedbackBoxError,
            ]}
          >
            <Text
              style={[
                styles.feedbackText,
                isErrorMessage && styles.feedbackError,
              ]}
            >
              {message}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
