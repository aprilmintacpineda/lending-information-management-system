import React, { Component } from 'react';
import { connect } from 'react-redux';

// actions
import * as actions from '../actions/session';

class Main extends Component {
  componentWillMount() {
    this.props.checkUserCredebility();
  }

  componentWillUpdate(nextProps) {
    if(nextProps.session.accounts !== null) {
      if(!nextProps.session.accounts) {
        this.props.router.push('/setup');
      } else {
        this.props.router.push('/login');
      }
    }
  }

  render() {
    return (
      <div className="landing-wrapper default-content-wrapper">
        <p>Checking Session...</p>
      </div>
    );
  }
}

export default connect(store => ({
  session: {...store.session}
}), {
  checkUserCredebility: actions.checkUserCredebility
})(Main);