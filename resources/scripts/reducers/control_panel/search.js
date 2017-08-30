import initial_state from '../initial_states/control_panel/search';

function allowSubmit(new_state) {
  return new_state.query.value.length? true: false;
}

function getPenaltySummary(penalties) {
  let total_penalty = 0,
      total_amount_paid = 0,
      remaining_balance = 0;

  penalties.forEach(penalty => {
    total_penalty += penalty.amount;

    penalty.penalty_payments.forEach(penalty_payment => {
      total_amount_paid += penalty_payment.amount;
    });
  });

  remaining_balance = total_penalty - total_amount_paid;

  return {
    total_penalty,
    total_amount_paid,
    remaining_balance
  }
}

function getLoanPaymentsSummary(loan) {
  let total_loan = loan.amount,
      total_amount_paid = 0,
      remaining_balance = 0;

  loan.loan_payments.forEach(loan_payment => {
    total_amount_paid += loan_payment.amount;
  });

  remaining_balance = total_loan - total_amount_paid;

  return {
    total_loan,
    total_amount_paid,
    remaining_balance
  }
}

export default function search(state = initial_state, action) {
  let new_state;

  switch(action.type) {
    case 'SEARCH_CHANGE_STRING':
      new_state = {
        ...state,
        query: {
          ...state.query,
          value: action.value
        }
      }

      return {
        ...new_state,
        query: {
          ...new_state.query,
          allow_submit: allowSubmit(new_state),
        }
      }
    case 'SEARCH_CHANGE_TYPE':
      new_state = {
        ...state,
        query: {
          ...state.query,
          type: action.value
        }
      }

      return {
        ...new_state,
        query: {
          ...new_state.query,
          allow_submit: allowSubmit(new_state),
        }
      }
    case 'SEARCH_RESET':
      return {...initial_state}
    case '_SEARCH_SUBMIT':
      new_state = {
        ...state,
        backend: {
          processing: true,
          status: null,
          message: null
        }
      }

      return {
        ...new_state,
        query: {
          ...new_state.query,
          allow_submit: allowSubmit(new_state),
        }
      }
    case 'SEARCH_SUBMIT_SUCCESSFUL':
      if(state.query.type == 'loan') {
        return {
          ...state,
          search_results: action.search_results.map(search_result => ({
            ...search_result,
            penalties_summary: getPenaltySummary(search_result.penalties),
            loan_payments_summary: getLoanPaymentsSummary(search_result)
          })),
          backend: {
            processing: false,
            status: 'successful',
            message: null
          }
        }
      } else if(state.query.type == 'penalty') {
        return {
          ...state,
          search_results: action.search_results.map(search_result => ({
            ...search_result,
            loan_payments_summary: getLoanPaymentsSummary(search_result.loan),
            penalties_summary: getPenaltySummary([search_result]),
          })),
          backend: {
            processing: false,
            status: 'successful',
            message: null
          }
        }
      } else if(state.query.type == 'loan-payment') {
        return {
          ...state,
          search_results: action.search_results.map(search_result => ({
            ...search_result,
            loan_payments_summary: getLoanPaymentsSummary(search_result.loan),
            penalties_summary: getPenaltySummary(search_result.loan.penalties),
          })),
          backend: {
            processing: false,
            status: 'successful',
            message: null
          }
        }
      }

      return {
        ...state,
        search_results: action.search_results,
        backend: {
          processing: false,
          status: 'successful',
          message: null
        }
      }
    case 'SEARCH_SUBMIT_FAILED':
      return {
        ...state,
        backend: {
          processing: false,
          status: 'failed',
          message: action.message
        }
      }
    default:
      return {...state};
  }
}