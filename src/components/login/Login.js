import React from "react";
import "./Login.css";
import logo from "../../assets/image/logo.png";


class Login extends React.Component {
  state = {
    Email: "",
    Password: "",
  };
  handleChangeEmail = (event) => {
    this.setState({
      Email: event.target.value,
    });
  };
  handleChangePassword = (event) => {
    this.setState({
      Password: event.target.value,
    });
  };
  handleSubmit = () => {
    if (!this.state.Email || !this.state.Password) {
      alert("Login failed");
      return;
    }
    alert("Login successfully")
  };
  render() {
    return (
      <>
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
                    value={this.state.Email}
                    placeholder="Email"
                    onChange={(event) => this.handleChangeEmail(event)}
                  />
                </div>
                <div className="input-box">
                  <label htmlFor="passw"></label>
                  <input
                    type="password"
                    value={this.state.Password}
                    placeholder="Password"
                    onChange={(event) => this.handleChangePassword(event)}
                  />
                </div>
                <div className="remember-forgot">
                  <label>
                    <input type="checkbox" />
                    Remember me{" "}
                  </label>
                  <a href="/">Forgot Password?</a>
                </div>
                <button onClick={() => this.handleSubmit()}>Login</button>
                <p> Note: Only for students from K19 to log in</p>
              </div>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default Login;
