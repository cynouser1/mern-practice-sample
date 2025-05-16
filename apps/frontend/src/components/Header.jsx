import { useContext, useEffect, useRef, useState } from "react";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import ViteLogo from "../assets/vite.svg";
import { LiaBarsSolid } from "react-icons/lia";
import { RxCross2 } from "react-icons/rx";
import { RxAvatar } from "react-icons/rx";
import { IoSettingsOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AuthContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isProfileOpen) setIsProfileOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "#" },
    { name: "Login", href: "/auth/login" },
    // { name: "Signup", href: "/auth/signup" },
  ];

  const profileItems = [
    {
      name: "Profile",
      href: "/profile",
      icon: <RxAvatar className="w-6 h-6" />,
    },
    {
      name: "Settings",
      href: "#",
      icon: <IoSettingsOutline className="w-6 h-6" />,
    },
    { name: "Logout", href: "#", icon: <CiLogout className="w-6 h-6" /> },
  ];

  const { setUser, setToken, token } = useContext(AppContext);

  return (
    <header className="bg-sky-100 border-b border-sky-200 py-2 shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-3 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src={ViteLogo}
              alt="Sankalan Logo"
              className="h-8 w-auto mr-2"
            />
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-gray-800">SANKALAN</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                // className="text-gray-700 hover:text-blue-600 transition duration-300"
                // className="text-blue-500 hover:text-blue-700 transition-colors duration-300 font-medium"
                className={`${token && item.name === "Login"? "hidden": '' } text-blue-500 hover:border-b-2 ease-in hover:border-b-indigo-600 transition-colors duration-300 font-medium`}
              >
                {item.name}
              </a>
            ))}

            {/* Profile Dropdown */}
            {token && (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={toggleProfile}
                  className="flex items-center focus:outline-none"
                >
                  <FaUserCircle className="w-8 h-8 text-gray-500 hover:text-blue-600" />
                  <div className="flex"></div>
                  <svg
                    className={`ml-1 h-4 w-4 text-gray-500 transition-transform duration-200 ${
                      isProfileOpen ? "transform rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                    {profileItems.map((item) => (
                      <div
                        key={item.name}
                        onClick={() => {
                          navigate(item.href);
                          if (item.name === "Logout") {
                            // Handle logout logic here
                            console.log("Logout clicked");
                            localStorage.removeItem("token");
                            // localStorage.removeItem("user");
                            setUser(null);
                            setToken(null);
                            // Redirect to login page or perform any other action
                            navigate("/auth/login");
                          }
                        }}
                        className="flex gap-3 items-center px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer text-md"
                      >
                        {item.icon} {item.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            {/* <button onClick={toggleProfile} className="mr-4 focus:outline-none">
              <FaUserCircle className="w-6 h-6 text-gray-600" />
            </button> */}
            <button
              onClick={toggleMenu}
              className="text-gray-700 focus:outline-none"
            >
              {isMenuOpen ? (
                // <FaTimes className="w-6 h-6" />
                <RxCross2 className="w-6 h-6" />
              ) : (
                // <FaBars className="w-6 h-6" />
                <LiaBarsSolid className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 text-left" ref={menuRef}>
            <div className="flex flex-col space-y-3 ">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-gray-700 rounded hover:bg-blue-50 hover:text-blue-600"
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Mobile Profile Dropdown */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              {profileItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-gray-700 rounded hover:bg-blue-50 hover:text-blue-600"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
