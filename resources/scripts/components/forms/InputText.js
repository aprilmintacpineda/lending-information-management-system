import React, { Component } from 'react';
import { remote } from 'electron';
import PropTypes from 'prop-types';
import path from 'path';

// components
import WithIcon from '../WithIcon';

class InputText extends Component {
  static propTypes = {
    value: (props, propName, componentName) => {
      if(props[propName] === undefined) {
        console.error('Prop `' + propName + '` is required at ' +
        ' `' + componentName);
      }
    },
    className: PropTypes.string,
    placeholder: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.array.isRequired,
    disabled: PropTypes.bool.isRequired,
    maxlength: PropTypes.number,
    children: PropTypes.element,
    password: PropTypes.bool,
    numberOnly: PropTypes.bool
  }

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(changeEvent) {
    let value = changeEvent.target.value;

    if(this.props.numberOnly !== undefined) {
      if(value.length) {
        if(!isNaN(value)
        && value > 0) {
          this.props.onChange(value);
        }
      } else {
        this.props.onChange(value);
      }
    } else if(this.props.numberOnly === undefined) {
      this.props.onChange(value);
    }
  }

  render() {
    let app_path = remote.app.getAppPath();

    let errors = this.props.errors.map((error, index) =>
      <WithIcon icon={path.join(app_path, 'app/images/cross.png')} key={index}>
        <p className="errors">{error}</p>
      </WithIcon> );

    return (
      <div className="input-area-wrapper">
        <div className="input-type-box">
          <input
            disabled={this.props.disabled}
            className={this.props.className && this.props.className.length? 'input-text-default ' + this.props.className : 'input-text-default'}
            maxLength={this.props.maxlength? this.props.maxlength : false}
            ref="input"
            type={this.props.password? 'password' : 'text'}
            value={this.props.value}
            onChange={this.handleChange}
            placeholder={this.props.placeholder} />
          {this.props.children !== undefined?
            <div>
              <br/>
              {this.props.children}
            </div>
          : null}
        </div>
        {this.props.errors.length? <div className="error-list">{errors}</div> : null}
      </div>
    );
  }
}

export default InputText;