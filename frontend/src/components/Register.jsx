import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router";
import {
  formCard,
  formGroup,
  labelClass,
  inputClass,
  submitBtn,
} from "../styles/common";
import { API_ENDPOINTS } from "../config/api";
import { toast } from "react-hot-toast";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);

  const navigate = useNavigate();

  const onRegister = async (newUser) => {
    setLoading(true);
    setError(null);

    try {
      const { profileImageUrl, ...userObj } = newUser;
      let response = await axios.post(API_ENDPOINTS.REGISTER, userObj, {
        withCredentials: true,
      });

      if (response.status === 201) {
        toast.success("Registration successful! Please login.");
        navigate("/login");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Registration failed. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
      console.error("Error during registration: ", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        setError("Only JPG or PNG allowed");
        toast.error("Only JPG or PNG allowed");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setError("File size must be less than 2MB");
        toast.error("File size must be less than 2MB");
        return;
      }
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      setError(null);
    }
  };

  if (loading) {
    return <div className="text-center p-4">Registering user...</div>;
  }

  return (
    <div className="mt-15 p-4 w-96 mx-auto text-center">
      <h1 className="text-2xl mb-2">User Registration Form</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
          {error}
        </div>
      )}

      <div className="p-4">
        <form className={formCard} onSubmit={handleSubmit(onRegister)}>
          <div className={formGroup}>
            <label className={labelClass}>Role</label>
            <div className="flex gap-4 justify-center mb-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="author"
                  {...register("role", { required: "Role is required" })}
                />
                Author
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="user"
                  {...register("role", { required: "Role is required" })}
                />
                User
              </label>
            </div>
            {errors.role && (
              <p className="text-red-500 text-sm">{errors.role.message}</p>
            )}
          </div>

          <div className={formGroup}>
            <label className={labelClass}>First Name</label>
            <input
              type="text"
              {...register("firstName", {
                required: "First Name is required",
                minLength: { value: 2, message: "Min Length is 2" },
                maxLength: { value: 50, message: "Max Length is 50" },
              })}
              placeholder="Enter first name"
              className={inputClass}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
          </div>

          <div className={formGroup}>
            <label className={labelClass}>Last Name</label>
            <input
              type="text"
              {...register("lastName", {
                required: "Last Name is required",
                minLength: { value: 2, message: "Min Length is 2" },
                maxLength: { value: 50, message: "Max Length is 50" },
              })}
              placeholder="Enter last name"
              className={inputClass}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}
          </div>

          <div className={formGroup}>
            <label className={labelClass}>Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              placeholder="Enter email"
              className={inputClass}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className={formGroup}>
            <label className={labelClass}>Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Min Length is 6" },
              })}
              placeholder="Enter password"
              className={inputClass}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div className={formGroup}>
            <label className={labelClass}>Profile Picture (Optional)</label>
            <input
              type="file"
              accept="image/png, image/jpeg"
              {...register("profileImageUrl")}
              className={inputClass}
              onChange={handleFileChange}
            />
            {preview && (
              <div className="mt-3 flex justify-center">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded-full border"
                />
              </div>
            )}
          </div>

          <button type="submit" className={submitBtn} disabled={loading}>
            Register
          </button>

          <div className="text-left mt-4">
            <NavLink to="/login" className="text-blue-500 hover:underline text-sm">
              Already have an account? Login here.
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
