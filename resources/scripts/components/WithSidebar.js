import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Sidebar from '../components/Sidebar';

class WithSidebar extends Component {
  static propTypes = {
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
    return (
      <div className={
        this.props.className?
          'default-content-wrapper with-sidebar ' + this.props.className
        : 'default-content-wrapper with-sidebar'
      }>
        <Sidebar />

        <div className="side-contents">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default WithSidebar;