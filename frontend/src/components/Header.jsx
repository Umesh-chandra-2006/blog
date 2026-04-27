import React from "react";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../store/useAuth";
import { toast } from "react-hot-toast";

function Header() {
  const currentUser = useAuth().currentUser;
  const logout = useAuth().logout;
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center bg-gray-700 px-10 py-2">
      <img
        width="85px"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5I7ARthR47U9r6rQr0j3crdCBwrdO87bLMw&s"
        alt="logo"
        className="rounded-[50px]"
      />
      <nav>
        <ul className="flex gap-10 text-2xl">
          <li>
            <NavLink
              to=""
              className={({ isActive }) =>
                isActive ? "bg-auto text-blue-500 font-bold" : "text-white"
              }
            >
              Home
            </NavLink>
          </li>

          {currentUser ? (
            <ul className="flex gap-10 text-2xl items-center">
              {currentUser.role === "AUTHOR" && (
                <li>
                  <NavLink
                    to="add-article"
                    className={({ isActive }) =>
                      isActive ? "text-blue-500 font-bold" : "text-white"
                    }
                  >
                    Write
                  </NavLink>
                </li>
              )}
              <li>
                <NavLink
                  to={
                    currentUser.role === "ADMIN"
                      ? "admin-dashboard"
                      : currentUser.role === "AUTHOR"
                        ? "author-dashboard"
                        : "user-dashboard"
                  }
                  className={({ isActive }) =>
                    isActive ? "text-blue-500 font-bold" : "text-white"
                  }
                >
                  Dashboard
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="user-profile"
                  className={({ isActive }) =>
                    isActive ? "text-blue-500 font-bold" : ""
                  }
                >
                  <img
                    src={
                      currentUser.profileImageUrl
                        ? currentUser.profileImageUrl
                        : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    alt="profile"
                    className="w-10 h-10 rounded-full"
                  />
                </NavLink>
              </li>

              <li>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition-colors text-sm"
                >
                  Logout
                </button>
              </li>
            </ul>
          ) : (
            <ul className="flex gap-10 text-2xl">
              <li>
                <NavLink
                  to="login"
                  className={({ isActive }) =>
                    isActive ? "text-blue-500 font-bold" : "text-white"
                  }
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="register"
                  className={({ isActive }) =>
                    isActive ? "text-blue-500 font-bold" : "text-white"
                  }
                >
                  Register
                </NavLink>
              </li>
            </ul>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Header;
