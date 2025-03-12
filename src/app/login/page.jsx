"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";


export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onBlur", // Trigger validation on blur
    defaultValues: {
      email: "",
      password: "",
    },
  });


  const onLogin = async (data) => {
    try {
        setLoading(true);
        const response = await axios.post("/api/users/login", data);

        const { email } = data; // Correct way to extract email

        localStorage.setItem("user", JSON.stringify({ email })); // Good for persistence

        toast.success("Successfully logged in! 🎉");
        reset();

        // Passing email as a query parameter
        router.push(`/main?email=${encodeURIComponent(email)}`);
    } catch (error) {
        console.error(error);
        toast.error("Wrong password or email ❌");
    } finally {
        setLoading(false);
    }
};




  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br py-6">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {loading ? "Loading..." : "Log in to Your Account"}
        </h1>
        <Toaster position="top-center" reverseOrder={false} />
        <form onSubmit={handleSubmit(onLogin)}>
          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              className={`w-full p-3 border rounded-lg focus:outline-none ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-indigo-500"
              }`}
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className={`w-full p-3 border rounded-lg focus:outline-none ${
                errors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-indigo-500"
              }`}
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded-lg text-white font-semibold ${
              !isValid || loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-500 hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            }`}
            disabled={!isValid || loading}
          >
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>
        <p className="text-sm text-gray-600 mt-4 text-center">
          Do not have an account?{" "}
            <Link
              href="/signup"
              className="text-indigo-500 font-medium hover:underline"
            >
              Sign up here
            </Link>
        </p>
      </div>
    </div>
  );
}
