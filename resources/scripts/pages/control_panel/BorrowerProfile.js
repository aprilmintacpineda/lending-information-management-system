import React, { Component } from 'react';
import { connect } from 'react-redux';
import { remote } from 'electron';
import path from 'path';

// components
import WithSidebar from '../../components/WithSidebar';
import WithLabel from '../../components/WithLabel';
import WithIcon from '../../components/WithIcon';
// actions
import * as borrowerProfileActions from '../../actions/control_panel/borrower_profile';
// helpers
import { currency } from '../../helpers/Numbers';

class BorrowerProfile extends Component {
  componentWillMount() {
    document.title = 'Borrower profile - LIMS';
    this.props.fetch(this.props.params.id);
  }

  componentWIllUnmount() {
    this.props.reset();
  }

  render() {
    console.log(this.props.borrower_profile);

    let app_path = remote.app.getAppPath();

    return (
      <WithSidebar>
        <div className="borrower-profile">
          {this.props.borrower_profile.backend.processing || !this.props.borrower_profile.data?
            <div className="loading-contents">
              <img src={path.join(app_path, 'app/images/processing-blue.gif')} />
            </div> : 
          <section>
            <section>
              <h1>Personal information</h1>
              <p>{this.props.borrower_profile.data.firstname} {this.props.borrower_profile.data.middlename} {this.props.borrower_profile.data.surname}</p>
              <p>{this.props.borrower_profile.data.gender? 'Male' : 'Female'}</p>
            </section>

            <section>
              <h1>Contact information</h1>
              {!this.props.borrower_profile.data.contact_numbers.length?
                <p>No contact information to show.</p>
              : this.props.borrower_profile.data.contact_numbers.map((contact_number, index) =>
                <p key={index}>{contact_number.number}</p>
              )}
            </section>

            <section>
              <h1>Loans</h1>

              {this.props.borrower_profile.data.loans.map((loan, index) => 
                <div key={index} className="loan-container">
                  <div>
                    <WithLabel label="Amount">
                      <p>{currency(loan.amount) + ' Pesos'}</p>
                    </WithLabel>
                  </div>

                  <div>
                    <WithLabel label="Conditions applied">
                      <div>
                        {loan.condition_applied == 'due-date-and-interest' || loan.condition_applied == 'interest-only'?
                        <WithIcon icon={path.join(app_path, 'app/images/check.png')}>
                          <p>Interest</p>
                        </WithIcon> : 
                        <WithIcon icon={path.join(app_path, 'app/images/cross.png')}>
                          <p>Interest</p>
                        </WithIcon>}

                        {loan.condition_applied == 'due-date-and-interest' || loan.condition_applied == 'due-date-only'?
                          <WithIcon icon={path.join(app_path, 'app/images/check.png')}>
                            <p>Due date</p>
                          </WithIcon> : 
                          <WithIcon icon={path.join(app_path, 'app/images/cross.png')}>
                            <p>Due date</p>
                          </WithIcon>}
                      </div>
                    </WithLabel>

                    <WithLabel label="Interest rate">
                      {loan.condition_applied == 'interest-only' || loan.condition_applied == 'due-date-and-interest'?
                        <p>{loan.interest_rate} {loan.interest_type == 'percentage'? 'Percent' : 'Pesos'}</p>
                      : <p>N/A</p>}
                    </WithLabel>

                    <WithLabel label="Interest">
                      <p>{currency(loan.interest)} Pesos</p>
                    </WithLabel>

                    <WithLabel label="Profit">
                      <p>{currency(loan.profit)} Pesos</p>
                    </WithLabel>
                  </div>
                </div>
              )}
            </section>
          </section>}
        </div>
      </WithSidebar>
    );
  }
}

export default connect(store => ({
  borrower_profile: {...store.borrower_profile}
}), {
  fetch: borrowerProfileActions.fetch,
  reset: borrowerProfileActions.reset
})(BorrowerProfile);