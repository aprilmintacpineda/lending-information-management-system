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

export function changeTimesToPay(value) {
  return {
    type: 'NEWBORROWER_CTP',
    value
  }
}

export function changeInterest(value) {
  return {
    type: 'NEWBORROWER_CIR',
    value
  }
}

export function changeModeOfPayment(value) {
  return {
    type: 'NEWBORROWER_CMP',
    value
  }
}