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
    let app_path = remote.app.getAppPath();

    return (
      <WithSidebar>
        <div className="report-container">
          {this.props.borrower.data?
            <div>
              <div className="header">
                <h1>Borrower Comprehensive Report</h1>
                <div className="borrower-info">
                  <table className="left short-table">
                    <tbody>
                      <tr>
                        <td>Full Name</td>
                        <td>:</td>
                        <td>{this.props.borrower.data.firstname} {this.props.borrower.data.middlename} {this.props.borrower.data.surname}</td>
                      </tr>
                      <tr>
                        <td>Sex</td>
                        <td>:</td>
                        <td>{this.props.borrower.data.gender? 'Male' : 'Female'}</td>
                      </tr>
                      <tr>
                        <td>Contact Numbers</td>
                        <td>:</td>
                        <td>
                          {this.props.borrower.data.contact_numbers.length?
                            this.props.borrower.data.contact_numbers.map((contact_number, contact_number_index) => {
                              if(contact_number_index + 1 != this.props.borrower.data.contact_numbers.length) {
                                return contact_number.number + ', ';
                              } else {
                                return contact_number.number;
                              }
                            })
                          : 'No record.'}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table className="right short-table">
                    <tbody>
                      <tr>
                        <td>Date</td>
                        <td>:</td>
                        <td>{toFormalDate(new Date())}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="body">
                <section>
                  <h1>Loans, Penalties, and Payments</h1>
                  {this.props.borrower.data.loans.map((loan, loan_index) =>
                    <section key={loan_index}>
                      <table className="short-table">
                        <tbody>
                          <tr>
                            <td>Loan Trace ID</td>
                            <td>:</td>
                            <td>{loan.id}</td>
                          </tr>
                          <tr>
                            <td>Fully paid</td>
                            <td>:</td>
                            <td>{loan.is_fully_paid? 'Yes' : 'No'}</td>
                          </tr>
                          <tr>
                            <td>Date Loan</td>
                            <td>:</td>
                            <td>{toFormalDate(loan.loan_date)}</td>
                          </tr>
                          <tr>
                            <td>Loan Amount</td>
                            <td>:</td>
                            <td>PHP {currency(loan.amount)}</td>
                          </tr>
                          <tr>
                            <td>Interest</td>
                            <td>:</td>
                            <td>{loan.interest_type == 'percentage'? loan.interest_rate + ' Percent' : 'PHP ' + loan.interest_rate}</td>
                          </tr>
                          <tr>
                            <td>Payment</td>
                            <td>:</td>
                            <td>
                              {loan.payment_method == 1? 'Monthly installments of PHP ' + currency(loan.per_month)
                              : loan.payment_method == 2? 'Semi-monthly installments of PHP ' + currency(loan.per_month)
                              : 'Daily installments of PHP ' + currency(loan.per_month)}
                            </td>
                          </tr>
                          <tr>
                            <td>Months To Pay</td>
                            <td>:</td>
                            <td>{loan.months_to_pay > 1? loan.months_to_pay + ' months' : loan.months_to_pay + ' month'}</td>
                          </tr>
                        </tbody>
                      </table>
                      <p><strong>Loan Payments</strong></p>
                      <table className="short-table">
                        <tbody>
                          <tr>
                            <td>Total Amount To Pay</td>
                            <td>:</td>
                            <td>PHP {currency(loan.loan_summary.total_amount_to_pay)}</td>
                          </tr>
                          <tr>
                            <td>Total Amount Paid</td>
                            <td>:</td>
                            <td>PHP {currency(loan.loan_summary.total_amount_paid)}</td>
                          </tr>
                          <tr>
                            <td>Remaining Balance</td>
                            <td>:</td>
                            <td>PHP {currency(loan.loan_summary.remaining_balance)}</td>
                          </tr>
                        </tbody>
                      </table>
                      <p><strong>Penalty</strong></p>
                      <table className="short-table">
                        <tbody>
                          <tr>
                            <td>Total Amount To Pay</td>
                            <td>:</td>
                            <td>PHP {currency(loan.penalties_summary.total_penalties)}</td>
                          </tr>
                          <tr>
                            <td>Total Amount Paid</td>
                            <td>:</td>
                            <td>PHP {currency(loan.penalties_summary.total_amount_paid)}</td>
                          </tr>
                          <tr>
                            <td>Remaining Balance</td>
                            <td>:</td>
                            <td>PHP {currency(loan.penalties_summary.remaining_balance)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </section>
                  )}
                </section>
                <a
                  className="default-btn-blue print-btn"
                  onClick={this.print}>
                  Print
                </a>
              </div>
            </div>
          : this.props.borrower.backend.status == 'failed'?
            <WithIcon icon={path.join(app_path, 'app/images/cross.gif')}>
              <p>{this.props.borrower.backend.message}</p>
            </WithIcon>
          : <WithIcon icon={path.join(app_path, 'app/images/processing-blue.gif')}>
              <p>Please wait...</p>
            </WithIcon>}
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