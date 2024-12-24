import { toast } from "react-toastify";

const toastIds = {
  success: null,
  error: null,
  warning: null,
};

export const showToast = (type,message) => {
  // Dismiss the existing toast of the same type
  if (toastIds[type]) {
    toast.dismiss(toastIds[type]);
  }

  // Define options
  const toastOptions = {
    position: "bottom-center",
    theme: "dark",
    autoClose: type === "success" ? 3000 : false, // Auto close for success only
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  };

  // Create a new toast and store its ID
  toastIds[type] = toast[type](message, toastOptions);
};
