import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

class Sidebar extends Component {
  static propTypes = {
    onLink: PropTypes.string
  }

  render() {
    return (
      <div className="sidebar-wrapper">
        <nav>
          <ul>
            <li><Link className={this.props.onLink == 'dashboard'? 'on-link': false} to="/dashboard">Dashboard</Link></li>
            <li><Link className={this.props.onLink == 'borrowers-list'? 'on-link': false} to="/borrowers">List of borrowers</Link></li>
            <li><Link className={this.props.onLink == 'new-borrower'? 'on-link': false} to="/new-borrower">Register new borrower</Link></li>
            <li><Link className={this.props.onLink == 'income-expense-report'? 'on-link': false} to="/income-expense-report">Income Expense Report</Link></li>
            <li><Link to="/logout">Logout</Link></li>
            <li><Link className={this.props.onLink == 'about'? 'on-link': false} to="/about">About</Link></li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Sidebar;