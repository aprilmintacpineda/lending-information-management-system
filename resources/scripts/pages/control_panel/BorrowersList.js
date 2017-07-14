import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import WithSidebar from '../../components/WithSidebar';
// actions
import * as borrowersListActions from '../../actions/control_panel/borrowers_list';

class BorrowersList extends Component {
  componentWillMount() {
    this.props.fetch();
  }

  render() {

    console.log(this.props.borrowers_list.list);

    return (
      <WithSidebar>
        <h1>BorrowersList</h1>
      </WithSidebar>
    );
  }
}

export default connect(store => ({
  borrowers_list: {...store.borrowers_list}
}), {
  fetch: borrowersListActions.fetch,
  reset: borrowersListActions.reset
})(BorrowersList);