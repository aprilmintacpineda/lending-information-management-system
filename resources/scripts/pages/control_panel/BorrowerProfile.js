import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import WithSidebar from '../../components/WithSidebar';

class BorrowerProfile extends Component {
  render() {
    return (
      <WithSidebar>
        <h1>BorrowerProfile</h1>
      </WithSidebar>
    );
  }
}

export default connect(store => ({

}), {

})(BorrowerProfile);