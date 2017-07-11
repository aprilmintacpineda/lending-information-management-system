import initial_state from '../initial_states/control_panel/new_borrower';
import {
  validateName,
  validateGender,
  validatePasswords,
  validatePasswordAgain,
  validateAmountLoan,
  validateMonthsToPay,
  validateInterestRate,
  validateModeOfPayment,
  validateLoanDate
} from '../../helpers/Validator';

export default function new_borrower(state = initial_state, action) {
  switch(action.type) {
    case 'NEWBORROWER_CFN':
      return {
        ...state,
        firstname: {
          errors: validateName('First name', action.value),
          value: action.value
        }
      }
    case 'NEWBORROWER_CMN':
      return {
        ...state,
        middlename: {
          errors: validateName('Middle name', action.value),
          value: action.value
        }
      }
    case 'NEWBORROWER_CSN':
      return {
        ...state,
        surname: {
          errors: validateName('Surname', action.value),
          value: action.value
        }
      }
    case 'NEWBORROWER_CGD':
      return {
        ...state,
        gender: {
          errors: validateGender(action.value),
          value: action.value
        }
      }
    case 'NEWBORROWER_CAL':
      return {
        ...state,
        amount_loan: {
          errors: validateAmountLoan(action.value),
          value: action.value
        }
      }
    case 'NEWBORROWER_CMP':
      return {
        ...state,
        months_to_pay: {
          ...state.months_to_pay,
          errors: validateMonthsToPay(action.value),
          value: action.value
        }
      }
    case 'NEWBORROWER_CIR':
      return {
        ...state,
        interest_rate: {
          errors: validateInterestRate(action.value),
          value: action.value
        }
      }
    case 'NEWBORROWER_CAI':
      return {
        ...state,
        apply_interest: action.value
      }
    case '_NEWBORROWER_SUBMIT':
      return {
        ...state,
        backend: {
          processing: true,
          status: null,
          message: null
        }
      }
    case 'NEWBORROWER_SUBMIT_FAILED':
      return {
        ...state,
        backend: {
          processing: false,
          status: 'failed',
          message: 'Failed to create new borrower: ' + action.message
        }
      }
    case 'NEWBORROWER_SUBMIT_SUCCESSFUL':
      return {
        ...state,
        id: action.id,
        backend: {
          processing: false,
          status: 'successful',
          message: null
        }
      }
    case 'NEWBORROWER_CLY':
      return {
        ...state,
        loan_date: {
          ...state.loan_date,
          year: action.value,
          errors: validateLoanDate(state.loan_date.month, state.loan_date.date, action.value)
        }
      }
    case 'NEWBORROWER_CLD':
      return {
        ...state,
        loan_date: {
          ...state.loan_date,
          date: action.value,
          errors: validateLoanDate(state.loan_date.month, action.value, state.loan_date.year)
        }
      }
    case 'NEWBORROWER_CLM':
      return {
        ...state,
        loan_date: {
          ...state.loan_date,
          month: action.value,
          errors: validateLoanDate(action.value, state.loan_date.date, state.loan_date.year)
        }
      }
    default:
      return {...state}
  }
}