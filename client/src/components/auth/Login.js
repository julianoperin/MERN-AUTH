import React, { useState, useContext } from "react";
import Axios from "axios";
import UserContext from "../../context/UserContext";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    const loginUser = { email, password };

    //! Login
    const loginRes = await Axios.post("http://localhost:5000/users/login", {
      loginUser,
    });

    //! Get the response data
    setUserData({
      token: loginRes.data.token,
      user: loginRes.data.user,
    });
    localStorage.setItem("auth-token", loginRes.data.token);
    history.push("/");
  };

  return (
    <div>
      <h1>Login</h1>
    </div>
  );
};

export default Login;
