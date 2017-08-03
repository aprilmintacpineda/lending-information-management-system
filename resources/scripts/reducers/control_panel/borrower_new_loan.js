import initial_state from '../initial_states/control_panel/borrower_new_loan';

import {
  validateAmountLoan,
  validateMonthsToPay,
  validateInterestRate,
  validateLoanDate,
  validatePaymentMethod,
  validatePaymentType
} from '../../helpers/Validator';

export default function borrower_new_loan(state = initial_state, action) {
  switch(action.type) {
    case 'BORROWERNEWLOAN_CHANGE_AMOUNT':
      return {
        ...state,
        amount_loan: {
          ...state.amount_loan,
          value: action.value,
          errors: validateAmountLoan(action.value)
        }
      }
    case 'BORROWERNEWLOAN_CHANGE_INTEREST_RATE':
      return {
        ...state,
        interest_rate: {
          ...state.interest_rate,
          value: action.value,
          errors: validateInterestRate(action.value)
        }
      }
    case 'BORROWERNEWLOAN_CHANGE_INTEREST_TYPE':
      return {
        ...state,
        interest_rate: {
          ...state.interest_rate,
          type: action.value
        }
      }
    case 'BORROWERNEWLOAN_CHANGE_PAYMENT_METHOD':
      return {
        ...state,
        payment_method: {
          ...state.payment_method,
          value: action.value,
          errors: validatePaymentMethod(action.value)
        }
      }
    case 'BORROWERNEWLOAN_CHANGE_MONTHS_TO_PAY':
      return {
        ...state,
        months_to_pay: {
          ...state.months_to_pay,
          value: action.value,
          errors: validateMonthsToPay(action.value)
        }
      }
    case 'BORROWERNEWLOAN_CHANGE_LOAN_CONDITION':
      return {
        ...state,
        amount_loan: {
          ...state.amount_loan,
          condition: action.value
        }
      }
    case 'BORROWERNEWLOAN_CHANGE_DATELOAN_DATE':
      return {
        ...state,
        date_loan: {
          ...state.date_loan,
          date: action.value,
          errors: validateLoanDate(state.date_loan.month, action.value, state.date_loan.year)
        }
      }
    case 'BORROWERNEWLOAN_CHANGE_DATELOAN_MONTH':
      return {
        ...state,
        date_loan: {
          ...state.date_loan,
          month: action.value,
          errors: validateLoanDate(action.value, state.date_loan.date, state.date_loan.year)
        }
      }
    case 'BORROWERNEWLOAN_CHANGE_DATELOAN_YEAR':
      return {
        ...state,
        date_loan: {
          ...state.date_loan,
          year: action.value,
          errors: validateLoanDate(state.date_loan.month, state.date_loan.date, action.value)
        }
      }
    case 'BORROWERNEWLOAN_SUBMIT':
      return {
        ...state,
        backend: {
          processing: true,
          status: null,
          message: null
        }
      }
    default:
      return { ...state }
  }

  return state;
}