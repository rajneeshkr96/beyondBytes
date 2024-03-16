import { toast } from "react-toastify";

export interface ErrorResponse {
  response?: {
    data?: {
      message?: string;
      errors?: { msg: string }[];
    };
  };
  message?: string;
}

export const errorToastHandler = (error: ErrorResponse): void => {
  const message =
    (error.response &&
      error.response.data &&
      error.response.data.message) ||
    (error.response && error.response.data && error.response.data.errors) ||
    error.message;

  if (typeof message === "string") {
    toast.error(message);
  } else if (Array.isArray(message)) {
    message.forEach((el) => {
      toast.error(el.msg);
    });
  }
};
