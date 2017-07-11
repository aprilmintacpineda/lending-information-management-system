import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputSelect extends Component {
  static propTypes = {
    value: (props, propName, componentName) => {
      if(props[propName].constructor !== Number
      && props[propName].constructor !== String) {
        console.error('Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Expecting String or number. Type of ' + typeof props[propName] + ' given.');
      }
    },
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.array.isRequired,
    disabled: PropTypes.bool.isRequired,
    className: PropTypes.string,
    children: (props, propName, componentName) => {
      if(props[propName].constructor !== Array
      && props[propName].constructor !== Object) {
        console.error('Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Expecting Array or a single element. Type of ' + typeof props[propName] + ' given.');
      }
    }
  }

  render() {
    let errors = this.props.errors?
      this.props.errors.map((error, index) => <p className="errors" key={index}>{error}</p>)
    : null;

    return (
      <div className="input-area-wrapper">
        <div className="input-select-box">
          <select
          disabled={this.props.disabled}
          className={this.props.className? 'input-select-default ' + this.props.className : 'input-select-default'}
          onChange={(event) => this.props.onChange(event.target.value)}>
            {this.props.children}
          </select>
        </div>
        {this.props.errors.length? <div className="error-list">{errors}</div> : null}
      </div>
    );
  }
}

export default InputSelect;