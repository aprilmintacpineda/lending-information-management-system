import initial_state from '../initial_states/control_panel/new_borrower';
import {
  validateName,
  validateGender,
  validatePasswords,
  validatePasswordAgain,
  validateBirthdates,
  validateAmountLoan,
  validateMonthsToPay,
  validateInterestRate
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
        amountLoan: {
          errors: validateAmountLoan(action.value),
          value: action.value
        }
      }
    case 'NEWBORROWER_MTP':
      return {
        ...state,
        monthsToPay: {
          errors: validateMonthsToPay(action.value),
          value: action.value
        }
      }
    case 'NEWBORROWER_CIR':
      return {
        ...state,
        interestRate: {
          errors: validateInterestRate(action.value),
          value: action.value
        }
      }
    default:
      return {...state}
  }
}