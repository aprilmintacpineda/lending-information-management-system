import React, { Component } from 'react';
import { connect } from 'react-redux';
import { remote } from 'electron';
import path from 'path';
import { Link } from 'react-router';

// components
import WithSidebar from '../../components/WithSidebar';
import WithLabel from '../../components/WithLabel';
// actions
import * as borrowersListActions from '../../actions/control_panel/borrowers_list';
// helpers
import { currency } from '../../helpers/Numbers';

class BorrowersList extends Component {
  componentWillMount() {
    document.title = 'List of borrowers - LIMS';
    this.props.fetch();
  }

  componentWillUnmount() {
    this.props.reset();
  }

  render() {
    let app_path = remote.app.getAppPath();

    let borrowers = this.props.borrowers_list.list.map((borrower, index) => (
      <section className="borrower-info" key={index}>
        <h1 className="borrower-name">{borrower.firstname} {borrower.middlename} {borrower.surname}</h1>
        <section>
          <div className="row">
            <WithLabel label="Gender">
              <p>{borrower.gender? 'Male' : 'Female'}</p>
            </WithLabel>
          </div>

          <div className="row">
            <WithLabel label="Contact numbers">
              <p>{borrower.contact_numbers.map((contact_number, index) => contact_number.number + (index + 1 < borrower.contact_numbers.length? ', ': ''))}</p>
            </WithLabel>
          </div>

          <div className="row">
            <WithLabel label="Total unpaid loan balance">
              <p>{currency(borrower.summary.total_unpaid_balance)} Pesos</p>
            </WithLabel>
          </div>

          <div className="row">
            <WithLabel label="Total unpaid penalties balance">
              <p>{currency(borrower.summary.total_unpaid_penalties)} Pesos</p>
            </WithLabel>
          </div>

          <div className="row">
            <WithLabel label="Total loans">
              <div>
                {borrower.summary.total_loans > 1?
                  <p>{borrower.summary.total_loans} total loans</p>
                : <p>{borrower.summary.total_loans} total loan</p>}

                {borrower.summary.total_unpaid_loans >= 0?
                  <p>{borrower.summary.total_unpaid_loans} total unpaid loans.</p>
                : <p>{borrower.summary.total_unpaid_loans} total unpaid loan.</p>}

                {borrower.summary.total_paid_loans >= 0?
                  <p>{borrower.summary.total_paid_loans} total paid loans.</p>
                : <p>{borrower.summary.total_paid_loans} total paid loan.</p>}
              </div>
            </WithLabel>
          </div>
        </section>

        <section className="buttons">
          <ul>
            <li><Link className="default-btn-blue" to={'borrowers/' + borrower.id + '/view'}>View borrower profile</Link></li>
            <li><Link className="default-btn-blue" to={'borrowers/' + borrower.id + '/edit'}>Edit borrower information</Link></li>
          </ul>
        </section>
      </section>
    ));

    return (
      <WithSidebar onLink="borrowers-list">
        {this.props.borrowers_list.backend.processing?
          <img src={path.join(app_path, 'app/images/processing-blue.gif')} />
        : <div className="borrowers-list-wrapper">
          {borrowers.length? borrowers : <p>There are no borrowers yet. To add a new borrower, click on the <strong>Register new borrower</strong> on the side bar.</p>}
          </div>}
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