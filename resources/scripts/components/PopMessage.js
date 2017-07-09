import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PopMessage extends Component {
  static propTypes = {
    message: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  }

  componentDidMount() {
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    document.body.style.overflow = 'auto';
  }

  render() {
    return (
      <div className="modal-wrapper">
        <div className="modal-container">
          <div className="modal">
            <div className="title">
              <h1>{this.props.title}</h1>
            </div>

            <div className="message">
              <h3>{this.props.message}</h3>
            </div>

            <div className="btns-wrapper">
              <div className="btn-dismiss" onClick={this.props.onClick}>
                Dismiss
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PopMessage;