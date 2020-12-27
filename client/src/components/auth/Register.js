import React, { useState, useContext } from "react";
import Axios from "axios";
import UserContext from "../../context/UserContext";
import { useHistory } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [displayedName, setDisplayedName] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    const newUser = { email, password, passwordCheck, displayedName };
    //! Register
    await Axios.post("http://localhost:5000/users/register", newUser);
    //! Login
    const loginRes = await Axios.post("http://localhost:5000/users/login", {
      email,
      password,
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
    <div className="page">
      <form className="form">
        <h1>Register</h1>

        <label htmlFor="register-email">Email</label>
        <input
          type="email"
          id="register-email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="register-password">Password</label>
        <input
          type="password"
          id="register-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          id="register-password"
          placeholder="Verify password"
          onChange={(e) => setPasswordCheck(e.target.value)}
        />

        <label htmlFor="register-display-name">Display Name</label>
        <input
          type="text"
          id="register-display-name"
          onChange={(e) => setDisplayedName(e.target.value)}
        />

        <input type="submit" value="Register" onClick={submit} />
      </form>
    </div>
  );
};

export default Register;
