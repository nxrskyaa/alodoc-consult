"use client";

import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react";
import { CheckCircle2, Info, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

type Toast = {
  id: number;
  message: string;
  tone?: "success" | "info" | "error";
};

const ToastContext = createContext<{ notify: (toast: Omit<Toast, "id">) => void } | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const notify = useCallback((toast: Omit<Toast, "id">) => {
    const id = Date.now();
    setToasts((current) => [...current, { ...toast, id }]);
    window.setTimeout(() => setToasts((current) => current.filter((item) => item.id !== id)), 4200);
  }, []);

  const value = useMemo(() => ({ notify }), [notify]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed right-4 top-4 z-50 flex w-[min(92vw,360px)] flex-col gap-3">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              className="flex items-start gap-3 rounded-2xl border border-cocoa/10 bg-parchment p-4 text-sm text-cocoa shadow-soft"
            >
              {toast.tone === "success" ? <CheckCircle2 className="mt-0.5 h-5 w-5 text-oliveDeep" /> : <Info className="mt-0.5 h-5 w-5 text-orange" />}
              <p className="flex-1 leading-5">{toast.message}</p>
              <button
                className="rounded-full p-1 text-cocoaSoft transition hover:bg-cocoa/5"
                onClick={() => setToasts((current) => current.filter((item) => item.id !== toast.id))}
                aria-label="Dismiss notification"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used inside ToastProvider");
  return context;
}
