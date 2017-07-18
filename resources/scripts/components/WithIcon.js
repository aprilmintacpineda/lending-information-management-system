import React, { Component } from 'react';
import PropTypes from 'prop-types';

class WithIcon extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    icon: PropTypes.string.isRequired,
  }

  render() {
    return (
      <div className="with-icon">
        <img src={this.props.icon} />
        {this.props.children}
      </div>
    );
  }
}

export default WithIcon;