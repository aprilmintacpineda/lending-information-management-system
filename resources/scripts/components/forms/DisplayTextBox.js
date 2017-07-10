import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DisplayTextBox extends Component {
  static propTypes = {
    value: (props, propName, componentName) => {
      if(props[propName] === undefined) {
        console.error('Prop `' + propName + '` is required at ' +
        ' `' + componentName);
      }
    }
  }

  render() {
    return (
      <div className="input-area-wrapper">
        <div className="input-type-box">
          <input
            disabled={true}
            className="input-text-default"
            value={this.props.value} />
        </div>
      </div>
    );
  }
}

export default DisplayTextBox;