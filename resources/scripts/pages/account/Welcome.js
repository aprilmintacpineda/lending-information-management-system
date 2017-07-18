import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { ucfirst } from '../../helpers/Strings';

class Welcome extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    document.title = 'Welcome '+ this.props.session.user_data.firstname +'! - LIMS';
  }

  render() {
    return (
      <div className="greet-wrapper default-content-wrapper">
        <h1>
          Hi {this.props.session.user_data.firstname}!
          Since this is your first time, I have logged you in automatically,
          but next time you will be required to log in so don't forget your password!
        </h1>

        <div className="button">
          <Link to="/dashboard">
            To the dashboard
            <span className="decor" />
          </Link>
        </div>
      </div>
    );
  }
}

export default connect(store => ({
  session: {...store.session}
}), {

})(Welcome);