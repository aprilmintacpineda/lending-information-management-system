import initial_state from '../initial_states/control_panel/borrower_list';

export default function borrower_list(state = initial_state, action) {
  switch(action.type) {
    case '_BORROWERS_LIST_FETCH':
      return {
        ...state,
        backend: {
          processing: true,
          status: null,
          message: null
        }
      }
    case 'BORROWERS_LIST_FETCH_SUCCESSFUL':
      return {
        list: action.list,
        backend: {
          processing: false,
          status: 'successful',
          message: null
        }
      }
    case 'BORROWERS_LIST_FETCH_FAILED':
      return {
        list: [],
        backend: {
          processing: false,
          status: 'failed',
          message: action.message
        }
      }
    case 'BORROWERS_LIST_RESET':
      return {
        ...initial_state
      }
    default:
      return {
        ...state
      }
  }
}