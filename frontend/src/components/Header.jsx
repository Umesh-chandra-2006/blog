import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../store/useAuth";
import { toast } from "react-hot-toast";

function Header() {
  const currentUser = useAuth().currentUser;
  const logout = useAuth().logout;
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    navigate("/login");
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <NavLink to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <span className="text-xl font-bold text-gray-900 hidden sm:inline">
                BlogHub
              </span>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`
              }
            >
              Home
            </NavLink>

            {currentUser ? (
              <>
                {currentUser.role === "AUTHOR" && (
                  <NavLink
                    to="add-article"
                    className={({ isActive }) =>
                      `text-sm font-medium transition-colors ${
                        isActive
                          ? "text-blue-600 border-b-2 border-blue-600"
                          : "text-gray-600 hover:text-gray-900"
                      }`
                    }
                  >
                    ✍️ Write
                  </NavLink>
                )}

                <NavLink
                  to={
                    currentUser.role === "ADMIN"
                      ? "admin-dashboard"
                      : currentUser.role === "AUTHOR"
                        ? "author-dashboard"
                        : "user-dashboard"
                  }
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors ${
                      isActive
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`
                  }
                >
                  Dashboard
                </NavLink>

                <NavLink
                  to="user-profile"
                  className={({ isActive }) =>
                    `flex items-center gap-2 ${
                      isActive ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
                    }`
                  }
                >
                  <img
                    src={
                      currentUser.profileImageUrl
                        ? currentUser.profileImageUrl
                        : "https://api.dicebear.com/7.x/avataaars/svg?seed=" + currentUser._id
                    }
                    alt="profile"
                    className="w-8 h-8 rounded-full border border-gray-300"
                  />
                  <span className="text-sm font-medium">{currentUser.firstName}</span>
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="login"
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors ${
                      isActive
                        ? "text-blue-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Sign Up
                </NavLink>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block px-4 py-2 text-sm font-medium ${
                  isActive
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:bg-gray-50"
                }`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </NavLink>

            {currentUser ? (
              <>
                {currentUser.role === "AUTHOR" && (
                  <NavLink
                    to="add-article"
                    className={({ isActive }) =>
                      `block px-4 py-2 text-sm font-medium ${
                        isActive
                          ? "text-blue-600 bg-blue-50"
                          : "text-gray-600 hover:bg-gray-50"
                      }`
                    }
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    ✍️ Write
                  </NavLink>
                )}

                <NavLink
                  to={
                    currentUser.role === "ADMIN"
                      ? "admin-dashboard"
                      : currentUser.role === "AUTHOR"
                        ? "author-dashboard"
                        : "user-dashboard"
                  }
                  className={({ isActive }) =>
                    `block px-4 py-2 text-sm font-medium ${
                      isActive
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-600 hover:bg-gray-50"
                    }`
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </NavLink>

                <NavLink
                  to="user-profile"
                  className={({ isActive }) =>
                    `block px-4 py-2 text-sm font-medium ${
                      isActive
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-600 hover:bg-gray-50"
                    }`
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="login"
                  className={({ isActive }) =>
                    `block px-4 py-2 text-sm font-medium ${
                      isActive
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-600 hover:bg-gray-50"
                    }`
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </NavLink>
                <NavLink
                  to="register"
                  className="block px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
