import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CssTransitionGroup from 'react-addons-css-transition-group';

class Modal extends Component {
  static propTypes = {
    dismiss: PropTypes.func.isRequired,
    children: PropTypes.array.isRequired
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
          <CssTransitionGroup
          transitionName="grow"
          transitionAppear={true}
          transitionAppearTimeout={350}
          transitionEnterTimeout={350}
          transitionLeaveTimeout={350}>
            <div className="modal">
              <div className="message">
                {this.props.children}
              </div>

              <div className="btns-wrapper">
                <div className="btn-dismiss" onClick={this.props.dismiss}>
                  Dismiss
                </div>
              </div>
            </div>
          </CssTransitionGroup>
        </div>
      </div>
    );
  }
}

export default Modal;