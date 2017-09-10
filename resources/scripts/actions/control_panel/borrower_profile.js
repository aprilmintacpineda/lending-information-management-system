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

export function togglePenaltyForm(visibility, loan_index) {
  return {
    type: 'BORROWER_PROFILE_PENALTYFIELD_TOGGLE',
    visibility,
    loan_index
  }
}

export function changePenaltyFormAmount(value, loan_index) {
  return {
    type: 'BORROWER_PROFILE_PENALTYFIELD_AMOUNT',
    value,
    loan_index
  }
}

export function changePenaltyFormRemarks(value, loan_index) {
  return {
    type: 'BORROWER_PROFILE_PENALTYFIELD_REMARKS',
    value,
    loan_index
  }
}

export function changePenaltyDate(value, loan_index) {
  return {
    type: 'BORROWER_PROFILE_PENALTYFIELD_DATE',
    value,
    loan_index
  }
}

export function changePenaltyMonth(value, loan_index) {
  return {
    type: 'BORROWER_PROFILE_PENALTYFIELD_MONTH',
    value,
    loan_index
  }
}

export function changePenaltyYear(value, loan_index) {
  return {
    type: 'BORROWER_PROFILE_PENALTYFIELD_YEAR',
    value,
    loan_index
  }
}

export function createPenalty(fields, loan_index) {
  return {
    type: '_BORROWER_PROFILE_PENALTYFIELD_CREATE',
    ...fields,
    loan_index
  }
}

export function togglePenaltyPaymentForm(visibility, penalty_index, loan_index) {
  return {
    type: 'BORROWER_PROFILE_PENALTYPAYMENTFORM_TOGGLE',
    visibility,
    penalty_index,
    loan_index
  }
}

export function changePenaltyPaymentFormAmount(value, penalty_index, loan_index) {
  return {
    type: 'BORROWER_PROFILE_PENALTYPAYMENTFORM_AMOUNT',
    value,
    penalty_index,
    loan_index
  }
}

export function changePenaltyPaymentFormMonth(value, penalty_index, loan_index) {
  return {
    type: 'BORROWER_PROFILE_PENALTYPAYMENTFORM_MONTH',
    value,
    penalty_index,
    loan_index
  }
}

export function changePenaltyPaymentFormDate(value, penalty_index, loan_index) {
  return {
    type: 'BORROWER_PROFILE_PENALTYPAYMENTFORM_DATE',
    value,
    penalty_index,
    loan_index
  }
}

export function changePenaltyPaymentFormYear(value, penalty_index, loan_index) {
  return {
    type: 'BORROWER_PROFILE_PENALTYPAYMENTFORM_YEAR',
    value,
    penalty_index,
    loan_index
  }
}

export function submitPenaltyPaymentForm(fields, penalty_index, loan_index) {
  return {
    type: '_BORROWER_PROFILE_PENALTYPAYMENTFORM_CREATE',
    ...fields,
    penalty_index,
    loan_index
  }
}

export function togglePenaltyEdit(visibility, penalty_index, loan_index) {
  return {
    type: 'BORROWER_PROFILE_EDITPENALTYFORM_TOGGLE',
    visibility,
    penalty_index,
    loan_index
  }
}

export function changePenaltyEditAmount(value, penalty_index, loan_index) {
  return {
    type: 'BORROWER_PROFILE_EDITPENALTYFORM_AMOUNT',
    value,
    penalty_index,
    loan_index
  }
}

export function changePenaltyEditMonth(value, penalty_index, loan_index) {
  return {
    type: 'BORROWER_PROFILE_EDITPENALTYFORM_MONTH',
    value,
    penalty_index,
    loan_index
  }
}

export function changePenaltyEditDate(value, penalty_index, loan_index) {
  return {
    type: 'BORROWER_PROFILE_EDITPENALTYFORM_DATE',
    value,
    penalty_index,
    loan_index
  }
}

