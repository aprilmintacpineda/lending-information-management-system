export function changeFirstname(value) {
  return {
    type: 'NEWBORROWER_CFN',
    value
  }
}

export function changeMiddlename(value) {
  return {
    type: 'NEWBORROWER_CMN',
    value
  }
}

export function changeSurname(value) {
  return {
    type: 'NEWBORROWER_CSN',
    value
  }
}

export function changeGender(value) {
  return {
    type: 'NEWBORROWER_CGD',
    value
  }
}

export function changeAmountLoan(value) {
  return {
    type: 'NEWBORROWER_CAL',
    value
  }
}

export function changeMonthsToPay(value) {
  return {
    type: 'NEWBORROWER_CMP',
    value
  }
}

export function changeInterest(value) {
  return {
    type: 'NEWBORROWER_CIR',
    value
  }
}

export function submit(fields) {
  return {
    type: '_NEWBORROWER_SUBMIT',
    ...fields
  }
}

export function changeApplyInterest(value) {
  return {
    type: 'NEWBORROWER_CAI',
    value
  }
}