import { Link, NavLink } from "react-router";
import { usePuterStore } from "~/lib/puter";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"; // Heroicons for the hamburger icon
import React, { useState } from "react";
const HamburgerIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-gray-800 "
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);
const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-10 w-10 text-gray-800"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5.121 17.804A9 9 0 0112 15a9 9 0 016.879 2.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const NavBar = () => {
  const { auth } = usePuterStore();
  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (err) {
      console.error("Failed to sign you out.");
    }
  };
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar relative">
      <Link to="/">
        <h2 className="!text-gradient font-semibold">resume.ai</h2>
      </Link>
      <div className="md:hidden">
        <button className="text-4xl cursor-pointer" onClick={toggleSidebar}>
          {isOpen ? (
            <span>&times;</span>
          ) : (
            <span>
              <HamburgerIcon />
            </span>
          )}
        </button>
      </div>
      <div
        className={` flex flex-col absolute top-15 right-2 items-center gap-4 min-w-[200px] bg-gray-50 rounded-2xl p-2 md:static md:flex-row md:bg-transparent md:flex md:opacity-100 opacity-0 transition-all duration-300 -translate-y-2 ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 md:opacity-100 md:translate-0"}`}
      >
        <div className="text-sm text-gray-500 md:hidden underline">
          @{auth.user?.username}
        </div>
        <NavLink to="/upload" className={`primary-button text-center`}>
          Upload Resume
        </NavLink>
        <NavLink
          to="/"
          className="hover:underline cursor-pointer"
          onClick={signOut}
        >
          {auth.isAuthenticated ? "Logout" : "Sign in"}
        </NavLink>
        {/* <UserIcon /> */}
      </div>
    </nav>
  );
};

export default NavBar;

const links = [
  { name: "Home", to: "/" },
  { name: "Dashboard", to: "/dashboard" },
  { name: "Settings", to: "/settings" },
  { name: "Profile", to: "/profile" },
];

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 flex text-white  ${isOpen ? "w-64" : "w-20"}`}
      >
        {/* Toggle button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute top-4 right-4 text-gray-300 hover:text-white focus:outline-none"
        >
          {isOpen ? "←" : "→"}
        </button>

        {/* Logo / Title */}
        <div className="flex items-center gap-x-4">
          <div className="bg-indigo-500 w-10 h-10 rounded-md flex items-center justify-center font-bold text-xl">
            <span>SB</span>
          </div>
          {isOpen && <h1 className="text-xl font-bold">My Sidebar</h1>}
        </div>

        {/* Navigation Links */}
        <nav className="mt-10 flex flex-col gap-3">
          {links.map(({ name, to }) => (
            <NavLink
              key={name}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded-md hover:bg-indigo-600 transition-colors ${
                  isActive ? "bg-indigo-600" : "bg-transparent"
                }`
              }
            >
              <span className="material-icons">circle</span>
              {isOpen && <span>{name}</span>}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Main Content Placeholder */}
      <main className="flex-1 p-7">
        <h2 className="text-2xl font-semibold">Main Content</h2>
      </main>
    </div>
  );
};
