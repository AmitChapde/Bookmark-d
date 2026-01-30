"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b">
      <Link href="/" className="text-lg font-semibold">
        📚 Personal Book Manager
      </Link>

      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <Link href="/dashboard" className="text-sm text-gray-700">
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm text-red-600 hover:underline"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-sm">
              Login
            </Link>
            <Link href="/register" className="text-sm">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
