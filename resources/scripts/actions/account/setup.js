export function changeFirstname(value) {
  return {
    type: 'SETUP_CFN',
    value
  }
}

export function changeMiddlename(value) {
  return {
    type: 'SETUP_CMN',
    value
  }
}

export function changeSurname(value) {
  return {
    type: 'SETUP_CSN',
    value
  }
}

export function changeGender(value) {
  return {
    type: 'SETUP_CG',
    value
  }
}

export function changeBirthmonth(value) {
  return {
    type: 'SETUP_CBDM',
    value
  }
}

export function changeBirthdate(value) {
  return {
    type: 'SETUP_CBDD',
    value
  }
}

export function changeBirthyear(value) {
  return {
    type: 'SETUP_CBDY',
    value
  }
}

export function changePassword(value) {
  return {
    type: 'SETUP_CPW',
    value
  }
}

export function changeConfirmPassword(value) {
  return {
    type: 'SETUP_CCPW',
    value
  }
}

export function submit(setup) {
  return {
    type: '_SETUP_SUBMIT',
    setup
  }
}