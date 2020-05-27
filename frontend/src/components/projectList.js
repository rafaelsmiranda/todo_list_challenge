import React, { Component } from 'react';
import Project from './project'

class ProjectList extends Component {
  render() {
    const { projects } = this.props

    return (
      <div className="project-list">
        {projects.map((project, index) => (
          <Project
            key={index}
            index={index}
            project={project}
          />
        ))}
      </div>
    );
  }
}

export default ProjectList;