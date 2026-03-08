import { api } from "./api";

export type UserProfile = Partial<{
  id: number | string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  address: string;
  role: string;
  is_staff: boolean;
}>;

export type UserUpdatePayload = Partial<{
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  address: string;
  role: string;
  is_staff: boolean;
}>;

export const getMeService = async () => {
  const response = await api.get<UserProfile>("me/");
  return response.data;
};

export const updateMeService = async (payload: UserUpdatePayload) => {
  const response = await api.patch("me/", payload);
  return response.data;
};

export const updateUserService = async (
  id: number | string,
  payload: UserUpdatePayload
) => {
  const response = await api.patch(`users/${id}/`, payload);
  return response.data;
};
