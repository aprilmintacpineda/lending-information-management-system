import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import WithSidebar from '../../components/WithSidebar';
// helpers
import { ucfirst } from '../../helpers/Strings';
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
    document.title = 'Add new borrower - Lending Information System';
  }

  handleSubmit(event) {
    if(event) event.preventDefaut();

    console.log('handleSubmit');
  }

  render() {
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
                onChange={value => this.props.changeFirstname(ucfirst(value))}
                errors={this.props.new_borrower.firstname.errors}
                disabled={this.props.new_borrower.backend.processing}
                maxlength={50} />
              </li>
              <li>
                <InputText
                value={this.props.new_borrower.middlename.value}
                placeholder="Borrower's middle name..."
                onChange={value => this.props.changeMiddlename(ucfirst(value))}
                errors={this.props.new_borrower.middlename.errors}
                disabled={this.props.new_borrower.backend.processing}
                maxlength={50} />
              </li>
              <li>
                <InputText
                value={this.props.new_borrower.surname.value}
                placeholder="Borrower's surname..."
                onChange={value => this.props.changeSurname(ucfirst(value))}
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
                    'Number of Semi-annuals to pay...'
                  : 'Number of annuals to pay...'}
                numberOnly={true}
                onChange={this.props.changeTimesToPay}
                value={this.props.new_borrower.times_to_pay.value}
                errors={this.props.new_borrower.times_to_pay.errors}
                disabled={this.props.new_borrower.backend.processing}
                maxlength={50} />
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
  changeTimesToPay: newBorrowerActions.changeTimesToPay
})(NewBorrower);