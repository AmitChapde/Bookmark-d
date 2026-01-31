"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

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

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm font-semibold border-2 rounded-lg px-4 py-2 text-white  border-red-600 hover:bg-red-600  cursor-pointer"
            >
              <LogOut size={16} style={{ display: "inline", marginRight: "4px" }} />
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-lg font-semibold">
              Login
            </Link>
            <Link href="/register" className="text-lg font-semibold">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
