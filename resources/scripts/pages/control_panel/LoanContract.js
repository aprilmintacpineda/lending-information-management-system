import React, { Component } from 'react';
import { connect } from 'react-redux';
import { remote } from 'electron';
import path from 'path';
// components
import WithSidebar from '../../components/WithSidebar';
import WithIcon from '../../components/WithIcon';
// actions
import * as reportsAction from '../../actions/control_panel/loan_reports';
// helpers
import { currency } from '../../helpers/Numbers';
import { getFormalDueDate } from '../../helpers/DateTime';

class LoanContract extends Component {
  constructor(props) {
    super(props);

    this.print = this.print.bind(this);
  }

  componentWillMount() {
    this.props.fetch(this.props.params.id);
  }

  print() {
    window.print();
  }

  render() {
    let app_path = remote.app.getAppPath();
    let loan_date;

    if(this.props.loan.data) {
      loan_date = new Date(this.props.loan.data.loan_date).getDate();
    }

    return (
      <WithSidebar>
        {this.props.loan.data?
          <div className="loan-contract-container">
            <div className="header">
              <h1>Loan Agreement</h1>
            </div>
            <p><strong>THIS LOAN AGREEMENT (this "Agreement") dated this _____ day of _______________, 20___.</strong></p>
            <p><strong>BETWEEN</strong></p>
            <p className="centered-text">
              Katherine Manalo Singson<br/>
              (the "Lender")
            </p>
            <p className="right-aligned-text"><strong>OF THE FIRST PART</strong></p>
            <br/><br/>
            <p className="centered-text"><strong>AND</strong></p>
            <br/><br/>
            <p className="centered-text">
              {this.props.loan.data.borrower.firstname} {this.props.loan.data.borrower.middlename} {this.props.loan.data.borrower.surname}<br/>
              (the "Borrower")
            </p>
            <p className="right-aligned-text"><strong>OF THE SECOND PART</strong></p>
            <p><strong>IN CONSIDERATION OF</strong> the Lender lending a certain amount of money (the "Loan") to the Borrower and the Borrower repaying the Loan to the Lender. Both parties agree to keep, perform, and fulfill the promises and conditions set out in this Agreement.</p>
            <table>
              <tbody>
                <tr>
                  <td></td>
                  <td><p><strong>Loan Amount, Interest, and Total Amount Payable</strong></p></td>
                </tr>
                <tr>
                  <td><p>1.</p></td>
                  <td>
                    <p>
                      The Lender promises to lend
                      PHP {currency(this.props.loan.data.amount)}
                      to the Borrower and the Borrower promises to repay this principal amount to the Lender, with interest payable on the principal at the rate of
                      {this.props.loan.data.interest_type == 'percentage'? ' ' + this.props.loan.data.interest_rate + ' Percent' : ' PHP ' + this.props.loan.data.interest_rate} derived from the monthly payment,
                      the Borrower will pay a total amount of PHP {currency(this.props.loan.data.amount + this.props.loan.data.profit)}.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td><p><strong>Payment</strong></p></td>
                </tr>
                <tr>
                  <td><p>2.</p></td>
                  <td>
                    <p>
                      This Loan will be repaid in
                      {this.props.loan.data.payment_method == 1?
                        ' monthly installments of the principal together with the interest every ' + (
                          loan_date == 1?
                            '1st'
                          : loan_date == 2?
                            '2nd'
                          : loan_date == 3?
                            '3rd'
                          : loan_date == 21?
                            '21st'
                          : loan_date == 23?
                            '23rd'
                          : loan_date == 31?
                            '31st'
                          : loan_date + 'th'
                        ) + ' of the month'
                      : this.props.loan.data.payment_method == 2?
                        ' semi-monthly installments of the principal together with the interest every 15 days from the last payment date'
                      : ' daily installments'} commencing on { getFormalDueDate(this.props.loan.data) }
                    </p>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td><p><strong>Default</strong></p></td>
                </tr>
                <tr>
                  <td><p>3.</p></td>
                  <td>
                    <p>
                      If the Borrower fails to pay 6 months consecutively, the Lender may declare the remaining balance and the penalties as due and payable on that day.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td><p><strong>Governing Law</strong></p></td>
                </tr>
                <tr>
                  <td><p>4.</p></td>
                  <td>
                    <p>
                      This Agreement will be construed in accordance with and governed by the Laws of the Philippines.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td><p><strong>Penalties</strong></p></td>
                </tr>
                <tr>
                  <td><p>5.</p></td>
                  <td>
                    <p>
                      The Lender may give penalties to the Borrower if the Borrower fails to perform {this.props.loan.data.borrower.gender? 'his' : 'her'} obligations stated in this Agreement.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td><p><strong>Amendments</strong></p></td>
                </tr>
                <tr>
                  <td><p>6.</p></td>
                  <td>
                    <p>
                      This Agreement may only be amended or modified by a written instrument executed and agreed by both the Borrower and the Lender.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td><p>7.</p></td>
                  <td>
                    <p>
                      The Loan may only be amended before the first payment.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td><p><strong>Severability</strong></p></td>
                </tr>
                <tr>
                  <td><p>8.</p></td>
                  <td>
                    <p>
                      The clauses and paragraphs contained in this Agreement are intended to be read and construed independently of each other. If any term, covenant, condition or provision of this Agreement is held by a court of confident jurisdiction to be invalid, void or unenforceable, it is the parties' intent that such provision be reduced in scope by the court only to the extend deemed necessary by that court to render the provision reasonable and enforceable and the remainder of the provision of this Agreement will in no way be affected, impaired or invalidated as a result.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td><p><strong>General Provisions</strong></p></td>
                </tr>
                <tr>
                  <td><p>9.</p></td>
                  <td>
                    <p>
                      Headings were inserted for the convenience of the parties only and are not to be considered when interpreting this Agreement. Words in singular mean and include plural and vice versa. Words in the masculine mean and include the feminine and vice versa.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td><p><strong>Entire Agreement</strong></p></td>
                </tr>
                <tr>
                  <td><p>10.</p></td>
                  <td>
                    <p>
                      This Agreement constitutes the agreement between the parties and there are no further items or provisions, either oral or otherwise.
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <p><strong>IN WITNESS WHEREOF</strong>, the Borrower and the Lender have duly affixed their signatures under the hand on this _____ day of _______________, 20___.</p>
            <div className="signatures">
              <p>Katherine Manalo Singson</p>
              <p>{this.props.loan.data.borrower.firstname} {this.props.loan.data.borrower.middlename} {this.props.loan.data.borrower.surname}</p>
            </div>
            <a className="default-btn-blue print-btn" onClick={this.print}>
              Print
            </a>
          </div>
        : this.props.loan.backend.status == 'failed'?
          <WithIcon icon={path.join(app_path, 'app/images/cross.png')}>
            <p>{this.props.loan.backend.message}</p>
          </WithIcon>
        : <WithIcon icon={path.join(app_path, 'app/images/processing-blue.gif')}>
            <p>Please wait...</p>
          </WithIcon>}
      </WithSidebar>
    );
  }
}

export default connect(store => ({
  loan: {...store.loan_reports}
}), {
  fetch: reportsAction.fetch
})(LoanContract);