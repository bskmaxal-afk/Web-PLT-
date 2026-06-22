import { useState, useEffect, useCallback } from "react";
import { CheckCircle, XCircle, AlertTriangle, X, Info } from "lucide-react";

/**
 * Toast notification system.
 * Usage:
 *   const { toasts, addToast, removeToast } = useToast();
 *   addToast("Berhasil!", "success");
 */

const ICONS = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const STYLES = {
  success: {
    bg: "bg-emerald-50 border-emerald-200",
    icon: "text-emerald-500",
    text: "text-emerald-800",
    progress: "bg-emerald-500",
  },
  error: {
    bg: "bg-red-50 border-red-200",
    icon: "text-red-500",
    text: "text-red-800",
    progress: "bg-red-500",
  },
  warning: {
    bg: "bg-amber-50 border-amber-200",
    icon: "text-amber-500",
    text: "text-amber-800",
    progress: "bg-amber-500",
  },
  info: {
    bg: "bg-blue-50 border-blue-200",
    icon: "text-blue-500",
    text: "text-blue-800",
    progress: "bg-blue-500",
  },
};

function ToastItem({ toast, onRemove }) {
  const [isExiting, setIsExiting] = useState(false);
  const style = STYLES[toast.type] || STYLES.info;
  const Icon = ICONS[toast.type] || ICONS.info;

  const handleRemove = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => onRemove(toast.id), 300);
  }, [toast.id, onRemove]);

  useEffect(() => {
    const timer = setTimeout(handleRemove, toast.duration || 4000);
    return () => clearTimeout(timer);
  }, [handleRemove, toast.duration]);

  return (
    <div
      className={`toast-item ${style.bg} ${
        isExiting ? "toast-exit" : "toast-enter"
      }`}
    >
      <div className="flex items-start gap-3">
        <Icon size={18} className={`${style.icon} shrink-0 mt-0.5`} />
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-semibold ${style.text}`}>
            {toast.message}
          </p>
          {toast.description && (
            <p className={`text-xs mt-0.5 ${style.text} opacity-75`}>
              {toast.description}
            </p>
          )}
        </div>
        <button
          onClick={handleRemove}
          className="toast-close-btn"
        >
          <X size={14} />
        </button>
      </div>
      {/* Progress bar */}
      <div className="toast-progress-track">
        <div
          className={`toast-progress-bar ${style.progress}`}
          style={{ animationDuration: `${toast.duration || 4000}ms` }}
        />
      </div>
    </div>
  );
}

export function ToastContainer({ toasts, removeToast }) {
  if (!toasts.length) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  );
}

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "info", options = {}) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [
      ...prev,
      { id, message, type, ...options },
    ]);
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, addToast, removeToast };
}
