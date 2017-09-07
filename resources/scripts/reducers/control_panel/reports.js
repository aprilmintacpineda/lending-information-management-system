import initial_state from '../initial_states/control_panel/reports';

export default function reports(state = initial_state, action) {
  switch(action.type) {
    case '_REPORTS_INITIAL_FETCH':
      return {
        data: null,
        backend: {
          processing: true,
          status: null,
          message: null
        }
      }
    case 'REPORTS_INITIAL_FETCH_SUCCESSFUL':
      return {
        data: {...action.data},
        backend: {
          processing: false,
          status: 'successful',
          message: null
        }
      }
    case 'REPORTS_INITIAL_FETCH_FAILED':
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