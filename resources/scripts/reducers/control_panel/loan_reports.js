import initial_state from '../initial_states/control_panel/reports';

function computeLoanPaymentsSummary(loan) {
  let total_amount_to_pay = loan.amount + loan.profit;
  let total_amount_paid = loan.loan_payments.sum('amount');
  let remaining_balance = total_amount_to_pay - total_amount_paid;

  return {
    total_amount_to_pay,
    total_amount_paid,
    remaining_balance,
    is_fully_paid: remaining_balance == 0? true: false
  }
}

function computePenaltiesSummary(loan) {
  let total_amount_to_pay = loan.penalties.sum('amount');
  let total_amount_paid = 0;
  let remaining_balance;

  loan.penalties.forEach(penalty => {
    total_amount_paid += penalty.penalty_payments.sum('amount');
  });

  remaining_balance = total_amount_to_pay - total_amount_paid;

  return {
    total_amount_to_pay,
    total_amount_paid,
    remaining_balance
  }
}

export default function loan_reports(state = initial_state, action) {
  switch(action.type) {
    case '_LOANREPORTS_INITIAL_FETCH':
      return {
        data: null,
        backend: {
          processing: true,
          status: null,
          message: null
        }
      }
    case 'LOANREPORTS_INITIAL_FETCH_SUCCESSFUL':
      return {
        data: {
          ...action.data,
          loan_payments_summary: computeLoanPaymentsSummary(action.data),
          penalties_summary: computePenaltiesSummary(action.data)
        },
        backend: {
          processing: false,
          status: 'successful',
          message: null
        }
      }
    case 'LOANREPORTS_INITIAL_FETCH_FAILED':
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