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
import { toFormalDate, monthList } from '../../helpers/DateTime';
import { currency } from '../../helpers/Numbers';

class LoanComprehensiveReport extends Component {
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
                <h1>Loan Comprehensive Report</h1>
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
                        <td>Fully Paid</td>
                        <td>:</td>
                        <td>{this.props.loan.data.loan_payments_summary.is_fully_paid? 'Yes' : 'No'}</td>
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
                  <p><strong>Loan Payments</strong></p>
                  {!this.props.loan.data.loan_payments.length?
                    <p>No payments made since {toFormalDate(this.props.loan.data.loan_date)}</p>
                  : <table className="long-table">
                      <tbody>
                        <tr>
                          <th>Payment Trace ID</th>
                          <th>Date Paid</th>
                          <th>For the month</th>
                          <th>Amount</th>
                        </tr>
                        {this.props.loan.data.loan_payments.map((loan_payment, loan_payment_index) => (
                          <tr key={loan_payment_index}>
                            <td>{loan_payment.id}</td>
                            <td>{toFormalDate(loan_payment.date_paid)}</td>
                            <td>{monthList()[new Date(loan_payment.period_paid).getMonth() + 1]}</td>
                            <td>PHP {currency(loan_payment.amount)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>}
                </section>
                <section>
                  <h1>Penalties</h1>
                  {!this.props.loan.data.penalties.length?
                      <p>No penalties.</p>
                  : this.props.loan.data.penalties.map((penalty, penalty_index) => (
                    <section key={penalty_index}>
                      <table className="short-table">
                        <tbody>
                          <tr>
                            <td>Penalty Trace ID</td>
                            <td>:</td>
                            <td>{penalty.id}</td>
                          </tr>
                          <tr>
                            <td>Date Given</td>
                            <td>:</td>
                            <td>{toFormalDate(penalty.date_given)}</td>
                          </tr>
                          <tr>
                            <td>Amount</td>
                            <td>:</td>
                            <td>PHP {currency(penalty.amount)}</td>
                          </tr>
                          <tr>
                            <td>Remarks</td>
                            <td>:</td>
                            <td>{penalty.remarks}</td>
                          </tr>
                          <tr>
                            <td>Waved</td>
                            <td>:</td>
                            <td>{penalty.was_waved? 'Yes' : 'No'}</td>
                          </tr>
                          <tr>
                            <td>Date Waved</td>
                            <td>:</td>
                            <td>{penalty.was_waved? toFormalDate(penalty.date_waved) : '------'}</td>
                          </tr>
                          <tr>
                            <td>Wave Remarks</td>
                            <td>:</td>
                            <td>{penalty.was_waved? penalty.wave_remarks : '------'}</td>
                          </tr>
                        </tbody>
                      </table>
                      <p><strong>Penalty Payments</strong></p>
                      {!penalty.penalty_payments.length?
                        <p>No payments since {toFormalDate(penalty.date_given)}</p>
                      : <table className="long-table">
                          <tbody>
                            <tr>
                              <th>Payment Trace ID</th>
                              <th>Amount</th>
                              <th>Date Paid</th>
                            </tr>
                            {penalty.penalty_payments.map((penalty_payment, penalty_payment_index) => (
                              <tr key={penalty_payment_index}>
                                <td>{penalty_payment.id}</td>
                                <td>PHP {currency(penalty_payment.amount)}</td>
                                <td>{toFormalDate(penalty_payment.date_paid)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>}
                    </section>
                  ))}
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
            <WithIcon icon={path.join(app_path, 'app/images/cross.png')}>
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
})(LoanComprehensiveReport);