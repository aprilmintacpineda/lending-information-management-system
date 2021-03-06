import initial_state from '../initial_states/control_panel/reports';

function computeLoansSummary(loans) {
  let total_loans = 0;
  let total_amount_paid = 0;
  let remaining_balance;

  loans.forEach(loan => {
    total_loans += loan.amount;
    loan.loan_payments.forEach(loan_payment => {
      total_amount_paid += loan_payment.amount;
    })
  });

  remaining_balance = total_loans - total_amount_paid;

  return {
    total_loans,
    total_amount_paid,
    remaining_balance
  }
}

function computePenaltiesSummary(loans) {
  let total_penalties = 0;
  let total_amount_paid = 0;
  let remaining_balance;

  loans.forEach(loan => {
    loan.penalties.forEach(penalty => {
      total_penalties += penalty.amount;
      penalty.penalty_payments.forEach(penalty_payment => {
        total_amount_paid += penalty_payment.amount;
      });
    })
  });

  remaining_balance = total_penalties - total_amount_paid;

  return {
    total_penalties,
    total_amount_paid,
    remaining_balance
  }
}

function computeLoanSummary(loan) {
  let total_amount_to_pay = loan.amount + loan.profit;
  let total_amount_paid = 0;
  let remaining_balance;

  loan.loan_payments.forEach(loan_payment => {
    total_amount_paid += loan_payment.amount;
  })

  remaining_balance = total_amount_to_pay - total_amount_paid;

  return {
    total_amount_to_pay,
    total_amount_paid,
    remaining_balance
  }
}

function computePenaltySummary(loan) {
  let total_penalties = 0;
  let total_amount_paid = 0;
  let remaining_balance;

  loan.penalties.forEach(penalty => {
    total_penalties += penalty.amount;
    penalty.penalty_payments.forEach(penalty_payment => {
      total_amount_paid += penalty_payment.amount;
    });
  })

  remaining_balance = total_penalties - total_amount_paid;

  return {
    total_penalties,
    total_amount_paid,
    remaining_balance
  }
}

export default function borrower_reports(state = initial_state, action) {
  switch(action.type) {
    case '_BORROWERREPORTS_INITIAL_FETCH':
      return {
        data: null,
        backend: {
          processing: true,
          status: null,
          message: null
        }
      }
    case 'BORROWERREPORTS_INITIAL_FETCH_SUCCESSFUL':
      return {
        data: {
          ...action.data,
          loans: action.data.loans.map(loan => ({
            ...loan,
            loan_summary: computeLoanSummary(loan),
            penalties_summary: computePenaltySummary(loan)
          })),
          loans_summary: computeLoansSummary(action.data.loans),
          penalties_summary: computePenaltiesSummary(action.data.loans),
        },
        backend: {
          processing: false,
          status: 'successful',
          message: null
        }
      }
    case 'BORROWERREPORTS_INITIAL_FETCH_FAILED':
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