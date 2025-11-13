"use client";

import { useAuthStore } from "@/lib/store/authStore";
import { ReactNode, useEffect } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated
  );

  useEffect(() => {}, []);

  return children;
}

export default AuthProvider;
