import React, { Component } from 'react';
import { connect } from 'react-redux';
import { remote } from 'electron';
import CssTransitionGroup from 'react-addons-css-transition-group';
import path from 'path';

// components
import WithSidebar from '../../components/WithSidebar';
import WithIcon from '../../components/WithIcon';
import InputText from '../../components/forms/InputText';
import InputSelect from '../../components/forms/InputSelect';
import InputButton from '../../components/forms/InputButton';
// actions
import * as editProfileActions from '../../actions/control_panel/edit_borrower_profile';

class BorrowerEditProfile extends Component {
  componentWillMount() {
    this.props.fetch(this.props.params.id);
  }

  componentWillUnmount() {
    this.props.reset();
  }

  render() {
    let app_path = remote.app.getAppPath();

    return (
      <WithSidebar>
        <div className="edit-borrower-profile">
          {this.props.edit_borrower_profile.data.backend.processing?
            <div className="loading-component">
              <img src={path.join(app_path, 'app/images/processing-blue.gif')} />
            </div>
          : this.props.edit_borrower_profile.data.backend.status == 'successful'?
            <div className="edit-form">
              <ul className="left">
                <li>
                  <h1>Contact numbers</h1>
                </li>
                <li>
                  <p>This information is optional.</p>
                </li>
                <li>
                  <CssTransitionGroup
                  transitionName="emphasize-entry"
                  transitionEnterTimeout={400}
                  transitionLeaveTimeout={400}>
                  {this.props.edit_borrower_profile.edit.contact_numbers.map((contact_number, index) =>
                    <div className="closable-field" key={contact_number.id? contact_number.id : contact_number.key}>
                      <InputText
                      className={contact_number.value.length || index > 0? 'closable-input' : ''}
                      numberOnly={true}
                      placeholder="Borrower's contact number..."
                      onChange={value => this.props.editContactNumber(value, index)}
                      disabled={this.props.edit_borrower_profile.edit.backend.processing}
                      errors={contact_number.errors}
                      value={contact_number.value} />
                      {index > 0?
                        <span onClick={() => this.props.edit_borrower_profile.edit.backend.processing? false : this.props.removeContactNumber(index )} className="remove-contact-field">X</span>
                      : null}
                    </div>
                  )}
                  </CssTransitionGroup>
                </li>
                <li>
                  <a className={this.props.edit_borrower_profile.edit.backend.processing? 'default-btn-blue disabled' : 'default-btn-blue'}
                  onClick={() => this.props.edit_borrower_profile.edit.backend.processing? false : this.props.addMoreContactNumbers()}>
                    Add more fields
                  </a>
                </li>
              </ul>
              <ul className="right">
                <li>
                  <h1>Personal information</h1>
                </li>
                <li>
                  <InputText
                  placeholder="Borrower's first name..."
                  onChange={this.props.editFirstname}
                  disabled={this.props.edit_borrower_profile.edit.backend.processing}
                  errors={this.props.edit_borrower_profile.edit.firstname.errors}
                  value={this.props.edit_borrower_profile.edit.firstname.value}>
                  </InputText>
                </li>
                <li>
                  <InputText
                  placeholder="Borrower's middle name..."
                  onChange={this.props.editMiddlename}
                  disabled={this.props.edit_borrower_profile.edit.backend.processing}
                  errors={this.props.edit_borrower_profile.edit.middlename.errors}
                  value={this.props.edit_borrower_profile.edit.middlename.value}>
                  </InputText>
                </li>
                <li>
                  <InputText
                  placeholder="Borrower's surname..."
                  onChange={this.props.editSurname}
                  disabled={this.props.edit_borrower_profile.edit.backend.processing}
                  errors={this.props.edit_borrower_profile.edit.surname.errors}
                  value={this.props.edit_borrower_profile.edit.surname.value}>
                  </InputText>
                </li>
                <li>
                  <InputSelect
                  onChange={this.props.editGender}
                  disabled={this.props.edit_borrower_profile.edit.backend.processing}
                  errors={this.props.edit_borrower_profile.edit.gender.errors}
                  value={this.props.edit_borrower_profile.edit.gender.value.toString()}>
                    <option value="1">Male</option>
                    <option value="0">Female</option>
                  </InputSelect>
                </li>
                <li>
                  <InputText
                  placeholder="Borrower's address..."
                  onChange={this.props.editAddress}
                  disabled={this.props.edit_borrower_profile.edit.backend.processing}
                  errors={this.props.edit_borrower_profile.edit.address.errors}
                  value={this.props.edit_borrower_profile.edit.address.value}>
                  </InputText>
                </li>
                <li>
                  <InputButton
                  value="Save changes"
                  disabled={this.props.edit_borrower_profile.edit.backend.allow_submit && !this.props.edit_borrower_profile.edit.backend.processing? false: true}
                  sending={this.props.edit_borrower_profile.edit.backend.processing}
                  onClick={() => this.props.send({
                    firstname: this.props.edit_borrower_profile.edit.firstname.value,
                    middlename: this.props.edit_borrower_profile.edit.middlename.value,
                    surname: this.props.edit_borrower_profile.edit.surname.value,
                    gender: this.props.edit_borrower_profile.edit.gender.value,
                    address: this.props.edit_borrower_profile.edit.address.value,
                    contact_numbers: this.props.edit_borrower_profile.edit.contact_numbers,
                    id: this.props.params.id
                  })}
                  errors={[]} />
                </li>
                {this.props.edit_borrower_profile.edit.backend.status == 'failed'?
                  <li>
                    <WithIcon icon={path.join(app_path, 'app/images/cross.png')}>
                      <p className="errors">Failed to save changes <u>{this.props.edit_borrower_profile.edit.backend.message}</u></p>
                    </WithIcon>
                  </li>
                : this.props.edit_borrower_profile.edit.backend.status == 'successful'?
                  <li>
                    <WithIcon icon={path.join(app_path, 'app/images/check.png')}>
                      <p className="okay">Changes saved successfully.</p>
                    </WithIcon>
                  </li>
                : null}
              </ul>
            </div> :
            <div>
              <p>{this.props.edit_borrower_profile.data.backend.message}</p>
            </div>}
        </div>
      </WithSidebar>
    );
  }
}

export default connect(store => ({
  edit_borrower_profile: {...store.edit_borrower_profile}
}), {
  fetch: editProfileActions.fetch,
  editAddress: editProfileActions.editAddress,
  editFirstname: editProfileActions.editFirstname,
  editMiddlename: editProfileActions.editMiddlename,
  editSurname: editProfileActions.editSurname,
  editGender: editProfileActions.editGender,
  editContactNumber: editProfileActions.editContactNumber,
  addMoreContactNumbers: editProfileActions.addMoreContactNumbers,
  removeContactNumber: editProfileActions.removeContactNumber,
  send: editProfileActions.send,
  reset: editProfileActions.reset
})(BorrowerEditProfile);