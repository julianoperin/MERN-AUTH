import React, { useState, useContext } from "react";
import Axios from "axios";
import UserContext from "../../context/UserContext";
import { useHistory } from "react-router-dom";
import ErrorNotice from "../misc/ErrorNotice";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    try {
      e.preventDefault();
      const loginUser = { email, password };
      console.log(loginUser);

      //! Login
      const loginRes = await Axios.post(
        "http://localhost:5000/users/login",
        loginUser
      );

      //! Get the response data
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div className="page">
      <form className="form">
        {error && (
          <ErrorNotice message={error} clearError={() => setError(undefined)} />
        )}
        <h1>Login</h1>

        <label htmlFor="login-email">Email</label>
        <input
          type="text"
          id="login-email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="login-password">Password</label>
        <input
          type="text"
          id="login-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="Login" onClick={submit} />
      </form>
    </div>
  );
};

export default Login;
