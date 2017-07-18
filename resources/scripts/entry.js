import './polypush';

import React from 'react';
import { render } from 'react-dom';
import { browserHistory, Route, Router } from 'react-router';
import { Provider } from 'react-redux';

// pages
import Landing from './pages/Landing';
import Login from './pages/account/Login';
import Setup from './pages/account/Setup';
import SetPassword from './pages/account/setPassword';
import Welcome from './pages/account/Welcome';
import Logout from './pages/account/Logout';
import Dashboard from './pages/control_panel/Dashboard';
import NewBorrower from './pages/control_panel/NewBorrower';
import BorrowerProfile from './pages/control_panel/BorrowerProfile';
import BorrowersList from './pages/control_panel/BorrowersList';

import store from './createStore';

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/setup" component={Setup} />
      <Route path="/setup-password" component={SetPassword} />
      <Route path="/welcome" component={Welcome} />

      <Route path="/logout" component={Logout} />
      <Route path="/dashboard" component={Dashboard} />

      <Route path="/new-borrower" component={NewBorrower} />
      <Route path="/borrowers" component={BorrowersList} />
      <Route path="/borrowers/:id/view" component={BorrowerProfile} />

      <Route path="/login" component={Login} />
      <Route path="*" component={Landing} />
    </Router>
  </Provider>,
  document.querySelector('#main')
);