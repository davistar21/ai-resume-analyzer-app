import React from "react";
import { Link } from "react-router";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center flex-col justify-center">
      <div>
        <img src="/images/404_Error.gif" alt="" />
      </div>
      <Link to="/" className="primary-button w-fit">
        Go back home
      </Link>
    </div>
  );
};

export default NotFound;
