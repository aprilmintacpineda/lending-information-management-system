import initial_state from '../initial_states/account/setup';
import { validateName, validateGender, validatePasswords, validatePasswordAgain, validateBirthdates } from '../../helpers/Validator';

export default function setup(state = initial_state, action) {
  switch(action.type) {
    case 'SETUP_CFN':
      return {
        ...state,
        firstname: {
          value: action.value,
          errors: validateName('First name', action.value)
        },
        backend: {
          ...initial_state.backend
        }
      }
    case 'SETUP_CMN':
      return {
        ...state,
        middlename: {
          value: action.value,
          errors: validateName('Middle name', action.value)
        },
        backend: {
          ...initial_state.backend
        }
      }
    case 'SETUP_CSN':
      return {
        ...state,
        surname: {
          value: action.value,
          errors: validateName('Surname', action.value)
        },
        backend: {
          ...initial_state.backend
        }
      }
    case 'SETUP_CG':
      return {
        ...state,
        gender: {
          value: action.value,
          errors: validateGender(action.value)
        },
        backend: {
          ...initial_state.backend
        }
      }
    case 'SETUP_CBDM':
      return {
        ...state,
        birth_date: {
          ...state.birth_date,
          errors: validateBirthdates(action.value, state.birth_date.date, state.birth_date.year),
          month: action.value
        },
        backend: {
          ...initial_state.backend
        }
      }
    case 'SETUP_CBDD':
      return {
        ...state,
        birth_date: {
          ...state.birth_date,
          errors: validateBirthdates(state.birth_date.month, action.value, state.birth_date.year),
          date: action.value
        },
        backend: {
          ...initial_state.backend
        }
      }
    case 'SETUP_CBDY':
      return {
        ...state,
        birth_date: {
          ...state.birth_date,
          errors: validateBirthdates(state.birth_date.month, state.birth_date.date, action.value),
          year: action.value
        },
        backend: {
          ...initial_state.backend
        }
      }
    case 'SETUP_CPW':
      return {
        ...state,
        password: {
          value: action.value,
          errors: validatePasswords(action.value, state.confirm_password.value)
        },
        confirm_password: {
          ...state.confirm_password,
          errors: validatePasswordAgain(action.value, state.confirm_password.value)
        },
        backend: {
          ...initial_state.backend
        }
      }
    case 'SETUP_CCPW':
      return {
        ...state,
        password: {
          ...state.password,
          errors: validatePasswords(state.password.value, action.value)
        },
        confirm_password: {
          value: action.value,
          errors: validatePasswordAgain(state.password.value, action.value)
        },
        backend: {
          ...initial_state.backend
        }
      }
    case '_SETUP_SUBMIT':
      return {
        ...state,
        backend: {
          processing: true,
          message: null,
          status: null
        }
      }
    case 'SETUP_SUBMIT_SUCCESSFUL':
      return {
        ...state,
        backend: {
          processing: true,
          message: null,
          status: 'successful'
        }
      }
    case 'SETUP_SUBMIT_FAILED':
      return {
        ...state,
        backend: {
          processing: false,
          message: action.message,
          status: 'failed'
        }
      }
    default:
      return {...state}
  }
}