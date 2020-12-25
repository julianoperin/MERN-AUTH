import React from "react";
import { Link } from "react-router-dom";
import AuthOptions from "../auth/AuthOptions";

const Header = () => {
  return (
    <header>
      <Link to="/" className="logo">
        <h1>MERN TODO</h1>
      </Link>
      <AuthOptions />
    </header>
  );
};

export default Header;
