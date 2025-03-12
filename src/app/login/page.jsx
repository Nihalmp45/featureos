"use client"; 
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const [loading, setLoading] = useState(false); // State to manage loading status during login
  const router = useRouter(); // Router to handle navigation after successful login

  // useForm hook for managing form state and validation
  const {
    register, // Function to register input fields for validation
    handleSubmit, // Function to handle form submission
    formState: { errors, isValid }, // Track form validation errors and overall validity
    reset, // Reset form state after submission
  } = useForm({
    mode: "onBlur", // Trigger validation when the user leaves a field (on blur)
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Function to handle login
  const onLogin = async (data) => {
    try {
      setLoading(true); 
      const response = await axios.post("/api/users/login", data); 

      const { email } = data; // Correct way to extract email from data

      localStorage.setItem("user", JSON.stringify({ email })); // Store user email in localStorage for persistence

      toast.success("Successfully logged in! 🎉"); // Show success toast notification
      reset(); // Reset the form fields after successful login

      // Redirect to main page with email as a query parameter
      router.push(`/main?email=${encodeURIComponent(email)}`);
    } catch (error) {
      console.error(error);
      toast.error("Wrong password or email ❌"); // Show error if login fails
    } finally {
      setLoading(false); // Reset loading state after the request is complete
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br py-6 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {loading ? "Loading..." : "Log in to Your Account"} {/* Display loading state or title */}
        </h1>
        <Toaster position="top-center" reverseOrder={false} /> {/* Toast notifications */}
        <form onSubmit={handleSubmit(onLogin)}>
          {/* Email Input Field */}
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
                  ? "border-red-500 focus:ring-red-500" // Show error styles if email is invalid
                  : "border-gray-300 focus:ring-indigo-500" // Default focus styles
              }`}
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required", // Field is required
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Validate email format using regex
                  message: "Invalid email format", // Custom error message
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p> // Show error message if validation fails
            )}
          </div>

          {/* Password Input Field */}
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
                  ? "border-red-500 focus:ring-red-500" // Show error styles if password is invalid
                  : "border-gray-300 focus:ring-indigo-500" // Default focus styles
              }`}
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required", // Field is required
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters", // Minimum password length
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p> // Show error message if validation fails
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3 rounded-lg text-white font-semibold ${
              !isValid || loading
                ? "bg-gray-400 cursor-not-allowed" // Disable button if form is invalid or loading
                : "bg-indigo-500 hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            }`}
            disabled={!isValid || loading} // Button is disabled if form is invalid or in loading state
          >
            {loading ? "Logging In..." : "Log In"} {/* Display loading text or login text */}
          </button>
        </form>

        {/* Link to the signup page if the user doesn't have an account */}
        <p className="text-sm text-gray-600 mt-4 text-center">
          Do not have an account?{" "}
          <Link href="/signup" className="text-indigo-500 font-medium hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}
