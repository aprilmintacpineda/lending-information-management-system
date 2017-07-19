import React, { Component } from 'react';
import { connect } from 'react-redux';
import { remote } from 'electron';
import path from 'path';
import { Link } from 'react-router';

// components
import WithSidebar from '../../components/WithSidebar';
// actions
import * as borrowersListActions from '../../actions/control_panel/borrowers_list';

class BorrowersList extends Component {
  componentWillMount() {
    document.title = 'List of borrowers - LIMS';
    this.props.fetch();
  }

  render() {
    let app_path = remote.app.getAppPath();

    console.log(this.props.borrowers_list.list);

    let borrowers = this.props.borrowers_list.list.map((borrower, index) => (
      <section className="borrower-info" key={index}>
        <h1 className="borrower-name">{borrower.firstname} {borrower.middlename} {borrower.surname}</h1>
        <section>
          <p>{borrower.gender? 'Male' : 'Female'}</p>

          <p>
            {borrower.contact_numbers.map((contact_number, index) => contact_number.number + (index + 1 < borrower.contact_numbers.length? ', ': ''))}
          </p>
        </section>

        <section className="buttons">
          <ul>
            <li><Link className="default-btn-blue" to={'borrowers/' + borrower.id + '/view'}>Profile</Link></li>
            <li><Link className="default-btn-blue" to={'borrowers/' + borrower.id + '/edit'}>Edit</Link></li>
          </ul>
        </section>
      </section>
    ));

    return (
      <WithSidebar onLink="borrowers-list">
        {this.props.borrowers_list.backend.processing?
          <img src={path.join(app_path, 'app/images/processing-blue.gif')} />
        : <div className="borrowers-list-wrapper">
          {borrowers.length? borrowers : <p>There are no borrowers yet. To add a new borrower, click on the <strong>New Borrower</strong> on the side bar.</p>}
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