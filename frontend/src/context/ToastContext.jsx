import React, { createContext, useState, useContext, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    
    // Auto-dismiss after 4 seconds
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {/* Toast floating container */}
      <div className="fixed top-6 right-6 z-9999 space-y-3 pointer-events-none max-w-sm w-full">
        {toasts.map((toast) => {
          let bgColor = 'bg-slate-900/90 border-slate-800 text-slate-200';
          let icon = <Info className="h-5 w-5 text-blue-400 flex-shrink-0" />;
          
          if (toast.type === 'success') {
            bgColor = 'bg-green-950/90 border-green-500/30 text-green-200';
            icon = <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0" />;
          } else if (toast.type === 'error') {
            bgColor = 'bg-red-950/90 border-red-500/30 text-red-200';
            icon = <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 animate-bounce" />;
          }

          return (
            <div
              key={toast.id}
              className={`p-4 rounded-2xl border backdrop-blur-md shadow-2xl flex justify-between items-start gap-3 pointer-events-auto transition-all duration-300 transform translate-x-0 animate-slide-in ${bgColor}`}
            >
              <div className="flex gap-3">
                {icon}
                <p className="text-xs font-semibold leading-relaxed">{toast.message}</p>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-500 hover:text-slate-300 p-0.5 rounded-full hover:bg-white/5 transition flex-shrink-0"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
