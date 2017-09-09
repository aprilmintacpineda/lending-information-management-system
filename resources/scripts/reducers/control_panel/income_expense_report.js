import initial_state from '../initial_states/control_panel/reports';

function getMoneyOut(borrowers) {
  let money_out = 0;

  borrowers.forEach(borrower => {
    borrower.loans.forEach(loan => {
      money_out += loan.amount;
    })
  });

  return money_out;
}

function getMoneyIn(borrowers) {
  let money_in = 0;

  borrowers.forEach(borrower => {
    borrower.loans.forEach(loan => {
      loan.loan_payments.forEach(loan_payment => {
        money_in += loan_payment.amount;
      });

      loan.penalties.forEach(penalty => {
        penalty.penalty_payments.forEach(penalty_payment => {
          money_in += penalty_payment.amount;
        });
      });
    })
  });

  return money_in;
}

function getActiveBorrowers(borrowers) {
  let active_borrowers = 0;

  borrowers.forEach(borrower => {
    let total_loans = 0;
    let amount_paid = 0;

    borrower.loans.forEach(loan => {
      total_loans += loan.amount;

      loan.loan_payments.forEach(loan_payment => {
        amount_paid += loan_payment.amount;
      });
    });

    if(total_loans - amount_paid > 0) {
      active_borrowers++;
    }
  });

  return active_borrowers;
}

export default function income_expense_report(state = initial_state, action) {
  switch(action.type) {
    case '_INCOMEEXPENSEREPORT_FETCH_ALL':
      return {
        data: null,
        backend: {
          processing: true,
          status: null,
          message: null
        }
      }
    case 'INCOMEEXPENSEREPORT_FETCH_ALL_SUCCESSFUL':
      return {
        data: {
          money_out: getMoneyOut(action.data),
          money_in: getMoneyIn(action.data),
          active_borrowers: getActiveBorrowers(action.data),
          total_borrowers: action.data.length
        },
        backend: {
          processing: false,
          status: 'successful',
          message: null
        }
      }
    case 'INCOMEEXPENSEREPORT_FETCH_ALL_FAILED':
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