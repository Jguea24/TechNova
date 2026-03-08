import { api } from "./api";

export type Banner = {
  id: number;
  title?: string | null;
  image?: string | null;
  image_url?: string | null;
  order?: number | null;
};

type BannerApiResponse = Banner[] | { results?: Banner[] };

const toNumber = (value: unknown, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const getBannersService = async () => {
  const response = await api.get<BannerApiResponse>("banners/");
  const payload = response.data;
  const collection = Array.isArray(payload) ? payload : payload?.results ?? [];

  return collection
    .map((item, index) => ({
      id: toNumber(item.id, index + 1),
      title: item.title ?? "",
      image: item.image ?? null,
      image_url: item.image_url ?? null,
      order: toNumber(item.order, index + 1),
    }))
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
};

