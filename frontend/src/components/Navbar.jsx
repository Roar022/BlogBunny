import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo/2.png";
import Server_url from "../Utils/server_url";
import { BiLoaderCircle } from "react-icons/bi";
export function loader({ request }) {
  // const pathname = new URL(request.url).searchParams.get("message") || null;
  // if (pathname) {
  //   console.log("logged out");
  // }
  return request;
}

const Navbar = () => {
  const navigate = useNavigate();
  const [state, setState] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const userId = sessionStorage.getItem("userId");
  function handleLogout() {
    setIsLoggingOut(true);
    axios
      .post(`${Server_url}api/users/logout`, {})
      .then((res) => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("userId");
        navigate("/");
        console.log(res);
        // navigate to landing page
        setIsLoggingOut(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoggingOut(false);
      });
  }
  function handleLogin() {
    navigate("/signup");
  }
  const navigation = [
    { title: "Create Blog", path: "/dashboard/add" },
    { title: "Explore", path: "/explore" },
    { title: "Community", path: "/community" },
    { title: "Contact Us", path: "/contactus" },
  ];
  return (
    <nav className="bg-transparent border-b w-full md:static md:text-sm md:border-none">
      <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
        <div className="flex items-center justify-between py-1 md:py-2 md:block">
          <Link to={"/"}>
            {/* change logo  */}
            <div className="main_logo"></div>
            {/* <img
              src={logo}
              style={{
                height:"100px",
                mixBlendMode:"color-burn"
            }}
              alt="Float UI logo"
            /> */}
          </Link>
          <div className="md:hidden">
            <button
              className="text-gray-500 hover:text-gray-800"
              onClick={() => setState(!state)}
            >
              {state ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div
          className={`flex-1 pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
            state ? "block" : "hidden"
          }`}
        >
          <ul className="justify-end items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
            {navigation.map((item, idx) => {
              return (
                <li
                  key={idx}
                  className="text-gray-500 hover:text-indigo-500 hover:scale-110"
                >
                  <Link to={item.path} className="block">
                    {item.title}
                  </Link>
                </li>
              );
            })}
            <li>
              <button
                onClick={userId ? handleLogout : handleLogin}
                disabled={isLoggingOut}
                className="block py-2 px-4 min-w-[40px] min-h-[20px] font-medium text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 active:shadow-none rounded-lg shadow md:inline"
              >
                {isLoggingOut ? (
                  <BiLoaderCircle className="animate-spin" />
                ) : userId ? (
                  "Sign Out"
                ) : (
                  "Sign In"
                )}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
