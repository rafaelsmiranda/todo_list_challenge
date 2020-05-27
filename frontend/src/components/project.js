import React, { Component } from 'react';

import Task from './task'
import apiService from '../api/apiService';

class Project extends Component {
  render() {
    const { title, Tasks: tasks } = this.props.project

    return (
      <div className="project">
        <h2>{title}</h2>
        <div className="task-list">
          {tasks.map((task, index) => (
            <Task
              key={index}
              index={index}
              task={task}
            />
          ))}
        </div></div>
    );
  }
}

export default Project;