import initial_state from '../initial_states/account/login';
import { validatePassword } from '../../helpers/Validator';

export default function login(state = initial_state, action) {
  switch(action.type) {
    case 'LOGIN':
      return {
        ...state
      }
    case 'LOGIN_CPW':
      return {
        ...state,
        password: {
          value: action.value,
          errors: validatePassword(action.value)
        }
      }
    case '_LOGIN':
      return {
        ...state,
        backend: {
          processing: true,
          status: null
        }
      }
    case 'LOGIN_SUCCESSFUL':
      return {
        ...state,
        backend: {
          processing: true,
          status: 'logged_in'
        }
      }
    case 'LOGIN_FAILED':
      return {
        ...state,
        password: {
          value: state.password.value,
          errors: action.errors
        },
        backend: {
          processing: false,
          status: null
        }
      }
    case 'LOGIN_CLEAR':
      return {
        ...initial_state
      }
    default:
      return {...state}
  }
}