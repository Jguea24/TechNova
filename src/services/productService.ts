import { api } from "./api";
import { Product } from "../model/Product";

type ProductApiParams = {
  token?: string | null;
  categoryId?: number;
};

type ProductApiResponse = Product[] | { results?: Product[] };

export const getProductsService = async ({
  token,
  categoryId,
}: ProductApiParams = {}) => {
  const response = await api.get<ProductApiResponse>("products/", {
    params:
      typeof categoryId === "number"
        ? { category_id: categoryId }
        : undefined,
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : undefined,
  });

  const payload = response.data;
  if (Array.isArray(payload)) {
    return payload;
  }

  return payload.results ?? [];
};
