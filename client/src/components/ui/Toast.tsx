"use client";

import { useEffect, useState, useRef } from "react";
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";

type ToastType = "success" | "error" | "warning" | "info";

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: () => void;
}

const toastConfig: Record<ToastType, { bg: string; icon: React.ElementType }> = {
  success: { bg: "var(--color-success)", icon: CheckCircle },
  error: { bg: "var(--color-error)", icon: AlertCircle },
  warning: { bg: "var(--color-warning)", icon: AlertTriangle },
  info: { bg: "var(--color-info)", icon: Info },
};

export default function Toast({
  message,
  type = "info",
  duration = 4000,
  onClose,
}: ToastProps) {
  const [isExiting, setIsExiting] = useState(false);
  const onCloseRef = useRef(onClose);
 
  onCloseRef.current = onClose;

  const config = toastConfig[type];
  const Icon = config.icon;

  useEffect(() => {

    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, duration - 300);


    const closeTimer = setTimeout(() => {
      onCloseRef.current();
    }, duration);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(closeTimer);
    };
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => onCloseRef.current(), 300);
  };

  return (
    <div
      className={`toast-container ${isExiting ? "toast-exit" : "toast-enter"}`}
      style={{ backgroundColor: config.bg }}
    >
      <div className="toast-icon-wrapper">
        <Icon size={20} />
      </div>
      <span className="toast-message">{message}</span>
      <button
        className="toast-close-btn"
        onClick={handleClose}
        aria-label="Close notification"
      >
        <X size={16} />
      </button>
    </div>
  );
}
