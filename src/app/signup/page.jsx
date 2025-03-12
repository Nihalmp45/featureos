"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSignup = async (data) => {
    try {
      setLoading(true);
      await axios.post("/api/users/signup", data);
      toast.success("Account created successfully! 🎉");
      setTimeout(() => router.push("/login"), 2000);
    } catch (error) {
      console.error(error);
      toast.error("User already exists ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-6">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {loading ? "Loading..." : "Create an Account"}
        </h1>
        <Toaster position="top-center" reverseOrder={false} />
        <form onSubmit={handleSubmit(onSignup)}>
          <InputField
            label="Username"
            id="username"
            placeholder="Enter your username"
            error={errors.username}
            register={register("username", {
              required: "Username is required",
              maxLength: { value: 15, message: "Max 15 characters allowed" },
            })}
          />

          <InputField
            label="Email"
            id="email"
            placeholder="Enter your email"
            error={errors.email}
            register={register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
          />

          <InputField
            label="Password"
            id="password"
            type="password"
            placeholder="Enter your password"
            error={errors.password}
            register={register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "At least 6 characters required" },
            })}
          />

          <button
            type="submit"
            className={`w-full py-3 rounded-lg text-white font-semibold ${
              !isValid || loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-500 hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-400"
            }`}
            disabled={!isValid || loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4 text-center">
          Already have an account? {" "}
          <Link
            href="/login"
            className="text-indigo-500 font-medium hover:underline"
          >
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
}

// Reusable Input Field Component
const InputField = ({ label, id, type = "text", placeholder, error, register }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      id={id}
      type={type}
      className={`w-full p-3 border rounded-lg focus:outline-none ${
        error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-indigo-500"
      }`}
      placeholder={placeholder}
      {...register}
    />
    {error && <p className="text-red-500 text-sm">{error.message}</p>}
  </div>
);
