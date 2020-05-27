import React, { Component } from 'react';
import apiService from "../api/apiService";

class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = { checked: this.props.checked, projectId: this.props.projectId, taskId: this.props.taskId }
    this.handleCheck = this.handleCheck.bind(this);
  }

  async handleCheck(e) {

    if (!this.props.checked) {
      this.setState({
        checked: e.target.checked
      })

      try {
        await apiService.finishTask(this.state.projectId, this.state.taskId)
        window.location.reload();
      }
      catch (e) {
        if (e.response && e.response.status && e.response.data.message)
          alert(e.response.status + ': ' + e.response.data.message);
      }
    }
  }

  render() {
    return (
      <div>
        <input
          id="checkbox_id"
          type="checkbox"
          checked={this.state.checked}
          onChange={this.handleCheck}
        />
        <label htmlFor="checkbox_id"></label>
      </div>
    );
  }
}

export default Checkbox;