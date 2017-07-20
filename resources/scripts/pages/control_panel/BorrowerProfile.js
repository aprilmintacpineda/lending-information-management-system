import React, { Component } from 'react';
import { connect } from 'react-redux';
import { remote } from 'electron';
import { Link } from 'react-router';
import path from 'path';

// components
import WithSidebar from '../../components/WithSidebar';
import WithLabel from '../../components/WithLabel';
import WithIcon from '../../components/WithIcon';
import InputText from '../../components/forms/InputText';
import InputSelect from '../../components/forms/InputSelect';
import InputButton from '../../components/forms/InputButton';
// actions
import * as borrowerProfileActions from '../../actions/control_panel/borrower_profile';
// helpers
import { currency } from '../../helpers/Numbers';
import { toFormalDate, getFormalDueDate, monthList } from '../../helpers/DateTime';

class BorrowerProfile extends Component {
  constructor(props) {
    super(props);

    this.routerWillLeave = this.routerWillLeave.bind(this);
  }

  componentWillMount() {
    document.title = 'Borrower profile - LIMS';
    this.props.fetch(this.props.params.id);

    this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave);
  }

  routerWillLeave() {
    return true;
  }

  componentWillUnmount() {
    this.props.reset();
  }

  render() {
    let app_path = remote.app.getAppPath();

    let date = new Date;
    let years = [];
    let max_year = date.getFullYear();
    let min_year = max_year - 10;

    for(let a = max_year; a >= min_year; a--) {
      years.push(<option key={a}>{a}</option>);
    }

    console.log(this.props.borrower_profile);

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
                <p>No contact information to show.</p> :
                <ul>
                  {this.props.borrower_profile.data.contact_numbers.map((contact_number, index) =>
                    <li key={index}>{contact_number.number}</li>
                  )}
                </ul>}
            </section>

            {this.props.borrower_profile.data.loans.map((loan, index) => 
              <section key={index}>
                <h1>{toFormalDate(loan.loan_date)}</h1>

                <div className="loan-container">
                  <div className="left-right-columned">
                    <div className="left">
                      <h1>Loan information</h1>

                      <div className="row">
                        <WithIcon icon={loan.fully_paid? path.join(app_path, 'app/images/check.png') : path.join(app_path, 'app/images/cross.png')}>
                          <p>Fully paid</p>
                        </WithIcon>
                      </div>

                      {!loan.fully_paid?
                        <div className="row">
                          <WithLabel label="Next due date">
                            <p><strong>{loan.payments.length? getFormalDueDate(loan.payments[0].period_paid) : getFormalDueDate(loan.loan_date)}</strong></p>
                          </WithLabel>
                        </div>
                      : null}

                      <div className="row">
                        <WithLabel label="Amount">
                          <p>{currency(loan.amount) + ' Pesos'}</p>
                        </WithLabel>
                      </div>

                      <div className="row">
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
                      </div>

                      <div className="row">
                        <WithLabel label="Months to pay">
                          <p>{loan.months_to_pay + (loan.months_to_pay > 1? ' Months' : ' Month')}</p>
                        </WithLabel>
                      </div>

                      <div className="row">
                        <WithLabel label="Payment method">
                          {loan.payment_method == 1? <p>Monthly</p>
                          : loan.payment_method == 2? <p>Semi-monthly</p>
                          : <p>Daily</p>}
                        </WithLabel>
                      </div>

                      <div className="row">
                        <WithLabel label="Interest rate">
                          {loan.condition_applied == 'interest-only' || loan.condition_applied == 'due-date-and-interest'?
                            <p>{loan.interest_rate} {loan.interest_type == 'percentage'? 'Percent' : 'Pesos'}</p>
                          : <p>N/A</p>}
                        </WithLabel>
                      </div>

                      <div className="row">
                        <WithLabel label="Interest">
                          <p>{currency(loan.interest)} Pesos</p>
                        </WithLabel>
                      </div>

                      <div className="row">
                        <WithLabel label="Profit">
                          <p>{currency(loan.profit)} Pesos</p>
                        </WithLabel>
                      </div>

                      <div className="row">
                        <WithLabel label="Daily payment">
                          <p>{currency(loan.per_day)} Pesos</p>
                        </WithLabel>
                      </div>

                      <div className="row">
                        <WithLabel label="Semi-monthly payment">
                          <p>{currency(loan.per_semi_month)} Pesos</p>
                        </WithLabel>
                      </div>

                      <div className="row">
                        <WithLabel label="Monthly payment">
                          <p>{currency(loan.per_month)} Pesos</p>
                        </WithLabel>
                      </div>
                    </div>

                    <div className="right">
                      <ul className="actions">
                        <li>
                          <a className={loan.payment_fields.backend.processing? 'default-btn-blue disabled' : 'default-btn-blue'}
                          onClick={() => loan.payment_fields.backend.processing? false : this.props.togglePaymentForm(true, index)}>
                            New Payment
                          </a>
                        </li>
                      </ul>

                      {loan.payment_fields.shown?
                        <ul className="payment-form">
                          <li>
                            <InputText
                            numberOnly={true}
                            value={loan.payment_fields.amount.value}
                            placeholder="Amount paid..."
                            onChange={value => this.props.changeAmountPaid(value, index)}
                            errors={loan.payment_fields.amount.errors}
                            disabled={loan.payment_fields.backend.processing} />
                            <p><strong>{currency(loan.payment_fields.amount.value)}</strong> Pesos</p>
                          </li>
                          <li>
                            <p>For the month of...</p>
                            <InputSelect
                            className="payment-period"
                            onChange={value => this.props.changePeriodMonth(value, index)}
                            value={loan.payment_fields.period.month}
                            disabled={loan.payment_fields.backend.processing}
                            errors={[]}>
                              {monthList().map((month, index) =>
                                <option key={index}>{month}</option>
                              )}
                            </InputSelect>
                            <InputSelect
                            className="payment-period"
                            onChange={value => this.props.changePeriodYear(value, index)}
                            value={loan.payment_fields.period.year}
                            disabled={loan.payment_fields.backend.processing}
                            errors={[]} >
                              {years}
                            </InputSelect>
                          </li>
                          <li>
                            Quarter...
                            <InputSelect
                            onChange={value => this.props.changePeriodQuarter(value, index)}
                            value={loan.payment_method != 2? '' : loan.payment_fields.period.quarter}
                            disabled={loan.payment_fields.backend.processing || loan.payment_method != 2}
                            errors={[]}>
                              {loan.payment_method != 2?
                                <option>N/A</option>
                              : null}
                              <option value="q1">1st Quarter</option>
                              <option value="q2">2nd Quarter</option>
                            </InputSelect>
                          </li>
                          <li>
                            <InputSelect
                            onChange={value => this.props.changePaymentType(value, index)}
                            value={loan.payment_fields.amount.type}
                            disabled={loan.payment_fields.backend.processing}
                            errors={[]}>
                              <option value="period-only">For the period only</option>
                              <option value="partial-only">Partial payment</option>
                              <option value="paid-in-full">Full payment</option>
                            </InputSelect>
                          </li>
                          <li>
                            <div className="buttons">
                              <InputButton
                              value="Next"
                              onClick={() => this.props.makePayment({
                                loan_id: loan.id,
                                payment_coverage: loan.payment_fields.amount.type,
                                quarter: loan.payment_fields.period.quarter,
                                amount: loan.payment_fields.amount.value,
                                period_paid: loan.payment_fields.period.month + new Date(loan.loan_date).getDate().toString() + ', ' + loan.payment_fields.period.year
                              }, index)}
                              sending={loan.payment_fields.backend.processing}
                              disabled={loan.payment_fields.allow_submit && !loan.payment_fields.backend.processing? false : true}
                              errors={[]} />
                            </div>

                            <div className="buttons">
                              <a className={loan.payment_fields.backend.processing? 'default-btn-red disabled' : 'default-btn-red'}
                              onClick={() => loan.payment_fields.backend.processing? false : this.props.togglePaymentForm(false, index)}>
                                Cancel
                              </a>
                            </div>

                            {loan.payment_fields.backend.status == 'failed'?
                              <p className="errors">{loan.payment_fields.backend.message}</p>
                            : null}
                          </li>
                        </ul>
                      : null}

                      <h1>Payments summary</h1>

                      <div className="payment-container">
                        <div className="row">
                          <WithLabel label="Total amount paid">
                            <p>{currency(loan.summary.total_amount_paid)} Pesos</p>
                          </WithLabel>
                        </div>

                        <div className="row">
                          <WithLabel label="Payable balance">
                            <p>{currency(loan.summary.payable_balance)} Pesos</p>
                          </WithLabel>
                        </div>

                        <div className="row">
                          <WithLabel label="Payable months">
                            {loan.summary.months_left == 0?
                              <p>None</p>
                            : loan.summary.months_left > 1?
                              <p>{loan.summary.months_left} Months</p>
                            : <p>{loan.summary.months_left} Month</p>}
                          </WithLabel>
                        </div>
                      </div>

                      <h1>Payments details</h1>

                      {loan.payments.length? loan.payments.map((payment, index) =>
                        <div className="payment-container" key={index}>
                          <div className="row">
                            <WithLabel label="Payment period">
                              {loan.payment_method == 1?
                                <p>Month of {toFormalDate(payment.period_paid)}</p>
                              : loan.payment_method == 2?
                                <p><strong>{payment.quarter == 'q1'? '1st' : '2nd'} quarter</strong> of <strong>{monthList()[new Date(payment.period_paid).getMonth()]}</strong></p>
                              : <p>blank day of the period</p>}
                            </WithLabel>
                          </div>

                          <div className="row">
                            <WithLabel label="Amount">
                              {payment.payment_coverage == 'period-only'?
                                <p>Payment of <strong>{currency(payment.amount)} Pesos for the period only</strong>.</p>
                              : payment.payment_coverage == 'partial-only'?
                                <p><strong>Partial payment</strong> of <strong>{currency(payment.amount)} Pesos</strong> for the period only.</p>
                              : <p><strong>Full payment</strong> of <strong>{currency(payment.amount)} Pesos</strong> for this loan.</p>}
                            </WithLabel>
                          </div>

                          <div className="row">
                            <WithLabel label="Date paid">
                              <p>{toFormalDate(payment.created_at)}</p>
                            </WithLabel>
                          </div>
                        </div>
                      ) :
                        <div className="row">
                          <p>No payments has been made since <strong>{toFormalDate(loan.loan_date)}</strong></p>
                        </div>}
                    </div>
                  </div>
                </div>
              </section>)}
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
  reset: borrowerProfileActions.reset,
  togglePaymentForm: borrowerProfileActions.togglePaymentForm,
  changePeriodMonth: borrowerProfileActions.changePeriodMonth,
  changePeriodYear: borrowerProfileActions.changePeriodYear,
  changePeriodQuarter: borrowerProfileActions.changePeriodQuarter,
  changeAmountPaid: borrowerProfileActions.changeAmountPaid,
  changePaymentType: borrowerProfileActions.changePaymentType,
  makePayment: borrowerProfileActions.makePayment
})(BorrowerProfile);