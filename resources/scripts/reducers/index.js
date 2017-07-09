import { combineReducers } from 'redux';

import session from './session';
// acount
import setup from './account/setup';
import login from './account/login';
// control panel
import new_borrower from './control_panel/new_borrower';

export default combineReducers({
  session,
  login,
  setup,
  new_borrower
});