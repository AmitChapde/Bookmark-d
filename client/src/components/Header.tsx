"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";

export default function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setShowMenu(false);
    router.push("/login");
  };

  if (!isAuthenticated) return null;

 
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-logo">📖 Bookmarkd</h1>

        <div className="user-menu" ref={menuRef}>
          <button
            className="user-avatar"
            onClick={() => setShowMenu(!showMenu)}
            aria-label="User menu"
          >
            {user?.name ? getInitials(user.name) : <User size={20} />}
          </button>

          {showMenu && (
            <div className="user-dropdown">
              <div className="user-info">
                <span className="user-name">{user?.name || "User"}</span>
                <span className="user-email">{user?.email || ""}</span>
              </div>
              <div className="dropdown-divider" />
              <button className="dropdown-item logout-btn" onClick={handleLogout}>
                <LogOut size={16} />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
