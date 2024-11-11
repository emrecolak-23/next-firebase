/* eslint-disable @typescript-eslint/no-explicit-any */
import toast from "react-hot-toast";

export const handleError = (error: any) => {
  let message = "";

  if (Array.isArray(error?.response?.data?.data?.errors)) {
    if (
      Object.keys(error?.response?.data?.data?.errors[0]).indexOf("message") >
      -1
    )
      message = error?.response?.data?.data?.errors
        ?.map((error: any) => error.message)
        .join(" ");
    else message = error?.response?.data?.data?.message.join(" ");
  } else {
    message =
      typeof error === "string"
        ? error
        : error.response?.data?.message ||
          error?.message ||
          "An unexpected error occurred";
  }

  toast.error(message, { duration: 5000, id: message });
};
