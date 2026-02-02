"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type AlertModalContextValue = {
  showAlert: (message: string) => void;
};

const AlertModalContext = createContext<AlertModalContextValue | null>(null);

export function AlertModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [message, setMessage] = useState<string | null>(null);

  const showAlert = useCallback((nextMessage: string) => {
    setMessage(nextMessage);
  }, []);

  const close = useCallback(() => {
    setMessage(null);
  }, []);

  const value = useMemo(() => ({ showAlert }), [showAlert]);

  return (
    <AlertModalContext.Provider value={value}>
      {children}

      {message ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Alert"
          onClick={close}
        >
          <div
            className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl ring-1 ring-black/10 dark:bg-gray-900 dark:ring-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-base font-semibold text-gray-900 dark:text-gray-100">
              Notice
            </div>
            <div className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-gray-700 dark:text-gray-200">
              {message}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={close}
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-blue-700 dark:bg-indigo-600 dark:hover:bg-indigo-500"
                autoFocus
              >
                OK
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </AlertModalContext.Provider>
  );
}

export function useAlertModal(): AlertModalContextValue {
  const ctx = useContext(AlertModalContext);
  if (!ctx) {
    throw new Error("useAlertModal must be used within AlertModalProvider");
  }
  return ctx;
}
