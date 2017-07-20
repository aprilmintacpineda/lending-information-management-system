import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import WithSidebar from '../../components/WithSidebar';

class BorrowerEditProfile extends Component {
  render() {
    return (
      <WithSidebar>
        <div className="edit-borrower-profile">
          {this.props.params.id}
        </div>
      </WithSidebar>
    );
  }
}

export default connect(store => ({

}), {
  
})(BorrowerEditProfile);