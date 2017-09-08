import React, { Component } from 'react';
import path from 'path';
import { connect } from 'react-redux';
import { remote } from 'electron';
import { Link } from 'react-router';
// components
import WithSidebar from '../../components/WithSidebar';
import WithIcon from '../../components/WithIcon';
// helpers
import { toFormalDate, monthList } from '../../helpers/DateTime';
import { currency } from '../../helpers/Numbers';
// actions
import * as reportsActions from '../../actions/control_panel/borrower_reports';

class BorrowerComprehensiveReport extends Component {
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
                      {!loan.loan_payments.length?
                        <p>No payments made since {toFormalDate(loan.loan_date)}</p>
                      : <table className="long-table">
                          <tbody>
                            <tr>
                              <th>Payment Trace ID</th>
                              <th>Date Paid</th>
                              <th>For the month</th>
                              <th>Amount</th>
                            </tr>
                            {loan.loan_payments.map((loan_payment, loan_payment_index) => (
                              <tr key={loan_payment_index}>
                                <td>{loan_payment.id}</td>
                                <td>{toFormalDate(loan_payment.date_paid)}</td>
                                <td>{monthList()[new Date(loan_payment.period_paid).getMonth() + 1]}</td>
                                <td>PHP {currency(loan_payment.amount)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>}
                      <p><strong>Penalties</strong></p>
                      {!loan.penalties.length?
                        <p>No penalties.</p>
                      : loan.penalties.map((penalty, penalty_index) => (
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
                  )}
                </section>
                <a
                className="default-btn-blue print-btn"
                onClick={this.print}>
                  Print
                </a>
                <Link
                to={'/borrowers/' + this.props.params.id + '/view'}
                className="default-btn-blue print-btn">
                  Go back
                </Link>
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
})(BorrowerComprehensiveReport);