import initial_state from '../initial_states/control_panel/dashboard';

export default function dashboard(state = initial_state, action) {
  switch(action.type) {
    case '_DASHBOARD_GET_TOMORROWS':
      return {
        ...state,
        tomorrows: {
          data: [],
          backend: {
            processing: true,
            status: null,
            message: null
          }
        }
      }
    case '_DASHBOARD_GET_TODAYS':
      return {
        ...state,
        todays: {
          data: [],
          backend: {
            processing: true,
            status: null,
            message: null
          }
        }
      }
    case '_DASHBOARD_GET_YESTERDAYS':
      return {
        ...state,
        yesterdays: {
          data: [],
          backend: {
            processing: true,
            status: null,
            message: null
          }
        }
      }
    default:
      return {...state}
  }
}