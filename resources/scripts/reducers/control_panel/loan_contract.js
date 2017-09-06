import initial_state from '../initial_states/control_panel/loan_contract';

export default function loan_contract(state = initial_state, action) {
  switch(action.type) {
    case '_LOANCONTRACT_INITIAL_FETCH':
      return {
        data: null,
        backend: {
          processing: true,
          status: null,
          message: null
        }
      }
    case 'LOANCONTRACT_INITIAL_FETCH_SUCCESSFUL':
      return {
        data: {...action.data},
        backend: {
          processing: false,
          status: 'successful',
          message: null
        }
      }
    case 'LOANCONTRACT_INITIAL_FETCH_FAILED':
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