import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

// icons
import { TiUser } from "react-icons/ti";
import { IoMail } from "react-icons/io5";
import { HiLockClosed } from "react-icons/hi";
import { BsFileLockFill } from "react-icons/bs";
import { HiMiniEye, HiMiniEyeSlash } from "react-icons/hi2";

import { UserData } from "../../../types";

// react toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterForm = () => {
  const navigate = useNavigate();

  // state for show/hide password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  //  state for form data
  const [formData, setFormData] = useState<UserData>();

  const handleChange = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    switch (target.name) {
      case "fullName":
        setFormData({ ...formData, fullName: value });
        break;
      case "email":
        setFormData({ ...formData, email: value });
        break;
      case "password":
        setFormData({ ...formData, password: value });
        break;
      case "confirmPassword":
        setFormData({ ...formData, confirmPassword: value });
        break;
    }
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // ----------- form validations ---------------
    // check if all the fields are filled
    if (
      !formData?.fullName ||
      !formData?.email ||
      !formData?.password ||
      !formData?.confirmPassword
    ) {
      toast.error("All fields are required");
      return;
    }

    // check if email is valid
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(formData?.email as string)) {
      toast.error("Invalid email");
      return;
    }

    // check if password is at least 8 characters, contains a number, a special character and a capital letter
    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(formData?.password as string)) {
      toast.error(
        "Password must be at least 8 characters, contains a number, a special character and a capital letter"
      );
      return;
    }

    // check if password and confirm password match
    if (formData?.password !== formData?.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const data = {
      name: formData?.fullName,
      email: formData?.email,
      password: formData?.password,
    };

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const resData = await res.json();
      if (res.status === 201) {
        toast.success(resData.message);
        navigate("/login");
      } else toast.error(resData.message);
    } catch (error: unknown) {
      throw new Error(error as string);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xs w-full flex flex-col gap-5"
    >
      <div className="shadow flex gap-2 p-3 rounded">
        <TiUser className="text-3xl text-gray-400" />
        <input
          type="text"
          placeholder="Full Name"
          className="outline-none flex-1"
          name="fullName"
          onChange={handleChange}
        />
      </div>

      <div className="shadow flex gap-2 p-3 rounded">
        <IoMail className="text-3xl text-gray-400" />
        <input
          type="email"
          placeholder="Email"
          className="outline-none flex-1"
          name="email"
          onChange={handleChange}
        />
      </div>

      <div className="shadow flex gap-2 p-3 rounded">
        <HiLockClosed className="text-3xl text-gray-400" />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="outline-none flex-1"
          name="password"
          onChange={handleChange}
        />
        <button type="button" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? (
            <HiMiniEyeSlash className="text-2xl text-gray-400" />
          ) : (
            <HiMiniEye className="text-2xl text-gray-400" />
          )}
        </button>
      </div>

      <div className="shadow flex gap-2 p-3 rounded">
        <BsFileLockFill className="text-3xl text-gray-400" />
        <input
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm Password"
          className="outline-none flex-1"
          name="confirmPassword"
          onChange={handleChange}
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          {showConfirmPassword ? (
            <HiMiniEyeSlash className="text-2xl text-gray-400" />
          ) : (
            <HiMiniEye className="text-2xl text-gray-400" />
          )}
        </button>
      </div>

      <button className="bg-blue-500 text-white rounded mt-5 py-3">
        Register
      </button>

      <ToastContainer />
    </form>
  );
};

export default RegisterForm;
