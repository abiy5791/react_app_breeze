import { Outlet, Navigate, Link } from "react-router-dom";
import useAuthContext from "../context/AuthContext";
import { MenuIcon, XIcon } from "@heroicons/react/solid";
import { useState } from "react";

const AuthLayout = () => {
  const { user, logout } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  return user ? (
    <>
      <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex space-x-7">
              <div>
                <Link to="/categories" className="flex items-center py-2 px-2">
                  <span className="font-semibold text-gray-500 text-lg">
                    QrMenu
                  </span>
                </Link>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              <button
                onClick={logout}
                className="
            w-full
            px-4
            py-1.5
            bg-indigo-500
            hover:bg-red-400
            rounded-md
            text-white
          "
              >
                Logout
              </button>
            </div>
            <div className="md:hidden flex items-center">
              <button
                className="outline-none mobile-menu-button"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? (
                  <XIcon className="w-6 h-6 text-gray-500 hover:text-green-500" />
                ) : (
                  <MenuIcon className="w-6 h-6 text-gray-500 hover:text-green-500" />
                )}
              </button>
            </div>
          </div>
        </div>
        {isOpen && (
          <div className="mobile-menu">
            <button
              onClick={logout}
              className="
          ml-7
          px-4
          py-1.5
          bg-indigo-500
          hover:bg-red-400
          rounded-md
          text-white
        "
            >
              Logout
            </button>
          </div>
        )}
      </nav>

      <Outlet />
    </>
  ) : (
    <Navigate to={"/categoryitems"} />
  );
};

export default AuthLayout;
