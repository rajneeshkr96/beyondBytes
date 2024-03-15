import { toast } from "react-toastify";
import { AxiosError } from 'axios';

interface DataMessageErrorObject {
  message: string;
}

interface DataErrorsErrorObject {
  errors: { msg: string }[];
}

export const errorToastHandler = (error: AxiosError | any) => {
  const message =
    (error.response && error.response.data as DataMessageErrorObject)?.message ||
    (error.response && error.response.data as DataErrorsErrorObject)?.errors ||
    error.message;

  if (typeof message === 'string') {
    toast.error(message);
  } else {
    (message as { msg: string }[]).forEach((el) => {
      toast.error(el.msg);
    });
  }
};
