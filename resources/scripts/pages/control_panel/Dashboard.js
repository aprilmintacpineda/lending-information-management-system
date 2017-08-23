import React, { Component } from 'react';
import { connect } from 'react-redux';
import path from 'path';
import { remote } from 'electron';
import { Link } from 'react-router';

// helpers
import { toFormalDateTime } from '../../helpers/DateTime';
// components
import WithSidebar from '../../components/WithSidebar';
import WithLabel from '../../components/WithLabel';
import InputText from '../../components/forms/InputText';
import InputButton from '../../components/forms/InputButton';
import InputSelect from '../../components/forms/InputSelect';
import Modal from '../../components/Modal';
// actions
import * as dashboardActions from '../../actions/control_panel/dashboard';
import * as searchActions from '../../actions/control_panel/search';

class Dashboard extends Component {
  componentWillMount() {
    document.title = 'Dashboard - LIMS';
    
    this.props.searchReset();
    this.props.getTodays();
    this.props.getTomorrows();
    this.props.getYesterdays();
  }

  render() {
    console.log(this.props.search);

    let app_path = remote.app.getAppPath();

    return (
      <WithSidebar onLink="dashboard">
        <div className="dashboard">
          {this.props.search.search_results.length?
            <Modal dismiss={this.props.searchReset}>
              {this.props.search.query.type == 'borrower'?
                <div className="search-result-list">
                  <div className="header">
                    {this.props.search.search_results.length > 1?
                      <h1>{this.props.search.search_results.length} borrowers were found.</h1>
                    : <h1>{this.props.search.search_results.length} borrower was found.</h1>}
                  </div>

                  {this.props.search.search_results.map((search_result, search_result_index) =>
                    <div className="search-result-row" key={search_result_index}>
                      <div className="row">
                        <WithLabel label="Full name">
                          <p>{search_result.firstname} {search_result.middlename} {search_result.surname}</p>
                        </WithLabel>
                      </div>

                      <div className="row">
                        <WithLabel label="Date registered">
                          <p>{toFormalDateTime(search_result.created_at)}</p>
                        </WithLabel>
                      </div>

                      <Link className="default-btn-blue" to="/borrowers/:id/view">View borrower profile</Link>
                    </div>
                  )}
                </div>
              : this.props.search.query.type == 'loan'?
                <div>
                  {this.props.search.search_results.length > 1?
                    <h1>{this.props.search.search_results.length} loans were found.</h1>
                  : <h1>{this.props.search.search_results.length} loan was found.</h1>}
                </div>
              : this.props.search.query.type == 'penalty'?
                <div>
                  {this.props.search.search_results.length > 1?
                    <h1>{this.props.search.search_results.length} penalties were found.</h1>
                  : <h1>{this.props.search.search_results.length} penalty was found.</h1>}
                </div>
              : this.props.search.query.type == 'loan-payment'?
                <div>
                  {this.props.search.search_results.length > 1?
                    <h1>{this.props.search.search_results.length} loan payments were found.</h1>
                  : <h1>{this.props.search.search_results.length} loan payment was found.</h1>}
                </div>
              : this.props.search.query.type == 'penalty-payment'?
                <div>
                  {this.props.search.search_results.length > 1?
                    <h1>{this.props.search.search_results.length} penalty payments were found.</h1>
                  : <h1>{this.props.search.search_results.length} penalty payment was found.</h1>}
                </div>
              : null}
            </Modal>
          : null}
          <div className="search">
            <h1 className="title">Search</h1>

            <ul>
              <li>
                <InputText
                placeholder="Start typing..."
                onChange={this.props.changeSearchString}
                disabled={this.props.search.backend.processing}
                value={this.props.search.query.value}
                errors={[]} />
              </li>
              <li>
                <InputSelect
                onChange={this.props.changeSearchType}
                value={this.props.search.query.type}
                disabled={this.props.search.backend.processing}
                errors={[]}>
                  <option value="borrower">Borrower</option>
                  <option value="loan">Loan</option>
                  <option value="penalty">Penalty</option>
                  <option value="loan-payment">Loan payment</option>
                  <option value="penalty-payment">Penalty payment</option>
                </InputSelect>
              </li>
              <li>
                <InputButton
                value="Start search"
                onClick={() => this.props.submit({
                  search_query: this.props.search.query.value,
                  at: this.props.search.query.type
                })}
                sending={this.props.search.backend.processing}
                disabled={this.props.search.query.allow_submit && !this.props.search.backend.processing? false: true}
                errors={[]} />
              </li>
            </ul>
            {this.props.search.backend.status == 'failed'?
              <p className="errors">{this.props.search.backend.message}</p>
            : null}
          </div>
          <div className="due-dates">
            <h1 className="title">Due dates</h1>

            <div className="todays">
              {this.props.dashboard.todays.backend.processing?
                <div className="loading-contents">
                  <img src={path.join(app_path, 'app/images/processing-blue.gif')} />
                </div>
              : <p>display info</p>}
            </div>

            <div className="tomorrows">
              {this.props.dashboard.tomorrows.backend.processing?
                <img src={path.join(app_path, 'app/images/processing-blue.gif')} />
              : <p>display info</p>}
            </div>

            <div className="yesterdays">
              {this.props.dashboard.yesterdays.backend.processing?
                <img src={path.join(app_path, 'app/images/processing-blue.gif')} />
              : <p>display info</p>}
            </div>
          </div>
        </div>
      </WithSidebar>
    );
  }
}

export default connect(store => ({
  session: {...store.session},
  dashboard: {...store.dashboard},
  search: {...store.search}
}), {
  getTomorrows: dashboardActions.getTomorrows,
  getTodays: dashboardActions.getTodays,
  getYesterdays: dashboardActions.getYesterdays,
  changeSearchString: searchActions.changeSearchString,
  changeSearchType: searchActions.changeSearchType,
  submit: searchActions.submit,
  searchReset: searchActions.reset
})(Dashboard);