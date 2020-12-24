import React from "react";
import { Link } from "react-router-dom";
import AuthOptions from "../auth/AuthOptions";

const Header = () => {
  return (
    <header>
      <Link to="/">
        <h1>MERN TO DO</h1>
      </Link>
      <AuthOptions />
    </header>
  );
};

export default Header;
