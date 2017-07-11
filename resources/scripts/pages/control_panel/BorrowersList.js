import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import WithSidebar from '../../components/WithSidebar';

class BorrowersList extends Component {
  render() {
    return (
      <WithSidebar>
        <h1>BorrowersList</h1>
      </WithSidebar>
    );
  }
}

export default connect(store => ({

}), {

})(BorrowersList);