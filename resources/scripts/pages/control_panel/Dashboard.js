import React, { Component } from 'react';
import { connect } from 'react-redux';
import path from 'path';
import { remote } from 'electron';
import { Link } from 'react-router';
// helpers
import { toFormalDate, monthList } from '../../helpers/DateTime';
import { currency, comma } from '../../helpers/Numbers';
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
import { fetch } from '../../actions/control_panel/income_expense_report';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.displayLoanDueDate = this.displayLoanDueDate.bind(this);
  }

  componentWillMount() {
    document.title = 'Dashboard - LIMS';

    this.props.searchReset();
    this.props.getDueDatesTomorrow();
    this.props.getDueDatesToday();
    this.props.getDueDatesThisMonth();
    this.props.getPastDueDates();
    this.props.fetch();
    this.props.getOneGives();
  }

  displayLoanDueDate(loan, app_path) {
    return (
      <div>
        <div className="row">
          <WithLabel label="Borrower">
            <p>{loan.borrower.firstname} {loan.borrower.middlename} {loan.borrower.surname}</p>
          </WithLabel>
        </div>

        <div className="row">
          <WithLabel label="Borrower trace ID">
            <p>{loan.borrower.id}</p>
          </WithLabel>
        </div>

        {loan.due_date?
          <div className="row">
            <WithLabel label="Due date">
              <p>{toFormalDate(loan.due_date)}</p>
            </WithLabel>
          </div>
        : null}

        <div className="row">
          <WithLabel label="Borrower contact numbers">
            {loan.borrower.contact_numbers.length?
              <ul>
                {loan.borrower.contact_numbers.map((contact_number, contact_number_index) => 
                  <li key={contact_number_index}>{contact_number.number}</li>
                )}
              </ul>
            : <WithIcon icon={path.join(app_path, 'app/images/cross.png')}>
                <p>No contact numbers to show.</p>
              </WithIcon>}
          </WithLabel>
        </div>
        
        <div className="row">
          <WithLabel label="Loan amount">
            <p>{currency(loan.amount)} Pesos</p>
          </WithLabel>
        </div>

        <div className="row">
          <WithLabel label="Loan trace ID">
            <p>{loan.id}</p>
          </WithLabel>
        </div>

        <Link className="default-btn-blue" to={'/borrowers/'+ loan.borrower.id +'/view'} onClick={() => this.props.putHash(loan.id)}>View loan</Link>
      </div>
    );
  }

  render() {
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
                        <WithLabel label="Trace ID">
                          <p>{search_result.id}</p>
                        </WithLabel>
                      </div>

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
                        <div className="row">
                          <WithIcon icon={path.join(app_path, 'app/images/exclamation.png')}>
                            <p>This penalty has been waved.</p>
                          </WithIcon>
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

                      <Link onClick={() => this.props.putHash(search_result.id, search_result.loan.id)} className="default-btn-blue" to={'/borrowers/'+ search_result.loan.borrower.id +'/view'}>View penalty</Link>
                    </div>
                  )}
                </div>
              : this.props.search.query.type == 'loan-payment'?
                <div className="search-result-list">
                  {this.props.search.search_results.length > 1?
                    <h1>{this.props.search.search_results.length} loan payments were found.</h1>
                  : <h1>{this.props.search.search_results.length} loan payment was found.</h1>}

                  {this.props.search.search_results.map((search_result, search_result_index) => (
                    <div className="search-result-row" key={search_result_index}>
                      <div className="row">
                        <WithLabel label="Trace ID">
                          <p>{search_result.id}</p>
                        </WithLabel>
                      </div>

                      <div className="row">
                        <WithLabel label="Date paid">
                          <p>{toFormalDate(search_result.date_paid)}</p>
                        </WithLabel>
                      </div>

                      <div className="row">
                        <WithLabel label="Amount paid">
                          <p>{currency(search_result.amount)} Pesos</p>
                        </WithLabel>
                      </div>

                      {search_result.period_paid == 'paid-in-full'?
                        <div className="row">
                          <WithIcon icon={path.join(app_path, 'app/images/check.png')}>
                            <p>Full payment</p>
                          </WithIcon>
                        </div>
                      : <div className="multiple-rows">
                          <div className="row">
                            <WithLabel label="Month of">
                              <p>{monthList()[new Date(search_result.period_paid).getMonth()]}</p>
                            </WithLabel>
                          </div>

                          <div className="row">
                            <WithLabel label="Payment coverage">
                              <p>{search_result.payment_coverage == 'period-ony'? 'Period only' : 'Partial only'}</p>
                            </WithLabel>
                          </div>
                        </div>}

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
                        <h1>Penalties summary</h1>
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
                          <p>{search_result.loan.borrower.gender? 'Male' : 'Female'}</p>
                        </WithLabel>
                      </div>

                      <Link onClick={() => this.props.putHash(search_result.id, search_result.loan.id)} className="default-btn-blue" to={'/borrowers/'+ search_result.loan.borrower.id +'/view'}>View payment</Link>
                    </div>
                  ))}
                </div>
              : this.props.search.query.type == 'penalty-payment'?
                <div className="search-result-list">
                  {this.props.search.search_results.length > 1?
                    <h1>{this.props.search.search_results.length} penalty payments were found.</h1>
                  : <h1>{this.props.search.search_results.length} penalty payment was found.</h1>}

                  {this.props.search.search_results.map((search_result, search_result_index) => (
                    <div className="search-result-row" key={search_result_index}>
                      <div className="row">
                        <WithLabel label="Trace ID">
                          <p>{search_result.id}</p>
                        </WithLabel>
                      </div>

                      <div className="row">
                        <WithLabel label="Date paid">
                          <p>{toFormalDate(search_result.date_paid)}</p>
                        </WithLabel>
                      </div>

                      <div className="row">
                        <WithLabel label="Amount paid">
                          <p>{currency(search_result.amount)} Pesos</p>
                        </WithLabel>
                      </div>

                      <div className="row">
                        <h1>Loan summary</h1>
                      </div>

                      <div className="row">
                        <WithLabel label="Trace ID">
                          <p>{search_result.penalty.loan.id}</p>
                        </WithLabel>
                      </div>

                      <div className="row">
                        <WithLabel label="Total loan">
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
                        <h1>Penalties summary</h1>
                      </div>

                      <div className="row">
                        <WithLabel label="Total penalties">
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
                          <p>{search_result.penalty.loan.borrower.id}</p>
                        </WithLabel>
                      </div>

                      <div className="row">
                        <WithLabel label="Full name">
                          <p>{search_result.penalty.loan.borrower.firstname} {search_result.penalty.loan.borrower.middlename} {search_result.penalty.loan.borrower.surname}</p>
                        </WithLabel>
                      </div>

                      <div className="row">
                        <WithLabel label="Gender">
                          <p>{search_result.penalty.loan.borrower.gender? 'Male' : 'Female'}</p>
                        </WithLabel>
                      </div>

                      <Link onClick={() => this.props.putHash(search_result.id, search_result.penalty.loan.id)} className="default-btn-blue" to={'/borrowers/'+ search_result.penalty.loan.borrower.id +'/view'}>View payment</Link>
                    </div>
                  ))}
                </div>
              : null}
            </Modal>
          : null}
          <div className="search">
            <h1 className="title">Search</h1>

            <ul>
              <li>
                <InputText
                placeholder="Trace ID..."
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
                value="Search"
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
          <div className="report-container">
            <h1 className="title">Income Expense Report</h1>

            <div className="data-row">
              {this.props.borrowers.data?
                <div>
                  <table className="short-table">
                    <tbody>
                      <tr>
                        <td>Total Money Out</td>
                        <td>:</td>
                        <td>PHP {currency(this.props.borrowers.data.money_out)}</td>
                      </tr>
                      <tr>
                        <td>Total Money In</td>
                        <td>:</td>
                        <td>PHP {currency(this.props.borrowers.data.money_in)}</td>
                      </tr>
                      <tr>
                        <td>Total Borrowers</td>
                        <td>:</td>
                        <td>{comma(this.props.borrowers.data.total_borrowers)}</td>
                      </tr>
                      <tr>
                        <td>Borrowers with unpaid loans</td>
                        <td>:</td>
                        <td>{comma(this.props.borrowers.data.active_borrowers)}</td>
                      </tr>
                    </tbody>
                  </table>
                  <Link className="default-btn-blue" to="/status-report">See status report</Link>
                </div>
              : this.props.borrowers.backend.status == 'failed'?
                <WithIcon icon={path.join(app_path, 'app/images/cross.gif')}>
                  <p>{this.props.borrowers.backend.message}</p>
                </WithIcon>
              : <WithIcon icon={path.join(app_path, 'app/images/processing-blue.gif')}>
                  <p>Loading contents</p>
                </WithIcon>}
            </div>
          </div>
          <div className="due-dates">
            <h1 className="title">Unpaid due dates tomorrow</h1>
            
            {this.props.dashboard.tomorrows.backend.processing?
              <div className="data-row">
                <WithIcon icon={path.join(app_path, 'app/images/processing-blue.gif')}>
                  <p>Loading contents</p>
                </WithIcon>
              </div>
            : !this.props.dashboard.tomorrows.data.length && this.props.dashboard.tomorrows.backend.status == 'successful'?
              <div className="data-row">
                <WithIcon icon={path.join(app_path, 'app/images/check.png')}>
                  <p>You're all set. No unpaid due dates tomorrow.</p>
                </WithIcon>
              </div>
            : this.props.dashboard.tomorrows.data.map((due_date_tomorrow, due_date_tomorrow_index) => (
              <div className="data-row" key={due_date_tomorrow_index}>
                {this.displayLoanDueDate(due_date_tomorrow, app_path)}
              </div>
            ))}

            <h1 className="title">Unpaid due dates today</h1>
            
            {this.props.dashboard.todays.backend.processing?
              <div className="data-row">
                <WithIcon icon={path.join(app_path, 'app/images/processing-blue.gif')}>
                  <p>Loading contents</p>
                </WithIcon>
              </div>
            : !this.props.dashboard.todays.data.length && this.props.dashboard.todays.backend.status == 'successful'?
              <div className="data-row">
                <WithIcon icon={path.join(app_path, 'app/images/check.png')}>
                  <p>You're all set. No unpaid due dates today.</p>
                </WithIcon>
              </div>
            : this.props.dashboard.todays.data.map((due_date_today, due_date_today_index) =>
              <div className="data-row" key={due_date_today_index}>
                {this.displayLoanDueDate(due_date_today, app_path)}
              </div>
            )}

            <h1 className="title">Unpaid due dates this month after tomorrow</h1>
            
            {this.props.dashboard.this_month.backend.processing?
              <div className="data-row">
                <WithIcon icon={path.join(app_path, 'app/images/processing-blue.gif')}>
                  <p>Loading contents</p>
                </WithIcon>
              </div>
            : !this.props.dashboard.this_month.data.length && this.props.dashboard.this_month.backend.status == 'successful'?
              <div className="data-row">
                <WithIcon icon={path.join(app_path, 'app/images/check.png')}>
                  <p>You're all set. No unpaid due dates this month after tomorrow.</p>
                </WithIcon>
              </div>
            : this.props.dashboard.this_month.data.map((this_month_due_date, this_month_due_date_index) =>
              <div className="data-row" key={this_month_due_date_index}>
                {this.displayLoanDueDate(this_month_due_date, app_path)}
              </div>
            )}

            <h1 className="title">Past unpaid due dates</h1>
            
            {this.props.dashboard.past_due_dates.backend.processing?
              <div className="data-row">
                <WithIcon icon={path.join(app_path, 'app/images/processing-blue.gif')}>
                  <p>Loading contents</p>
                </WithIcon>
              </div>
            : !this.props.dashboard.past_due_dates.data.length && this.props.dashboard.past_due_dates.backend.status == 'successful'?
              <div className="data-row">
                <WithIcon icon={path.join(app_path, 'app/images/check.png')}>
                  <p>You're all set. No unpaid past due dates.</p>
                </WithIcon>
              </div>
            : this.props.dashboard.past_due_dates.data.map((past_due_date, past_due_date_index) =>
              <div className="data-row" key={past_due_date_index}>
                {this.displayLoanDueDate(past_due_date, app_path)}
              </div>
            )}

            <h1 className="title">One Gives</h1>

            {this.props.dashboard.one_gives.backend.processing?
              <div className="data-row">
                <WithIcon icon={path.join(app_path, 'app/images/processing-blue.gif')}>
                  <p>Loading contents</p>
                </WithIcon>
              </div>
            : !this.props.dashboard.one_gives.data.length && this.props.dashboard.one_gives.backend.status == 'successful'?
              <div className="data-row">
                <WithIcon icon={path.join(app_path, 'app/images/check.png')}>
                  <p>You're all set. No one give loans.</p>
                </WithIcon>
              </div>
            : this.props.dashboard.one_gives.data.map((one_give, one_give_index) =>
              <div className="data-row" key={one_give_index}>
                {this.displayLoanDueDate(one_give, app_path)}
              </div>
            )}
          </div>
        </div>
      </WithSidebar>
    );
  }
}

export default connect(store => ({
  session: {...store.session},
  dashboard: {...store.dashboard},
  search: {...store.search},
  borrowers: {...store.income_expense_report}
}), {
  getDueDatesTomorrow: dashboardActions.getDueDatesTomorrow,
  getDueDatesToday: dashboardActions.getDueDatesToday,
  getDueDatesThisMonth: dashboardActions.getDueDatesThisMonth,
  getPastDueDates: dashboardActions.getPastDueDates,
  getOneGives: dashboardActions.getOneGives,

  changeSearchString: searchActions.changeSearchString,
  changeSearchType: searchActions.changeSearchType,
  submit: searchActions.submit,
  searchReset: searchActions.reset,

  putHash: putHash,

  fetch: fetch
})(Dashboard);