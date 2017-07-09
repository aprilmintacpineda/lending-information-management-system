import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import path from 'path';

// actions
import { exitApp } from '../../actions/app';
import { logout } from '../../actions/session';

class Logout extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    document.title = 'Logged out - Lending Information System';
    this.props.logout();
  }

  render() {
    return (
      <div className="greet-wrapper default-content-wrapper">
        <h1>
          You have been logged out.
        </h1>

        <div className="button">
          <a onClick={() => this.props.exitApp()}>
            Exit application
            <span className="decor" />
          </a>

          <Link to="/login">
            Login again
            <span className="decor" />
          </Link>
        </div>
      </div>
    );
  }
}

export default connect(null, {
  exitApp: exitApp,
  logout: logout
})(Logout);