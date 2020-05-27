import apiService from "./api/apiService";
import Login from './components/login';
import ProjectForm from './components/projectForm';
import ProjectList from './components/projectList';
import React, { Component } from 'react';
import Register from './components/register';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.signout = this.signout.bind(this);

    this.state = {
      currentUser: undefined,
      projects: []
    };
  }

  async componentDidMount() {
    const user = await apiService.getSignedUser();

    if (user) {
      this.setState({ currentUser: user });
      try {
        let projects = await apiService.getAllProjects()
        if (projects) {
          this.setState({
            currentUser: user,
            projects: projects.data
          });
        }
      }
      catch (e) {
        if (e.response && e.response.status && e.response.data.message)
          alert(e.response.status + ': ' + e.response.data.message);
        this.signout()
      }
    }
  }

  signout() {
    apiService.signout();
    window.location.reload();
  }

  render() {
    if (this.state.currentUser) {
      const { projects } = this.state
      return (
        <div className="app" >
          <ProjectForm />
          <ProjectList projects={projects} />
          <div className="logout">
            <button onClick={this.signout}>SignOut</button>
          </div>
        </div>
      );
    }

    return (
      <div className="user-form">
        <Login />
        <p>OR</p>
        <Register />
        <br />
        <br />
        <br />
      </div>
    )
  }
}

export default App;
