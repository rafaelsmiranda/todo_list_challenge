import React, { Component } from 'react';

class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = { checked: this.props.checked }
    this.handleCheck = this.handleCheck.bind(this);
  }

  handleCheck(e) {
    this.setState({
      checked: e.target.checked
    })
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