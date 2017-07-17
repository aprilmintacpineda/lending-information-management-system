import React, { Component } from 'react';
import { connect } from 'react-redux';
import path from 'path';
import { remote } from 'electron';

// components
import WithSidebar from '../../components/WithSidebar';
// actions
import * as dashboardActions from '../../actions/control_panel/dashboard';

class Dashboard extends Component {
  componentWillMount() {
    document.title = 'Dashboard - Lending Information System';
  }

  componentWillMount() {
    this.props.getTodays();
    this.props.getTomorrows();
    this.props.getYesterdays();
  }

  render() {
    let app_path = remote.app.getAppPath();

    return (
      <WithSidebar onLink="dashboard">
        <div className="early-due-dates">
          <div className="todays">
            {this.props.dashboard.todays.backend.processing?
              <div className="loading-contents">
                <img src={path.join(app_path, 'app/images/processing-blue.gif')} />
                <p>Loading contents...</p>
              </div>
            : <p>display info</p>}
          </div>

          <div className="tomorrows">
            {this.props.dashboard.tomorrows.backend.processing?
              <img src={path.join(app_path, 'app/images/processing-blue.gif')} />
            : <p>display info</p>}
          </div>

          <div className="yesterdays">
            {this.props.dashboard.yesterdays.backend.processing?
              <img src={path.join(app_path, 'app/images/processing-blue.gif')} />
            : <p>display info</p>}
          </div>
        </div>
      </WithSidebar>
    );
  }
}

export default connect(store => ({
  session: {...store.session},
  dashboard: {...store.dashboard}
}), {
  getTomorrows: dashboardActions.getTomorrows,
  getTodays: dashboardActions.getTodays,
  getYesterdays: dashboardActions.getYesterdays
})(Dashboard);