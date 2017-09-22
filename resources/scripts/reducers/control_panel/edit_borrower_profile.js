import initial_state from '../initial_states/control_panel/edit_borrower_profile';

import {
  validateName,
  validateGender,
  validatePhoneNumber,
  validateAddress
} from '../../helpers/Validator';

import { ucwords } from '../../helpers/Strings';

function allowSubmit(newState) {
  return !newState.edit.address.value.length
      || newState.edit.address.errors.length
      || !newState.edit.firstname.value.length
      || newState.edit.firstname.errors.length
      || !newState.edit.middlename.value.length
      || newState.edit.middlename.errors.length
      || !newState.edit.surname.value.length
      || newState.edit.surname.errors.length
      || !newState.edit.contact_numbers.filter(contact_number => contact_number.value.length).length? false : true;
}

export default function edit_borrower_profile(state = initial_state, action) {
  let new_state;

  switch(action.type) {
    case '_EDITBORROWERPROFILE_FETCH':
      return {
        ...state,
        data: {
          ...state.data,
          backend: {
            processing: true,
            status: null,
            message: null
          }
        }
      }
    case 'EDITBORROWERPROFILE_FETCH_SUCCESSFUL':
      return {
        ...state,
        edit: {
          ...state.edit,
          firstname: {
            value: action.data.firstname,
            errors: []
          },
          middlename: {
            value: action.data.middlename,
            errors: []
          },
          surname: {
            value: action.data.surname,
            errors: []
          },
          gender: {
            value: action.data.gender,
            errors: []
          },
          address: {
            value: action.data.address,
            errors: []
          },
          contact_numbers: action.data.contact_numbers.length? action.data.contact_numbers.map(contact_number => ({
            id: contact_number.id,
            value: contact_number.number,
            errors: []
          })) : [{
            id: null,
            value: '',
            errors: []
          }]
        },
        data: {
          ...action.data,
          backend: {
            processing: false,
            status: 'successful',
            message: null
          }
        }
      }
    case 'EDITBORROWERPROFILE_FETCH_FAILED':
      return {
        ...state,
        data: {
          ...state.data,
          backend: {
            processing: false,
            status: 'failed',
            message: action.message
          }
        }
      }
    case 'EDITBORRWOERPROFILE_EDIT_ADDRESS':
      new_state = {
        ...state,
        edit: {
          ...state.edit,
          address: {
            value: action.value,
            errors: validateAddress(action.value)
          }
        }
      }

      return {
        ...new_state,
        edit: {
          ...new_state.edit,
          backend: {
            ...new_state.edit.backend,
            allow_submit: allowSubmit(new_state)
          }
        }
      }
    case 'EDITBORRWOERPROFILE_EDIT_FIRSTNAME':
      new_state = {
        ...state,
        edit: {
          ...state.edit,
          firstname: {
            value: ucwords(action.value),
            errors: validateName('Firstname', action.value)
          }
        }
      }

      return {
        ...new_state,
        edit: {
          ...new_state.edit,
          backend: {
            ...new_state.edit.backend,
            allow_submit: allowSubmit(new_state)
          }
        }
      }
    case 'EDITBORRWOERPROFILE_EDIT_MIDDLENAME':
      new_state = {
        ...state,
        edit: {
          ...state.edit,
          middlename: {
            value: ucwords(action.value),
            errors: validateName('Middlename', action.value)
          }
        }
      }

      return {
        ...new_state,
        edit: {
          ...new_state.edit,
          backend: {
            ...new_state.edit.backend,
            allow_submit: allowSubmit(new_state)
          }
        }
      }
    case 'EDITBORRWOERPROFILE_EDIT_SURNAME':
      new_state = {
        ...state,
        edit: {
          ...state.edit,
          surname: {
            value: ucwords(action.value),
            errors: validateName('Surname', action.value)
          }
        }
      }

      return {
        ...new_state,
        edit: {
          ...new_state.edit,
          backend: {
            ...new_state.edit.backend,
            allow_submit: allowSubmit(new_state)
          }
        }
      }
    case 'EDITBORRWOERPROFILE_EDIT_GENDER':
      new_state = {
        ...state,
        edit: {
          ...state.edit,
          gender: {
            value: action.value,
            errors: validateGender(action.value)
          }
        }
      }

      return {
        ...new_state,
        edit: {
          ...new_state.edit,
          backend: {
            ...new_state.edit.backend,
            allow_submit: allowSubmit(new_state)
          }
        }
      }
    case 'EDITBORRWOERPROFILE_EDIT_CONTACT_NUMBER':
      new_state = {
        ...state,
        edit: {
          ...state.edit,
          contact_numbers: state.edit.contact_numbers.map((contact_number, index) => index == action.index? ({
              ...contact_number,
              value: action.value,
              errors: validatePhoneNumber(action.value)
            }): contact_number)
        }
      }

      return {
        ...new_state,
        edit: {
          ...new_state.edit,
          backend: {
            ...new_state.edit.backend,
            allow_submit: allowSubmit(new_state)
          }
        }
      }
    case 'EDITBORRWOERPROFILE_ADD_CONTACT_NUMBER':
      return {
        ...state,
        edit: {
          ...state.edit,
          contact_numbers: state.edit.contact_numbers.concat({
            id: null,
            value: '',
            errors: [],
            key: new Date().getTime()
          })
        }
      }
    case 'EDITBORRWOERPROFILE_REMOVE_CONTACT_NUMBER':
      let contact_numbers = state.edit.contact_numbers.filter((contact_number, index) => index != action.index);

      new_state = {
        ...state,
        edit: {
          ...state.edit,
          contact_numbers: contact_numbers.length? contact_numbers : [{
            id: null,
            value: '',
            errors: []
          }]
        }
      }

      return {
        ...new_state,
        edit: {
          ...new_state.edit,
          backend: {
            ...new_state.edit.backend,
            allow_submit: allowSubmit(new_state)
          }
        }
      }
    case '_EDITBORRWOERPROFILE_SEND':
      return {
        ...state,
        edit: {
          ...state.edit,
          backend: {
            processing: true,
            status: null,
            message: null
          }
        }
      }
    case 'EDITBORRWOERPROFILE_SEND_SUCCESSFUL':
      return {
        ...state,
        edit: {
          firstname: {
            value: action.data.firstname,
            errors: []
          },
          middlename: {
            value: action.data.middlename,
            errors: []
          },
          surname: {
            value: action.data.surname,
            errors: []
          },
          gender: {
            value: action.data.gender,
            errors: []
          },
          address: {
            value: action.data.address,
            errors: []
          },
          contact_numbers: action.data.contact_numbers.length? action.data.contact_numbers.map(contact_number => ({
            id: contact_number.id,
            value: contact_number.number,
            errors: []
          })) : [{
            id: null,
            value: '',
            errors: []
          }],
          backend: {
            processing: false,
            status: 'successful',
            message: null,
            allow_submit: true
          }
        }
      }
    case 'EDITBORRWOERPROFILE_SEND_FAILED':
      return {
        ...state,
        edit: {
          ...state.edit,
          backend: {
            ...state.edit.backend,
            processing: false,
            status: 'failed',
            message: action.message,
            allow_submit: true
          }
        }
      }
    case 'EDITBORRWOERPROFILE_RESET':
      return {
        ...initial_state
      }
    default:
      return {
        ...state
      }
  }
}