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
import { toFormalDate, getFormalDueDate, monthList, monthMaxdays } from '../../helpers/DateTime';

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

            {this.props.borrower_profile.data.loans.map((loan, loan_index) => 
              <section key={loan_index}>
                <h1>{toFormalDate(loan.loan_date)}</h1>

                <div className="loan-container">
                  <div className="left-right-columned">
                    {loan.edit.shown?
                      <div className="left">
                        <ul>
                          <li className="warning">
                            <WithIcon icon={path.join(app_path, 'app/images/exclamation.png')}>
                              <p className="title">NOTICE</p>
                            </WithIcon>
                            <p className="message">You can only change loan information before the first payment. If the first payment has been made, you can no longer change these information.</p>
                          </li>
                          <li className="clear-floats">
                            Date loan
                            <InputSelect
                            className="date-loan"
                            onChange={value => this.props.editLoanInformationDateLoanMonth(value, loan_index)}
                            value={loan.edit.loan_date.month}
                            disabled={loan.payments.length || loan.edit.backend.processing? true : false}
                            errors={[]}>
                              {monthList().map((month, month_index) => <option key={month_index}>{month}</option>)}
                            </InputSelect>

                            <InputSelect
                            className="date-loan"
                            onChange={value => this.props.editLoanInformationDateLoanDate(value, loan_index)}
                            value={loan.edit.loan_date.date}
                            disabled={loan.payments.length || loan.edit.backend.processing? true : false}
                            errors={[]}>
                              {(() => {
                                let max_days_in_month = monthMaxdays(loan.edit.loan_date.month, loan.edit.loan_date.year);
                                let dates = [];

                                for(let a = 1; a <= max_days_in_month; a++) {
                                  dates.push(<option key={a}>{a}</option>);
                                }

                                return dates;
                              })()}
                            </InputSelect>

                            <InputSelect
                            className="date-loan"
                            onChange={value => this.props.editLoanInformationDateLoanYear(value, loan_index)}
                            value={loan.edit.loan_date.year}
                            disabled={loan.payments.length || loan.edit.backend.processing? true : false}
                            errors={[]}>
                              {years}
                            </InputSelect>

                            {loan.edit.loan_date.errors.length?
                              <div className="error-list">
                                {loan.edit.loan_date.errors.map((error, error_index) => (
                                  <p key={error_index}>{error}</p>
                                ))}
                              </div>
                            : null}
                          </li>
                          <li>
                            Amount loan
                            <InputText
                            value={loan.edit.amount_loan.value}
                            numberOnly={true}
                            placeholder="Amount loan..."
                            onChange={value => this.props.editLoanInformationAmount(value, loan_index)}
                            errors={loan.edit.amount_loan.errors}
                            disabled={loan.payments.length || loan.edit.backend.processing? true : false} />
                            <p><strong>{currency(loan.edit.amount_loan.value)}</strong> Pesos</p>
                          </li>
                          <li>
                            Loan condition<br/>
                            <input
                            id="apply-due-date-interest"
                            type="radio"
                            disabled={loan.payments.length || loan.edit.backend.processing? true : false}
                            checked={loan.edit.amount_loan.condition == 'due-date-and-interest'}
                            onChange={changeEvent => {
                              if(changeEvent.target.checked) this.props.editLoanInformationCondition('due-date-and-interest', loan_index);
                            }} />
                            <label htmlFor="apply-due-date-interest">Apply due date and interest</label>
                            <br/>
                            <input
                            id="apply-interest-only"
                            type="radio"
                            disabled={loan.payments.length || loan.edit.backend.processing? true : false}
                            checked={loan.edit.amount_loan.condition == 'interest-only'}
                            onChange={changeEvent => {
                              if(changeEvent.target.checked) this.props.editLoanInformationCondition('interest-only', loan_index);
                            }} />
                            <label htmlFor="apply-interest-only">Apply interest only</label>
                            <br/>
                            <input
                            id="apply-due-date-only"
                            type="radio"
                            disabled={loan.payments.length || loan.edit.backend.processing? true : false}
                            checked={loan.edit.amount_loan.condition == 'due-date-only'}
                            onChange={changeEvent => {
                              if (changeEvent.target.checked) this.props.editLoanInformationCondition('due-date-only', loan_index);
                            }} />
                            <label htmlFor="apply-due-date-only">Apply due date only</label>
                            <br/>
                            <input
                            id="no-due-date-no-interest"
                            type="radio"
                            disabled={loan.payments.length || loan.edit.backend.processing? true : false}
                            checked={loan.edit.amount_loan.condition == 'no-due-date-and-interest'}
                            onChange={changeEvent => {
                              if(changeEvent.target.checked) this.props.editLoanInformationCondition('no-due-date-and-interest', loan_index);
                            }} />
                            <label htmlFor="no-due-date-no-interest">Don't apply due date and interest</label>
                          </li>
                          <li>
                            Interest rate
                            <InputText
                            value={loan.edit.amount_loan.condition == 'interest-only' || loan.edit.amount_loan.condition == 'due-date-and-interest'? loan.edit.interest_rate.value : 'N/A'}
                            numberOnly={true}
                            placeholder="Interest rate..."
                            onChange={value => this.props.editLoanInformationInterestRate(value, loan_index)}
                            errors={loan.edit.interest_rate.errors}
                            disabled={loan.payments.length || loan.edit.backend.processing? true : (loan.edit.amount_loan.condition == 'interest-only' || loan.edit.amount_loan.condition == 'due-date-and-interest') && !loan.edit.backend.processing? false : true} />
                            {loan.edit.amount_loan.condition == 'interest-only' || loan.edit.amount_loan.condition == 'due-date-and-interest'?
                              <p>{currency(loan.edit.interest_rate.value)} {loan.edit.interest_rate.type == 'percentage'? 'Percent' : 'Pesos'}</p>
                            : null}
                          </li>
                          <li>
                            <input
                            id="interest-type-percentage"
                            type="radio"
                            disabled={loan.payments.length || loan.edit.backend.processing? true : loan.edit.backend.processing || loan.edit.amount_loan.condition == 'due-date-only' || loan.edit.amount_loan.condition == 'no-due-date-and-interest'}
                            checked={loan.edit.interest_rate.type == 'percentage'}
                            onChange={() => this.props.editLoanInformationInterestType('percentage', loan_index)} />
                            <label htmlFor="interest-type-percentage">Percentage</label>
                            <br/>
                            <input
                            id="interest-type-fixed"
                            type="radio"
                            disabled={loan.payments.length || loan.edit.backend.processing? true : loan.edit.amount_loan.condition == 'due-date-only' || loan.edit.amount_loan.condition == 'no-due-date-and-interest'}
                            checked={loan.edit.interest_rate.type == 'fixed'}
                            onChange={() => this.props.editLoanInformationInterestType('fixed', loan_index)} />
                            <label htmlFor="interest-type-fixed">Fixed value</label>
                          </li>
                          <li>
                            Months to pay
                            <InputText
                            value={loan.edit.amount_loan.condition == 'due-date-only' || loan.edit.amount_loan.condition == 'due-date-and-interest'? loan.edit.months_to_pay.value : 'N/A'}
                            numberOnly={true}
                            placeholder="Months to pay..."
                            onChange={value => this.props.editLoanInformationMonthsToPay(value, loan_index)}
                            errors={loan.edit.months_to_pay.errors}
                            disabled={loan.payments.length || loan.edit.backend.processing? true : (loan.edit.amount_loan.condition == 'due-date-only' || loan.edit.amount_loan.condition == 'due-date-and-interest') && !loan.edit.backend.processing? false : true} />
                          </li>
                          <li>
                            Payment Method
                            <InputSelect
                            className="payment-method"
                            onChange={value => this.props.editLoanInformatioPaymentMethod(value, loan_index)}
                            value={loan.edit.backend.processing || loan.edit.amount_loan.condition == 'interest-only' || loan.edit.amount_loan.condition == 'no-due-date-and-interest'? '0' : loan.edit.payment_method.value}
                            disabled={loan.payments.length || loan.edit.backend.processing? true : loan.edit.amount_loan.condition == 'interest-only' || loan.edit.amount_loan.condition == 'no-due-date-and-interest'}
                            errors={loan.edit.payment_method.errors}>
                              {loan.edit.amount_loan.condition == 'interest-only' || loan.edit.amount_loan.condition == 'no-due-date-and-interest'? <option value="0">N/A</option> : null}
                              <option value="1">Monthly</option>
                              <option value="2">Semi-monthly</option>
                              <option value="3">Daily</option>
                            </InputSelect>
                          </li>
                        </ul>

                        <div className="row">
                          <div className="buttons">
                            <InputButton
                            value="Save changes"
                            onClick={() => this.props.editLoanInformatioSend({
                              amount: loan.edit.amount_loan.value,
                              condition_applied: loan.edit.amount_loan.condition,
                              interest_rate: loan.edit.interest_rate.value,
                              interest_type: loan.edit.interest_rate.type,
                              months_to_pay: loan.edit.months_to_pay.value,
                              date_loan: new Date(monthList().indexOf(loan.edit.loan_date.month) + 1 + ' ' + loan.edit.loan_date.date + ', ' + loan.edit.loan_date.year).toISOString(),
                              payment_method: loan.edit.payment_method.value
                            }, loan_index)}
                            sending={loan.edit.backend.processing}
                            disabled={!loan.payments.length && loan.edit.backend.allow_submit && !loan.edit.backend.processing? false : true}
                            errors={[]} />
                          </div>

                          <div className="buttons">
                            <a
                            className={loan.edit.backend.processing? 'default-btn-red disabled' : 'default-btn-red'}
                            onClick={() => loan.edit.backend.processing? false : this.props.toggleEditLoanInformation(!loan.edit.shown, loan_index)}>
                              Cancel
                            </a>
                          </div>
                        </div>
                      </div> :
                      <div className="left">
                        <h1>Loan information</h1>

                        <div className="row">
                          <a
                          className={loan.edit.backend.processing? 'default-btn-blue disabled' : 'default-btn-blue'}
                          onClick={() => loan.edit.backend.processing? false : this.props.toggleEditLoanInformation(!loan.edit.shown, loan_index)}>
                            Edit loan information
                          </a>
                        </div>

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
                          <WithLabel label="Loan date">
                            <p>{toFormalDate(loan.loan_date)}</p>
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
                          <WithLabel label="Total amount to pay">
                            <p>{currency(Number(loan.profit) + Number(loan.amount))} Pesos</p>
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
                      </div>}

                    <div className="right">
                      <ul className="actions">
                        {!loan.payment_fields.shown?
                          <li>
                            <a className={loan.payment_fields.backend.processing? 'default-btn-blue disabled' : 'default-btn-blue'}
                            onClick={() => loan.payment_fields.backend.processing? false : this.props.togglePaymentForm(true, loan_index)}>
                              New Payment
                            </a>
                          </li>
                        : null }
                      </ul>

                      {loan.payment_fields.shown?
                        <ul className="payment-form">
                          <li>
                            Amount Paid
                            <InputText
                            numberOnly={true}
                            value={loan.payment_fields.amount.value}
                            placeholder="Amount paid..."
                            onChange={value => this.props.changeAmountPaid(value, loan_index)}
                            errors={loan.payment_fields.amount.errors}
                            disabled={loan.payment_fields.backend.processing} />
                            <p><strong>{currency(loan.payment_fields.amount.value)}</strong> Pesos</p>
                          </li>
                          <li className="select-collection">
                            <p>For the month of</p>
                            <InputSelect
                            className="payment-period"
                            onChange={value => this.props.changePeriodMonth(value, loan_index)}
                            value={loan.payment_fields.period.month}
                            disabled={loan.payment_fields.backend.processing}
                            errors={[]}>
                              {monthList().map((month, index) =>
                                <option key={index}>{month}</option>
                              )}
                            </InputSelect>
                            <InputSelect
                            className="payment-period"
                            onChange={value => this.props.changePeriodYear(value, loan_index)}
                            value={loan.payment_fields.period.year}
                            disabled={loan.payment_fields.backend.processing}
                            errors={[]} >
                              {years}
                            </InputSelect>
                          </li>
                          <li>
                            For the quarter of
                            <InputSelect
                            onChange={value => this.props.changePeriodQuarter(value, loan_index)}
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
                          <li className="select-collection">
                            <p>Date paid</p>
                            <InputSelect
                            className="payment-date"
                            onChange={value => this.props.changePaymentMonth(value, loan_index)}
                            value={loan.payment_fields.date_paid.month}
                            disabled={loan.payment_fields.backend.processing}
                            errors={[]}>
                              {monthList().map((month, index) =>
                                <option key={index}>{month}</option>
                              )}
                            </InputSelect>
                            <InputSelect
                            className="payment-date"
                            onChange={value => this.props.changePaymentDate(value, loan_index)}
                            value={loan.payment_fields.date_paid.date}
                            disabled={loan.payment_fields.backend.processing}
                            errors={[]}>
                              {(() => {
                                let max_days_in_month = monthMaxdays(loan.payment_fields.date_paid.month, loan.payment_fields.date_paid.year);
                                let dates = [];

                                for(let a = 1; a <= max_days_in_month; a++) {
                                  dates.push(<option key={a}>{a}</option>);
                                }

                                return dates;
                              })()}
                            </InputSelect>
                            <InputSelect
                            className="payment-date"
                            onChange={value => this.props.changePaymentYear(value, loan_index)}
                            value={loan.payment_fields.date_paid.year}
                            disabled={loan.payment_fields.backend.processing}
                            errors={[]} >
                              {years}
                            </InputSelect>
                          </li>
                          <li>
                            Payment coverage
                            <InputSelect
                            onChange={value => this.props.changePaymentType(value, loan_index)}
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
                              value="Encode payment"
                              onClick={() => this.props.makePayment({
                                loan_id: loan.id,
                                payment_coverage: loan.payment_fields.amount.type,
                                quarter: loan.payment_fields.period.quarter,
                                amount: loan.payment_fields.amount.value,
                                period_paid: new Date(loan.payment_fields.period.month + new Date(loan.loan_date).getDate().toString() + ', ' + loan.payment_fields.period.year).toISOString(),
                                date_paid: new Date(loan.payment_fields.date_paid.month + ' ' + loan.payment_fields.date_paid.date + ', ' + loan.payment_fields.date_paid.year).toISOString()
                              }, loan_index)}
                              sending={loan.payment_fields.backend.processing}
                              disabled={loan.payment_fields.allow_submit && !loan.payment_fields.backend.processing? false : true}
                              errors={[]} />
                            </div>

                            <div className="buttons">
                              <a
                              className={loan.payment_fields.backend.processing? 'default-btn-red disabled' : 'default-btn-red'}
                              onClick={() => loan.payment_fields.backend.processing? false : this.props.togglePaymentForm(false, loan_index)}>
                                Cancel
                              </a>
                            </div>

                            {loan.payment_fields.backend.status == 'failed'?
                              <p className="errors">Failed to make payment: <u>{loan.payment_fields.backend.message}</u></p>
                            : null}
                          </li>
                        </ul>
                      : null}

                      <h1>Payments summary</h1>

                      <div className="payment-container">
                        <div className="row">
                          <WithLabel label="Total amount paid">
                            <p><strong>{currency(loan.summary.total_amount_paid)}</strong> Pesos</p>
                          </WithLabel>
                        </div>

                        <div className="row">
                          <WithLabel label="Payable balance">
                            <p><strong>{currency(loan.summary.payable_balance)}</strong> Pesos</p>
                          </WithLabel>
                        </div>

                        <div className="row">
                          <WithLabel label="Payable months">
                            {loan.summary.months_left == 0?
                              <p>None</p>
                            : loan.summary.months_left > 1?
                              <p>{Math.ceil(loan.summary.months_left)} Months</p>
                            : <p>{Math.ceil(loan.summary.months_left)} Month</p>}
                          </WithLabel>
                        </div>
                      </div>

                      <h1>Payments details</h1>

                      {loan.payments.length? loan.payments.map((payment, payment_index) =>
                        payment.edit.shown?
                          <div className="payment-container" key={payment_index}>
                            <ul className="payment-edit-fields">
                              <li>
                                Amount paid
                                <InputText
                                numberOnly={true}
                                value={payment.edit.amount.value}
                                placeholder="Amount paid..."
                                onChange={value => this.props.editPaymentInformationAmount(value, payment_index, loan_index)}
                                errors={payment.edit.amount.errors}
                                disabled={payment.edit.backend.processing} />
                                <p><strong>{currency(payment.edit.amount.value)}</strong> Pesos</p>
                              </li>
                              <li className="select-collection">
                                <p>For the month of</p>
                                <InputSelect
                                className="payment-period"
                                onChange={value => this.props.editPaymentInformationPeriodMonth(value, payment_index, loan_index)}
                                value={payment.edit.period.month}
                                disabled={payment.edit.backend.processing}
                                errors={[]}>
                                  {monthList().map((month, index) =>
                                    <option key={index}>{month}</option>
                                  )}
                                </InputSelect>
                                <InputSelect
                                className="payment-period"
                                onChange={value => this.props.editPaymentInformationPeriodYear(value, payment_index, loan_index)}
                                value={payment.edit.period.year}
                                disabled={payment.edit.backend.processing}
                                errors={[]} >
                                  {years}
                                </InputSelect>
                              </li>
                              <li>
                                For the quarter of
                                <InputSelect
                                onChange={value => this.props.changePeriodQuarter(value, payment_index)}
                                value={loan.payment_method != 2? '' : payment.edit.period.quarter}
                                disabled={payment.edit.backend.processing || loan.payment_method != 2}
                                errors={[]}>
                                  {loan.payment_method != 2?
                                    <option>N/A</option>
                                  : null}
                                  <option value="q1">1st Quarter</option>
                                  <option value="q2">2nd Quarter</option>
                                </InputSelect>
                              </li>
                              <li className="select-collection">
                                <p>Date paid</p>
                                <InputSelect
                                className="payment-date"
                                onChange={value => this.props.editPaymentInformationPaymentMonth(value, payment_index, loan_index)}
                                value={payment.edit.date_paid.month}
                                disabled={payment.edit.backend.processing}
                                errors={[]}>
                                  {monthList().map((month, index) =>
                                    <option key={index}>{month}</option>
                                  )}
                                </InputSelect>
                                <InputSelect
                                className="payment-date"
                                onChange={value => this.props.editPaymentInformationPaymentDate(value, payment_index, loan_index)}
                                value={payment.edit.date_paid.date}
                                disabled={payment.edit.backend.processing}
                                errors={[]}>
                                  {(() => {
                                    let max_days_in_month = monthMaxdays(payment.edit.date_paid.month, payment.edit.date_paid.year);
                                    let dates = [];

                                    for(let a = 1; a <= max_days_in_month; a++) {
                                      dates.push(<option key={a}>{a}</option>);
                                    }

                                    return dates;
                                  })()}
                                </InputSelect>
                                <InputSelect
                                className="payment-date"
                                onChange={value => this.props.editPaymentInformationPaymentYear(value, payment_index, loan_index)}
                                value={payment.edit.date_paid.year}
                                disabled={payment.edit.backend.processing}
                                errors={[]} >
                                  {years}
                                </InputSelect>
                              </li>
                              <li>
                                Payment coverage
                                <InputSelect
                                onChange={value => this.props.editPaymentInformationPaymentType(value, payment_index, loan_index)}
                                value={payment.edit.amount.type}
                                disabled={payment.edit.backend.processing}
                                errors={[]}>
                                  <option value="period-only">For the period only</option>
                                  <option value="partial-only">Partial payment</option>
                                  <option value="paid-in-full">Full payment</option>
                                </InputSelect>
                              </li>
                              <li>
                                <div className="buttons">
                                  <InputButton
                                  value="Save changes"
                                  onClick={() => this.props.editPaymentInformationSend({
                                    payment_id: payment.id,
                                    payment_coverage: payment.edit.amount.type,
                                    quarter: payment.edit.period.quarter,
                                    amount: payment.edit.amount.value,
                                    period_paid: new Date(payment.edit.period.month + ' ' + new Date(loan.loan_date).getDate().toString() + ', ' + payment.edit.period.year).toISOString(),
                                    date_paid: new Date(payment.edit.date_paid.month + ' ' + payment.edit.date_paid.date + ', ' + payment.edit.date_paid.year).toISOString()
                                  }, payment_index, loan_index)}
                                  sending={payment.edit.backend.processing}
                                  disabled={payment.edit.allow_submit && !payment.edit.backend.processing? false : true}
                                  errors={[]} />
                                </div>

                                <div className="buttons">
                                  <a
                                  className={payment.edit.backend.processing? 'default-btn-red disabled' : 'default-btn-red'}
                                  onClick={() => payment.edit.backend.processing? false : this.props.toggleEditPaymentInformation(!payment.edit.shown, payment_index, loan_index)}>
                                    Cancel
                                  </a>
                                </div>
                              </li>
                              {payment.edit.backend.status == 'failed'?
                                <li>
                                  <WithIcon icon={path.join(app_path, 'app/images/cross.png')}>
                                    <p className="errors">Failed to save changes <u>{payment.edit.backend.message}</u></p>
                                  </WithIcon>
                                </li>
                              : payment.edit.backend.status == 'successful'?
                                <li>
                                  <WithIcon icon={path.join(app_path, 'app/images/check.png')}>
                                    <p className="okay">Changes saved successfully.</p>
                                  </WithIcon>
                                </li>
                              : null}
                            </ul>
                          </div>: 
                          <div className="payment-container" key={payment_index}>
                            <div className="row">
                              <WithLabel label="Payment period">
                                {loan.payment_method == 1?
                                  <p>For the Month of {monthList()[new Date(payment.period_paid).getMonth()]}</p>
                                : loan.payment_method == 2?
                                  <p><strong>{payment.quarter == 'q1'? '1st' : '2nd'} quarter</strong> of <strong>{monthList()[new Date(payment.period_paid).getMonth()]}</strong></p>
                                : <p>blank day of the period</p>}
                              </WithLabel>
                            </div>

                            <div className="row">
                              <WithLabel label="Amount">
                                {payment.payment_coverage == 'period-only'?
                                  <p>Payment of <strong>{currency(payment.amount)}</strong> Pesos <strong>for the period only</strong>.</p>
                                : payment.payment_coverage == 'partial-only'?
                                  <p><strong>Partial payment</strong> of <strong>{currency(payment.amount)} Pesos</strong> for the period only.</p>
                                : <p><strong>Full payment</strong> of <strong>{currency(payment.amount)} Pesos</strong> for this loan.</p>}
                              </WithLabel>
                            </div>

                            <div className="row">
                              <WithLabel label="Date paid">
                                <p>{toFormalDate(payment.date_paid)}</p>
                              </WithLabel>
                            </div>

                           <div className="row">
                            <a
                            className={loan.payment_fields.backend.processing? 'default-btn-blue disabled' : 'default-btn-blue'}
                            onClick={() => loan.payment_fields.backend.processing? false : this.props.toggleEditPaymentInformation(!payment.edit.shown, payment_index, loan_index)}>
                              Edit payment information
                            </a>
                           </div> 
                          </div> ) :
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
  changePaymentMonth: borrowerProfileActions.changePaymentMonth,
  changePaymentDate: borrowerProfileActions.changePaymentDate,
  changePaymentYear: borrowerProfileActions.changePaymentYear,
  makePayment: borrowerProfileActions.makePayment,
  toggleEditPaymentInformation: borrowerProfileActions.toggleEditPaymentInformation,
  editPaymentInformationAmount: borrowerProfileActions.editPaymentInformationAmount,
  editPaymentInformationPaymentType: borrowerProfileActions.editPaymentInformationPaymentType,
  editPaymentInformationPeriodMonth: borrowerProfileActions.editPaymentInformationPeriodMonth,
  editPaymentInformationPeriodYear: borrowerProfileActions.editPaymentInformationPeriodYear,
  editPaymentInformationPaymentYear: borrowerProfileActions.editPaymentInformationPaymentYear,
  editPaymentInformationPaymentMonth: borrowerProfileActions.editPaymentInformationPaymentMonth,
  editPaymentInformationPaymentDate: borrowerProfileActions.editPaymentInformationPaymentDate,
  editPaymentInformationSend: borrowerProfileActions.editPaymentInformationSend,
  toggleEditLoanInformation: borrowerProfileActions.toggleEditLoanInformation,
  editLoanInformationAmount: borrowerProfileActions.editLoanInformationAmount,
  editLoanInformationCondition: borrowerProfileActions.editLoanInformationCondition,
  editLoanInformationInterestRate: borrowerProfileActions.editLoanInformationInterestRate,
  editLoanInformationInterestType: borrowerProfileActions.editLoanInformationInterestType,
  editLoanInformationMonthsToPay: borrowerProfileActions.editLoanInformationMonthsToPay,
  editLoanInformationDateLoanMonth: borrowerProfileActions.editLoanInformationDateLoanMonth,
  editLoanInformationDateLoanDate: borrowerProfileActions.editLoanInformationDateLoanDate,
  editLoanInformationDateLoanYear: borrowerProfileActions.editLoanInformationDateLoanYear,
  editLoanInformatioPaymentMethod: borrowerProfileActions.editLoanInformatioPaymentMethod,
  editLoanInformatioSend: borrowerProfileActions.editLoanInformatioSend
})(BorrowerProfile);