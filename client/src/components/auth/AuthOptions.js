import React from "react";
import { useHistory } from "react-router-dom";

const AuthOptions = () => {
  const history = useHistory();
  return (
    <div>
      <button onClick={() => history.push("/register")}>Register</button>
      <button onClick={() => history.push("/login")}>Log in</button>
    </div>
  );
};

export default AuthOptions;
