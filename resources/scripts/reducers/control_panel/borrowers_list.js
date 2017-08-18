import initial_state from '../initial_states/control_panel/borrowers_list';

function getSummary(loans) {
  let total_unpaid_loans = loans.countIf(loan => !loan.fully_paid);
  let total_unpaid_balance = loans.sumIf(loan => !loan.fully_paid, 'amount');

  loans.forEach(loan => {
    total_unpaid_balance -= loan.loan_payments.sum('amount');
  });

  return {
    total_loans: loans.length,
    total_unpaid_loans,
    total_paid_loans: loans.length - total_unpaid_loans,
    total_unpaid_balance
  }
}

export default function borrower_list(state = initial_state, action) {
  switch(action.type) {
    case '_BORROWERS_LIST_FETCH':
      return {
        ...state,
        backend: {
          processing: true,
          status: null,
          message: null
        }
      }
    case 'BORROWERS_LIST_FETCH_SUCCESSFUL':
      return {
        list: action.list.map(borrower => ({
          ...borrower,
          summary: getSummary(borrower.loans)
        })),
        backend: {
          processing: false,
          status: 'successful',
          message: null
        }
      }
    case 'BORROWERS_LIST_FETCH_FAILED':
      return {
        list: [],
        backend: {
          processing: false,
          status: 'failed',
          message: action.message
        }
      }
    case 'BORROWERS_LIST_RESET':
      return {
        ...initial_state
      }
    default:
      return {
        ...state
      }
  }
}