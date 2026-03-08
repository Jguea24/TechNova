import { api } from "./api";

export type CartItem = {
  id: number;
  productId: number;
  name: string;
  image: string | null;
  price: number;
  quantity: number;
  subtotal: number;
  stock?: number;
};

export type CartSummary = {
  items: CartItem[];
  subtotal: number;
  totalItems: number;
};

export type CartCount = {
  count: number;
  distinct_items: number;
};

const toNumber = (value: unknown) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const toItem = (raw: any, index: number): CartItem => {
  const product =
    raw?.product && typeof raw.product === "object" ? raw.product : {};

  const productId = toNumber(
    raw?.product_id ?? raw?.productId ?? product?.id
  );
  const quantity = Math.max(1, toNumber(raw?.quantity ?? raw?.qty ?? 1));
  const unitPrice = toNumber(
    raw?.unit_price ?? raw?.price ?? raw?.product_price ?? product?.price
  );
  const explicitSubtotal = toNumber(
    raw?.subtotal ?? raw?.line_total ?? raw?.total
  );
  const subtotal =
    explicitSubtotal > 0 ? explicitSubtotal : unitPrice * quantity;
  const id = toNumber(raw?.id ?? productId ?? index + 1);

  return {
    id,
    productId,
    name: String(
      raw?.product_name ?? raw?.name ?? product?.name ?? `Producto ${index + 1}`
    ),
    image:
      raw?.image_url ??
      raw?.image ??
      product?.image_url ??
      product?.image ??
      null,
    price: unitPrice,
    quantity,
    subtotal,
    stock: toNumber(raw?.stock ?? product?.stock),
  };
};

export const getCartService = async (token: string) => {
  const response = await api.get("cart/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const payload: any = response.data;
  const collection =
    (Array.isArray(payload) && payload) ||
    (Array.isArray(payload?.items) && payload.items) ||
    (Array.isArray(payload?.results) && payload.results) ||
    (Array.isArray(payload?.cart_items) && payload.cart_items) ||
    (Array.isArray(payload?.data) && payload.data) ||
    [];

  const items = collection.map(toItem);

  const payloadSubtotal = toNumber(
    payload?.subtotal ?? payload?.total ?? payload?.amount
  );
  const subtotal =
    payloadSubtotal > 0
      ? payloadSubtotal
      : items.reduce((acc, item) => acc + item.subtotal, 0);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return {
    items,
    subtotal,
    totalItems,
  } as CartSummary;
};

export const addToCartService = async (
  token: string,
  productId: number,
  quantity = 1
) => {
  const response = await api.post(
    "cart/",
    { product_id: productId, quantity },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const updateCartItemService = async (
  token: string,
  cartItemId: number,
  quantity: number
) => {
  const response = await api.patch(
    "cart/",
    { cart_item_id: cartItemId, quantity },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const deleteCartItemService = async (
  token: string,
  cartItemId: number
) => {
  const response = await api.delete("cart/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { cart_item_id: cartItemId },
  });

  return response.data;
};

export const clearCartService = async (token: string) => {
  const response = await api.delete("cart/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getCartCountService = async (token: string) => {
  const response = await api.get<CartCount>("cart/count/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const payload = response.data ?? { count: 0, distinct_items: 0 };
  return {
    count: toNumber(payload.count),
    distinct_items: toNumber(payload.distinct_items),
  } as CartCount;
};
