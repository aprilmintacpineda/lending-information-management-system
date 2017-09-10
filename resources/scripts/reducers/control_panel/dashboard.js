import initial_state from '../initial_states/control_panel/dashboard';

export default function dashboard(state = initial_state, action) {
  switch(action.type) {
    case '_DASHBOARD_GET_DUEDATES_TOMORROW':
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
    case 'DASHBOARD_GET_DUEDATES_TOMORROW_SUCCESSFUL':
      return {
        ...state,
        tomorrows: {
          data: [...action.data],
          backend: {
            processing: false,
            status: 'successful',
            message: null
          }
        }
      }
    case 'DASHBOARD_GET_DUEDATES_TOMORROW_FAILED':
      return {
        ...state,
        tomorrows: {
          data: [],
          backend: {
            processing: false,
            status: 'failed',
            message: action.message
          }
        }
      }
    case '_DASHBOARD_GET_DUEDATES_TODAY':
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
    case 'DASHBOARD_GET_DUEDATES_TODAY_SUCCESSFUL':
      return {
        ...state,
        todays: {
          data: [...action.data],
          backend: {
            processing: false,
            status: 'successful',
            message: null
          }
        }
      }
    case 'DASHBOARD_GET_DUEDATES_TODAY_FAILED':
      return {
        ...state,
        todays: {
          data: [],
          backend: {
            processing: false,
            status: 'failed',
            message: action.message
          }
        }
      }
    case '_DASHBOARD_GET_DUEDATES_THISMONTH':
      return {
        ...state,
        this_month: {
          data: [],
          backend: {
            processing: true,
            status: null,
            message: null
          }
        }
      }
    case 'DASHBOARD_GET_DUEDATES_THISMONTH_SUCCESSFUL':
      return {
        ...state,
        this_month: {
          data: [...action.data],
          backend: {
            processing: false,
            status: 'successful',
            message: null
          }
        }
      }
    case 'DASHBOARD_GET_DUEDATES_THISMONTH_FAILED':
      return {
        ...state,
        this_month: {
          data: [],
          backend: {
            processing: false,
            status: 'failed',
            message: action.message
          }
        }
      }
    case '_DASHBOARD_GET_PASTDUEDATES':
      return {
        ...state,
        past_due_dates: {
          data: [],
          backend: {
            processing: true,
            status: null,
            message: null
          }
        }
      }
    case 'DASHBOARD_GET_PASTDUEDATES_SUCCESSFUL':
      return {
        ...state,
        past_due_dates: {
          data: [...action.data],
          backend: {
            processing: false,
            status: 'successful',
            message: null
          }
        }
      }
    case 'DASHBOARD_GET_PASTDUEDATES_FAILED':
      return {
        ...state,
        past_due_dates: {
          data: [],
          backend: {
            processing: false,
            status: 'failed',
            message: action.message
          }
        }
      }
    case '_DASHBOARD_GET_ONEGIVES':
      return {
        ...state,
        one_gives: {
          data: [],
          backend: {
            processing: true,
            status: null,
            message: null
          }
        }
      }
    case 'DASHBOARD_GET_ONEGIVES_SUCCESSFUL':
      return {
        ...state,
        one_gives: {
          data: [...action.data],
          backend: {
            processing: false,
            status: 'successful',
            message: null
          }
        }
      }
    case 'DASHBOARD_GET_ONEGIVES_FAILED':
      return {
        ...state,
        one_gives: {
          data: [],
          backend: {
            processing: false,
            status: 'failed',
            message: action.message
          }
        }
      }
    default:
      return {...state}
  }
}