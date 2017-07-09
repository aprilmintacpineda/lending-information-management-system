import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import WithSidebar from '../../components/WithSidebar';
// helpers
import { ucfirst } from '../../helpers/Strings';

class Dashboard extends Component {
  componentWillMount() {
    document.title = 'Dashboard - Lending Information System';
  }

  render() {
    return (
      <WithSidebar>
        <h1>Hi {this.props.session.user_data.firstname} Welcome to your dashboard!</h1>
      </WithSidebar>
    );
  }
}

export default connect(store => ({
  session: {...store.session}
}), {

})(Dashboard);