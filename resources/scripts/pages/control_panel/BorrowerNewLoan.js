import React, { Component } from 'react';
import { connect } from 'react-redux';
import { remote } from 'electron';

// components
import WithSidebar from '../../components/WithSidebar';
import InputText from '../../components/forms/InputText';
import InputButton from '../../components/forms/InputButton';
import InputSelect from '../../components/forms/InputSelect';
import DisplayTextBox from '../../components/forms/DisplayTextBox';
// actions
import * as borrowerNewLoanActions from '../../actions/control_panel/borrower_new_loan';
// helpers
import { monthList, monthMaxdays } from '../../helpers/DateTime';
import { currency } from '../../helpers/Numbers';

class BorrowerNewLoan extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUnmount() {
    this.props.reset();
  }

  handleSubmit() {
    this.props.submit({
      amount_loan: this.props.new_loan.amount_loan.value,
      payment_method: this.props.new_loan.apply_interest_only || this.props.new_loan.no_due_date_no_interest? null : this.props.new_loan.payment_method.value,
      months_to_pay: this.props.new_loan.amount_loan.condition == 'due-date-and-interest' || this.props.new_loan.amount_loan.condition == 'due-date-only'? this.props.new_loan.months_to_pay.value : null,
      condition_applied: this.props.new_loan.amount_loan.condition,
      date_loan: new Date(this.props.new_loan.date_loan.month + ' ' + this.props.new_loan.date_loan.date + ', ' + this.props.new_loan.date_loan.year).toISOString(),
      ...this.props.new_loan.calculated_values
    });
  }

  render() {
    return (
      <WithSidebar>
        <div className="borrower-new-loan-wrapper">
          <div className="columns">
            <ul>
              <li>
                <h1>Loan information</h1>
              </li>
              <li>
                Loan condition<br/>
                <input
                id="apply-due-date-interest"
                type="radio"
                disabled={this.props.new_loan.backend.processing}
                checked={this.props.new_loan.amount_loan.condition == 'due-date-and-interest'}
                onChange={changeEvent => {
                  if(changeEvent.target.checked) this.props.changeLoanCondition('due-date-and-interest');
                }} />
                <label htmlFor="apply-due-date-interest">Apply due date and interest</label>
                <br/>
                <input
                id="apply-interest-only"
                type="radio"
                disabled={this.props.new_loan.backend.processing}
                checked={this.props.new_loan.amount_loan.condition == 'interest-only'}
                onChange={changeEvent => {
                  if(changeEvent.target.checked) this.props.changeLoanCondition('interest-only');
                }} />
                <label htmlFor="apply-interest-only">Apply interest only</label>
                <br/>
                <input
                id="apply-due-date-only"
                type="radio"
                disabled={this.props.new_loan.backend.processing}
                checked={this.props.new_loan.amount_loan.condition == 'due-date-only'}
                onChange={changeEvent => {
                  if (changeEvent.target.checked) this.props.changeLoanCondition('due-date-only');
                }} />
                <label htmlFor="apply-due-date-only">Apply due date only</label>
                <br/>
                <input
                id="no-due-date-no-interest"
                type="radio"
                disabled={this.props.new_loan.backend.processing}
                checked={this.props.new_loan.amount_loan.condition == 'no-due-date-and-interest'}
                onChange={changeEvent => {
                  if(changeEvent.target.checked) this.props.changeLoanCondition('no-due-date-and-interest');
                }} />
                <label htmlFor="no-due-date-no-interest">Don't apply due date and interest</label>
              </li>
              <li>
                Amount loan
                <InputText
                  numberOnly={true}
                  placeholder="Amount loan..."
                  onChange={this.props.changeAmount}
                  disabled={this.props.new_loan.backend.processing}
                  errors={this.props.new_loan.amount_loan.errors}
                  value={this.props.new_loan.amount_loan.value} />
                  <p><strong>{currency(this.props.new_loan.amount_loan.value)}</strong> Pesos</p>
              </li>
              <li className="clear-floats">
                Date loan
                <InputSelect
                className="date-loan"
                onChange={this.props.changeDateLoanMonth}
                value={this.props.new_loan.date_loan.month}
                disabled={this.props.new_loan.backend.processing}
                errors={[]}>
                  {(() => monthList().map((month, month_index) => <option key={month_index}>{month}</option>))()}
                </InputSelect>

                <InputSelect
                className="date-loan"
                onChange={this.props.changeDateLoanDate}
                value={this.props.new_loan.date_loan.date}
                disabled={this.props.new_loan.backend.processing}
                errors={[]}>
                  {(() => {
                    let dates = [];
                    let max_days_in_month = monthMaxdays(this.props.new_loan.date_loan.month, this.props.new_loan.date_loan.year);

                    for(let a = 1; a <= max_days_in_month; a++) {
                      dates.push(<option key={a}>{a}</option>);
                    }

                    return dates;
                  })()}
                </InputSelect>

                <InputSelect
                className="date-loan"
                onChange={this.props.changeDateLoanYear}
                value={this.props.new_loan.date_loan.year}
                disabled={this.props.new_loan.backend.processing}
                errors={[]}>
                  {(() => {
                    let years = [];
                    let max_year = new Date().getFullYear();
                    let min_year = max_year - 10;

                    for(let a = max_year; a >= min_year; a--) {
                      years.push(<option key={a}>{a}</option>);
                    }

                    return years;
                  })()}
                </InputSelect>

                {this.props.new_loan.date_loan.errors.length?
                  <div className="error-list">
                    {this.props.new_loan.date_loan.errors.map((error, index) => (
                      <p key={index}>{error}</p>
                    ))}
                  </div>
                : null}
              </li>
              <li>
                Interest rate
                <InputText
                  numberOnly={true}
                  placeholder="Interest rate..."
                  onChange={this.props.changeInterestRate}
                  disabled={(this.props.new_loan.amount_loan.condition == 'interest-only' || this.props.new_loan.amount_loan.condition == 'due-date-and-interest') && !this.props.new_loan.backend.processing? false : true}
                  errors={this.props.new_loan.interest_rate.errors}
                  value={this.props.new_loan.amount_loan.condition == 'interest-only' || this.props.new_loan.amount_loan.condition == 'due-date-and-interest'? this.props.new_loan.interest_rate.value : 'N/A'} />
                {this.props.new_loan.amount_loan.condition == 'interest-only' || this.props.new_loan.amount_loan.condition == 'due-date-and-interest'?
                  <p>{currency(this.props.new_loan.interest_rate.value)} {this.props.new_loan.interest_rate.type == 'percentage'? 'Percent' : 'Pesos'}</p>
                : null}
              </li>
              <li>
                <input
                id="interest-type-percentage"
                type="radio"
                disabled={this.props.new_loan.backend.processing || this.props.new_loan.amount_loan.condition == 'due-date-only' || this.props.new_loan.amount_loan.condition == 'no-due-date-and-interest'}
                checked={this.props.new_loan.interest_rate.type == 'percentage'}
                onChange={() => this.props.changeInterestType('percentage')} />
                <label htmlFor="interest-type-percentage">Percentage</label>
                <br/>
                <input
                id="interest-type-fixed"
                type="radio"
                disabled={this.props.new_loan.backend.processing || this.props.new_loan.amount_loan.condition == 'due-date-only' || this.props.new_loan.amount_loan.condition == 'no-due-date-and-interest'}
                checked={this.props.new_loan.interest_rate.type == 'fixed'}
                onChange={() => this.props.changeInterestType('fixed')} />
                <label htmlFor="interest-type-fixed">Fixed value</label>
              </li>
              <li>
                Payment Method
                <InputSelect
                className="notification-method"
                onChange={this.props.changePaymentMethod}
                value={this.props.new_loan.backend.processing || this.props.new_loan.amount_loan.condition == 'interest-only' || this.props.new_loan.amount_loan.condition == 'no-due-date-and-interest'? '0' : this.props.new_loan.payment_method.value}
                disabled={this.props.new_loan.backend.processing || this.props.new_loan.amount_loan.condition == 'interest-only' || this.props.new_loan.amount_loan.condition == 'no-due-date-and-interest'}
                errors={this.props.new_loan.payment_method.errors}>
                  {this.props.new_loan.amount_loan.condition == 'interest-only' || this.props.new_loan.amount_loan.condition == 'no-due-date-and-interest'? <option value="0">N/A</option> : null}
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
                value={this.props.new_loan.amount_loan.condition == 'due-date-only' || this.props.new_loan.amount_loan.condition == 'due-date-and-interest'? this.props.new_loan.months_to_pay.value : 'N/A'}
                errors={this.props.new_loan.months_to_pay.errors}
                disabled={(this.props.new_loan.amount_loan.condition == 'due-date-only' || this.props.new_loan.amount_loan.condition == 'due-date-and-interest') && !this.props.new_loan.backend.processing? false : true}
                maxlength={50} />
              </li>
            </ul>
          </div>
          <div className="columns">
            <ul>
              <li>
                <h1>Computed values</h1>
              </li>
              <li>
                <p>Interest rate</p>
                <DisplayTextBox value={currency(this.props.new_loan.interest_rate.value) + (this.props.new_loan.interest_rate.type == 'percentage'? ' Percent' : ' Pesos')} />
              </li>
              <li>
                <p>Profit per month</p>
                <DisplayTextBox value={currency(this.props.new_loan.calculated_values.computed_interest) + ' Pesos'} />
              </li>
              <li>
                <p>Total profit</p>
                <DisplayTextBox value={currency(this.props.new_loan.calculated_values.computed_profit) + ' Pesos'} />
              </li>
              <li>
                <p>Total amount to pay</p>
                <DisplayTextBox value={currency(Number(this.props.new_loan.calculated_values.computed_profit) + Number(this.props.new_loan.amount_loan.value)) + ' Pesos'} />
              </li>
              <li>
                <p>Monthly payment</p>
                <DisplayTextBox value={currency(this.props.new_loan.calculated_values.monthly) + ' Pesos'} />
              </li>
              <li>
                <p>Semi-monthly payment</p>
                <DisplayTextBox value={currency(this.props.new_loan.calculated_values.semi_monthly) + ' Pesos'} />
              </li>
              <li>
                <p>Daily payment</p>
                <DisplayTextBox value={currency(this.props.new_loan.calculated_values.daily) + ' Pesos'} />
              </li>
              <li>
                <InputButton
                value="Add new loan"
                onClick={this.handleSubmit}
                sending={this.props.new_loan.backend.processing}
                disabled={this.props.new_loan.allow_submit && !this.props.new_loan.backend.processing? false: true}
                errors={[]} />
              </li>
              {this.props.new_loan.backend.message?
                <li><p className="error-list">{this.props.new_loan.backend.message}</p></li>
              : null}
            </ul>
          </div>
        </div>
      </WithSidebar>
    );
  }
}

export default connect(store => ({
  new_loan: {...store.borrower_new_loan}
}), {
  reset: borrowerNewLoanActions.reset,
  changeLoanCondition: borrowerNewLoanActions.changeLoanCondition,
  changeAmount: borrowerNewLoanActions.changeAmount,
  changeInterestRate: borrowerNewLoanActions.changeInterestRate,
  changeInterestType: borrowerNewLoanActions.changeInterestType,
  changePaymentMethod: borrowerNewLoanActions.changePaymentMethod,
  changeMonthsToPay: borrowerNewLoanActions.changeMonthsToPay,
  changeDateLoanMonth: borrowerNewLoanActions.changeDateLoanMonth,
  changeDateLoanDate: borrowerNewLoanActions.changeDateLoanDate,
  changeDateLoanYear: borrowerNewLoanActions.changeDateLoanYear,
  submit: borrowerNewLoanActions.submit
})(BorrowerNewLoan);