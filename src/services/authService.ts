import { api } from "./api";

export const registerService = async (
  username: string,
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  isStaff: boolean,
  role: string,
  phone: string,
  address: string
) => {
  const payload: Record<string, unknown> = {
    username,
    email,
    password,
    first_name: firstName,
    last_name: lastName,
    is_staff: isStaff,
    phone,
    address,
  };

  if (role.trim().length > 0) {
    payload.role = role;
  }

  const response = await api.post("register/", payload);
  return response.data;
};

export const loginService = async (
  username: string,
  password: string
) => {
  const response = await api.post("login/", {
    username,
    password,
  });
  return response.data;
};

export const refreshTokenService = async (refresh: string) => {
  const response = await api.post("token/refresh/", { refresh });
  return response.data;
};
