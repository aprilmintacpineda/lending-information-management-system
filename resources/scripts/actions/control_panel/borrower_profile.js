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

export function changePaymentMonth(value, index) {
  return {
    type: 'BORROWER_PROFILE_CPDM',
    index,
    value
  }
}

export function changePaymentDate(value, index) {
  return {
    type: 'BORROWER_PROFILE_CPDD',
    index,
    value
  }
}

export function changePaymentYear(value, index) {
  return {
    type: 'BORROWER_PROFILE_CPDY',
    index,
    value
  }
}

export function makePayment(fields, index) {
  return {
    type: '_BORROWER_PROFILE_SEND_PAYMENT',
    ...fields,
    index
  }
}

export function toggleEditPaymentInformation(visibility, payment_index, loan_index) {
  return {
    type: 'BORROWER_PROFILE_EPI',
    payment_index,
    loan_index,
    visibility
  }
}

export function editPaymentInformationAmount(value, payment_index, loan_index) {
  return {
    type: 'BORROWER_PROFILE_EPIA',
    value,
    payment_index,
    loan_index
  }
}

export function editPaymentInformationPeriodYear(value, payment_index, loan_index) {
  return {
    type: 'BORROWER_PROFILE_EPIPY',
    value,
    payment_index,
    loan_index
  }
}

export function editPaymentInformationPeriodMonth(value, payment_index, loan_index) {
  return {
    type: 'BORROWER_PROFILE_EPIPM',
    value,
    payment_index,
    loan_index
  }
}

export function editPaymentInformationPaymentType(value, payment_index, loan_index) {
  return {
    type: 'BORROWER_PROFILE_EPIPT',
    value,
    payment_index,
    loan_index
  }
}

export function editPaymentInformationPaymentYear(value, payment_index, loan_index) {
  return {
    type: 'BORROWER_PROFILE_EPIPDY',
    value,
    payment_index,
    loan_index
  }
}

export function editPaymentInformationPaymentDate(value, payment_index, loan_index) {
  return {
    type: 'BORROWER_PROFILE_EPIPDD',
    value,
    payment_index,
    loan_index
  }
}

export function editPaymentInformationPaymentMonth(value, payment_index, loan_index) {
  return {
    type: 'BORROWER_PROFILE_EPIPDM',
    value,
    payment_index,
    loan_index
  }
}

export function editPaymentInformationSend(fields, payment_index, loan_index) {
  return {
    type: '_BORROWER_PROFILE_EPI_SEND',
    ...fields,
    payment_index,
    loan_index
  }
}

export function toggleEditLoanInformation(visibility, loan_index) {
  return {
    type: 'BORROWER_PROFILE_ELIT',
    visibility,
    loan_index
  }
}

export function editLoanInformationAmount(value, loan_index) {
  return {
    type: 'BORROWER_PROFILE_ELIA',
    value,
    loan_index
  }
}

export function editLoanInformationCondition(value, loan_index) {
  return {
    type: 'BORROWER_PROFILE_ELIC',
    value,
    loan_index
  }
}

export function editLoanInformationInterestRate(value, loan_index) {
  return {
    type: 'BORROWER_PROFILE_ELIIR',
    value,
    loan_index
  }
}

export function editLoanInformationInterestType(value, loan_index) {
  return {
    type: 'BORROWER_PROFILE_ELIIT',
    value,
    loan_index
  }
}

export function editLoanInformationMonthsToPay(value, loan_index) {
  return {
    type: 'BORROWER_PROFILE_ELIMTP',
    value,
    loan_index
  }
}

export function editLoanInformationDateLoanMonth(value, loan_index) {
  return {
    type: 'BORROWER_PROFILE_ELIDLM',
    value,
    loan_index
  }
}

export function editLoanInformationDateLoanDate(value, loan_index) {
  return {
    type: 'BORROWER_PROFILE_ELIDLD',
    value,
    loan_index
  }
}

export function editLoanInformationDateLoanYear(value, loan_index) {
  return {
    type: 'BORROWER_PROFILE_ELIDY',
    value,
    loan_index
  }
}

export function editLoanInformatioPaymentMethod(value, loan_index) {
  return {
    type: 'BORROWER_PROFILE_ELIPM',
    value,
    loan_index
  }
}

export function editLoanInformatioSend(fields, loan_index) {
  return {
    type: '_BORROWER_PROFILE_ELI_SEND',
    ...fields,
    loan_index
  }
}