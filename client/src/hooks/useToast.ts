"use client";

import { useState, useCallback } from "react";

type ToastType = "success" | "error" | "warning" | "info";

interface ToastState {
  message: string;
  type: ToastType;
  duration?: number;
}

export function useToast() {
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = useCallback(
    (message: string, type: ToastType = "info", duration: number = 3000) => {
      setToast({ message, type, duration });
    },
    []
  );

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  return {
    toast,
    showToast,
    hideToast,
  };
}
