import { Link } from "react-router";

const NavBar = () => {
  return (
    <nav className="navbar">
      <Link to="/">
        <h2 className="!text-gradient font-semibold">resume.io</h2>
      </Link>
      <Link to="/upload" className="primary-button w-fit focus:ring-[#8e98ff]">
        Upload Resume
      </Link>
    </nav>
  );
};

export default NavBar;
