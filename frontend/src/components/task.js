import React, { Component } from 'react';
import apiService from "../api/apiService";
import Checkbox from './checkbox'

class Task extends Component {
  constructor(props) {
    super(props);
    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);

    this.state = {
      description: "",
      editMode: false,
      id: this.props.task.id,
      projectId: this.props.projectId
    };
  }

  async updateTask(e) {
    try {
      await apiService.updateTask(this.state.projectId, this.state.id, this.state.description)
      window.location.reload();
    }
    catch (e) {
      alert(e.response.status + ': ' + e.response.data.message);
    }
  }

  async deleteTask(e) {
    try {
      await apiService.deleteTask(this.state.projectId, this.state.id)
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

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  render() {
    const { description, finished, id, updatedAt } = this.props.task
    const projectId = this.props.projectId

    return (
      <div className="task" title={finished ? "Task finished at " + updatedAt : description}>
        {<Checkbox checked={finished} projectId={projectId} taskId={id} />}
        {!this.state.editMode ? description : <input type="text" name="description" placeholder={description} onChange={this.onChangeDescription}></input>}
        {!finished && !this.state.editMode ? <i className="fa fa-pencil" onClick={this.toggleEditMode}></i> : null}
        {!finished && this.state.editMode ? <i className="fa fa-check" onClick={this.updateTask}></i> : null}
        {!finished ? <i className="fa fa-trash" onClick={this.deleteTask}></i> : null}
      </div >
    );
  }
}

export default Task;