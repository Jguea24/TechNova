import { useCallback, useState } from "react";
import {
  getMeService,
  updateMeService,
  updateUserService,
  UserProfile,
  UserUpdatePayload,
} from "../services/userService";

export function useUserViewModel() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);

  const extractError = useCallback((err: any, fallback: string) => {
    if (err?.message && err.message.includes("Network Error")) {
      return "No se pudo conectar al servidor. Revisa IP/puerto.";
    }
    const firstValue = Object.values(err?.response?.data || {})[0];
    const detail =
      err?.response?.data?.detail ||
      (firstValue &&
        (Array.isArray(firstValue)
          ? (firstValue as any[])[0]
          : firstValue));
    return detail || fallback;
  }, []);

  const getMe = useCallback(async (): Promise<UserProfile | null> => {
    try {
      setProfileLoading(true);
      setProfileError(null);
      const data = await getMeService();
      return data;
    } catch (err: any) {
      setProfileError(String(extractError(err, "Error al cargar perfil")));
      return null;
    } finally {
      setProfileLoading(false);
    }
  }, [extractError]);

  const updateMe = useCallback(async (payload: UserUpdatePayload) => {
    try {
      setLoading(true);
      setError(null);
      const data = await updateMeService(payload);
      return data;
    } catch (err: any) {
      setError(String(extractError(err, "Error al actualizar perfil")));
      return null;
    } finally {
      setLoading(false);
    }
  }, [extractError]);

  const updateUser = useCallback(async (
    id: number | string,
    payload: UserUpdatePayload
  ) => {
    try {
      setLoading(true);
      setError(null);
      const data = await updateUserService(id, payload);
      return data;
    } catch (err: any) {
      setError(String(extractError(err, "Error al actualizar usuario")));
      return null;
    } finally {
      setLoading(false);
    }
  }, [extractError]);

  return {
    getMe,
    updateMe,
    updateUser,
    loading,
    error,
    profileLoading,
    profileError,
  };
}
