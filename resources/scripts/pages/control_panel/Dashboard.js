import React, { Component } from 'react';
import { connect } from 'react-redux';
import path from 'path';
import { remote } from 'electron';
import { Link } from 'react-router';

// helpers
import { toFormalDate } from '../../helpers/DateTime';
import { currency } from '../../helpers/Numbers';
// components
import WithSidebar from '../../components/WithSidebar';
import WithLabel from '../../components/WithLabel';
import WithIcon from '../../components/WithIcon';
import InputText from '../../components/forms/InputText';
import InputButton from '../../components/forms/InputButton';
import InputSelect from '../../components/forms/InputSelect';
import Modal from '../../components/Modal';
// actions
import * as dashboardActions from '../../actions/control_panel/dashboard';
import * as searchActions from '../../actions/control_panel/search';
import { putHash } from '../../actions/control_panel/borrower_profile';

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
                          <p>{toFormalDate(search_result.created_at)}</p>
                        </WithLabel>
                      </div>

                      <Link className="default-btn-blue" to={'/borrowers/'+ search_result.id +'/view'}>View borrower profile</Link>
                    </div>
                  )}
                </div>
              : this.props.search.query.type == 'loan'?
                <div className="search-result-list">
                  <div className="header">
                    {this.props.search.search_results.length > 1?
                      <h1>{this.props.search.search_results.length} loans were found.</h1>
                    : <h1>{this.props.search.search_results.length} loan was found.</h1>}
                  </div>

                  {this.props.search.search_results.map((search_result, search_result_index) => 
                    <div className="search-result-row" key={search_result_index}>
                      <div className="row">
                        <WithLabel label="Trace ID">
                          <p>{search_result.id}</p>
                        </WithLabel>
                      </div>

                      <div className="row">
                        <WithLabel label="Loan date">
                          <p>{toFormalDate(search_result.loan_date)}</p>
                        </WithLabel>
                      </div>

                      <div className="row">
                        <h1>Loan summary</h1>
                      </div>

                      <div className="row">
                        <WithLabel label="Total amount loan">
                          <p>{currency(search_result.amount)} Pesos</p>
                        </WithLabel>
                      </div>

                      <div className="row">
                        <WithLabel label="Total amount paid">
                          <p>{currency(search_result.loan_payments_summary.total_amount_paid)} Pesos</p>
                        </WithLabel>
                      </div>

                      <div className="row">
                        <WithLabel label="Remaining balance">
                          <p>{currency(search_result.loan_payments_summary.remaining_balance)} Pesos</p>
                        </WithLabel>
                      </div>

                      <div className="row">
                        <h1>Penalties summary</h1>
                      </div>

                      <div className="row">
                        <WithLabel label="Total number of penalties">
                          <div>
                            {search_result.penalties.length > 1 || search_result.penalties.length == 0?
                              <p>{search_result.penalties.length} Penalties</p>
                            : <p>{search_result.penalties.length} Penalty</p>}
                          </div>
                        </WithLabel>
                      </div>

                      <div className="row">
                        <WithLabel label="Total penalty amount">
                          <p>{currency(search_result.penalties_summary.total_penalty)} Pesos</p>
                        </WithLabel>
                      </div>

                      <div className="row">
                        <WithLabel label="Total amount paid">
                          <p>{currency(search_result.penalties_summary.total_amount_paid)} Pesos</p>
                        </WithLabel>
                      </div>

                      <div className="row">
                        <WithLabel label="Remaining balance">
                          <p>{currency(search_result.penalties_summary.remaining_balance)} Pesos</p>
                        </WithLabel>
                      </div>

                      <div className="row">
                        <h1>Borrower</h1>
                      </div>

                      <div className="row">
                        <WithLabel label="Trace ID">
                          <p>{search_result.borrower.id}</p>
                        </WithLabel>
                      </div>

                      <div className="row">
                        <WithLabel label="Full name">
                          <p>{search_result.borrower.firstname} {search_result.borrower.middlename} {search_result.borrower.surname}</p>
                        </WithLabel>
                      </div>

                      <div className="row">
                        <WithLabel label="Full name">
                          {search_result.borrower.gender?
                            <p>Male</p>
                          : <p>Female</p>}
                        </WithLabel>
                      </div>

                      <Link onClick={() => this.props.putHash(search_result.id)} className="default-btn-blue" to={'/borrowers/'+ search_result.borrower_id +'/view'}>View loan</Link>
                    </div>
                  )}
                </div>
              : this.props.search.query.type == 'penalty'?
                <div className="search-result-list">
                  {this.props.search.search_results.length > 1?
                    <h1>{this.props.search.search_results.length} penalties were found.</h1>
                  : <h1>{this.props.search.search_results.length} penalty was found.</h1>}

                  {this.props.search.search_results.map((search_result, search_result_index) => 
                    <div className="search-result-row" key={search_result_index}>
                      <div className="row">
                        <WithLabel label="Trace ID">
                          <p>{search_result.id}</p>
                        </WithLabel>
                      </div>

                      {search_result.was_waved?
                        <div className="warning">
                          <WithIcon icon={path.join(app_path, 'app/images/exclamation.png')}>
                            <p className="title">NOTICE</p>
                          </WithIcon>
                          <p>This penalty has been waved.</p>
                        </div>
                      : null}

                      <div className="row">
                        <WithLabel label="Date given">
                          <p>{toFormalDate(search_result.date_given)}</p>
                        </WithLabel>
                      </div>

                      <div className="row">
                        <WithLabel label="Remarks">
                          <p>{search_result.remarks}</p>
                        </WithLabel>
                      </div>

                      <div className="row">
                        <h1>Penalty summary</h1>
                      </div>

                      <div className="row">
                        <WithLabel label="Total penalty">
                          <p>{currency(search_result.penalties_summary.total_penalty)} Pesos</p>
                        </WithLabel>
                      </div>

                      <div className="row">
                        <WithLabel label="Total amount paid">
                          <p>{currency(search_result.penalties_summary.total_amount_paid)} Pesos</p>
                        </WithLabel>
                      </div>

                      <div className="row">
                        <WithLabel label="Remaining balance">
                          <p>{currency(search_result.penalties_summary.remaining_balance)} Pesos</p>
                        </WithLabel>
                      </div>

                      <div className="row">
                        <h1>Loan summary</h1>
                      </div>

                      <div className="row">
                        <WithLabel label="Trace ID">
                          <p>{search_result.loan.id}</p>
                        </WithLabel>
                      </div>

                      <div className="row">
                        <WithLabel label="Total amount loan">
                          <p>{currency(search_result.loan_payments_summary.total_loan)} Pesos</p>
                        </WithLabel>
                      </div>

                      <div className="row">
                        <WithLabel label="Total amount paid">
                          <p>{currency(search_result.loan_payments_summary.total_amount_paid)} Pesos</p>
                        </WithLabel>
                      </div>

                      <div className="row">
                        <WithLabel label="Remaining balance">
                          <p>{currency(search_result.loan_payments_summary.remaining_balance)} Pesos</p>
                        </WithLabel>
                      </div>

                      <div className="row">
                        <h1>Borrower</h1>
                      </div>

                      <div className="row">
                        <WithLabel label="Trace ID">
                          <p>{search_result.loan.borrower.id}</p>
                        </WithLabel>
                      </div>

                      <div className="row">
                        <WithLabel label="Full name">
                          <p>{search_result.loan.borrower.firstname} {search_result.loan.borrower.middlename} {search_result.loan.borrower.surname}</p>
                        </WithLabel>
                      </div>

                      <div className="row">
                        <WithLabel label="Gender">
                          {search_result.loan.borrower.gender?
                            <p>Male</p>
                          : <p>Female</p>}
                        </WithLabel>
                      </div>

                      <Link onClick={() => this.props.putHash(search_result.id, search_result.loan.id)} className="default-btn-blue" to={'/borrowers/'+ search_result.loan.borrower.id +'/view#' + search_result.id}>View penalty</Link>
                    </div>
                  )}
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
  searchReset: searchActions.reset,
  putHash: putHash
})(Dashboard);