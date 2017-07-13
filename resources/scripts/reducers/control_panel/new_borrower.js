import initial_state from '../initial_states/control_panel/new_borrower';

import {
  validateName,
  validateGender,
  validatePasswords,
  validatePasswordAgain,
  validateAmountLoan,
  validateMonthsToPay,
  validateInterestRate,
  validateLoanDate,
  validatePaymentMethod,
  validatePhoneNumber
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
    case 'NEWBORROWER_CADDI':
      return {
        ...state,
        apply_due_date_interest: true,
        apply_due_date_only: false,
        apply_interest_only: false,
        no_due_date_no_interest: false
      }
    case 'NEWBORROWER_CADDO':
      return {
        ...state,
        apply_due_date_interest: false,
        apply_due_date_only: true,
        apply_interest_only: false,
        no_due_date_no_interest: false
      }
    case 'NEWBORROWER_CAIO':
      return {
        ...state,
        apply_due_date_interest: false,
        apply_due_date_only: false,
        apply_interest_only: true,
        no_due_date_no_interest: false
      }
    case 'NEWBORROWER_CNDDNI':
      return {
        ...state,
        apply_due_date_interest: false,
        apply_due_date_only: false,
        apply_interest_only: false,
        no_due_date_no_interest: true
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
    case 'NEWBORROWER_AMCN':
      return {
        ...state,
        contact_numbers: state.contact_numbers.concat({
          value: '',
          errors: []
        })
      }
    case 'NEWBORROWER_CCN':
      return {
        ...state,
        contact_numbers: state.contact_numbers.map((contact_number, index) => (
          index == action.index? {
            value: action.value,
            errors: validatePhoneNumber(action.value)
          } : contact_number
        ))
      }
    case 'NEWBORROWER_CPM':
      return {
        ...state,
        payment_method: {
          value: action.value,
          errors: validatePaymentMethod(action.value)
        }
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
    case 'NEWBORROWER_RESET':
      return {...initial_state}
    default:
      return {...state}
  }
}