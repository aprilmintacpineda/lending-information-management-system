import React, { Component } from 'react';
import { connect } from 'react-redux';
import { remote } from 'electron';
import Chart from 'chart.js';
import path from 'path';
import { monthList } from '../../helpers/DateTime';
// components
import WithSidebar from '../../components/WithSidebar';
import WithIcon from '../../components/WithIcon';
import WithLabel from '../../components/WithLabel';
// actions
import { fetch } from '../../actions/control_panel/status_report';
// helpers
import { comma } from '../../helpers/Numbers';

class StatusReport extends Component {
  constructor(props) {
    super(props);

    this.print = this.print.bind(this);
    this.createBorrowerIncreaseChart = this.createBorrowerIncreaseChart.bind(this);
    this.createPaymentIncreaseChart = this.createPaymentIncreaseChart.bind(this);
  }

  componentWillMount() {
    this.props.fetch();
  }

  componentDidUpdate() {
    if(this.props.report.data) {
      this.createBorrowerIncreaseChart();
      this.createLoanIncreaseChart();
      this.createPaymentIncreaseChart();
    }
  }

  createLoanIncreaseChart() {
    let canvas = this.loan_increase_chart;

    let highest_value = (() => Object.values(this.props.report.data.loan_increase)
    .map(data => data.count)
    .reduce((accumulator, current_value) => {
      if(current_value > accumulator) {
        accumulator = current_value;
      }

      return accumulator;
    }))();

    let max = highest_value + (0.25 * (highest_value * 2));

    let stepSize = highest_value <= 1000?
        100
      : highest_value <= 10000?
        1000
      : highest_value <= 100000?
        10000
      : 100000;

    let myChart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: Object.keys(this.props.report.data.loan_increase).map(index => monthList()[index]),
        datasets: [{
          label: 'Total loans',
          data: Object.values(this.props.report.data.loan_increase).map(data => data.count),
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              stepSize,
              max
            }
          }]
        }
      }
    });
  }

  createPaymentIncreaseChart() {
    let canvas = this.payment_increase_chart;

    let highest_value = (() => Object.values(this.props.report.data.payment_increase)
    .map(data => data.count)
    .reduce((accumulator, current_value) => {
      if(current_value > accumulator) {
        accumulator = current_value;
      }

      return accumulator;
    }))();

    let max = highest_value + (0.25 * (highest_value * 2));

    let stepSize = highest_value <= 1000?
        100
      : highest_value <= 10000?
        1000
      : highest_value <= 100000?
        10000
      : 100000;

    let myChart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: Object.keys(this.props.report.data.payment_increase).map(index => monthList()[index]),
        datasets: [{
          label: 'Total payments received',
          data: Object.values(this.props.report.data.payment_increase).map(data => data.count),
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              stepSize,
              max
            }
          }]
        }
      }
    });
  }

  createBorrowerIncreaseChart() {
    let canvas = this.borrower_increase_chart;

    let highest_value = (() => Object.values(this.props.report.data.borrower_increase)
    .map(data => data.count)
    .reduce((accumulator, current_value) => {
      if(current_value > accumulator) {
        accumulator = current_value;
      }

      return accumulator;
    }))();

    let max = highest_value + 5;
    let stepSize = highest_value >= 5? 5: 1;

    let myChart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: Object.keys(this.props.report.data.borrower_increase).map(index => monthList()[index]),
        datasets: [{
          label: '# of new borrower',
          data: Object.values(this.props.report.data.borrower_increase).map(data => data.count),
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              stepSize,
              max
            }
          }]
        }
      }
    });
  }

  print() {
    window.print();
  }

  render() {
    let app_path = remote.app.getAppPath();

    return (
      <WithSidebar onLink="status-report">
        <div>
          {this.props.report.data?
            <div className="report-container">
              <div className="header">
                  <h1>Business Status Report</h1>
              </div>
              <div className="body">
                <section>
                  <WithLabel label="Description">
                    <div>
                      <p>The chart below shows you how many new borrowers registered this month and the past 5 months.</p>
                    </div>
                  </WithLabel>

                  <canvas ref={el => this['borrower_increase_chart'] = el} />
                </section>

                <section>
                  <WithLabel label="Description">
                    <p>The chart below shows you the total amount of loans this month and the past 5 months.</p>
                  </WithLabel>

                  <canvas ref={el => this['loan_increase_chart'] = el} />
                </section>

                <section>
                  <WithLabel label="Description">
                    <p>The chart below shows you the total amount of payments this month and the past 5 months.</p>
                  </WithLabel>
                  
                  <canvas ref={el => this['payment_increase_chart'] = el} />
                </section>

                <a
                className="default-btn-blue print-btn"
                onClick={this.print}>
                  Print
                </a>
              </div>
            </div>
          : <WithIcon icon={path.join(app_path, 'app/images/processing-blue.gif')}>
              <p>Please wait...</p>
            </WithIcon>}
        </div>
      </WithSidebar>
    );
  }
}

export default connect(store => ({
  report: {...store.status_report}
}), {
  fetch: fetch
})(StatusReport);