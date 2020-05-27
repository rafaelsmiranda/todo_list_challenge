
import React, { Component } from "react";
import apiService from "../api/apiService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleRegistration = this.handleRegistration.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      name: "",
      email: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
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

  async handleRegistration(e) {
    this.setState({
      message: "",
      loading: true
    });

    await apiService.signup(this.state.name, this.state.email, this.state.password)
  }

  render() {
    return (
      <div>
        <h2>Register</h2>
        <div>
          <input type="text" name="name" placeholder="Name" onChange={this.onChangeName}></input>
        </div>
        <div>
          <input type="text" name="email" placeholder="Email" onChange={this.onChangeEmail}></input>
        </div>
        <div>
          <input type="text" name="password" placeholder="Password" onChange={this.onChangePassword}></input>
        </div>
        <br />
        <button onClick={this.handleRegistration}>Register</button>
      </div>
    );
  }
}

export default Login