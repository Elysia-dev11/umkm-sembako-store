'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose?: () => void;
}

const toastConfig = {
  success: { icon: CheckCircle, bgColor: 'bg-green-500', textColor: 'text-white' },
  error: { icon: XCircle, bgColor: 'bg-red-500', textColor: 'text-white' },
  warning: { icon: AlertCircle, bgColor: 'bg-yellow-500', textColor: 'text-white' },
  info: { icon: Info, bgColor: 'bg-blue-500', textColor: 'text-white' },
};

export function Toast({ message, type = 'info', duration = 3000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);
  const config = toastConfig[type];
  const Icon = config.icon;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg transition-all duration-300 ${
        config.bgColor
      } ${config.textColor} ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
    >
      <Icon size={20} />
      <span className="font-medium">{message}</span>
      <button
        onClick={() => {
          setIsVisible(false);
          if (onClose) setTimeout(onClose, 300);
        }}
        className="ml-2 hover:opacity-75"
      >
        <X size={18} />
      </button>
    </div>
  );
}

// Toast Container for managing multiple toasts
interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

export function ToastContainer({ toasts, removeToast }: { toasts: ToastItem[]; removeToast: (id: string) => void }) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}
