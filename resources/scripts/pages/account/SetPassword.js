import React, { Component } from 'react';
import { connect } from 'react-redux';

// actions
import * as setupActions from '../../actions/account/setup';
import { loggedIn } from '../../actions/session';
// components
import InputText from '../../components/forms/InputText';
import InputButton from '../../components/forms/InputButton';
// helpers
import { ucfirst } from '../../helpers/Strings';

export class SetPassword extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    document.title = 'Set password - LIMS';
  }

  handleSubmit(event) {
    if(event) event.preventDefault();

    return this.props.submit(this.props.setup);
  }

  componentWillUpdate(nextProps) {
    if(nextProps.setup.backend.status == 'successful') {
      if(nextProps.session.is_logged_in) {
        nextProps.router.push('/welcome');
      } else {
        nextProps.loggedIn({
          firstname: ucfirst(nextProps.setup.firstname.value),
          middlename: ucfirst(nextProps.setup.middlename.value),
          surname: ucfirst(nextProps.setup.surname.value),
          gender: nextProps.setup.gender.value,
          password: nextProps.setup.password.value,
          birth_date: {
            month: nextProps.setup.birth_date.month,
            date: nextProps.setup.birth_date.date,
            year: nextProps.setup.birth_date.year
          }
        });
      }
    }
  }

  render() {
    return (
      <div className="setup-wrapper default-content-wrapper">
        <h1>Set up a password</h1>

        <form onSubmit={this.handleSubmit} action="" method="post">
          <ul>
            <li>
              <InputText
              password={true}
              value={this.props.setup.password.value}
              placeholder="Desired password..."
              onChange={this.props.changePassword}
              errors={this.props.setup.password.errors}
              disabled={this.props.setup.backend.processing} />
            </li>
            <li>
              <InputText
              password={true}
              value={this.props.setup.confirm_password.value}
              placeholder="Retype your password above..."
              onChange={this.props.changeConfirmPassword}
              errors={this.props.setup.confirm_password.errors}
              disabled={this.props.setup.backend.processing}
              maxlength={50} />
            </li>
            <li>
              <InputButton
              value="Create account"
              onClick={this.handleSubmit}
              sending={this.props.setup.backend.processing}
              disabled={!this.props.setup.password.value.length
                || !this.props.setup.confirm_password.value.length
                || this.props.setup.password.errors.length
                || this.props.setup.confirm_password.errors.length
                || this.props.setup.backend.processing? true: false}
              errors={[this.props.setup.backend.message]} />
            </li>
          </ul>
        </form>
      </div>
    );
  }
}

export default connect(store => ({
  setup: {...store.setup},
  session: {...store.session}
}), {
  changePassword: setupActions.changePassword,
  changeConfirmPassword: setupActions.changeConfirmPassword,
  submit: setupActions.submit,
  loggedIn: loggedIn
})(SetPassword);