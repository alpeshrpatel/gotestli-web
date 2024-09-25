import { API } from "@/utils/AxiosInstance";
import { toast } from "react-toastify";

const HandleDownload = async (type, fileName) => {
  try {
    const response = await API.get(
      `/api/question/files/download/?type=${type}&fileName=${fileName}`,
      {
        responseType: "blob",
      }
    );

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("Error downloading the file:", error);
    toast.error("Failed to download file.");
  }
};

export default HandleDownload;

// export default async function HandleDownload(type,fileName) {
//     try {
//       const response = await API.get(
//         `/api/question/files/download/?type=${type}&fileName=${fileName}`,
//         {
//           responseType: "blob",
//         }
//       );

//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", fileName);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     } catch (error) {
//       console.error("Error downloading the file:", error);
//       toast.error("Failed to download file.");
//     }
//   }
