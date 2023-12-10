import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BackIcon } from "../assets/icons";
import { BASE_API } from "../utils/Constant";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { setAuthUser } = useAuth();
  const credential = JSON.parse(localStorage.getItem("credential"));
  const TOKEN = localStorage.getItem("auth_token");
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  useEffect(() => {
    closeDropdown();
  }, [path]);

  const handleLogout = () => {
    fetch(`${BASE_API}/user/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + TOKEN,
      },
    })
      .then((r) => r.json())
      .then((response) => {
        if (response.message === "Logout Success") {
          localStorage.removeItem("auth_token");
          localStorage.removeItem("profile");
          setAuthUser(null)
          return navigate("/login");
        }
      });
  };

  return (
    <div className="sticky top-0 z-10 bg-white border-b-[1.5px] border-gray-300">
      <div className="container mx-auto max-w-[1200px] p-4 sm:p-6 px-6 flex justify-between items-center">
        {path === "/" ? (
          <h1 className="text-lg sm:text-xl font-bold">Welcome</h1>
        ) : (
          <img
            className="w-[30px] cursor-pointer"
            onClick={() => navigate("/")}
            src={BackIcon}
            alt="icon"
          />
        )}
        { path !== "/profile" && <div className="flex items-center space-x-4">
          <p className="hidden sm:block text-sm text-gray-500">
            {credential && credential.name}
          </p>
          <div className="relative">
            <img
              onClick={toggleDropdown}
              className="cursor-pointer w-[40px] h-[40px] rounded-full border-1 border-gray-300 object-cover"
              src={
                credential && "http://127.0.0.1:8000/photos/" + credential.photo
              }
              alt="profile"
            />
            {isDropdownOpen && (
              <div className="absolute top-[50px] right-0 bg-white border border-gray-300">
                <button
                  className="block w-full py-2 px-4 text-left test-sm"
                  onClick={() => navigate("/profile")}
                >
                  Profile
                </button>
                <button
                  className="block w-full py-2 px-4 test-sm text-left text-red-500"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div> }
      </div>
    </div>
  );
};

export default Navbar;
