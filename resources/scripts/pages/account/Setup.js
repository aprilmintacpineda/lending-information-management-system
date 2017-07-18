import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

// helpers
import { monthList, monthMaxdays, minYear, maxYear } from '../../helpers/DateTime';
import { ucfirst } from '../../helpers/Strings';
// actions
import * as actions from '../../actions/account/setup';
// components
import InputText from '../../components/forms/InputText';
import InputSelect from '../../components/forms/InputSelect';
import InputButton from '../../components/forms/InputButton';

class Setup extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    document.title = 'Set up account information - LIMS';
  }

  handleSubmit(event) {
    if(event) event.preventDefault();
    this.props.router.push('/setup-password');
  }

  componentWillUpdate(nextProps) {
    let max_days_in_month = monthMaxdays(nextProps.setup.birth_date.month, nextProps.setup.birth_date.year);

    if(nextProps.setup.birth_date.date > max_days_in_month) {
      this.props.changeBirthdate('1');
    }
  }

  render() {
    let month_list = monthList();
    let months = month_list.map((month, index) => <option key={index}>{month}</option>);
    let max_days_in_month = monthMaxdays(this.props.setup.birth_date.month, this.props.setup.birth_date.year);

    let dates = [];
    let years = [];

    let min_year = minYear();
    let max_year = maxYear();

    for(let a = 1; a <= max_days_in_month; a++) {
      dates.push(<option key={a}>{a}</option>);
    }

    for(let a = min_year; a <= max_year; a++) {
      years .push(<option key={a}>{a}</option>);
    }

    return (
      <div className="setup-wrapper default-content-wrapper">
        <h1>Hi there! It looks like this is your first time using this software. Let's setup your account.</h1>

        <form onSubmit={this.handleSubmit} action="" method="post">
          <ul>
            <li>
              <InputText
              value={this.props.setup.firstname.value}
              placeholder="Your first name..."
              onChange={value => this.props.changeFirstname(ucfirst(value))}
              errors={this.props.setup.firstname.errors}
              disabled={this.props.setup.backend.processing}
              maxlength={50} />
            </li>
            <li>
              <InputText
              value={this.props.setup.middlename.value}
              placeholder="Your middle name..."
              onChange={value => this.props.changeMiddlename(ucfirst(value))}
              errors={this.props.setup.middlename.errors}
              disabled={this.props.setup.backend.processing}
              maxlength={50} />
            </li>
            <li>
              <InputText
              value={this.props.setup.surname.value}
              placeholder="Your surname..."
              onChange={value => this.props.changeSurname(ucfirst(value))}
              errors={this.props.setup.surname.errors}
              disabled={this.props.setup.backend.processing}
              maxlength={50} />
            </li>
            <li>
              I am a...
              <InputSelect
              onChange={this.props.changeGender}
              value={this.props.setup.gender.value}
              disabled={this.props.setup.backend.processing}
              errors={this.props.setup.gender.errors}>
                <option value="1">Male</option>
                <option value="0">Female</option>
              </InputSelect>
            </li>
            <li className="clear-floats">
              I was born on
              <InputSelect
              className="birth-date"
              onChange={value => this.props.changeBirthmonth(ucfirst(value))}
              value={this.props.setup.birth_date.month}
              disabled={this.props.setup.backend.processing}
              errors={[]}>
                {months}
              </InputSelect>

              <InputSelect
              className="birth-date"
              onChange={this.props.changeBirthdate}
              value={this.props.setup.birth_date.date}
              disabled={this.props.setup.backend.processing}
              errors={[]}>
                {dates}
              </InputSelect>

              <InputSelect
              className="birth-date"
              onChange={this.props.changeBirthyear}
              value={this.props.setup.birth_date.year}
              disabled={this.props.setup.backend.processing}
              errors={[]}>
                {years}
              </InputSelect>

              {this.props.setup.birth_date.errors.length?
                <div className="error-list">
                  {this.props.setup.birth_date.errors.map((error, index) => (
                    <p key={index}>{error}</p>
                  ))}
                </div>
              : null}
            </li>
            <li>
              <InputButton
              value="Next"
              onClick={this.handleSubmit}
              sending={false}
              disabled={this.props.setup.firstname.value.length &&
                this.props.setup.middlename.value.length &&
                this.props.setup.surname.value.length &&
                !this.props.setup.firstname.errors.length &&
                !this.props.setup.middlename.errors.length &&
                !this.props.setup.surname.errors.length &&
                !this.props.setup.gender.errors.length? false : true}
              errors={[]} />
            </li>
          </ul>
        </form>
      </div>
    );
  }
}

export default connect(store => ({
  setup: {...store.setup}
}), {
  changeFirstname: actions.changeFirstname,
  changeMiddlename: actions.changeMiddlename,
  changeSurname: actions.changeSurname,
  changeGender: actions.changeGender,
  changeBirthmonth: actions.changeBirthmonth,
  changeBirthdate: actions.changeBirthdate,
  changeBirthyear: actions.changeBirthyear
})(Setup);