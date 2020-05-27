
import React, { Component } from "react";
import apiService from "../api/apiService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      email: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  async handleLogin(e) {
    this.setState({
      message: "",
      loading: true
    });

    try {
      const signinData = await apiService.signin(this.state.email, this.state.password)
      if (signinData) {
        window.location.reload();
      }
    }
    catch (e) {
      alert(e.response.status + ': ' + e.response.data.message);
    }
  }

  render() {
    return (
      <div>
        <h2>Login</h2>
        <div>
          <input type="text" name="loginEmail" placeholder="Email" onChange={this.onChangeEmail}></input>
        </div>
        <div>
          <input type="text" name="loginPassword" placeholder="Password" onChange={this.onChangePassword}></input>
        </div>
        <br />
        <button onClick={this.handleLogin}>Login</button>
      </div>
    );
  }
}

export default Login