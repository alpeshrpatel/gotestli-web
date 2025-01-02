import { API } from "@/utils/AxiosInstance";
import { showToast } from "@/utils/toastService";
import { toast } from "react-toastify";

const token = localStorage.getItem("token");
const HandleDownload = async (type, fileName) => {
  try {
    if (token) {
      const response = await API.get(
        `/api/question/files/download/?type=${type}&fileName=${fileName}`,
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${token}`,
          },
         
        },
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  } catch (error) {
    if (error.status == 403) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      // showToast("error","Invaild token!");
      window.location.reload();
      return;
    }
    console.error("Error downloading the file:", error);
    showToast("error","Failed to download file.");
  }
};

export default HandleDownload;
