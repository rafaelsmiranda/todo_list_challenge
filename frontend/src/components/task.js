import React, { Component } from 'react';

import Checkbox from './checkbox'

class Task extends Component {
  render() {
    const { description, finished, updatedAt } = this.props.task

    return (
      <div className="task" title={finished ? "Task finished at " + updatedAt : description}> {<Checkbox checked={finished} />}{description}</div >
    );
  }
}

export default Task;