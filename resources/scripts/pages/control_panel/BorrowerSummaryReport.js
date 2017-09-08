import React, { Component } from 'react';
import path from 'path';
import { connect } from 'react-redux';
import { remote } from 'electron';
// components
import WithSidebar from '../../components/WithSidebar';
import WithIcon from '../../components/WithIcon';
// helpers
import { toFormalDate, monthList } from '../../helpers/DateTime';
import { currency } from '../../helpers/Numbers';
// actions
import * as reportsActions from '../../actions/control_panel/borrower_reports';

class BorrowerSummaryReport extends Component {
  constructor(props) {
    super(props);

    this.print = this.print.bind(this);
  }

  componentWillMount() {
    this.props.fetch(this.props.params.id);
  }

  print() {
    window.print();
  }

  render() {
    console.log(this.props.borrower);

    return (
      <WithSidebar>
        <div className="report-container">
          hello
        </div>
      </WithSidebar>
    );
  }
}

export default connect(store => ({
  borrower: {...store.borrower_reports}
}), {
  fetch: reportsActions.fetch
})(BorrowerSummaryReport);