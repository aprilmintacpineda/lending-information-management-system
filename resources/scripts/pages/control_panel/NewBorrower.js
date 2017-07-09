import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import WithSidebar from '../../components/WithSidebar';
// helpers
import { ucfirst } from '../../helpers/Strings';
// components
import InputText from '../../components/forms/InputText';
import InputSelect from '../../components/forms/InputSelect';
import InputButton from '../../components/forms/InputButton';
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
                value={this.props.new_borrower.amountLoan.value}
                placeholder="Amount of loan..."
                numberOnly={true}
                onChange={this.props.changeAmountLoan}
                errors={this.props.new_borrower.amountLoan.errors}
                disabled={this.props.new_borrower.backend.processing}
                maxlength={50} />
              </li>
              <li>
                <InputText
                value={this.props.new_borrower.monthsToPay.value}
                placeholder="Number of months to pay..."
                numberOnly={true}
                onChange={this.props.changeMonthsToPay}
                errors={this.props.new_borrower.monthsToPay.errors}
                disabled={this.props.new_borrower.backend.processing}
                maxlength={50} />
              </li>
              <li>
                <InputText
                value={this.props.new_borrower.interestRate.value}
                placeholder="Interest percentage..."
                numberOnly={true}
                onChange={this.props.changeInterest}
                errors={this.props.new_borrower.interestRate.errors}
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
  changeMonthsToPay: newBorrowerActions.changeMonthsToPay,
  changeInterest: newBorrowerActions.changeInterest
})(NewBorrower);