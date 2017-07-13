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

export function changeDateLoanYear(value) {
  return {
    type: 'NEWBORROWER_CLY',
    value
  }
}

export function changeDateLoanDate(value) {
  return {
    type: 'NEWBORROWER_CLD',
    value
  }
}

export function changeDateLoanMonth(value) {
  return {
    type: 'NEWBORROWER_CLM',
    value
  }
}

export function reset() {
  return {
    type: 'NEWBORROWER_RESET'
  }
}

export function changeToApplyDueDateInterest() {
  return {
    type: 'NEWBORROWER_CADDI'
  }
}

export function changeToApplyInterestOnly() {
  return {
    type: 'NEWBORROWER_CAIO'
  }
}

export function changeToApplyDueDateOnly() {
  return {
    type: 'NEWBORROWER_CADDO'
  }
}

export function changeToNoDueDateNoInterest(value) {
  return {
    type: 'NEWBORROWER_CNDDNI'
  }
}

export function addMoreContactNumbers() {
  return {
    type: 'NEWBORROWER_AMCN'
  }
}

export function changeContactNumber(value, index) {
  return {
    type: 'NEWBORROWER_CCN',
    index,
    value
  }
}

export function changePaymentMethod(value) {
  return {
    type: 'NEWBORROWER_CPM',
    value
  }
}