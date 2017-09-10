export function changeAmount(value) {
  return {
    type: 'BORROWERNEWLOAN_CHANGE_AMOUNT',
    value
  }
}

export function changeInterestRate(value) {
  return {
    type: 'BORROWERNEWLOAN_CHANGE_INTEREST_RATE',
    value
  }
}

export function changeInterestType(value) {
  return {
    type: 'BORROWERNEWLOAN_CHANGE_INTEREST_TYPE',
    value
  }
}

export function changePaymentMethod(value) {
  return {
    type: 'BORROWERNEWLOAN_CHANGE_PAYMENT_METHOD',
    value
  }
}

export function changeDateOfPaymentMonth(value) {
  return {
    type: 'BORROWERNEWLOAN_CHANGE_DOP_MONTH',
    value
  }
}

export function changeDateOfPaymentDate(value) {
  return {
    type: 'BORROWERNEWLOAN_CHANGE_DOP_DATE',
    value
  }
}

export function changeDateOfPaymentYear(value) {
  return {
    type: 'BORROWERNEWLOAN_CHANGE_DOP_YEAR',
    value
  }
}

export function changeMonthsToPay(value) {
  return {
    type: 'BORROWERNEWLOAN_CHANGE_MONTHS_TO_PAY',
    value
  }
}

export function changeLoanCondition(value) {
  return {
    type: 'BORROWERNEWLOAN_CHANGE_LOAN_CONDITION',
    value
  }
}

export function changeDateLoanDate(value) {
  return {
    type: 'BORROWERNEWLOAN_CHANGE_DATELOAN_DATE',
    value
  }
}

export function changeDateLoanMonth(value) {
  return {
    type: 'BORROWERNEWLOAN_CHANGE_DATELOAN_MONTH',
    value
  }
}

export function changeDateLoanYear(value) {
  return {
    type: 'BORROWERNEWLOAN_CHANGE_DATELOAN_YEAR',
    value
  }
}

export function submit(fields) {
  return {
    type: '_BORROWERNEWLOAN_SUBMIT',
    ...fields
  }
}

export function reset() {
  return {
    type: 'BORROWERNEWLOAN_RESET'
  }
}