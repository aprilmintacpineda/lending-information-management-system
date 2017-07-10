import initial_state from '../initial_states/control_panel/new_borrower';
import {
  validateName,
  validateGender,
  validatePasswords,
  validatePasswordAgain,
  validateBirthdates,
  validateAmountLoan,
  validateTimesToPay,
  validateInterestRate,
  validateModeOfPayment
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
    case 'NEWBORROWER_CTP':
      return {
        ...state,
        times_to_pay: {
          errors: validateTimesToPay(action.value),
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
    case 'NEWBORROWER_CMP':
      return {
        ...state,
        mode_of_payment: {
          errors: validateModeOfPayment(action.value),
          value: action.value
        }
      }
    default:
      return {...state}
  }
}