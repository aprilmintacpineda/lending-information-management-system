import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import WithSidebar from '../../components/WithSidebar';
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
    document.title = 'Add new borrower - Lending Information System';
  }

  componentWillUpdate(nextProps) {
    if(nextProps.new_borrower.backend.status == 'successful') {
      nextProps.router.push('/borrowers/' + nextProps.new_borrower.id);
    }
  }

  handleSubmit(event) {
    if(event) event.preventDefaut();

    this.props.submit({
      firstname: this.props.new_borrower.firstname.value,
      middlename: this.props.new_borrower.middlename.value,
      surname: this.props.new_borrower.surname.value,
      gender: this.props.new_borrower.gender.value,
      amount_loan: this.props.new_borrower.amount_loan.value,
      months_to_pay: this.props.new_borrower.months_to_pay.value,
      apply_interest: this.props.new_borrower.apply_interest,
      interest: this.props.new_borrower.apply_interest? this.computeInterest() : 0,
      profit: this.props.new_borrower.apply_interest? this.computeProfit() : 0,
      interest_rate: this.props.new_borrower.apply_interest? this.props.new_borrower.interest_rate.value : 0,
      per_month: this.computePerMonth(),
      per_day: this.computePerDay(),
      loan_date: this.props.new_borrower.loan_date.month + ' ' + this.props.new_borrower.loan_date.date + ', ' + this.props.new_borrower.loan_date.year
    });
  }

  computeInterestPercentage() {
    // interest rate / 100
    return Number(this.props.new_borrower.interest_rate.value) / 100;
  }

  computeInterest() {
    // amount loan * interest percentage
    return Number(this.props.new_borrower.amount_loan.value) * this.computeInterestPercentage();
  }

  computeProfit() {
    // profit = (loan amount * interest percentage) * times to pay
    return this.computeInterest() * Number(this.props.new_borrower.months_to_pay.value);
  }

  computePerMonth() {
    if(this.props.new_borrower.apply_interest) {
      // per payment = (profit + loan amount) / times to pay
      return (this.computeProfit() + Number(this.props.new_borrower.amount_loan.value)) /
        Number(this.props.new_borrower.months_to_pay.value);
    }

    return Number(this.props.new_borrower.amount_loan.value) /
      Number(this.props.new_borrower.months_to_pay.value);
  }

  computePerDay() {
    // (loan amount + profit) / (30 * months to pay)
    return (Number(this.props.new_borrower.amount_loan.value) + this.computeProfit()) / (30 * this.props.new_borrower.months_to_pay.value);
  }

  computePerHalfMonth() {
    // (loan amount + profit) / (30 * months to pay)
    return this.computePerMonth() / 2;
  }

  render() {
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
      years .push(<option key={a}>{a}</option>);
    }

    if(!this.props.new_borrower.apply_interest
    && this.props.new_borrower.amount_loan.value.length
    && this.props.new_borrower.months_to_pay.value.length
    && !this.props.new_borrower.amount_loan.errors.length
    && !this.props.new_borrower.months_to_pay.errors.length) {
      per_month = this.computePerMonth();
      per_day = this.computePerDay();
      per_half_month = this.computePerHalfMonth();
    } else if(this.props.new_borrower.interest_rate.value.length
    && this.props.new_borrower.amount_loan.value.length
    && this.props.new_borrower.months_to_pay.value.length
    && !this.props.new_borrower.interest_rate.errors.length
    && !this.props.new_borrower.amount_loan.errors.length
    && !this.props.new_borrower.months_to_pay.errors.length) {
      interest_percentage = this.computeInterestPercentage();
      interest = this.computeInterest();
      profit = this.computeProfit();
      per_month = this.computePerMonth();
      per_day = this.computePerDay();
      per_half_month = this.computePerHalfMonth();
    }

    return (
      <WithSidebar>
        <div className="new-loan-wrapper">
          <form onSubmit={this.handleSubmit} method="post" action="">
            <ul>
              <li>
                <h1>Personal information</h1>
              </li>
              <li>
                <InputText
                value={this.props.new_borrower.firstname.value}
                placeholder="Borrower's first name..."
                onChange={value => this.props.changeFirstname(ucwords(value))}
                errors={this.props.new_borrower.firstname.errors}
                disabled={this.props.new_borrower.backend.processing}
                maxlength={50} />
              </li>
              <li>
                <InputText
                value={this.props.new_borrower.middlename.value}
                placeholder="Borrower's middle name..."
                onChange={value => this.props.changeMiddlename(ucwords(value))}
                errors={this.props.new_borrower.middlename.errors}
                disabled={this.props.new_borrower.backend.processing}
                maxlength={50} />
              </li>
              <li>
                <InputText
                value={this.props.new_borrower.surname.value}
                placeholder="Borrower's surname..."
                onChange={value => this.props.changeSurname(ucwords(value))}
                errors={this.props.new_borrower.surname.errors}
                disabled={this.props.new_borrower.backend.processing}
                maxlength={50} />
              </li>
              <li>
                The borrower is a...
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
                <h1>Loan information</h1>
              </li>
              <li className="clear-floats">
                Date loan...
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
                <InputText
                value={this.props.new_borrower.amount_loan.value}
                placeholder="Utang..."
                numberOnly={true}
                onChange={this.props.changeAmountLoan}
                errors={this.props.new_borrower.amount_loan.errors}
                disabled={this.props.new_borrower.backend.processing}
                maxlength={50} />
                <p>PHP {currency(this.props.new_borrower.amount_loan.value)}</p>
              </li>
              <li>
                <InputText
                value={!this.props.new_borrower.apply_interest? 'N/A' : this.props.new_borrower.interest_rate.value}
                placeholder="Interest percentage..."
                numberOnly={true}
                onChange={this.props.changeInterest}
                errors={this.props.new_borrower.interest_rate.errors}
                disabled={this.props.new_borrower.backend.processing || !this.props.new_borrower.apply_interest}
                maxlength={50} />
                <p>{currency(this.props.new_borrower.interest_rate.value)}%</p>
              </li>
              <li>
                <InputText
                placeholder={'Months to pay...'}
                numberOnly={true}
                onChange={this.props.changeMonthsToPay}
                value={this.props.new_borrower.months_to_pay.value}
                errors={this.props.new_borrower.months_to_pay.errors}
                disabled={this.props.new_borrower.backend.processing}
                maxlength={50} />
              </li>
            </ul>

            <ul>
              <li>
                <p>Tubo kada buwan</p>
                <DisplayTextBox value={'PHP ' + currency(interest)} />
              </li>
              <li>
                <p>Tubo</p>
                <DisplayTextBox value={'PHP ' + currency(profit)} />
              </li>
              <li>
                <p>Per month</p>
                <DisplayTextBox value={'PHP ' + currency(per_month)} />
              </li>
              <li>
                <p>Half a month</p>
                <DisplayTextBox value={'PHP ' + currency(per_half_month)} />
              </li>
              <li>
                <p>Per day</p>
                <DisplayTextBox value={'PHP ' + currency(per_day)} />
              </li>
              <li>
                <input
                id="apply-interest"
                type="checkbox"
                checked={this.props.new_borrower.apply_interest}
                onChange={(changeEvent) => this.props.changeApplyInterest(changeEvent.target.checked)} />
                <label htmlFor="apply-interest"> Apply interest</label>
              </li>
              <li>
                <InputButton
                value="Next"
                onClick={this.handleSubmit}
                sending={this.props.new_borrower.backend.processing}
                disabled={this.props.new_borrower.backend.processing
                || !this.props.new_borrower.firstname.value.length
                || this.props.new_borrower.firstname.errors.length
                || !this.props.new_borrower.middlename.value.length
                || this.props.new_borrower.middlename.errors.length
                || !this.props.new_borrower.surname.value.length
                || this.props.new_borrower.surname.errors.length
                || !this.props.new_borrower.amount_loan.value.length
                || this.props.new_borrower.amount_loan.errors.length
                || !this.props.new_borrower.interest_rate.value.length
                || this.props.new_borrower.interest_rate.errors.length
                || !this.props.new_borrower.months_to_pay.value.length
                || this.props.new_borrower.months_to_pay.errors.length
                || this.props.new_borrower.gender.errors.length? true: false}
                errors={[this.props.new_borrower.backend.message]} />
              </li>
            </ul>
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
  changeMonthsToPay: newBorrowerActions.changeMonthsToPay,
  changeApplyInterest: newBorrowerActions.changeApplyInterest,
  changeDateLoanMonth: newBorrowerActions.changeDateLoanMonth,
  changeDateLoanDate: newBorrowerActions.changeDateLoanDate,
  changeDateLoanYear: newBorrowerActions.changeDateLoanYear,
  submit: newBorrowerActions.submit
})(NewBorrower);