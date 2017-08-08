import React, { Component } from 'react';
import { connect } from 'react-redux';
import { remote } from 'electron';
import path from 'path';
import CssTransitionGroup from 'react-addons-css-transition-group';

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
      loan_date: this.props.new_borrower.loan_date.month + ' ' + this.props.new_borrower.loan_date.date + ', ' + this.props.new_borrower.loan_date.year,
      interest_type: this.props.new_borrower.interest_rate.type,
      interest_rate: this.props.new_borrower.interest_rate.value,
      ...this.props.new_borrower.calculated_values
    });
  }

  render() {
    let app_path = remote.app.getAppPath();

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
                <li>
                  <CssTransitionGroup
                  transitionName="emphasize-entry"
                  transitionEnterTimeout={400}
                  transitionLeaveTimeout={400}>
                    {this.props.new_borrower.contact_numbers.map((field, index) => (
                      <div key={field.id} className="contact-fields">
                        <InputText
                        className={index > 0? 'closable-input' : ''}
                        numberOnly={true}
                        value={field.value}
                        placeholder="Borrower's contact number..."
                        onChange={value => this.props.changeContactNumber(value, index)}
                        errors={field.errors}
                        disabled={this.props.new_borrower.backend.processing} />

                        {index > 0?
                          <a className="remove-contact-field" onClick={() => this.props.new_borrower.backend.processing? false : this.props.removeContactNumber(index)}>X</a>
                        : null}
                      </div>
                    ))}
                  </CssTransitionGroup>

                  <a className={this.props.new_borrower.backend.processing? 'default-btn-blue disabled' : 'default-btn-blue'}
                  onClick={() => this.props.new_borrower.backend.processing? false : this.props.addMoreContactNumbers()}>
                    Add more fields
                  </a>
                </li>
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
                    {(() => monthList().map((month, index) => <option key={index}>{month}</option>))()}
                  </InputSelect>

                  <InputSelect
                  className="date-loan"
                  onChange={this.props.changeDateLoanDate}
                  value={this.props.new_borrower.loan_date.date}
                  disabled={this.props.new_borrower.backend.processing}
                  errors={[]}>
                    {(() => {
                      let date = new Date;
                      let max_days_in_month = monthMaxdays(this.props.new_borrower.loan_date.month, this.props.new_borrower.loan_date.year);
                      let dates = [];

                      for(let a = 1; a <= max_days_in_month; a++) {
                        dates.push(<option key={a}>{a}</option>);
                      }

                      return dates;
                    })()}
                  </InputSelect>

                  <InputSelect
                  className="date-loan"
                  onChange={this.props.changeDateLoanYear}
                  value={this.props.new_borrower.loan_date.year}
                  disabled={this.props.new_borrower.backend.processing}
                  errors={[]}>
                    {(() => {
                      let max_year = new Date().getFullYear();
                      let min_year = max_year - 10;
                      let years = [];

                      for(let a = max_year; a >= min_year; a--) {
                        years.push(<option key={a}>{a}</option>);
                      }

                      return years;
                    })()}
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
                  Payment Method
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
                  placeholder='Months to pay...'
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
                  <p>Interest rate</p>
                  <DisplayTextBox value={currency(this.props.new_borrower.interest_rate.value) + (this.props.new_borrower.interest_rate.type == 'percentage'? ' Percent' : ' Pesos')} />
                </li>
                <li>
                  <p>Profit per month</p>
                  <DisplayTextBox value={currency(this.props.new_borrower.calculated_values.computed_interest) + ' Pesos'} />
                </li>
                <li>
                  <p>Total profit</p>
                  <DisplayTextBox value={currency(this.props.new_borrower.calculated_values.computed_profit) + ' Pesos'} />
                </li>
                <li>
                  <p>Total amount to pay</p>
                  <DisplayTextBox value={currency(Number(this.props.new_borrower.calculated_values.computed_profit) + Number(this.props.new_borrower.amount_loan.value)) + ' Pesos'} />
                </li>
                <li>
                  <p>Monthly payment</p>
                  <DisplayTextBox value={currency(this.props.new_borrower.calculated_values.monthly) + ' Pesos'} />
                </li>
                <li>
                  <p>Semi-monthly payment</p>
                  <DisplayTextBox value={currency(this.props.new_borrower.calculated_values.semi_monthly) + ' Pesos'} />
                </li>
                <li>
                  <p>Daily payment</p>
                  <DisplayTextBox value={currency(this.props.new_borrower.calculated_values.daily) + ' Pesos'} />
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