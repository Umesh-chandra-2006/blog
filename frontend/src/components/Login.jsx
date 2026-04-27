import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router";
import {
  formCard,
  formGroup,
  labelClass,
  inputClass,
  submitBtn,
  formTitle,
} from "../styles/common";
import { useAuth } from "../store/useAuth";
import { toast } from "react-hot-toast";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const login = useAuth((state) => state.login);
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const currentUser = useAuth((state) => state.currentUser);
  const loggedIn = useAuth((state) => state.loggedIn);
  const loading = useAuth((state) => state.loading);
  const error = useAuth((state) => state.error);

  const onLogin = async (newUser) => {
    await login(newUser);
  };

  useEffect(() => {
    if (loggedIn && isAuthenticated) {
      toast.success("Login successful!");
      if (currentUser.role === "ADMIN") {
        navigate("/admin-dashboard");
      } else if (currentUser.role === "AUTHOR") {
        navigate("/author-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    }
  }, [loggedIn, isAuthenticated, currentUser, navigate]);

  if (loading) {
    return <div className="text-center p-4">Logging in...</div>;
  }

  return (
    <div className="mt-15 p-4 w-96 mx-auto text-center">
      <h1 className="text-2xl mb-2">User Login Form</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
          {error}
        </div>
      )}

      <div className="p-4">
        <form className={formCard} onSubmit={handleSubmit(onLogin)}>
          <div className={formGroup}>
            <label className={labelClass}>Email</label>
            <input
              type="email"
              className={inputClass}
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className={formGroup}>
            <label className={labelClass}>Password</label>
            <input
              type="password"
              className={inputClass}
              placeholder="Enter your password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div className="text-right mb-4">
            <NavLink
              to="/forgot-password"
              className="text-blue-500 hover:underline text-sm"
            >
              Forgot Password?
            </NavLink>
          </div>

          <button type="submit" className={submitBtn} disabled={loading}>
            Login
          </button>
          <div className="text-left mt-4">
            <NavLink
              to="/register"
              className="text-blue-500 hover:underline text-sm"
            >
              Don't have an account? Register here.
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
