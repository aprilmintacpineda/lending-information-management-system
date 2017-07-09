import initial_state from './initial_states/session';
import { ipcRenderer } from 'electron';

export default function(state = initial_state, action) {
  switch(action.type) {
    case 'SESSION_CHECK':
      return {
        ...initial_state,
        backend: {
          ...initial_state.backend,
          processing: true
        }
      }

    case 'SESSION_CHECK_SUCCESSFUL':
      return {
        ...initial_state,
        accounts: action.accounts,
        backend: {
          processing: false,
          status: 'successful',
          message: null
        }
      }

    case 'SESSION_CHECK_FAILED':
      return {
        ...initial_state,
        backend: {
          processing: false,
          status: 'failed',
          message: action.message
        }
      }

    case 'SESSION_LOGGED_IN':
      return {
        ...initial_state,
        is_logged_in: true,
        user_data: action.user_data? action.user_data : state.user_data,
        backend: {
          ...initial_state.backend,
          status: 'logged_in',
        }
      }

    case 'SESSION_CLEAR':
      return {
        ...initial_state
      }

    case 'SESSION_GET_USER_DATA_SUCCESSFUL':
      return {
        ...state,
        user_data: {...action.user_data}
      }

    default:
      return {...state};
  }
}