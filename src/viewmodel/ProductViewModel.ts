import { useCallback, useState } from "react";
import { getProductsService } from "../services/productService";
import { getToken } from "../shared/storage/authStorage";
import { Product } from "../model/Product";

export function useProductViewModel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = useCallback(async (categoryId = 0) => {
    try {
      setLoading(true);
      setError(null);

      const token = await getToken();
      const data = await getProductsService({ token, categoryId });
      setProducts(data);
    } catch {
      setError("Error al cargar productos");
    } finally {
      setLoading(false);
    }
  }, []);

  return { products, loading, error, loadProducts };
}
