import React, { Component } from 'react';

class BorrowerProfile extends Component {
  render() {
    console.log(this.props.params.id);

    return (
      <div>BorrowerProfile</div>
    );
  }
}

export default BorrowerProfile;