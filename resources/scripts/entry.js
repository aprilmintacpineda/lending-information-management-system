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
import BorrowerEditProfile from './pages/control_panel/BorrowerEditProfile';
import BorrowerNewLoan from './pages/control_panel/BorrowerNewLoan';
import LoanContract from './pages/control_panel/LoanContract';
import LoanComprehensiveReport from './pages/control_panel/LoanComprehensiveReport';
import LoanSummaryReport from './pages/control_panel/LoanSummaryReport';
import BorrowerComprehensiveReport from './pages/control_panel/BorrowerComprehensiveReport';
import BorrowerSummaryReport from './pages/control_panel/BorrowerSummaryReport';
import About from './pages/About';

import store from './createStore';

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/about" component={About} />

      <Route path="/setup" component={Setup} />
      <Route path="/setup-password" component={SetPassword} />
      <Route path="/welcome" component={Welcome} />

      <Route path="/logout" component={Logout} />
      <Route path="/dashboard" component={Dashboard} />

      <Route path="/new-borrower" component={NewBorrower} />
      <Route path="/borrowers" component={BorrowersList} />
      <Route path="/borrowers/:id/view" component={BorrowerProfile} />
      <Route path="/borrowers/:id/edit" component={BorrowerEditProfile} />
      <Route path="/borrowers/:id/new-loan" component={BorrowerNewLoan} />
      <Route path="/borrowers/:id/comprehensive-report" component={BorrowerComprehensiveReport} />
      <Route path="/borrowers/:id/summary-report" component={BorrowerSummaryReport} />

      <Route path="/loan/:id/contract" component={LoanContract} />
      <Route path="/loan/:id/comprehensive-report" component={LoanComprehensiveReport} />
      <Route path="/loan/:id/summary-report" component={LoanSummaryReport} />

      <Route path="/login" component={Login} />
      <Route path="*" component={Landing} />
    </Router>
  </Provider>,
  document.querySelector('#main')
);