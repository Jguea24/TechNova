import { useCallback, useState } from "react";
import {
  addToCartService,
  clearCartService,
  deleteCartItemService,
  getCartCountService,
  getCartService,
  CartItem,
  updateCartItemService,
} from "../services/cartService";
import { getToken } from "../shared/storage/authStorage";

export function useCartViewModel() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [cartTotalItems, setCartTotalItems] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [cartDistinctItems, setCartDistinctItems] = useState(0);
  const [cartLoading, setCartLoading] = useState(false);
  const [cartError, setCartError] = useState<string | null>(null);

  const getValidToken = useCallback(async () => {
    const token = await getToken();
    if (!token) {
      throw new Error("SESSION_INVALID");
    }
    return token;
  }, []);

  const loadCart = useCallback(async () => {
    try {
      setCartLoading(true);
      setCartError(null);

      const token = await getValidToken();
      const [cartData, countData] = await Promise.all([
        getCartService(token),
        getCartCountService(token),
      ]);

      setCartItems(cartData.items);
      setCartSubtotal(cartData.subtotal);
      setCartTotalItems(cartData.totalItems);
      setCartCount(countData.count);
      setCartDistinctItems(countData.distinct_items);
    } catch {
      setCartItems([]);
      setCartSubtotal(0);
      setCartTotalItems(0);
      setCartCount(0);
      setCartDistinctItems(0);
      setCartError("Error al cargar carrito");
    } finally {
      setCartLoading(false);
    }
  }, [getValidToken]);

  const addToCart = async (productId: number, quantity = 1) => {
    try {
      setLoading(true);
      setMessage(null);

      const token = await getValidToken();
      await addToCartService(token, productId, quantity);
      setMessage("Producto agregado al carrito");
      await loadCart();
    } catch {
      setMessage("Error al agregar al carrito");
    } finally {
      setLoading(false);
    }
  };

  const updateCartItemQuantity = async (
    cartItemId: number,
    quantity: number
  ) => {
    try {
      setLoading(true);
      setMessage(null);

      const token = await getValidToken();
      await updateCartItemService(token, cartItemId, quantity);
      setMessage(
        quantity > 0 ? "Cantidad actualizada" : "Producto eliminado del carrito"
      );
      await loadCart();
    } catch {
      setMessage("Error al actualizar carrito");
    } finally {
      setLoading(false);
    }
  };

  const removeCartItem = async (cartItemId: number) => {
    try {
      setLoading(true);
      setMessage(null);

      const token = await getValidToken();
      await deleteCartItemService(token, cartItemId);
      setMessage("Producto eliminado del carrito");
      await loadCart();
    } catch {
      setMessage("Error al eliminar producto");
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setLoading(true);
      setMessage(null);

      const token = await getValidToken();
      await clearCartService(token);
      setMessage("Carrito vaciado");
      await loadCart();
    } catch {
      setMessage("Error al vaciar carrito");
    } finally {
      setLoading(false);
    }
  };

  return {
    addToCart,
    updateCartItemQuantity,
    removeCartItem,
    clearCart,
    loadCart,
    loading,
    message,
    cartItems,
    cartSubtotal,
    cartTotalItems,
    cartCount,
    cartDistinctItems,
    cartLoading,
    cartError,
  };
}
