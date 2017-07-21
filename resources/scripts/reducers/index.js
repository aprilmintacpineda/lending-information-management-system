import { combineReducers } from 'redux';

import session from './session';
// acount
import setup from './account/setup';
import login from './account/login';
// control panel
import new_borrower from './control_panel/new_borrower';
import dashboard from './control_panel/dashboard';
import borrowers_list from './control_panel/borrowers_list';
import borrower_profile from './control_panel/borrower_profile';
import edit_borrower_profile from './control_panel/edit_borrower_profile';

export default combineReducers({
  session,
  login,
  setup,
  new_borrower,
  dashboard,
  borrowers_list,
  borrower_profile,
  edit_borrower_profile
});