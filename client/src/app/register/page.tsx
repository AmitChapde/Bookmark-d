"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/useToast";
import Toast from "@/components/ui/Toast";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const { toast, showToast, hideToast } = useToast();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      showToast("Please fill in all required details", "error");
      return;
    }

    if (password !== confirmPassword) {
      showToast("Passwords do not match", "error");
      return;
    }

    try {
      setLoading(true);

      await apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      });

      showToast("Account created successfully. Please login.", "success");
      router.push("/login");
    } catch (error: any) {
      showToast(error.message || "Registering user failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 text-gray-800">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={hideToast}
        />
      )}
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md bg-white p-6 rounded-xl shadow-md flex flex-col gap-5"
      >
        <h1 className="text-2xl font-semibold text-center">
          Create Account
        </h1>

       
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
            required
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

       
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

     
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Confirm Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm your password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="button"
              disabled={loading}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 bg-blue-700 text-white py-2 rounded-md font-medium hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creating..." : "Register"}
        </button>
      </form>
    </div>
  );
}
