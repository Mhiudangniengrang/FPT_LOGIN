import React, { useState } from "react";
import "../../assets/style/Login.css";
import logo from "../../assets/image/logo.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    if (!email || !password) {
      alert("Login failed");
      return;
    }
    alert("Login successfully");
  };

  return (
    <div className="form-login-container">
      <div className="header">
        <img src={logo} alt="FPT logo" />
      </div>
      <form>
        <div className="wrapper">
          <div className="form-box login">
            <h1>Login</h1>
            <div className="input-box">
              <label htmlFor="email"></label>
              <input
                type="text"
                value={email}
                placeholder="Email"
                onChange={(event) => handleChangeEmail(event)}
              />
            </div>
            <div className="input-box">
              <label htmlFor="passw"></label>
              <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={(event) => handleChangePassword(event)}
              />
            </div>
            <div className="remember-forgot">
              <label>
                <input type="checkbox" />
                Remember me{" "}
              </label>
              <a href="/">Forgot Password?</a>
            </div>
            <button className="submit" onClick={() => handleSubmit()}>
              Login
            </button>
            <p> Note: Only for students from K19 to log in</p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
