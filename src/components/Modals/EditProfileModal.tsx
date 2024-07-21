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
      .max(200, "Bio is too long"),
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

    try {
      const res = await axios.put(`/api/user/update/${userId}`, data);
    
    if (res.data.success) {
      console.log("User name updated successfully");
      
    }
    } catch (error) {
      return "error"
    }
  };

  const submitBio: SubmitHandler<EditProfileModalProps> = async (data) => {
    try {
      const res = await axios.put(`/api/user/update/${userId}`, data);
    
    if (res.data.success) {
      console.log("Bio updated successfully");
    }
    } catch (error) {
     
      
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-y-3">
        <form onSubmit={handleSubmitUserName(submitUserName)}>
          <div className="flex gap-y-4 gap-x-3">
            <input
              placeholder="Enter your Username"
              className="w-full px-8 py-2 rounded-md font-medium  border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white max-md:w-full"
              type="text"
              {...registerUserName("userName")}
            />
            <SubmitButton
              className="bg-[#333] text-white px-4 py-2 rounded-lg"
            >username</SubmitButton>
    
          </div>
        </form>
        <p className="text-start">{userNameErrors.userName?.message}</p>

        <form onSubmit={handleSubmitBio(submitBio)}>
          <div className="flex flex-col items-end gap-4">
            <textarea
              placeholder="Enter your Bio"
              className="w-full px-8 py-2 rounded-md font-medium  border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white max-md:w-full"
              {...registerBio("bio")}
            />
            <SubmitButton
              className="bg-[#333] text-white px-4 py-2 rounded-lg w-full"
            >edit bio</SubmitButton>
          </div>
        </form>
        <p className="text-start">{bioErrors.bio?.message}</p>
      </div>
    </div>
  );
};

export default EditProfileModal;
