import React, { Component } from 'react';
import { connect } from 'react-redux';
import { remote } from 'electron';
import path from 'path';

// components
import WithSidebar from '../../components/WithSidebar';
import WithIcon from '../../components/WithIcon';
// helpers
import { monthList, monthMaxdays } from '../../helpers/DateTime';
import { ucwords } from '../../helpers/Strings';
import { currency } from '../../helpers/Numbers';
// components
import InputText from '../../components/forms/InputText';
import InputSelect from '../../components/forms/InputSelect';
import InputButton from '../../components/forms/InputButton';
import DisplayTextBox from '../../components/forms/DisplayTextBox';
// actions
import * as newBorrowerActions from '../../actions/control_panel/new_borrower';

class NewBorrower extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.computeInterestPercentage = this.computeInterestPercentage.bind(this);
    this.computeInterest = this.computeInterest.bind(this);
    this.computeProfit = this.computeProfit.bind(this);
    this.computePerMonth = this.computePerMonth.bind(this);
    this.computePerDay = this.computePerDay.bind(this);
    this.computePerHalfMonth = this.computePerHalfMonth.bind(this);
  }

  componentWillMount() {
    document.title = 'Add new borrower - LIMS';
  }

  componentWillUnmount() {
    this.props.reset();
  }

  componentWillUpdate(nextProps) {
    if(nextProps.new_borrower.backend.status == 'successful') {
      nextProps.router.push('/borrowers/' + nextProps.new_borrower.id + '/view');
    }
  }

  handleSubmit(event) {
    if(event) event.preventDefaut();

    this.props.submit({
      firstname: this.props.new_borrower.firstname.value,
      middlename: this.props.new_borrower.middlename.value,
      surname: this.props.new_borrower.surname.value,
      gender: this.props.new_borrower.gender.value,
      contact_numbers: this.props.new_borrower.contact_numbers,
      amount_loan: this.props.new_borrower.amount_loan.value,
      payment_method: this.props.new_borrower.apply_interest_only || this.props.new_borrower.no_due_date_no_interest? null : this.props.new_borrower.payment_method.value,
      months_to_pay: this.props.new_borrower.amount_loan.condition == 'due-date-and-interest' || this.props.new_borrower.amount_loan.condition == 'due-date-only'? this.props.new_borrower.months_to_pay.value : null,
      condition_applied: this.props.new_borrower.amount_loan.condition,
      interest: this.props.new_borrower.amount_loan.condition == 'due-date-and-interest' || this.props.new_borrower.amount_loan.condition == 'interest-only'? this.computeInterest() : 0,
      profit: this.props.new_borrower.amount_loan.condition == 'due-date-and-interest' || this.props.new_borrower.amount_loan.condition == 'interest-only'? this.computeProfit() : 0,
      interest_rate: this.props.new_borrower.amount_loan.condition == 'due-date-and-interest' || this.props.new_borrower.amount_loan.condition == 'interest-only'? this.props.new_borrower.interest_rate.value : 0,
      interest_type: this.props.new_borrower.interest_rate.type,
      per_month: this.computePerMonth(),
      per_semi_month: this.computePerHalfMonth(),
      per_day: this.computePerDay(),
      loan_date: this.props.new_borrower.loan_date.month + ' ' + this.props.new_borrower.loan_date.date + ', ' + this.props.new_borrower.loan_date.year
    });
  }

  computeInterestPercentage() {
    // interest rate / 100
    return Number(this.props.new_borrower.interest_rate.value) / 100;
  }

  computeProfit() {
    // interest * months to pay
    return this.computeInterest() * Number(this.props.new_borrower.months_to_pay.value);
  }

  computeInterest() {
    if(this.props.new_borrower.interest_rate.type == 'percentage') {
      // amount loan * interest percentage
      return Number(this.props.new_borrower.amount_loan.value) * this.computeInterestPercentage();
    }

    return Number(this.props.new_borrower.interest_rate.value);
  }

  computePerMonth() {
    if(this.props.new_borrower.amount_loan.condition == 'interest-only'
    || this.props.new_borrower.amount_loan.condition == 'due-date-and-interest') {
      // per payment = (profit + loan amount) / months to pay
      return (this.computeProfit() + Number(this.props.new_borrower.amount_loan.value)) /
        Number(this.props.new_borrower.months_to_pay.value);
    }

    return Number(this.props.new_borrower.amount_loan.value) /
      Number(this.props.new_borrower.months_to_pay.value);
  }

  computePerDay() {
    // monthly / 30
    return this.computePerMonth() / 30;
  }

  computePerHalfMonth() {
    // monthly / 2
    return this.computePerMonth() / 2;
  }

  render() {
    let app_path = remote.app.getAppPath();

    let per_month = 0;
    let per_day = 0;
    let per_half_month = 0;
    let profit = 0;
    let interest_percentage = 0;
    let interest = 0;

    let date = new Date;
    let month_list = monthList();
    let months = month_list.map((month, index) => <option key={index}>{month}</option>);
    let max_days_in_month = monthMaxdays(this.props.new_borrower.loan_date.month, this.props.new_borrower.loan_date.year);
    let max_year = date.getFullYear();
    let min_year = max_year - 10;
    let dates = [];
    let years = [];

    for(let a = 1; a <= max_days_in_month; a++) {
      dates.push(<option key={a}>{a}</option>);
    }

    for(let a = max_year; a >= min_year; a--) {
      years.push(<option key={a}>{a}</option>);
    }

    if(this.props.new_borrower.amount_loan.condition == 'interest-only'
    && this.props.new_borrower.amount_loan.value.length
    && !this.props.new_borrower.amount_loan.errors.length) {
      /**
        * applying of interest only
        * will compute and add the interest
        * but will not compute for a monthly payment
       */
      interest_percentage = this.computeInterestPercentage();
      interest = this.computeInterest();
      profit = this.computeProfit();
    } else if(this.props.new_borrower.amount_loan.condition == 'due-date-only'
    && this.props.new_borrower.amount_loan.value.length
    && this.props.new_borrower.months_to_pay.value.length
    && !this.props.new_borrower.amount_loan.errors.length
    && !this.props.new_borrower.months_to_pay.errors.length) {
      /**
       * applying of due date only
       * will compute the monthly, half monthly and daily payment
       * but will not compute for the interest
       */
      per_month = this.computePerMonth();
      per_day = this.computePerDay();
      per_half_month = this.computePerHalfMonth();
    } else if(this.props.new_borrower.amount_loan.condition == 'due-date-and-interest'
    && this.props.new_borrower.amount_loan.value.length
    && !this.props.new_borrower.amount_loan.errors.length
    && this.props.new_borrower.months_to_pay.value.length
    && !this.props.new_borrower.months_to_pay.errors.length
    && this.props.new_borrower.interest_rate.value.length
    && !this.props.new_borrower.interest_rate.errors.length) {
      /**
       * apply due date and interest
       * will compute for the monthly, half monthly and daily payments
       * will compute for the interest
       */
      interest_percentage = this.computeInterestPercentage();
      interest = this.computeInterest();
      profit = this.computeProfit();
      per_month = this.computePerMonth();
      per_day = this.computePerDay();
      per_half_month = this.computePerHalfMonth();
    }

    return (
      <WithSidebar onLink="new-borrower">
        <div className="new-loan-wrapper">
          <form onSubmit={this.handleSubmit} method="post" action="">
            <div className="information-container">
              <ul>
                <li>
                  <h1>Borrower's information</h1>
                </li>
                <li>
                  First name
                  <InputText
                  value={this.props.new_borrower.firstname.value}
                  placeholder="Borrower's first name..."
                  onChange={value => this.props.changeFirstname(ucwords(value))}
                  errors={this.props.new_borrower.firstname.errors}
                  disabled={this.props.new_borrower.backend.processing} />
                </li>
                <li>
                  Middle name
                  <InputText
                  value={this.props.new_borrower.middlename.value}
                  placeholder="Borrower's middle name..."
                  onChange={value => this.props.changeMiddlename(ucwords(value))}
                  errors={this.props.new_borrower.middlename.errors}
                  disabled={this.props.new_borrower.backend.processing} />
                </li>
                <li>
                  Surname
                  <InputText
                  value={this.props.new_borrower.surname.value}
                  placeholder="Borrower's surname..."
                  onChange={value => this.props.changeSurname(ucwords(value))}
                  errors={this.props.new_borrower.surname.errors}
                  disabled={this.props.new_borrower.backend.processing} />
                </li>
                <li>
                  Gender
                  <InputSelect
                  onChange={this.props.changeGender}
                  value={this.props.new_borrower.gender.value}
                  disabled={this.props.new_borrower.backend.processing}
                  errors={this.props.new_borrower.gender.errors}>
                    <option value="1">Male</option>
                    <option value="0">Female</option>
                  </InputSelect>
                </li>
                <li>
                  <h1>Contact information</h1>
                </li>
                <li>
                  <p>This information is optional.</p>
                </li>
                {this.props.new_borrower.contact_numbers.map((field, index) => (
                  <li key={index} className="contact-fields">
                    <InputText
                    className={field.value.length || index > 0? 'closable-input' : ''}
                    numberOnly={true}
                    value={field.value}
                    placeholder="Borrower's contact number..."
                    onChange={value => this.props.changeContactNumber(value, index)}
                    errors={field.errors}
                    disabled={this.props.new_borrower.backend.processing} />

                    {field.value.length || index > 0?
                      <a className="remove-contact-field" onClick={() => this.props.new_borrower.backend.processing? false : this.props.removeContactNumber(index)}>X</a>
                    : null}
                  </li>
                ))}

                <a className={this.props.new_borrower.backend.processing? 'default-btn-blue disabled' : 'default-btn-blue'}
                onClick={() => this.props.new_borrower.backend.processing? false : this.props.addMoreContactNumbers()}>
                  Add more fields
                </a>
              </ul>
            </div>

            <div className="information-container loan-info">
              <ul>
                <li>
                  <h1>Loan information</h1>
                </li>
                <li>
                  Loan condition<br/>
                  <input
                  id="apply-due-date-interest"
                  type="radio"
                  disabled={this.props.new_borrower.backend.processing}
                  checked={this.props.new_borrower.amount_loan.condition == 'due-date-and-interest'}
                  onChange={changeEvent => {
                    if(changeEvent.target.checked) this.props.changeLoanCondition('due-date-and-interest');
                  }} />
                  <label htmlFor="apply-due-date-interest">Apply due date and interest</label>
                  <br/>
                  <input
                  id="apply-interest-only"
                  type="radio"
                  disabled={this.props.new_borrower.backend.processing}
                  checked={this.props.new_borrower.amount_loan.condition == 'interest-only'}
                  onChange={changeEvent => {
                    if(changeEvent.target.checked) this.props.changeLoanCondition('interest-only');
                  }} />
                  <label htmlFor="apply-interest-only">Apply interest only</label>
                  <br/>
                  <input
                  id="apply-due-date-only"
                  type="radio"
                  disabled={this.props.new_borrower.backend.processing}
                  checked={this.props.new_borrower.amount_loan.condition == 'due-date-only'}
                  onChange={changeEvent => {
                    if (changeEvent.target.checked) this.props.changeLoanCondition('due-date-only');
                  }} />
                  <label htmlFor="apply-due-date-only">Apply due date only</label>
                  <br/>
                  <input
                  id="no-due-date-no-interest"
                  type="radio"
                  disabled={this.props.new_borrower.backend.processing}
                  checked={this.props.new_borrower.amount_loan.condition == 'no-due-date-and-interest'}
                  onChange={changeEvent => {
                    if(changeEvent.target.checked) this.props.changeLoanCondition('no-due-date-and-interest');
                  }} />
                  <label htmlFor="no-due-date-no-interest">Don't apply due date and interest</label>
                </li>
                <li className="clear-floats">
                  Date loan
                  <InputSelect
                  className="date-loan"
                  onChange={this.props.changeDateLoanMonth}
                  value={this.props.new_borrower.loan_date.month}
                  disabled={this.props.new_borrower.backend.processing}
                  errors={[]}>
                    {months}
                  </InputSelect>

                  <InputSelect
                  className="date-loan"
                  onChange={this.props.changeDateLoanDate}
                  value={this.props.new_borrower.loan_date.date}
                  disabled={this.props.new_borrower.backend.processing}
                  errors={[]}>
                    {dates}
                  </InputSelect>

                  <InputSelect
                  className="date-loan"
                  onChange={this.props.changeDateLoanYear}
                  value={this.props.new_borrower.loan_date.year}
                  disabled={this.props.new_borrower.backend.processing}
                  errors={[]}>
                    {years}
                  </InputSelect>

                  {this.props.new_borrower.loan_date.errors.length?
                    <div className="error-list">
                      {this.props.new_borrower.loan_date.errors.map((error, index) => (
                        <p key={index}>{error}</p>
                      ))}
                    </div>
                  : null}
                </li>
                <li>
                  Amount loan
                  <InputText
                  value={this.props.new_borrower.amount_loan.value}
                  placeholder="amount loan..."
                  numberOnly={true}
                  onChange={this.props.changeAmountLoan}
                  errors={this.props.new_borrower.amount_loan.errors}
                  disabled={this.props.new_borrower.backend.processing}
                  maxlength={50} />
                  <p><strong>{currency(this.props.new_borrower.amount_loan.value)}</strong> Pesos</p>
                </li>
                <li>
                  Interest rate
                  <InputText
                  placeholder="Interest rate..."
                  numberOnly={true}
                  onChange={this.props.changeInterest}
                  value={this.props.new_borrower.amount_loan.condition == 'interest-only' || this.props.new_borrower.amount_loan.condition == 'due-date-and-interest'? this.props.new_borrower.interest_rate.value : 'N/A'}
                  errors={this.props.new_borrower.interest_rate.errors}
                  disabled={(this.props.new_borrower.amount_loan.condition == 'interest-only' || this.props.new_borrower.amount_loan.condition == 'due-date-and-interest') && !this.props.new_borrower.backend.processing? false : true}
                  maxlength={50} />
                  {this.props.new_borrower.amount_loan.condition == 'interest-only' || this.props.new_borrower.amount_loan.condition == 'due-date-and-interest'?
                    <p>{currency(this.props.new_borrower.interest_rate.value)} {this.props.new_borrower.interest_rate.type == 'percentage'? 'Percent' : 'Pesos'}</p>
                  : null}
                </li>
                <li>
                  <input
                  id="interest-type-percentage"
                  type="radio"
                  disabled={this.props.new_borrower.backend.processing || this.props.new_borrower.amount_loan.condition == 'due-date-only' || this.props.new_borrower.amount_loan.condition == 'no-due-date-and-interest'}
                  checked={this.props.new_borrower.interest_rate.type == 'percentage'}
                  onChange={() => this.props.changeInterestType('percentage')} />
                  <label htmlFor="interest-type-percentage">Percentage</label>
                  <br/>
                  <input
                  id="interest-type-fixed"
                  type="radio"
                  disabled={this.props.new_borrower.backend.processing || this.props.new_borrower.amount_loan.condition == 'due-date-only' || this.props.new_borrower.amount_loan.condition == 'no-due-date-and-interest'}
                  checked={this.props.new_borrower.interest_rate.type == 'fixed'}
                  onChange={() => this.props.changeInterestType('fixed')} />
                  <label htmlFor="interest-type-fixed">Fixed value</label>
                </li>
                <li>
                  Payment Method...
                  <InputSelect
                  className="notification-method"
                  onChange={this.props.changePaymentMethod}
                  value={this.props.new_borrower.backend.processing || this.props.new_borrower.amount_loan.condition == 'interest-only' || this.props.new_borrower.amount_loan.condition == 'no-due-date-and-interest'? '0' : this.props.new_borrower.payment_method.value}
                  disabled={this.props.new_borrower.backend.processing || this.props.new_borrower.amount_loan.condition == 'interest-only' || this.props.new_borrower.amount_loan.condition == 'no-due-date-and-interest'}
                  errors={this.props.new_borrower.payment_method.errors}>
                    {this.props.new_borrower.amount_loan.condition == 'interest-only' || this.props.new_borrower.amount_loan.condition == 'no-due-date-and-interest'? <option value="0">N/A</option> : null}
                    <option value="1">Monthly</option>
                    <option value="2">Semi-monthly</option>
                    <option value="3">Daily</option>
                  </InputSelect>
                </li>
                <li>
                  Months to pay
                  <InputText
                  placeholder={'Months to pay...'}
                  numberOnly={true}
                  onChange={this.props.changeMonthsToPay}
                  value={this.props.new_borrower.amount_loan.condition == 'due-date-only' || this.props.new_borrower.amount_loan.condition == 'due-date-and-interest'? this.props.new_borrower.months_to_pay.value : 'N/A'}
                  errors={this.props.new_borrower.months_to_pay.errors}
                  disabled={(this.props.new_borrower.amount_loan.condition == 'due-date-only' || this.props.new_borrower.amount_loan.condition == 'due-date-and-interest') && !this.props.new_borrower.backend.processing? false : true}
                  maxlength={50} />
                </li>
              </ul>

              <ul>
                <li>
                  <h1>Computed values</h1>
                </li>
                <li>
                  <p>Profit per month</p>
                  <DisplayTextBox value={currency(interest) + ' Pesos'} />
                </li>
                <li>
                  <p>Total profit</p>
                  <DisplayTextBox value={currency(profit) + ' Pesos'} />
                </li>
                <li>
                  <p>Total amount to pay</p>
                  <DisplayTextBox value={currency(profit + Number(this.props.new_borrower.amount_loan.value)) + ' Pesos'} />
                </li>
                <li>
                  <p>Monthly payment</p>
                  <DisplayTextBox value={currency(per_month) + ' Pesos'} />
                </li>
                <li>
                  <p>Semi-monthly payment</p>
                  <DisplayTextBox value={currency(per_half_month) + ' Pesos'} />
                </li>
                <li>
                  <p>Daily payment</p>
                  <DisplayTextBox value={currency(per_day) + ' Pesos'} />
                </li>
                <li>
                  <InputButton
                  value="Create borrower"
                  onClick={this.handleSubmit}
                  sending={this.props.new_borrower.backend.processing}
                  disabled={this.props.new_borrower.backend.allow_submit && !this.props.new_borrower.backend.processing? false: true}
                  errors={[]} />
                </li>
                {this.props.new_borrower.backend.status == 'failed'?
                  <li>
                    <WithIcon icon={path.join(app_path, 'app/images/cross.png')}>
                      <p className="error-list">Failed to create new borrower: <u>{this.props.new_borrower.backend.message}</u></p>
                    </WithIcon>
                  </li>
                : this.props.new_borrower.backend.status == 'successful'?
                  <li>
                    <WithIcon icon={path.join(app_path, 'app/images/check.png')}>
                      <p className="okay">Failed to create new borrower: <u>{this.props.new_borrower.backend.message}</u></p>
                    </WithIcon>
                  </li>
                : null}
              </ul>
            </div>
          </form>
        </div>
      </WithSidebar>
    );
  }
}

