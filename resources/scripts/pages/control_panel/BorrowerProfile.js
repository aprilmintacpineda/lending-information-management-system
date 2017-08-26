import React, { Component } from 'react';
import { connect } from 'react-redux';
import { remote } from 'electron';
import { Link } from 'react-router';
import path from 'path';
import CssTransitionGroup from 'react-addons-css-transition-group';

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

    this.showLoanInformation = this.showLoanInformation.bind(this);
    this.showLoanPayment = this.showLoanPayment.bind(this);
  }

  componentWillMount() {
    document.title = 'Borrower profile - LIMS';
    this.props.fetch(this.props.params.id);
  }

  componentWillUnmount() {
    this.props.reset();
  }

  componentDidUpdate() {
    if(window.location.hash && this['loan_id_' + window.location.hash.substring(1)]) {
      window.scrollTo(0, this['loan_id_' + window.location.hash.substring(1)].offsetTop - 40);
    }
  }

  showLoanPayment(loan, loan_payment, loan_payment_index, loan_index, app_path) {
    return (
      <div>
        <div className="row">
          <WithLabel label="Trace ID">
            <p>{loan_payment.id}</p>
          </WithLabel>
        </div>

        <div className="row">
          <WithLabel label="Payment period">
            {loan.payment_method == 1?
              <p>For the Month of {monthList()[new Date(loan_payment.period_paid).getMonth()]}</p>
            : loan.payment_method == 2?
              <p><strong>{loan_payment.quarter == 'q1'? '1st' : '2nd'} quarter</strong> of <strong>{monthList()[new Date(loan_payment.period_paid).getMonth()]}</strong></p>
            : <p>blank day of the period</p>}
          </WithLabel>
        </div>

        <div className="row">
          <WithLabel label="Amount">
            {loan_payment.payment_coverage == 'period-only'?
              <p>Payment of <strong>{currency(loan_payment.amount)}</strong> Pesos <strong>for the period only</strong>.</p>
            : loan_payment.payment_coverage == 'partial-only'?
              <p><strong>Partial payment</strong> of <strong>{currency(loan_payment.amount)} Pesos</strong> for the period only.</p>
            : <p><strong>Full payment</strong> of <strong>{currency(loan_payment.amount)} Pesos</strong> for this loan.</p>}
          </WithLabel>
        </div>

        <div className="row">
          <WithLabel label="Date paid">
            <p>{toFormalDate(loan_payment.date_paid)}</p>
          </WithLabel>
        </div>

        {loan_payment.edit.backend.status == 'successful'?
          <div className="row">
            <WithIcon icon={path.join(app_path, 'app/images/check.png')}>
              <p className="okay">Changes saved successfully.</p>
            </WithIcon>
          </div>
        : null}

        <div className="row">
          <a
          className={loan.payment_fields.backend.processing? 'default-btn-blue disabled' : 'default-btn-blue'}
          onClick={() => loan.payment_fields.backend.processing? false : this.props.toggleEditPaymentInformation(!loan_payment.edit.shown, loan_payment_index, loan_index)}>
            Edit payment information
          </a>
        </div>
      </div>
    );
  }

  showLoanInformation(loan, loan_index, app_path) {
    return (
      <div>
        <h1 className="loan-date-h1">{toFormalDate(loan.loan_date)}</h1>

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
                    disabled={loan.loan_payments.length || loan.edit.backend.processing? true : false}
                    errors={[]}>
                      {monthList().map((month, month_index) => <option key={month_index}>{month}</option>)}
                    </InputSelect>

                    <InputSelect
                    className="date-loan"
                    onChange={value => this.props.editLoanInformationDateLoanDate(value, loan_index)}
                    value={loan.edit.loan_date.date}
                    disabled={loan.loan_payments.length || loan.edit.backend.processing? true : false}
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
                    disabled={loan.loan_payments.length || loan.edit.backend.processing? true : false}
                    errors={[]}>
                      {(() => {
                        let date = new Date;
                        let years = [];
                        let max_year = date.getFullYear();
                        let min_year = max_year - 10;

                        for(let a = max_year; a >= min_year; a--) {
                          years.push(<option key={a}>{a}</option>);
                        }

                        return years;
                      })()}
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
                    disabled={loan.loan_payments.length || loan.edit.backend.processing? true : false} />
                    <p><strong>{currency(loan.edit.amount_loan.value)}</strong> Pesos</p>
                  </li>
                  <li>
                    Loan condition<br/>
                    <input
                    id="apply-due-date-interest"
                    type="radio"
                    disabled={loan.loan_payments.length || loan.edit.backend.processing? true : false}
                    checked={loan.edit.amount_loan.condition == 'due-date-and-interest'}
                    onChange={changeEvent => {
                      if(changeEvent.target.checked) this.props.editLoanInformationCondition('due-date-and-interest', loan_index);
                    }} />
                    <label htmlFor="apply-due-date-interest">Apply due date and interest</label>
                    <br/>
                    <input
                    id="apply-interest-only"
                    type="radio"
                    disabled={loan.loan_payments.length || loan.edit.backend.processing? true : false}
                    checked={loan.edit.amount_loan.condition == 'interest-only'}
                    onChange={changeEvent => {
                      if(changeEvent.target.checked) this.props.editLoanInformationCondition('interest-only', loan_index);
                    }} />
                    <label htmlFor="apply-interest-only">Apply interest only</label>
                    <br/>
                    <input
                    id="apply-due-date-only"
                    type="radio"
                    disabled={loan.loan_payments.length || loan.edit.backend.processing? true : false}
                    checked={loan.edit.amount_loan.condition == 'due-date-only'}
                    onChange={changeEvent => {
                      if (changeEvent.target.checked) this.props.editLoanInformationCondition('due-date-only', loan_index);
                    }} />
                    <label htmlFor="apply-due-date-only">Apply due date only</label>
                    <br/>
                    <input
                    id="no-due-date-no-interest"
                    type="radio"
                    disabled={loan.loan_payments.length || loan.edit.backend.processing? true : false}
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
                    disabled={loan.loan_payments.length || loan.edit.backend.processing? true : (loan.edit.amount_loan.condition == 'interest-only' || loan.edit.amount_loan.condition == 'due-date-and-interest') && !loan.edit.backend.processing? false : true} />
                    {loan.edit.amount_loan.condition == 'interest-only' || loan.edit.amount_loan.condition == 'due-date-and-interest'?
                      <p>{currency(loan.edit.interest_rate.value)} {loan.edit.interest_rate.type == 'percentage'? 'Percent' : 'Pesos'}</p>
                    : null}
                  </li>
                  <li>
                    <input
                    id="interest-type-percentage"
                    type="radio"
                    disabled={loan.loan_payments.length || loan.edit.backend.processing? true : loan.edit.backend.processing || loan.edit.amount_loan.condition == 'due-date-only' || loan.edit.amount_loan.condition == 'no-due-date-and-interest'}
                    checked={loan.edit.interest_rate.type == 'percentage'}
                    onChange={() => this.props.editLoanInformationInterestType('percentage', loan_index)} />
                    <label htmlFor="interest-type-percentage">Percentage</label>
                    <br/>
                    <input
                    id="interest-type-fixed"
                    type="radio"
                    disabled={loan.loan_payments.length || loan.edit.backend.processing? true : loan.edit.amount_loan.condition == 'due-date-only' || loan.edit.amount_loan.condition == 'no-due-date-and-interest'}
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
                    disabled={loan.loan_payments.length || loan.edit.backend.processing? true : (loan.edit.amount_loan.condition == 'due-date-only' || loan.edit.amount_loan.condition == 'due-date-and-interest') && !loan.edit.backend.processing? false : true} />
                  </li>
                  <li>
                    Payment Method
                    <InputSelect
                    className="payment-method"
                    onChange={value => this.props.editLoanInformatioPaymentMethod(value, loan_index)}
                    value={loan.edit.backend.processing || loan.edit.amount_loan.condition == 'interest-only' || loan.edit.amount_loan.condition == 'no-due-date-and-interest'? '0' : loan.edit.payment_method.value}
                    disabled={loan.loan_payments.length || loan.edit.backend.processing? true : loan.edit.amount_loan.condition == 'interest-only' || loan.edit.amount_loan.condition == 'no-due-date-and-interest'}
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
                      date_loan: new Date(loan.edit.loan_date.month + ' ' + loan.edit.loan_date.date + ', ' + loan.edit.loan_date.year).toISOString(),
                      payment_method: loan.edit.payment_method.value,
                      id: loan.id
                    }, loan_index)}
                    sending={loan.edit.backend.processing}
                    disabled={!loan.loan_payments.length && loan.edit.backend.allow_submit && !loan.edit.backend.processing? false : true}
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

                <div className="row">
                  {!loan.edit.backend.processing && loan.edit.backend.status == 'failed'?
                    <WithIcon icon={path.join(app_path, 'app/images/cross.png')}>
                      <p className="errors">Failed to save changes <u>{loan.edit.backend.message}</u></p>
                    </WithIcon>
                  : null}
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

                {!loan.edit.backend.processing && loan.edit.backend.status == 'successful'?
                  <div className="row">
                    <WithIcon icon={path.join(app_path, 'app/images/check.png')}>
                      <p className="okay">Changes saved successfully.</p>
                    </WithIcon>
                  </div>
                : null}

                <div className="row">
                  <WithLabel label="Trace ID">
                    <p>{loan.id}</p>
                  </WithLabel>
                </div>

                <div className="row">
                  {!loan.summary.remaining_balance?
                    <WithIcon icon={path.join(app_path, 'app/images/check.png')}>
                      <p className="okay">Fully paid</p>
                    </WithIcon>
                  : <WithIcon icon={path.join(app_path, 'app/images/cross.png')}>
                      <p className="errors">Not yet fully paid</p>
                    </WithIcon>}
                </div>

                {!loan.fully_paid?
                  <div className="row">
                    <WithLabel label="Next due date">
                      <p><strong>{loan.loan_payments.length? getFormalDueDate(loan.loan_payments[0].period_paid) : getFormalDueDate(loan.loan_date)}</strong></p>
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
                        <p className="okay">Interest</p>
                      </WithIcon> : 
                      <WithIcon icon={path.join(app_path, 'app/images/cross.png')}>
                        <p className="errors">Interest</p>
                      </WithIcon>}

                      {loan.condition_applied == 'due-date-and-interest' || loan.condition_applied == 'due-date-only'?
                        <WithIcon icon={path.join(app_path, 'app/images/check.png')}>
                          <p className="okay">Due date</p>
                        </WithIcon> : 
                        <WithIcon icon={path.join(app_path, 'app/images/cross.png')}>
                          <p className="errors">Due date</p>
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

                <h1>Payments summary</h1>

                <div className="row">
                  <WithLabel label="Total amount paid">
                    <p><strong>{currency(loan.summary.total_amount_paid)}</strong> Pesos</p>
                  </WithLabel>
                </div>

                <div className="row">
                  <WithLabel label="Remaining balance">
                    <p><strong>{currency(loan.summary.remaining_balance)}</strong> Pesos</p>
                  </WithLabel>
                </div>

                <div className="row">
                  <WithLabel label="Remaining months">
                    {loan.summary.months_left == 0?
                      <p>None</p>
                    : loan.summary.months_left > 1?
                      <p>{Math.ceil(loan.summary.months_left)} Months</p>
                    : <p>{Math.ceil(loan.summary.months_left)} Month</p>}
                  </WithLabel>
                </div>

                <h1>Penalties summary</h1>

                <div className="row">
                  <WithLabel label="Total number of penalties">
                    <p>{loan.penalties.length}</p>
                  </WithLabel>
                </div>

                {(() => {
                  let total_amount_to_pay = 0;
                  let total_amount_paid = 0;
                  let remaining_balance = 0;

                  loan.penalties.forEach(penalty => {
                    total_amount_to_pay += penalty.summary.remaining_balance + penalty.summary.total_amount_paid;
                    total_amount_paid += penalty.summary.total_amount_paid;
                    remaining_balance += penalty.summary.remaining_balance;
                  });

                  return (
                    <div>
                      <div className="row">
                        <WithLabel label="Total amount to pay">
                          <p><strong>{currency(total_amount_to_pay)}</strong> Pesos</p>
                        </WithLabel>
                      </div>

                      <div className="row">
                        <WithLabel label="Total amount paid">
                          <p><strong>{currency(total_amount_paid)}</strong> Pesos</p>
                        </WithLabel>
                      </div>

                      <div className="row">
                        <WithLabel label="Remaining balance">
                          <p><strong>{currency(remaining_balance)}</strong> Pesos</p>
                        </WithLabel>
                      </div>
                    </div>
                  );
                })()}
              </div>}

            <div className="right left-right-columned inner">
              <div className="left">
                <h1>Loan payments</h1>

                {loan.summary.remaining_balance?
                  <div className="row">
                    {!loan.payment_fields.shown?
                      <ul className="actions">
                        <li>
                          <a className={loan.payment_fields.backend.processing? 'default-btn-blue disabled' : 'default-btn-blue'}
                          onClick={() => loan.payment_fields.backend.processing? false : this.props.togglePaymentForm(true, loan_index)}>
                            Add new loan payment
                          </a>
                        </li>
                      </ul>
                    : <ul className="payment-form">
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
                          className="date"
                          onChange={value => this.props.changePeriodMonth(value, loan_index)}
                          value={loan.payment_fields.period.month}
                          disabled={loan.payment_fields.backend.processing}
                          errors={[]}>
                            {monthList().map((month, index) =>
                              <option key={index}>{month}</option>
                            )}
                          </InputSelect>
                          <InputSelect
                          className="date"
                          onChange={value => this.props.changePeriodYear(value, loan_index)}
                          value={loan.payment_fields.period.year}
                          disabled={loan.payment_fields.backend.processing}
                          errors={[]} >
                            {(() => {
                              let date = new Date;
                              let years = [];
                              let max_year = date.getFullYear();
                              let min_year = max_year - 10;

                              for(let a = max_year; a >= min_year; a--) {
                                years.push(<option key={a}>{a}</option>);
                              }

                              return years;
                            })()}
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
                          className="date"
                          onChange={value => this.props.changePaymentMonth(value, loan_index)}
                          value={loan.payment_fields.date_paid.month}
                          disabled={loan.payment_fields.backend.processing}
                          errors={[]}>
                            {monthList().map((month, index) =>
                              <option key={index}>{month}</option>
                            )}
                          </InputSelect>
                          <InputSelect
                          className="date"
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
                          className="date"
                          onChange={value => this.props.changePaymentYear(value, loan_index)}
                          value={loan.payment_fields.date_paid.year}
                          disabled={loan.payment_fields.backend.processing}
                          errors={[]} >
                            {(() => {
                              let date = new Date;
                              let years = [];
                              let max_year = date.getFullYear();
                              let min_year = max_year - 10;

                              for(let a = max_year; a >= min_year; a--) {
                                years.push(<option key={a}>{a}</option>);
                              }

                              return years;
                            })()}
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
                      </ul> }
                  </div>
                : null}

                {loan.payment_fields.backend.status == 'successful'  && !loan.payment_fields.shown?
                  <div className="row">
                    <WithIcon icon={path.join(app_path, 'app/images/check.png')}>
                      <p className="okay">Payment added successfully.</p>
                    </WithIcon>
                   </div>
                : null}

                <div className="row">
                  <CssTransitionGroup
                  transitionName="emphasize-entry"
                  transitionEnterTimeout={400}
                  transitionLeaveTimeout={400}>
                    {loan.loan_payments.length? loan.loan_payments.map((loan_payment, loan_payment_index) =>
                      loan_payment.edit.shown?
                        <div className="payment-container" key={loan.loan_payments.length - loan_payment_index}>
                          <ul className="payment-edit-fields">
                            <li>
                              Amount paid
                              <InputText
                              numberOnly={true}
                              value={loan_payment.edit.amount.value}
                              placeholder="Amount paid..."
                              onChange={value => this.props.editPaymentInformationAmount(value, loan_payment_index, loan_index)}
                              errors={loan_payment.edit.amount.errors}
                              disabled={loan_payment.edit.backend.processing} />
                              <p><strong>{currency(loan_payment.edit.amount.value)}</strong> Pesos</p>
                            </li>
                            <li className="select-collection">
                              <p>For the month of</p>
                              <InputSelect
                              className="date"
                              onChange={value => this.props.editPaymentInformationPeriodMonth(value, loan_payment_index, loan_index)}
                              value={loan_payment.edit.period.month}
                              disabled={loan_payment.edit.backend.processing}
                              errors={[]}>
                                {monthList().map((month, index) =>
                                  <option key={index}>{month}</option>
                                )}
                              </InputSelect>
                              <InputSelect
                              className="date"
                              onChange={value => this.props.editPaymentInformationPeriodYear(value, loan_payment_index, loan_index)}
                              value={loan_payment.edit.period.year}
                              disabled={loan_payment.edit.backend.processing}
                              errors={[]} >
                                {(() => {
                                  let date = new Date;
                                  let years = [];
                                  let max_year = date.getFullYear();
                                  let min_year = max_year - 10;

                                  for(let a = max_year; a >= min_year; a--) {
                                    years.push(<option key={a}>{a}</option>);
                                  }

                                  return years;
                                })()}
                              </InputSelect>
                            </li>
                            <li>
                              For the quarter of
                              <InputSelect
                              onChange={value => this.props.changePeriodQuarter(value, loan_payment_index)}
                              value={loan.payment_method != 2? '' : loan_payment.edit.period.quarter}
                              disabled={loan_payment.edit.backend.processing || loan.payment_method != 2}
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
                              className="date"
                              onChange={value => this.props.editPaymentInformationPaymentMonth(value, loan_payment_index, loan_index)}
                              value={loan_payment.edit.date_paid.month}
                              disabled={loan_payment.edit.backend.processing}
                              errors={[]}>
                                {monthList().map((month, index) =>
                                  <option key={index}>{month}</option>
                                )}
                              </InputSelect>
                              <InputSelect
                              className="date"
                              onChange={value => this.props.editPaymentInformationPaymentDate(value, loan_payment_index, loan_index)}
                              value={loan_payment.edit.date_paid.date}
                              disabled={loan_payment.edit.backend.processing}
                              errors={[]}>
                                {(() => {
                                  let max_days_in_month = monthMaxdays(loan_payment.edit.date_paid.month, loan_payment.edit.date_paid.year);
                                  let dates = [];

                                  for(let a = 1; a <= max_days_in_month; a++) {
                                    dates.push(<option key={a}>{a}</option>);
                                  }

                                  return dates;
                                })()}
                              </InputSelect>
                              <InputSelect
                              className="date"
                              onChange={value => this.props.editPaymentInformationPaymentYear(value, loan_payment_index, loan_index)}
                              value={loan_payment.edit.date_paid.year}
                              disabled={loan_payment.edit.backend.processing}
                              errors={[]} >
                                {(() => {
                                  let date = new Date;
                                  let years = [];
                                  let max_year = date.getFullYear();
                                  let min_year = max_year - 10;

                                  for(let a = max_year; a >= min_year; a--) {
                                    years.push(<option key={a}>{a}</option>);
                                  }

                                  return years;
                                })()}
                              </InputSelect>
                            </li>
                            <li>
                              Payment coverage
                              <InputSelect
                              onChange={value => this.props.editPaymentInformationPaymentType(value, loan_payment_index, loan_index)}
                              value={loan_payment.edit.amount.type}
                              disabled={loan_payment.edit.backend.processing}
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
                                  payment_id: loan_payment.id,
                                  payment_coverage: loan_payment.edit.amount.type,
                                  quarter: loan_payment.edit.period.quarter,
                                  amount: loan_payment.edit.amount.value,
                                  period_paid: new Date(loan_payment.edit.period.month + ' ' + new Date(loan.loan_date).getDate().toString() + ', ' + loan_payment.edit.period.year).toISOString(),
                                  date_paid: new Date(loan_payment.edit.date_paid.month + ' ' + loan_payment.edit.date_paid.date + ', ' + loan_payment.edit.date_paid.year).toISOString()
                                }, loan_payment_index, loan_index)}
                                sending={loan_payment.edit.backend.processing}
                                disabled={loan_payment.edit.allow_submit && !loan_payment.edit.backend.processing? false : true}
                                errors={[]} />
                              </div>

                              <div className="buttons">
                                <a
                                className={loan_payment.edit.backend.processing? 'default-btn-red disabled' : 'default-btn-red'}
                                onClick={() => loan_payment.edit.backend.processing? false : this.props.toggleEditPaymentInformation(!loan_payment.edit.shown, loan_payment_index, loan_index)}>
                                  Cancel
                                </a>
                              </div>
                            </li>
                            {loan_payment.edit.backend.status == 'failed'?
                              <li>
                                <WithIcon icon={path.join(app_path, 'app/images/cross.png')}>
                                  <p className="errors">Failed to save changes <u>{loan_payment.edit.backend.message}</u></p>
                                </WithIcon>
                              </li>
                            : null}
                          </ul>
                        </div> : 
                        <div className="payment-container" key={loan.loan_payments.length - loan_payment_index}>
                          {window.location.hash && window.location.hash.substring(1) == loan_payment.id?
                            <CssTransitionGroup
                            transitionName="emphasize-background"
                            transitionAppear={true}
                            transitionAppearTimeout={400}>
                              {this.showLoanPayment(loan, loan_payment, loan_payment_index, loan_index, app_path)}
                            </CssTransitionGroup>
                          : this.showLoanPayment(loan, loan_payment, loan_payment_index, loan_index, app_path)}
                        </div>)
                    : <div className="row">
                        <p>No payments has been made since <strong>{toFormalDate(loan.loan_date)}</strong></p>
                      </div>}
                  </CssTransitionGroup>
                </div>
              </div>

              <div className="right">
                <h1>Penalties</h1>

                {!loan.penalty_fields.shown?
                  <div className="row">
                    <a className={loan.penalty_fields.backend.processing? 'default-btn-blue disabled' : 'default-btn-blue'}
                    onClick={() => loan.penalty_fields.backend.processing? false : this.props.togglePenaltyForm(true, loan_index)}>
                      Add new penalty
                    </a>
                  </div>
                : <ul className="penalty-form">
                    <li>
                      Amount
                      <InputText
                      numberOnly={true}
                      value={loan.penalty_fields.amount.value}
                      placeholder="Amount..."
                      onChange={value => this.props.changePenaltyFormAmount(value, loan_index)}
                      errors={loan.penalty_fields.amount.errors}
                      disabled={loan.penalty_fields.backend.processing} />
                      <p><strong>{currency(loan.penalty_fields.amount.value)}</strong> Pesos</p>
                    </li>
                    <li className="select-collection">
                      <p>Date given</p>
                      <InputSelect
                      className="date"
                      onChange={value => this.props.changePenaltyMonth(value, loan_index)}
                      value={loan.penalty_fields.date_given.month}
                      disabled={loan.penalty_fields.backend.processing}
                      errors={[]}>
                        {monthList().map((month, index) =>
                          <option key={index}>{month}</option>
                        )}
                      </InputSelect>
                      <InputSelect
                      className="date"
                      onChange={value => this.props.changePenaltyDate(value, loan_index)}
                      value={loan.penalty_fields.date_given.date}
                      disabled={loan.penalty_fields.backend.processing}
                      errors={[]}>
                        {(() => {
                          let max_days_in_month = monthMaxdays(loan.penalty_fields.date_given.month, loan.penalty_fields.date_given.year);
                          let dates = [];

                          for(let a = 1; a <= max_days_in_month; a++) {
                            dates.push(<option key={a}>{a}</option>);
                          }

                          return dates;
                        })()}
                      </InputSelect>
                      <InputSelect
                      className="date"
                      onChange={value => this.props.changePenaltyYear(value, loan_index)}
                      value={loan.penalty_fields.date_given.year}
                      disabled={loan.penalty_fields.backend.processing}
                      errors={[]} >
                        {(() => {
                          let date = new Date;
                          let years = [];
                          let max_year = date.getFullYear();
                          let min_year = max_year - 10;

                          for(let a = max_year; a >= min_year; a--) {
                            years.push(<option key={a}>{a}</option>);
                          }

                          return years;
                        })()}
                      </InputSelect>
                    </li>
                    <li>
                      <p>Remarks</p>
                      <WithIcon icon={path.join(app_path, 'app/images/information.png')}>
                        <p>A short description about this penalty, e.g., <i>No payment in two months</i>.</p>
                      </WithIcon>
                      <InputText
                      value={loan.penalty_fields.remarks.value}
                      placeholder="Remarks..."
                      onChange={value => this.props.changePenaltyFormRemarks(value, loan_index)}
                      errors={loan.penalty_fields.remarks.errors}
                      disabled={loan.penalty_fields.backend.processing} />
                    </li>
                    <li>
                      <div className="buttons">
                        <InputButton
                        value="Create penalty"
                        onClick={() => this.props.createPenalty({
                          amount: loan.penalty_fields.amount.value,
                          remarks: loan.penalty_fields.remarks.value,
                          date_given: new Date(loan.penalty_fields.date_given.month + ' ' + loan.penalty_fields.date_given.date + ', ' + loan.penalty_fields.date_given.year).toISOString(),
                          loan_id: loan.id
                        }, loan_index)}
                        sending={loan.penalty_fields.backend.processing}
                        disabled={loan.penalty_fields.allow_submit && !loan.penalty_fields.backend.processing? false : true}
                        errors={[]} />
                      </div>

                      <div className="buttons">
                        <a
                        className={loan.penalty_fields.backend.processing? 'default-btn-red disabled' : 'default-btn-red'}
                        onClick={() => loan.penalty_fields.backend.processing? false : this.props.togglePenaltyForm(false, loan_index)}>
                          Cancel
                        </a>
                      </div>
                    </li>
                    {loan.penalty_fields.backend.status == 'failed' && !loan.penalty_fields.shown?
                      <li>
                        <p className="errors">Failed to create penalty: <u>{loan.penalty_fields.backend.message}</u></p>
                      </li>
                    : null}
                  </ul>}

                {loan.penalty_fields.backend.status == 'successful' && !loan.penalty_fields.shown?
                <div className="row">
                  <WithIcon icon={path.join(app_path, 'app/images/check.png')}>
                    <p className="okay">Penalty added successfully.</p>
                  </WithIcon>
                 </div>
                : null}

                <CssTransitionGroup
                transitionName="emphasize-entry"
                transitionEnterTimeout={400}
                transitionLeaveTimeout={400}>
                  {loan.penalties.length? loan.penalties.map((penalty, penalty_index) =>
                    <div className="payment-container" key={loan.penalties.length - penalty_index}>
                      {penalty.edit.shown?
                        <ul className="penalty-form">
                          <li>
                            Amount
                            <InputText
                            numberOnly={true}
                            value={penalty.edit.amount.value}
                            placeholder="Amount..."
                            onChange={value => this.props.changePenaltyEditAmount(value, penalty_index, loan_index)}
                            errors={penalty.edit.amount.errors}
                            disabled={penalty.edit.backend.processing} />
                            <p><strong>{currency(penalty.edit.amount.value)}</strong> Pesos</p>
                          </li>
                          <li className="select-collection">
                            <p>Date given</p>
                            <InputSelect
                            className="date"
                            onChange={value => this.props.changePenaltyEditMonth(value, penalty_index, loan_index)}
                            value={penalty.edit.date_given.month}
                            disabled={penalty.edit.backend.processing}
                            errors={[]}>
                              {monthList().map((month, index) =>
                                <option key={index}>{month}</option>
                              )}
                            </InputSelect>
                            <InputSelect
                            className="date"
                            onChange={value => this.props.changePenaltyEditDate(value, penalty_index, loan_index)}
                            value={penalty.edit.date_given.date}
                            disabled={penalty.edit.backend.processing}
                            errors={[]}>
                              {(() => {
                                let max_days_in_month = monthMaxdays(penalty.edit.date_given.month, penalty.edit.date_given.year);
                                let dates = [];

                                for(let a = 1; a <= max_days_in_month; a++) {
                                  dates.push(<option key={a}>{a}</option>);
                                }

                                return dates;
                              })()}
                            </InputSelect>
                            <InputSelect
                            className="date"
                            onChange={value => this.props.changePenaltyEditYear(value, penalty_index, loan_index)}
                            value={penalty.edit.date_given.year}
                            disabled={penalty.edit.backend.processing}
                            errors={[]} >
                              {(() => {
                                let date = new Date;
                                let years = [];
                                let max_year = date.getFullYear();
                                let min_year = max_year - 10;

                                for(let a = max_year; a >= min_year; a--) {
                                  years.push(<option key={a}>{a}</option>);
                                }

                                return years;
                              })()}
                            </InputSelect>
                          </li>
                          <li>
                            <p>Remarks</p>
                            <WithIcon icon={path.join(app_path, 'app/images/information.png')}>
                              <p>A short description about this penalty, e.g., <i>No payment in two months</i>.</p>
                            </WithIcon>
                            <InputText
                            value={penalty.edit.remarks.value}
                            placeholder="Remarks..."
                            onChange={value => this.props.changePenaltyEditRemarks(value, penalty_index, loan_index)}
                            errors={penalty.edit.remarks.errors}
                            disabled={penalty.edit.backend.processing} />
                          </li>
                          <li>
                            <div className="buttons">
                              <InputButton
                              value="Save changes"
                              onClick={() => this.props.savePenaltyEdit({
                                amount: penalty.edit.amount.value,
                                date_given: new Date(penalty.edit.date_given.month + ' ' + penalty.edit.date_given.date + ', ' + penalty.edit.date_given.year).toISOString(),
                                penalty_id: penalty.id,
                                remarks: penalty.edit.remarks.value,
                                loan_index,
                                penalty_index
                              }, penalty_index, loan_index)}
                              sending={penalty.edit.backend.processing}
                              disabled={penalty.edit.allow_submit && !penalty.edit.backend.processing? false : true}
                              errors={[]} />
                            </div>

                            <div className="buttons">
                              <a
                              className={!penalty.edit.backend.processing? 'default-btn-red' : 'default-btn-red disabled'}
                              onClick={() => penalty.edit.backend.processing? false : this.props.togglePenaltyEdit(false, penalty_index, loan_index)}>
                                Cancel
                              </a>
                            </div>
                          </li>
                        </ul>
                      : <div>
                          <div className="row">
                            <WithLabel label="Trace ID">
                              <p>{penalty.id}</p>
                            </WithLabel>
                          </div>

                          {penalty.was_waved?
                            <div className="warning">
                              <WithIcon icon={path.join(app_path, 'app/images/exclamation.png')}>
                                <p className="title">NOTICE</p>
                              </WithIcon>
                              <p>This penalty has been waved.</p>
                            </div>
                          : <div className="row">
                              {!penalty.summary.remaining_balance?
                                <WithIcon icon={path.join(app_path, 'app/images/check.png')}>
                                  <p className="okay">Fully paid</p>
                                </WithIcon>
                                : <WithIcon icon={path.join(app_path, 'app/images/cross.png')}>
                                    <p className="errors">Not yet fully paid</p>
                                  </WithIcon>}
                            </div>}

                          <div className="row">
                            <WithLabel label="Amount">
                              <p>{currency(penalty.amount)} Pesos</p>
                            </WithLabel>
                          </div>

                          <div className="row">
                            <WithLabel label="Remarks">
                              <p>{penalty.remarks}</p>
                            </WithLabel>
                          </div>

                          <div className="row">
                            <WithLabel label="Date given">
                              <p>{toFormalDate(penalty.date_given)}</p>
                            </WithLabel>
                          </div>

                          <div className="row">
                            <WithLabel label="Total amount paid">
                              <p>{currency(penalty.summary.total_amount_paid)} Pesos</p>
                            </WithLabel>
                          </div>

                          <div className="row">
                            <WithLabel label="Remaining balance">
                              {penalty.summary.remaining_balance < 0?
                                <p className="errors">{currency(penalty.summary.remaining_balance)} Pesos</p>
                              : <p>{currency(penalty.summary.remaining_balance)} Pesos</p>}
                            </WithLabel>
                          </div>

                          <div className="row">
                            {penalty.edit.backend.status == 'successful'?
                              <div className="row">
                                <WithIcon icon={path.join(app_path, 'app/images/check.png')}>
                                  <p className="okay">Changes saved successfully.</p>
                                </WithIcon>
                              </div>
                            : null}

                            {!penalty.penalty_payment_fields.shown?
                              <ul className="actions">
                                <li>
                                  <a
                                  className={!penalty.edit.backend.processing? 'default-btn-blue' : 'default-btn-blue disabled'}
                                  onClick={() => penalty.edit.backend.processing? false : this.props.togglePenaltyEdit(true, penalty_index, loan_index)}>
                                    Edit penalty information
                                  </a>
                                </li>
                                <li>
                                  <a
                                  className={!penalty.penalty_payment_fields.backend.processing? 'default-btn-blue' : 'default-btn-blue disabled'}
                                  onClick={() => penalty.penalty_payment_fields.backend.processing? false : this.props.togglePenaltyPaymentForm(true, penalty_index, loan_index)}>
                                    Add new payment
                                  </a>
                                </li>
                              </ul> :
                              <ul className="penalty-payment-form">
                                <li>
                                  Amount
                                  <InputText
                                  numberOnly={true}
                                  value={penalty.penalty_payment_fields.amount.value}
                                  placeholder="Amount..."
                                  onChange={value => this.props.changePenaltyPaymentFormAmount(value, penalty_index, loan_index)}
                                  errors={penalty.penalty_payment_fields.amount.errors}
                                  disabled={penalty.penalty_payment_fields.backend.processing} />
                                  <p><strong>{currency(penalty.penalty_payment_fields.amount.value)}</strong> Pesos</p>
                                </li>
                                <li className="select-collection">
                                  <p>Date paid</p>
                                  <InputSelect
                                  className="date"
                                  onChange={value => this.props.changePenaltyPaymentFormMonth(value, penalty_index, loan_index)}
                                  value={penalty.penalty_payment_fields.date_paid.month}
                                  disabled={penalty.penalty_payment_fields.backend.processing}
                                  errors={[]}>
                                    {monthList().map((month, index) =>
                                      <option key={index}>{month}</option>
                                    )}
                                  </InputSelect>
                                  <InputSelect
                                  className="date"
                                  onChange={value => this.props.changePenaltyPaymentFormDate(value, penalty_index, loan_index)}
                                  value={penalty.penalty_payment_fields.date_paid.date}
                                  disabled={penalty.penalty_payment_fields.backend.processing}
                                  errors={[]}>
                                    {(() => {
                                      let max_days_in_month = monthMaxdays(penalty.penalty_payment_fields.date_paid.month, penalty.penalty_payment_fields.date_paid.year);
                                      let dates = [];

                                      for(let a = 1; a <= max_days_in_month; a++) {
                                        dates.push(<option key={a}>{a}</option>);
                                      }

                                      return dates;
                                    })()}
                                  </InputSelect>
                                  <InputSelect
                                  className="date"
                                  onChange={value => this.props.changePenaltyPaymentFormYear(value, penalty_index, loan_index)}
                                  value={penalty.penalty_payment_fields.date_paid.year}
                                  disabled={penalty.penalty_payment_fields.backend.processing}
                                  errors={[]} >
                                    {(() => {
                                      let date = new Date;
                                      let years = [];
                                      let max_year = date.getFullYear();
                                      let min_year = max_year - 10;

                                      for(let a = max_year; a >= min_year; a--) {
                                        years.push(<option key={a}>{a}</option>);
                                      }

                                      return years;
                                    })()}
                                  </InputSelect>
                                </li>
                                <li>
                                  <div className="buttons">
                                    <InputButton
                                    value="Encode payment"
                                    onClick={() => this.props.submitPenaltyPaymentForm({
                                      amount: penalty.penalty_payment_fields.amount.value,
                                      date_paid: new Date(penalty.penalty_payment_fields.date_paid.month + ' ' + penalty.penalty_payment_fields.date_paid.date + ', ' + penalty.penalty_payment_fields.date_paid.year).toISOString(),
                                      penalty_id: penalty.id,
                                      loan_index,
                                      penalty_index
                                    }, penalty_index, loan_index)}
                                    sending={penalty.penalty_payment_fields.backend.processing}
                                    disabled={penalty.penalty_payment_fields.allow_submit && !penalty.penalty_payment_fields.backend.processing? false : true}
                                    errors={[]} />
                                  </div>

                                  <div className="buttons">
                                    <a
                                    className={!penalty.penalty_payment_fields.backend.processing? 'default-btn-red' : 'default-btn-red disabled'}
                                    onClick={() => penalty.penalty_payment_fields.backend.processing? false : this.props.togglePenaltyPaymentForm(false, penalty_index, loan_index)}>
                                      Cancel
                                    </a>
                                  </div>
                                </li>
                                {penalty.edit.backend.status == 'failed'?
                                  <li className="row">
                                    <WithIcon icon={path.join(app_path, 'app/images/cross.png')}>
                                      <p className="errors">Failed to save changes: <u>{penalty.edit.backend.message}</u></p>
                                    </WithIcon>
                                  </li>
                                : null}
                              </ul>}
                          </div>

                          {penalty.penalty_payment_fields.backend.status == 'successful'?
                            <div className="row">
                              <WithIcon icon={path.join(app_path, 'app/images/check.png')}>
                                <p className="okay">Payment added successfully.</p>
                              </WithIcon>
                            </div>
                          : penalty.penalty_payment_fields.backend.status == 'failed'?
                            <div className="row">
                              <WithIcon icon={path.join(app_path, 'app/images/check.png')}>
                                <p className="errors">Failed to encode payment: <u>{penalty.penalty_payment_fields.backend.message}</u></p>
                              </WithIcon>
                            </div>
                          : null}
                        </div>}
                      
                      <h1>Penalty payments</h1>

                      <CssTransitionGroup
                      transitionName="emphasize-entry"
                      transitionEnterTimeout={400}
                      transitionLeaveTimeout={400}>
                        {penalty.penalty_payments.length? penalty.penalty_payments.map((penalty_payment, penalty_payment_index) =>
                          <div className="payment-container" key={penalty.penalty_payments.length - penalty_payment_index}>
                            {penalty_payment.edit.shown?
                              <ul className="penalty-form">
                                <li>
                                  Amount
                                  <InputText
                                  numberOnly={true}
                                  value={penalty_payment.edit.amount.value}
                                  placeholder="Amount..."
                                  onChange={value => this.props.changePenaltyPaymentEditAmount(value, penalty_payment_index, penalty_index, loan_index)}
                                  errors={penalty_payment.edit.amount.errors}
                                  disabled={penalty_payment.edit.backend.processing} />
                                  <p><strong>{currency(penalty_payment.edit.amount.value)}</strong> Pesos</p>
                                </li>
                                <li className="select-collection">
                                  <p>Date paid</p>
                                  <InputSelect
                                  className="date"
                                  onChange={value => this.props.changePenaltyPaymentEditMonth(value, penalty_payment_index, penalty_index, loan_index)}
                                  value={penalty_payment.edit.date_paid.month}
                                  disabled={penalty_payment.edit.backend.processing}
                                  errors={[]}>
                                    {monthList().map((month, index) =>
                                      <option key={index}>{month}</option>
                                    )}
                                  </InputSelect>
                                  <InputSelect
                                  className="date"
                                  onChange={value => this.props.changePenaltyPaymentEditDate(value, penalty_payment_index, penalty_index, loan_index)}
                                  value={penalty_payment.edit.date_paid.date}
                                  disabled={penalty_payment.edit.backend.processing}
                                  errors={[]}>
                                    {(() => {
                                      let max_days_in_month = monthMaxdays(penalty_payment.edit.date_paid.month, penalty_payment.edit.date_paid.year);
                                      let dates = [];

                                      for(let a = 1; a <= max_days_in_month; a++) {
                                        dates.push(<option key={a}>{a}</option>);
                                      }

                                      return dates;
                                    })()}
                                  </InputSelect>
                                  <InputSelect
                                  className="date"
                                  onChange={value => this.props.changePenaltyPaymentEditYear(value, penalty_payment_index, penalty_index, loan_index)}
                                  value={penalty_payment.edit.date_paid.year}
                                  disabled={penalty_payment.edit.backend.processing}
                                  errors={[]} >
                                    {(() => {
                                      let date = new Date;
                                      let years = [];
                                      let max_year = date.getFullYear();
                                      let min_year = max_year - 10;

                                      for(let a = max_year; a >= min_year; a--) {
                                        years.push(<option key={a}>{a}</option>);
                                      }

                                      return years;
                                    })()}
                                  </InputSelect>
                                </li>
                                <li>
                                  <div className="buttons">
                                    <InputButton
                                    value="Save changes"
                                    onClick={() => this.props.changePenaltyPaymentEditSave({
                                      amount: penalty_payment.edit.amount.value,
                                      date_paid: new Date(penalty_payment.edit.date_paid.month + ' ' + penalty_payment.edit.date_paid.date + ', ' + penalty_payment.edit.date_paid.year).toISOString(),
                                      id: penalty_payment.id,
                                      penalty_payment_index,
                                      penalty_index,
                                      loan_index
                                    }, penalty_payment_index, penalty_index, loan_index)}
                                    sending={penalty_payment.edit.backend.processing}
                                    disabled={penalty_payment.edit.allow_submit && !penalty_payment.edit.backend.processing? false : true}
                                    errors={[]} />
                                  </div>

                                  <div className="buttons">
                                    <a
                                    className={!penalty_payment.edit.backend.processing? 'default-btn-red' : 'default-btn-red disabled'}
                                    onClick={() => penalty_payment.edit.backend.processing? false : this.props.togglePenaltyPaymentEdit(false, penalty_payment_index, penalty_index, loan_index)}>
                                      Cancel
                                    </a>
                                  </div>
                                </li>
                                {penalty_payment.edit.backend.status == 'failed'?
                                  <li>
                                    <WithIcon icon={path.join(app_path, 'app/images/cross.png')}>
                                      <p className="errors">{penalty_payment.edit.backend.message}</p>
                                    </WithIcon>
                                  </li>
                                : null}
                              </ul>
                            : <div>
                                <div className="row">
                                  <WithLabel label="Trace ID">
                                    <p>{penalty_payment.id}</p>
                                  </WithLabel>
                                </div>

                                <div className="row">
                                  <WithLabel label="Amount">
                                    <p>{currency(penalty_payment.amount)} Pesos</p>
                                  </WithLabel>
                                </div>

                                <div className="row">
                                  <WithLabel label="Date paid">
                                    <p>{toFormalDate(penalty_payment.date_paid)}</p>
                                  </WithLabel>
                                </div>

                                {penalty_payment.edit.backend.status == 'successful'?
                                  <div className="row">
                                    <WithIcon icon={path.join(app_path, 'app/images/check.png')}>
                                      <p className="okay">Changes saved successfully.</p>
                                    </WithIcon>
                                  </div>
                                : null}

                                <div className="row">
                                  <a
                                  className={!penalty_payment.edit.backend.processing? 'default-btn-blue' : 'default-btn-blue disabled'}
                                  onClick={() => penalty_payment.edit.backend.processing? false : this.props.togglePenaltyPaymentEdit(true, penalty_payment_index, penalty_index, loan_index)}>
                                    Edit payment information
                                  </a>
                                </div>
                              </div>}
                          </div>
                        ) : <p>No payments since <strong>{toFormalDate(penalty.date_given)}</strong></p>}
                      </CssTransitionGroup>
                    </div>
                  )
                : <div className="row">
                    <p>No penalties where given so far.</p>
                  </div>}
                </CssTransitionGroup>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    let app_path = remote.app.getAppPath();

    return (
      <WithSidebar>
        <div className="borrower-profile">
          {this.props.borrower_profile.backend.processing || (!this.props.borrower_profile.data && !this.props.borrower_profile.backend.status)?
            <div className="loading-contents">
              <img src={path.join(app_path, 'app/images/processing-blue.gif')} />
            </div>
          : !this.props.borrower_profile.backend.processing && this.props.borrower_profile.backend.status == 'failed'?
            <WithIcon icon={path.join(app_path, 'app/images/cross.png')}>
              <p className="errors">{this.props.borrower_profile.backend.message}</p>
            </WithIcon> :
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

              <section>
                <Link className="default-btn-blue" to={'borrowers/' + this.props.params.id + '/new-loan'}>Add new loan</Link>
              </section>

              {this.props.borrower_profile.data.loans.map((loan, loan_index) => window.location.hash && window.location.hash.substring(1) == loan.id?
                <section ref={element => this['loan_id_' + loan.id] = element} key={loan_index}>
                  <CssTransitionGroup
                  key={loan_index}
                  transitionName="emphasize-background"
                  transitionAppear={true}
                  transitionAppearTimeout={1000}
                  transitionEnterTimeout={1000}
                  transitionLeaveTimeout={1000}>
                    {this.showLoanInformation(loan, loan_index, app_path)}
                  </CssTransitionGroup>
                </section>
              : <section ref={element => this['loan_id_' + loan.id] = element} key={loan_index}>
                {this.showLoanInformation(loan, loan_index, app_path)}
                </section>
              )}
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
  editLoanInformatioSend: borrowerProfileActions.editLoanInformatioSend,
  togglePenaltyForm: borrowerProfileActions.togglePenaltyForm,
  changePenaltyFormAmount: borrowerProfileActions.changePenaltyFormAmount,
  changePenaltyFormRemarks: borrowerProfileActions.changePenaltyFormRemarks,
  changePenaltyDate: borrowerProfileActions.changePenaltyDate,
  changePenaltyMonth: borrowerProfileActions.changePenaltyMonth,
  changePenaltyYear: borrowerProfileActions.changePenaltyYear,
  createPenalty: borrowerProfileActions.createPenalty,
  togglePenaltyPaymentForm: borrowerProfileActions.togglePenaltyPaymentForm,
  changePenaltyPaymentFormAmount: borrowerProfileActions.changePenaltyPaymentFormAmount,
  changePenaltyPaymentFormMonth: borrowerProfileActions.changePenaltyPaymentFormMonth,
  changePenaltyPaymentFormDate: borrowerProfileActions.changePenaltyPaymentFormDate,
  changePenaltyPaymentFormYear: borrowerProfileActions.changePenaltyPaymentFormYear,
  submitPenaltyPaymentForm: borrowerProfileActions.submitPenaltyPaymentForm,
  togglePenaltyEdit: borrowerProfileActions.togglePenaltyEdit,
  changePenaltyEditAmount: borrowerProfileActions.changePenaltyEditAmount,
  changePenaltyEditDate: borrowerProfileActions.changePenaltyEditDate,
  changePenaltyEditMonth: borrowerProfileActions.changePenaltyEditMonth,
  changePenaltyEditYear: borrowerProfileActions.changePenaltyEditYear,
  changePenaltyEditRemarks: borrowerProfileActions.changePenaltyEditRemarks,
  savePenaltyEdit: borrowerProfileActions.savePenaltyEdit,
  togglePenaltyPaymentEdit: borrowerProfileActions.togglePenaltyPaymentEdit,
  changePenaltyPaymentEditAmount: borrowerProfileActions.changePenaltyPaymentEditAmount,
  changePenaltyPaymentEditMonth: borrowerProfileActions.changePenaltyPaymentEditMonth,
  changePenaltyPaymentEditDate: borrowerProfileActions.changePenaltyPaymentEditDate,
  changePenaltyPaymentEditYear: borrowerProfileActions.changePenaltyPaymentEditYear,
  changePenaltyPaymentEditSave: borrowerProfileActions.changePenaltyPaymentEditSave,
})(BorrowerProfile);