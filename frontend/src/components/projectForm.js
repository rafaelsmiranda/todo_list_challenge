import React, { Component } from 'react';
import apiService from "../api/apiService";

class ProjectForm extends Component {

  constructor(props) {
    super(props);
    this.createProject = this.createProject.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);

    this.state = {
      title: ""
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  async createProject(e) {
    try {
      const project = await apiService.createProject(this.state.title)
      if (project) {
        window.location.reload();
      }
    }
    catch (e) {
      if (e.response && e.response.status && e.response.data.message)
        alert(e.response.status + ': ' + e.response.data.message);
    }
  }

  render() {
    return (
      <div className="project-form">
        <h2>Create new project</h2>
        <div>
          <div>
            <input type="text" name="title" placeholder="Project title" onChange={this.onChangeTitle}></input>
            <button onClick={this.createProject}>Create</button>
          </div>
        </div>
        <br />
      </div>
    );
  }
}

export default ProjectForm;