export default connect(store => ({
  new_borrower: {...store.new_borrower}
}), {
  changeFirstname: newBorrowerActions.changeFirstname,
  changeMiddlename: newBorrowerActions.changeMiddlename,
  changeSurname: newBorrowerActions.changeSurname,
  changeGender: newBorrowerActions.changeGender,
  changeAmountLoan: newBorrowerActions.changeAmountLoan,
  changeInterest: newBorrowerActions.changeInterest,
  changeInterestType: newBorrowerActions.changeInterestType,
  changeMonthsToPay: newBorrowerActions.changeMonthsToPay,
  changeDateLoanMonth: newBorrowerActions.changeDateLoanMonth,
  changeDateLoanDate: newBorrowerActions.changeDateLoanDate,
  changeDateLoanYear: newBorrowerActions.changeDateLoanYear,
  changeLoanCondition: newBorrowerActions.changeLoanCondition,
  changeToApplyDueDateOnly: newBorrowerActions.changeToApplyDueDateOnly,
  changeToApplyInterestOnly: newBorrowerActions.changeToApplyInterestOnly,
  changeToApplyDueDateInterest: newBorrowerActions.changeToApplyDueDateInterest,
  changeToNoDueDateNoInterest: newBorrowerActions.changeToNoDueDateNoInterest,
  addMoreContactNumbers: newBorrowerActions.addMoreContactNumbers,
  removeContactNumber: newBorrowerActions.removeContactNumber,
  changeContactNumber: newBorrowerActions.changeContactNumber,
  changePaymentMethod: newBorrowerActions.changePaymentMethod,
  reset: newBorrowerActions.reset,
  submit: newBorrowerActions.submit
})(NewBorrower);