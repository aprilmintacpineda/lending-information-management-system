import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CssTransitionGroup from 'react-addons-css-transition-group';

import Sidebar from '../components/Sidebar';

class WithSidebar extends Component {
  static propTypes = {
    className: PropTypes.string,
    onLink: PropTypes.string,
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
        <Sidebar onLink={this.props.onLink} />

        <CssTransitionGroup
        transitionName="view"
        transitionAppear={true}
        transitionAppearTimeout={350}
        transitionEnterTimeout={350}
        transitionLeaveTimeout={350}>
          <div className="side-contents">
            {this.props.children}
          </div>
        </CssTransitionGroup>
      </div>
    );
  }
}

export default WithSidebar;