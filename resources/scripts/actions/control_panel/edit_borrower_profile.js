export function fetch(id) {
  return {
    type: '_EDITBORROWERPROFILE_FETCH',
    id
  }
}

export function editAddress(value) {
  return {
    type: 'EDITBORRWOERPROFILE_EDIT_ADDRESS',
    value
  }
}

export function editFirstname(value) {
  return {
    type: 'EDITBORRWOERPROFILE_EDIT_FIRSTNAME',
    value
  }
}

export function editMiddlename(value) {
  return {
    type: 'EDITBORRWOERPROFILE_EDIT_MIDDLENAME',
    value
  }
}

export function editSurname(value) {
  return {
    type: 'EDITBORRWOERPROFILE_EDIT_SURNAME',
    value
  }
}

export function editGender(value) {
  return {
    type: 'EDITBORRWOERPROFILE_EDIT_GENDER',
    value
  }
}

export function editContactNumber(value, index) {
  return {
    type: 'EDITBORRWOERPROFILE_EDIT_CONTACT_NUMBER',
    value,
    index
  }
}

export function addMoreContactNumbers() {
  return {
    type: 'EDITBORRWOERPROFILE_ADD_CONTACT_NUMBER'
  }
}

export function removeContactNumber(index) {
  return {
    type: 'EDITBORRWOERPROFILE_REMOVE_CONTACT_NUMBER',
    index
  }
}

export function send(data) {
  return {
    type: '_EDITBORRWOERPROFILE_SEND',
    ...data
  }
}

export function reset() {
  return {
    type: 'EDITBORRWOERPROFILE_RESET'
  }
}