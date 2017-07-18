import React, { Component } from 'react';
import PropTypes from 'prop-types';

class WithLabel extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    label: PropTypes.string.isRequired,
  }

  render() {
    return (
      <div className="with-label">
        <span className="label">{this.props.label}</span>
        {this.props.children}
      </div>
    );
  }
}

export default WithLabel;