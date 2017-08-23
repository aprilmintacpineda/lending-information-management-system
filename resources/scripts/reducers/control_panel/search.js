import initial_state from '../initial_states/control_panel/search';

function allowSubmit(new_state) {
  return new_state.query.value.length? true: false;
}

export default function search(state = initial_state, action) {
  let new_state;

  switch(action.type) {
    case 'SEARCH_CHANGE_STRING':
      new_state = {
        ...state,
        query: {
          ...state.query,
          value: action.value
        }
      }

      return {
        ...new_state,
        query: {
          ...new_state.query,
          allow_submit: allowSubmit(new_state),
        }
      }
    case 'SEARCH_CHANGE_TYPE':
      new_state = {
        ...state,
        query: {
          ...state.query,
          type: action.value
        }
      }

      return {
        ...new_state,
        query: {
          ...new_state.query,
          allow_submit: allowSubmit(new_state),
        }
      }
    case 'SEARCH_RESET':
      return {...initial_state}
    case '_SEARCH_SUBMIT':
      new_state = {
        ...state,
        backend: {
          processing: true,
          status: null,
          message: null
        }
      }

      return {
        ...new_state,
        query: {
          ...new_state.query,
          allow_submit: allowSubmit(new_state),
        }
      }
    case 'SEARCH_SUBMIT_SUCCESSFUL':
      return {
        ...state,
        search_results: action.search_results,
        backend: {
          processing: false,
          status: 'successful',
          message: null
        }
      }
    case 'SEARCH_SUBMIT_FAILED':
      return {
        ...state,
        backend: {
          processing: false,
          status: 'failed',
          message: action.message
        }
      }
    default:
      return {...state};
  }
}