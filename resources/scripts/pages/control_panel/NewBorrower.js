import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import WithSidebar from '../../components/WithSidebar';
// helpers
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
    this.computerPerPayment = this.computerPerPayment.bind(this);
  }

  componentWillMount() {
    document.title = 'Add new borrower - Lending Information System';
  }

  handleSubmit(event) {
    if(event) event.preventDefaut();

    this.props.submit({
      firstname: this.props.new_borrower.firstname.value,
      middlename: this.props.new_borrower.middlename.value,
      surname: this.props.new_borrower.surname.value,
      gender: this.props.new_borrower.gender.value,
      amount_loan: this.props.new_borrower.amount_loan.value,
      mode_of_payment: this.props.new_borrower.mode_of_payment.value,
      times_to_pay: this.props.new_borrower.times_to_pay.value,
      interest_rate: this.props.new_borrower.interest_rate.value,
      interest: this.computeInterest(),
      profit: this.computeProfit(),
      per_payment: this.computerPerPayment()
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
    return this.computeInterest() * Number(this.props.new_borrower.times_to_pay.value);
  }

  computerPerPayment() {
    // per payment = (profit + loan amount) / times to pay
    return (this.computeProfit() + Number(this.props.new_borrower.amount_loan.value)) /
        Number(this.props.new_borrower.times_to_pay.value);
  }

  render() {
    let per_payment = 0;
    let profit = 0;
    let interest_percentage = 0;
    let interest = 0;

    if(this.props.new_borrower.interest_rate.value.length
    && this.props.new_borrower.amount_loan.value.length
    && this.props.new_borrower.times_to_pay.value.length
    && !this.props.new_borrower.interest_rate.errors.length
    && !this.props.new_borrower.amount_loan.errors.length
    && !this.props.new_borrower.times_to_pay.errors.length) {
      interest_percentage = this.computeInterestPercentage();
      interest = this.computeInterest();
      profit = this.computeProfit();
      per_payment = this.computerPerPayment();
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
                He is a...
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
              <li>
                <InputText
                value={this.props.new_borrower.amount_loan.value}
                placeholder="Amount of loan..."
                numberOnly={true}
                onChange={this.props.changeAmountLoan}
                errors={this.props.new_borrower.amount_loan.errors}
                disabled={this.props.new_borrower.backend.processing}
                maxlength={50} />
                <p>PHP {currency(this.props.new_borrower.amount_loan.value)}</p>
              </li>
              <li>
                <InputText
                value={this.props.new_borrower.interest_rate.value}
                placeholder="Interest percentage..."
                numberOnly={true}
                onChange={this.props.changeInterest}
                errors={this.props.new_borrower.interest_rate.errors}
                disabled={this.props.new_borrower.backend.processing}
                maxlength={50} />
                <p>{currency(this.props.new_borrower.interest_rate.value)}%</p>
              </li>
              <li>
                Mode of payment...
                <InputSelect
                onChange={this.props.changeModeOfPayment}
                value={this.props.new_borrower.mode_of_payment.value}
                disabled={this.props.new_borrower.backend.processing}
                errors={this.props.new_borrower.mode_of_payment.errors}>
                  <option value="1">Daily</option>
                  <option value="2">Weekly</option>
                  <option value="3">Monthly</option>
                  <option value="4">Tri-anually</option>
                  <option value="5">Quarterly</option>
                  <option value="6">Semi-annually</option>
                  <option value="7">Annually</option>
                </InputSelect>
              </li>
              <li>
                <InputText
                placeholder={this.props.new_borrower.mode_of_payment.value == '1'?
                    'Number of days to pay...'
                  : this.props.new_borrower.mode_of_payment.value == '2'?
                    'Number of weeks to pay...'
                  : this.props.new_borrower.mode_of_payment.value == '3'?
                    'Number of months to pay...'
                  : this.props.new_borrower.mode_of_payment.value == '4'?
                    'Number of triennials to pay...'
                  : this.props.new_borrower.mode_of_payment.value == '5'?
                    'Number of quarters to pay...'
                  : this.props.new_borrower.mode_of_payment.value == '6'?
                    'Number of semi-annuals to pay...'
                  : 'Number of annuals to pay...'}
                numberOnly={true}
                onChange={this.props.changeTimesToPay}
                value={this.props.new_borrower.times_to_pay.value}
                errors={this.props.new_borrower.times_to_pay.errors}
                disabled={this.props.new_borrower.backend.processing}
                maxlength={50} />
              </li>
            </ul>

            <ul>
              <li>
                <p>Interest</p>
                <DisplayTextBox value={currency(interest)} />
              </li>
              <li>
                <p>Profit</p>
                <DisplayTextBox value={currency(profit)} />
              </li>
              <li>
                <p>{this.props.new_borrower.mode_of_payment.value == 1? 'Daily'
                  : this.props.new_borrower.mode_of_payment.value == 2? 'Weekly'
                  : this.props.new_borrower.mode_of_payment.value == 3? 'Monthly'
                  : this.props.new_borrower.mode_of_payment.value == 4? 'Tri-annually'
                  : this.props.new_borrower.mode_of_payment.value == 5? 'Quarterly'
                  : this.props.new_borrower.mode_of_payment.value == 6? 'Semi-annually'
                  : 'Annually'} payment of</p>
                <DisplayTextBox value={currency(per_payment)} />
              </li>
              <li>
                <InputButton
                value="Next"
                onClick={this.handleSubmit}
                sending={false}
                disabled={this.props.new_borrower.backend.processing}
                errors={[]} />
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
  changeModeOfPayment: newBorrowerActions.changeModeOfPayment,
  changeTimesToPay: newBorrowerActions.changeTimesToPay,
  submit: newBorrowerActions.submit
})(NewBorrower);