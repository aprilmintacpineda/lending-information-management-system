import initial_state from '../initial_states/control_panel/reports';
import { monthList } from '../../helpers/DateTime';

function getBorrowerIncrease(borrowers) {
  let borrower_increase = {};
  let max_date = new Date();
  let min_date = new Date(max_date.getTime() - 13148719000);
  let months = monthList();

  for(let a = 0; a <= 5; a++) {
    borrower_increase[min_date.getMonth() + a] = {
      month: months[min_date.getMonth() + a],
      count: 0
    }
  }

  borrowers.forEach(borrower => {
    let date_registered = new Date(borrower.loans[0].loan_date);
    let time = date_registered.getTime();

    if(time >= min_date.getTime() && time <= max_date.getTime()) {
      borrower_increase[date_registered.getMonth()] = {
        ...borrower_increase[date_registered.getMonth()],
        count: borrower_increase[date_registered.getMonth()].count + 1
      }
    }
  });

  return borrower_increase;
}

function getLoanIncrease(borrowers) {
  let loan_increase = {};
  let max_date = new Date();
  let min_date = new Date(max_date.getTime() - 13148719000);
  let months = monthList();

  for(let a = 0; a <= 5; a++) {
    loan_increase[min_date.getMonth() + a] = {
      month: months[min_date.getMonth() + a],
      count: 0
    }
  }

  borrowers.forEach(borrower => {
    let date_registered = new Date(borrower.loans[0].loan_date);
    let time = date_registered.getTime();

    if(time >= min_date.getTime() && time <= max_date.getTime()) {
      loan_increase[date_registered.getMonth()] = {
        ...loan_increase[date_registered.getMonth()],
        count: loan_increase[date_registered.getMonth()].count + borrower.loans.sum('amount')
      }
    }
  });

  return loan_increase;
}

function getPaymentIncrease(borrowers) {
  let payment_increase = {};
  let max_date = new Date();
  let min_date = new Date(max_date.getTime() - 13148719000);
  let months = monthList();

  for(let a = 0; a <= 5; a++) {
    payment_increase[min_date.getMonth() + a] = {
      month: months[min_date.getMonth() + a],
      count: 0
    }
  }

  borrowers.forEach(borrower => {
    borrower.loans.forEach(loan => {
      loan.loan_payments.forEach(loan_payment => {
        let date_paid = new Date(loan_payment.date_paid);
        let time = date_paid.getTime();
        
        if(time >= min_date.getTime() && time <= max_date.getTime()) {
          let total_payments = loan_payment.amount;

          payment_increase[date_paid.getMonth()] = {
            ...payment_increase[date_paid.getMonth()],
            count: payment_increase[date_paid.getMonth()].count + total_payments
          }
        }
      });

      loan.penalties.forEach(penalty => {
        penalty.penalty_payments.forEach(penalty_payment => {
          let date_paid = new Date(penalty_payment.date_paid);
          let time = date_paid.getTime();
          
          if(time >= min_date.getTime() && time <= max_date.getTime()) {
            let total_payments = penalty_payment.amount;

            payment_increase[date_paid.getMonth()] = {
              ...payment_increase[date_paid.getMonth()],
              count: payment_increase[date_paid.getMonth()].count + total_payments
            }
          }
        });
      });
    });
  });

  return payment_increase;
}

export default function status_report(state = initial_state, action) {
  switch(action.type) {
    case '_STATUSREPORT_FETCH_DATA':
      return {
        data: null,
        backend: {
          processing: true,
          status: null,
          message: null
        }
      }
    case 'STATUSREPORT_FETCH_DATA_SUCCESSFUL':
      return {
        data: {
          borrowers: [...action.data],
          borrower_increase: getBorrowerIncrease(action.data),
          loan_increase: getLoanIncrease(action.data),
          payment_increase: getPaymentIncrease(action.data)
        },
        backend: {
          processing: false,
          status: 'successful',
          message: null
        }
      }
    case 'STATUSREPORT_FETCH_DATA_FAILED':
      return {
        data: null,
        backend: {
          processing: false,
          status: 'failed',
          message: action.message
        }
      }
    default:
      return {...state}
  }
}