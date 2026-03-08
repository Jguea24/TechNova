import { Category } from "../model/Category";
import { api } from "./api";

type CategoryApiResponse = Category[] | { results?: Category[] };

export const getCategoriesService = async (): Promise<Category[]> => {
  const response = await api.get<CategoryApiResponse>("categories/");
  const payload = response.data;

  if (Array.isArray(payload)) {
    return payload;
  }

  return payload.results ?? [];
};
