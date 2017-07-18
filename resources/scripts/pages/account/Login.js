import React, { Component } from 'react';
import { connect } from 'react-redux';
import path from 'path';
import { remote } from 'electron';

// actions
import * as loginActions from '../../actions/account/login';
import { getUserData, loggedIn } from '../../actions/session';
// components
import InputText from '../../components/forms/InputText';
import InputButton from '../../components/forms/InputButton';

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    document.title = 'Login - LIMS';
    this.props.getUserData();
  }

  handleSubmit(event) {
    event.preventDefault();
    if(!this.props.login_info.password.errors.length) {
      this.props.login(this.props.login_info.password.value);
    }
  }

  componentWillUpdate(nextProps) {
    if(nextProps.login_info.backend.status == 'logged_in') {
      if(this.props.session.is_logged_in) {
        this.props.clearLogin();
        this.props.router.push('/dashboard');
      } else {
        this.props.loggedIn(false);
      }
    }
  }

  render() {
    let app_path = remote.app.getAppPath();

    return (
      <div className="login-wrapper default-content-wrapper">
        <form onSubmit={this.handleSubmit} method="post" action="">
          <ul>
            <li>
              <img className="profile-image" src={path.join(app_path, 'app/images/profile_avatar.jpg')}/>
            </li>
            <li>
              {this.props.session.user_data !== null?
                <h1>{this.props.session.user_data.firstname + ' ' + this.props.session.user_data.surname}</h1>
              : <img className="loading-form" src={path.join(app_path, 'app/images/processing-blue.gif')}/>}
            </li>
            <li>
              <InputText
              password={true}
              value={this.props.login_info.password.value}
              placeholder="Desired password..."
              onChange={this.props.changePassword}
              errors={this.props.login_info.password.errors}
              disabled={this.props.login_info.backend.processing} />
            </li>
            {this.props.login_info.backend.processing?
              <li className="logging-in">
                <img src={path.join(app_path, 'app/images/processing-blue.gif')}/> Verifying password...
              </li>
            : null}
          </ul>
        </form>
      </div>
    );
  }
}

export default connect(store => ({
  session: {...store.session},
  login_info: {...store.login}
}), {
  login: loginActions.login,
  changePassword: loginActions.changePassword,
  clearLogin: loginActions.clearLogin,
  getUserData: getUserData,
  loggedIn: loggedIn
})(Login);