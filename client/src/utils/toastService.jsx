import { toast } from "react-toastify";

const toastIds = {
  success: null,
  error: null,
  warning: null,
};

export const showToast = (type,message) => {
  
  if (toastIds[type]) {
    toast.dismiss(toastIds[type]);
  }

  
  const toastOptions = {
    position: "bottom-center",
    theme: "dark",
    autoClose: type === "success" ? 2000 : 3000, 
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
  };

  
  toastIds[type] = toast[type](message, toastOptions);
};
