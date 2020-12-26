import React from "react";

const Register = () => {
  return (
    <div className="page">
      <h1>Register</h1>
      <form>
        <label htmlFor="register-email">Email</label>
        <input type="text" id="register-email" />

        <label htmlFor="register-password">Password</label>
        <input type="text" id="register-password" />
        <input type="text" id="register-password" />

        <label htmlFor="register-display-name">Display Name</label>
        <input type="text" id="register-display-name" />

        <input type="submit" value="Register" />
      </form>
    </div>
  );
};

export default Register;
