import React, { Component } from 'react';
import PropTypes from 'prop-types';
import path from 'path';
import { remote } from 'electron';

class InputButton extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    sending: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
    errors: PropTypes.array.isRequired,
    className: PropTypes.string
  }

  render() {
    let errors = this.props.errors?
      this.props.errors.map((error, index) => <p className="errors" key={index}>{error}</p>)
    : null;

    return (
      <div className={this.props.className? 'input-button-wrapper ' + this.props.className : 'input-button-wrapper'}>
        {this.props.sending?
          <div
            className={this.props.disabled? 'btn-submit-default icon-active disabled' : 'btn-submit-default icon-active'}
            onClick={() => !this.props.disabled? this.props.onClick() : false}>
            <div className="sending">
              <img src={path.join(remote.app.getAppPath(), 'app/images/processing.gif')}/>
            </div>
            {this.props.value}
          </div>
        : <div
          className={this.props.disabled? 'btn-submit-default disabled' : 'btn-submit-default'}
          onClick={() => !this.props.disabled? this.props.onClick() : false}>
            {this.props.value}
          </div> }
        <div className="error-list">
          {errors}
        </div>
      </div>
    );
  }
}

export default InputButton;