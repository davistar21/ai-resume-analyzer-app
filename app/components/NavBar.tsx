import { Link, NavLink } from "react-router";
import { usePuterStore } from "~/lib/puter";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"; // Heroicons for the hamburger icon
import React, { useState } from "react";
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
          {isOpen ? <span>&times;</span> : <span>&darr;</span>}
        </button>
      </div>
      {
        <div
          className={`md:hidden flex items-center gap-4 w-[200px] absolute flex-col top-15 bg-gray-50 rounded-2xl p-2 right-2 opacity-0 transition-all duration-300 -translate-y-2 ${isOpen ? "opacity-100 translate-y-0" : "opacity-0"}`}
        >
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
        </div>
      }
      <div className="hidden md:flex-row md:bg-transparent md:flex items-center gap-4">
        <NavLink to="/upload" className={`primary-button w-fit`}>
          Upload Resume
        </NavLink>
        <button className="hover:underline" onClick={signOut}>
          Logout
        </button>
      </div>
      {/* <Sidebar /> */}
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