export function changePenaltyEditYear(value, penalty_index, loan_index) {
  return {
    type: 'BORROWER_PROFILE_EDITPENALTYFORM_YEAR',
    value,
    penalty_index,
    loan_index
  }
}

export function changePenaltyEditRemarks(value, penalty_index, loan_index) {
  return {
    type: 'BORROWER_PROFILE_EDITPENALTYFORM_REMARKS',
    value,
    penalty_index,
    loan_index
  }
}

export function savePenaltyEdit(fields, penalty_index, loan_index) {
  return {
    type: '_BORROWER_PROFILE_EDITPENALTYFORM_SAVE',
    ...fields,
    penalty_index,
    loan_index
  }
}

export function togglePenaltyPaymentEdit(visibility, penalty_payment_index, penalty_index, loan_index) {
  return {
    type: 'BORROWER_PROFILE_EDITPENALTYPAYMENT',
    visibility,
    penalty_payment_index,
    penalty_index,
    loan_index
  }
}

export function changePenaltyPaymentEditAmount(value, penalty_payment_index, penalty_index, loan_index) {
  return {
    type: 'BORROWER_PROFILE_EDITPENALTYPAYMENT_AMOUNT',
    value,
    penalty_payment_index,
    penalty_index,
    loan_index
  }
}

export function changePenaltyPaymentEditDate(value, penalty_payment_index, penalty_index, loan_index) {
  return {
    type: 'BORROWER_PROFILE_EDITPENALTYPAYMENT_DATE',
    value,
    penalty_payment_index,
    penalty_index,
    loan_index
  }
}
export function changePenaltyPaymentEditYear(value, penalty_payment_index, penalty_index, loan_index) {
  return {
    type: 'BORROWER_PROFILE_EDITPENALTYPAYMENT_YEAR',
    value,
    penalty_payment_index,
    penalty_index,
    loan_index
  }
}

export function changePenaltyPaymentEditMonth(value, penalty_payment_index, penalty_index, loan_index) {
  return {
    type: 'BORROWER_PROFILE_EDITPENALTYPAYMENT_MONTH',
    value,
    penalty_payment_index,
    penalty_index,
    loan_index
  }
}

export function changePenaltyPaymentEditSave(fields, penalty_payment_index, penalty_index, loan_index) {
  return {
    type: '_BORROWER_PROFILE_EDITPENALTYPAYMENT_SAVE',
    ...fields,
    penalty_payment_index,
    penalty_index,
    loan_index
  }
}

export function putHash(target, parent) {
  return {
    type: 'BORROWER_PROFILE_HASH_PUT',
    value: target,
    parent
  }
}

export function removeHash(value) {
  return {
    type: 'BORROWER_PROFILE_HASH_REMOVE'
  }
}

export function wavePenaltyToggle(penalty_index, loan_index) {
  return {
    type: 'BORROWER_PROFILE_WAVE_PENALTY_TOGGLE',
    penalty_index,
    loan_index
  }
}

export function wavePenaltyChangeRemarks(value, penalty_index, loan_index) {
  return {
    type: 'BORROWER_PROFILE_WAVE_PENALTY_CHANGE_REMARKS',
    penalty_index,
    loan_index,
    value
  }
}

export function wavePenaltySubmit(penalty_id, penalty_index, loan_index, wave_remarks) {
  return {
    type: '_BORROWER_PROFILE_WAVE_SUBMIT',
    penalty_id,
    penalty_index,
    loan_index,
    wave_remarks
  }
}

export function editLoanInformationDateOfPaymentMonth(value, loan_index) {
  return {
    type: 'BORROWER_PROFILE_CHANGE_DOP_MONTH',
    value,
    loan_index
  }
}

export function editLoanInformationDateOfPaymentDate(value, loan_index) {
  return {
    type: 'BORROWER_PROFILE_CHANGE_DOP_DATE',
    value,
    loan_index
  }
}

export function editLoanInformationDateOfPaymentYear(value, loan_index) {
  return {
    type: 'BORROWER_PROFILE_CHANGE_DOP_YEAR',
    value,
    loan_index
  }
}