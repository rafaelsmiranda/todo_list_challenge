import React, { Component } from 'react';
import apiService from "../api/apiService";
import Task from './task'

class Project extends Component {
  constructor(props) {
    super(props);
    this.createTask = this.createTask.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
    this.updateProject = this.updateProject.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.toggleEditMode = this.toggleEditMode.bind(this);

    this.state = {
      title: "",
      projectId: this.props.project.id,
      editMode: false
    };
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  async createTask(e) {
    try {
      const project = await apiService.createTask(this.state.projectId, this.state.description)
      if (project) {
        window.location.reload();
      }
    }
    catch (e) {
      alert(e.response.status + ': ' + e.response.data.message);
    }
  }

  async updateProject(e) {
    try {
      await apiService.updateProject(this.state.projectId, this.state.title)
      window.location.reload();
    }
    catch (e) {
      alert(e.response.status + ': ' + e.response.data.message);
    }
  }

  async deleteProject(e) {
    try {
      await apiService.deleteProject(this.state.projectId)
      window.location.reload();
    }
    catch (e) {
      alert(e.response.status + ': ' + e.response.data.message);
    }
  }

  toggleEditMode(e) {
    this.setState({
      editMode: !this.state.editMode
    });
  }

  render() {
    const TaskList = () => (
      <div className="task-list">
        {tasks.map((task, index) => (
          <Task
            key={index}
            index={index}
            task={task}
            projectId={this.state.projectId}
          />
        ))}
      </div>
    )

    const { title, Tasks: tasks } = this.props.project
    return (
      <div className="project">
        <div className="project-header">
          {!this.state.editMode ? title : <input type="text" name="title" placeholder={title} onChange={this.onChangeTitle}></input>}
          <div className="options">
            {!this.state.editMode ? <i className="fa fa-pencil" onClick={this.toggleEditMode}></i> : null}
            {this.state.editMode ? <i className="fa fa-check" onClick={this.updateProject}></i> : null}
            <i className="fa fa-trash" onClick={this.deleteProject}></i>
          </div>
        </div>
        {tasks[0] ? <TaskList /> : null}
        <div className="task-form">
          <input type="text" name="description" placeholder="New task description" onChange={this.onChangeDescription}></input>
          <button onClick={this.createTask}>Create</button>
        </div>
        <br />
      </div>
    );
  }
}

export default Project;