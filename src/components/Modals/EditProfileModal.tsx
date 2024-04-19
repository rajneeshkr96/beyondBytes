import React, { FC } from "react";
import SubmitButton from "../layoutComponents/Button/SubmitButton";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

interface EditProfileModalProps {
  userName?: string;
  bio?: string;
  userId?: string;
}
interface userName {
  userName: string;
}
interface bio {
  bio: string;
}

const EditProfileModal: FC<EditProfileModalProps> = ({ userName, bio,userId }) => {
  const usernameSchema = yup.object().shape({
    userName: yup
      .string()
      .required("Username is required")
      .min(3, "Username is too short")
      .max(20, "Username is too long"),
  });

  const bioSchema = yup.object().shape({
    bio: yup
      .string()
      .required("Bio is required")
      .min(10, "Bio is too short")
      .max(100, "Bio is too long"),
  });

  const {
    register: registerUserName,
    handleSubmit: handleSubmitUserName,
    formState: { errors: userNameErrors },
  } = useForm<userName>({ resolver: yupResolver(usernameSchema) });
  const {
    register: registerBio,
    handleSubmit: handleSubmitBio,
    formState: { errors: bioErrors },
  } = useForm<bio>({ resolver: yupResolver(bioSchema) });

  const submitUserName: SubmitHandler<EditProfileModalProps> = async (data) => {
    console.log(data);
    try {
      const res = await axios.post(`${process.env.BASE_URL}/api/user/update/${userId}`);
    console.log(res);
    if (res.data.success) {
      console.log("User name updated successfully");
    }
    } catch (error) {
      console.log(error);
      
    }
  };

  const submitBio: SubmitHandler<EditProfileModalProps> = async (data) => {
    console.log(data);
  };

  return (
    <div>
      <div className="flex flex-col gap-y-3">
        <form onSubmit={handleSubmitUserName(submitUserName)}>
          <div className="flex gap-y-4 gap-x-3">
            <input
              placeholder="Enter your Username"
              className="bg-gray-300 border rounded-sm p-2"
              type="text"
              {...registerUserName("userName")}
            />
            <SubmitButton
              className="bg-blue-400 w-16 rounded-md "
              value={"Submit"}
            />
          </div>
        </form>
        <p className="text-start">{userNameErrors.userName?.message}</p>

        <form onSubmit={handleSubmitBio(submitBio)}>
          <div className="flex flex-col items-end gap-4">
            <textarea
              placeholder="Enter your Bio"
              className="w-full bg-gray-300 border rounded-sm p-2"
              {...registerBio("bio")}
            />
            <SubmitButton
              className="bg-blue-400 w-20 p-2   rounded-md "
              value={"Submit"}
            />
          </div>
        </form>
        <p className="text-start">{bioErrors.bio?.message}</p>
      </div>
    </div>
  );
};

export default EditProfileModal;
