import React, { useState, Component } from 'react';
import './App.css';
import apiService from "./api/apiService";
import Project from './components/project';

class App extends Component {

  constructor(props) {
    super(props);
    this.signout = this.signout.bind(this);

    const tasks1 = [
      { description: "Primeira task", finished: true, updatedAt: "2020-05-27 09:42:08.531+00" },
      { description: "Segunda task", finished: false, updatedAt: null },
      { description: "Terceira task", finished: true, updatedAt: "2020-05-27 10:00:07.531+00" }
    ]

    const tasks2 = [
      { description: "Quarta task", finished: true, updatedAt: "2020-05-27 10:35:22.531+00" },
      { description: "Quinta task", finished: false, updatedAt: null },
      { description: "Sexta task", finished: true, updatedAt: "2020-05-27 12:28:00.531+00" }
    ]

    this.state = {
      currentUser: undefined,
      projects: []
    };
  }

  async componentDidMount() {
    const user = await apiService.getLoggedUser();
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
      alert(e)
    }
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
        alert(e)
      }
    }
  }

  signout() {
    apiService.signout();
  }

  render() {
    const { projects } = this.state
    return (
      <div className="app" >
        <div className="project-form">
          <h2>Create new project</h2>
          <div>
            <input type="text" placeholder="Project name"></input>
            <button onClick={alert}>Create</button>
          </div>
        </div>
        <div className="project-list">
          {projects.map((project, index) => (
            <Project
              key={index}
              index={index}
              project={project}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
