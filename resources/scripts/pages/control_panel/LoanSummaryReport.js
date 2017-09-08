import React, { Component } from 'react';
import { connect } from 'react-redux';
import { remote } from 'electron';
import { Link } from 'react-router';
import path from 'path';
// components
import WithSidebar from '../../components/WithSidebar';
import WithIcon from '../../components/WithIcon';
// actions
import * as reportsActions from '../../actions/control_panel/loan_reports';
import { putHash } from '../../actions/control_panel/borrower_profile';
// helpers
import { currency } from '../../helpers/Numbers';
import { toFormalDate } from '../../helpers/DateTime';

class LoanSummaryReport extends Component {
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
          {this.props.loan.data?
            <div>
              <div className="header">
                <h1>Loan Summary Report</h1>
                <div className="borrower-info">
                  <table className="left short-table">
                    <tbody>
                      <tr>
                        <td>Full Name</td>
                        <td>:</td>
                        <td>{this.props.loan.data.borrower.firstname} {this.props.loan.data.borrower.middlename} {this.props.loan.data.borrower.surname}</td>
                      </tr>
                      <tr>
                        <td>Sex</td>
                        <td>:</td>
                        <td>{this.props.loan.data.borrower.gender? 'Male' : 'Female'}</td>
                      </tr>
                      <tr>
                        <td>Contact Numbers</td>
                        <td>:</td>
                        <td>
                          {this.props.loan.data.borrower.contact_numbers.length?
                            this.props.loan.data.borrower.contact_numbers.map((contact_number, contact_number_index) => {
                              if(contact_number_index + 1 != this.props.loan.data.borrower.contact_numbers.length) {
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
                  <h1>Loan Information</h1>
                  <table className="short-table">
                    <tbody>
                      <tr>
                        <td>Loan Trace ID</td>
                        <td>:</td>
                        <td>{this.props.loan.data.id}</td>
                      </tr>
                      <tr>
                        <td>Date Loan</td>
                        <td>:</td>
                        <td>{toFormalDate(this.props.loan.data.loan_date)}</td>
                      </tr>
                      <tr>
                        <td>Loan Amount</td>
                        <td>:</td>
                        <td>PHP {currency(this.props.loan.data.amount)}</td>
                      </tr>
                      <tr>
                        <td>Interest</td>
                        <td>:</td>
                        <td>{this.props.loan.data.interest_type == 'percentage'? this.props.loan.data.interest_rate + ' Percent' : 'PHP ' + this.props.loan.data.interest_rate}</td>
                      </tr>
                      <tr>
                        <td>Payment</td>
                        <td>:</td>
                        <td>
                          {this.props.loan.data.payment_method == 1? 'Monthly installments of PHP ' + currency(this.props.loan.data.per_month)
                          : this.props.loan.data.payment_method == 2? 'Semi-monthly installments of PHP ' + currency(this.props.loan.data.per_month)
                          : 'Daily installments of PHP ' + currency(this.props.loan.data.per_month)}
                        </td>
                      </tr>
                      <tr>
                        <td>Months To Pay</td>
                        <td>:</td>
                        <td>{this.props.loan.data.months_to_pay > 1? this.props.loan.data.months_to_pay + ' months' : this.props.loan.data.months_to_pay + ' month'}</td>
                      </tr>
                    </tbody>
                  </table>
                </section>
                <section>
                  <h1>Loan Payments</h1>
                  <table className="short-table">
                    <tbody>
                      <tr>
                        <td>Total Amount Paid</td>
                        <td>:</td>
                        <td>PHP {currency(this.props.loan.data.loan_payments_summary.total_amount_paid)}</td>
                      </tr>
                      <tr>
                        <td>Total Amount To Pay</td>
                        <td>:</td>
                        <td>PHP {currency(this.props.loan.data.loan_payments_summary.total_amount_to_pay)}</td>
                      </tr>
                      <tr>
                        <td>Remaining Balance</td>
                        <td>:</td>
                        <td>PHP {currency(this.props.loan.data.loan_payments_summary.remaining_balance)}</td>
                      </tr>
                    </tbody>
                  </table>
                </section>
                <section>
                  <h1>Penalties</h1>
                  <table className="short-table">
                    <tbody>
                      <tr>
                        <td>Total Penalties</td>
                        <td>:</td>
                        <td>PHP {currency(this.props.loan.data.penalties_summary.total_amount_to_pay)}</td>
                      </tr>
                      <tr>
                        <td>Total Amount Paid</td>
                        <td>:</td>
                        <td>PHP {currency(this.props.loan.data.penalties_summary.total_amount_paid)}</td>
                      </tr>
                      <tr>
                        <td>Remaining Balance</td>
                        <td>:</td>
                        <td>PHP {currency(this.props.loan.data.penalties_summary.remaining_balance)}</td>
                      </tr>
                    </tbody>
                  </table>
                </section>
                <a
                className="default-btn-blue print-btn"
                onClick={this.print}>
                  Print
                </a>
                <Link
                to={'/borrowers/' + this.props.loan.data.borrower.id + '/view'}
                className="default-btn-blue print-btn"
                onClick={() => this.props.putHash(this.props.params.id)}>
                  Go back
                </Link>
              </div>
            </div>
          : this.props.loan.backend.status == 'failed'?
            <WithIcon icon={path.join(app_path, 'app/images/cross.gif')}>
              <p>{this.props.loan.backend.message}</p>
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
  loan: {...store.loan_reports}
}), {
  fetch: reportsActions.fetch,
  putHash: putHash
})(LoanSummaryReport);