import React, { createContext, useState, useContext } from "react";
import Snackbar from "@material-ui/core/Snackbar";

const ToastContext = createContext();
export default ToastContext;

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (newToast) => setToasts([...toasts, newToast]);

  const clearToasts = () => setToasts([]);

  const consumeToast = () => {
    const [, ...tsts] = toasts;
    setToasts(tsts);
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, clearToasts }}>
      {children}
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        autoHideDuration={6000}
        open={toasts && toasts.length > 0}
        message={toasts[0]}
        onClose={consumeToast}
      />
    </ToastContext.Provider>
  );
};
