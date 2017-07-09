import React, { Component } from 'react';
import { Link } from 'react-router';

class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar-wrapper">
        <nav>
          <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/new-borrower">New Borrower</Link></li>
            <li><Link to="/logout">Logout</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Sidebar;