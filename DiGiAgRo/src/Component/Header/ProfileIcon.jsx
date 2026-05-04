import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

function ProfileIcon({token, setToken}) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  
  const handleLogout = () => {
    localStorage.clear();
    localStorage.removeItem("token")
    setToken(null)
    navigate("/");
  };

  return (
    <div className="relative">
      {token ? (
        <>
          {/* Avatar */}
          <div
            onClick={() => setOpen(!open)}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-500 cursor-pointer"
          >
            👤
          </div>

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg py-2">
              <NavLink
                to="/profile"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                My Profile
              </NavLink>

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </>
      ) : (
        <Link
          to="/Login"
          className="bg-green-900 px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Login
        </Link>
      )}
    </div>
  );
}

export default ProfileIcon;