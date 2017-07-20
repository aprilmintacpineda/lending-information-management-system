export function fetch(id) {
  return {
    type: '_BORROWER_PROFILE_FETCH',
    id
  }
}

export function reset() {
  return {
    type: 'BORROWER_PROFILE_RESET'
  }
}

export function togglePaymentForm(visibility, index) {
  return {
    type: 'BORROWER_PROFILE_TPF',
    visibility,
    index
  }
}

export function changePaymentType(payment_type, index) {
  return {
    type: 'BORROWER_PROFILE_CPT',
    payment_type,
    index
  }
}

export function changePeriodMonth(month, index) {
  return {
    type: 'BORROWER_PROFILE_CPM',
    month,
    index
  }
}

export function changePeriodYear(year, index) {
  return {
    type: 'BORROWER_PROFILE_CPY',
    year,
    index
  }
}

export function changePeriodQuarter(quarter, index) {
  return {
    type: 'BORROWER_PROFILE_CPQ',
    quarter,
    index
  }
}

export function changeAmountPaid(value, index) {
  return {
    type: 'BORROWER_PROFILE_CAP',
    value,
    index
  }
}

export function makePayment(fields, index) {
  return {
    type: '_BORROWER_PROFILE_SEND_PAYMENT',
    ...fields,
    index
  }
}