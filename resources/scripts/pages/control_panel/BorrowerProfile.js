import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import WithSidebar from '../../components/WithSidebar';
// actions
import * as borrowerProfileActions from '../../actions/control_panel/borrower_profile';

class BorrowerProfile extends Component {
  componentWillMount() {
    this.props.fetch(this.props.params.id);
  }

  componentWIllUnmount() {
    this.props.reset();
  }

  render() {
    console.log(this.props.borrower_profile);

    return (
      <WithSidebar>
        <h1>{}</h1>
      </WithSidebar>
    );
  }
}

export default connect(store => ({
  borrower_profile: {...store.borrower_profile}
}), {
  fetch: borrowerProfileActions.fetch,
  reset: borrowerProfileActions.reset
})(BorrowerProfile);