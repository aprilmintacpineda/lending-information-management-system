import initial_state from '../initial_states/control_panel/borrower_profile';

import { monthList } from '../../helpers/DateTime';

import {
  validateAmountLoan,
  validateMonthsToPay,
  validateInterestRate,
  validateLoanDate,
  validatePaymentMethod,
  validateAmountPaid,
  validatePaymentType,
  validatePhoneNumber,
  validateAmount,
  validateRemarks
} from '../../helpers/Validator';

function allowLoanPaymentFieldsSubmit(fields) {
  return !fields.amount.value.toString().length
  || fields.amount.errors.length? false : true;
}

function alterPaymentFields(loans, target_index, fields) {
  return loans.map((loan, index) => index == target_index? ({
    ...loan,
    loan_payments: fields.loan_payments? fields.loan_payments : loan.loan_payments,
    summary: fields.summary? fields.summary : loan.summary,
    payment_fields: fields.amount? {
      ...loan.payment_fields,
      amount: {
        ...loan.payment_fields.amount,
        ...fields.amount
      }
    } : fields.period? {
      ...loan.payment_fields,
      period: {
        ...loan.payment_fields.period,
        ...fields.period
      }
    } : fields.backend? {
      ...loan.payment_fields,
      backend: {
        ...loan.payment_fields.backend,
        ...fields.backend
      }
    } : fields.date_paid? {
      ...loan.payment_fields,
      date_paid: {
        ...loan.payment_fields.date_paid,
        ...fields.date_paid
      }
    } : fields.payment_fields? {
      ...loan.payment_fields,
      ...fields.payment_fields
    } : {
      ...loan.payment_fields,
      ...fields
    }
  }) : ({...loan}) );
}

function getInitialPaymentFields(loan) {
  return {
    shown: false,
    period: {
      month: loan.loan_payments.length? monthList()[new Date(loan.loan_payments[0].period_paid).getMonth() + 1] : monthList()[new Date(loan.loan_date).getMonth() + 1],
      year: new Date().getFullYear(),
      quarter: loan.payment_method != 2? null : loan.loan_payments[0].quarter == 'q1'? 'q2' : 'q1'
    },
    amount: {
      value: '',
      type: 'period-only',
      errors: []
    },
    date_paid: {
      month: monthList()[new Date().getMonth()],
      date: new Date().getDate(),
      year: new Date().getFullYear()
    },
    allow_submit: false,
    backend: {
      processing: false,
      status: null,
      message: null
    }
  }
}

function getLoanSummary(loan) {
  let total_amount_paid = loan.loan_payments.sum('amount');
  let remaining_balance = Number(loan.amount) + Number(loan.profit) - total_amount_paid;

  return {
    total_amount_paid,
    remaining_balance,
    months_left: remaining_balance / loan.per_month
  }
}

function getInitialPaymentEditFields(payment) {
  return {
    ...payment,
    edit: {
      shown: false,
      period: {
        month: monthList()[new Date(payment.period_paid).getMonth()],
        year: new Date(payment.period_paid).getFullYear(),
        quarter: payment.quarter
      },
      amount: {
        value: payment.amount,
        type: payment.payment_coverage,
        errors: []
      },
      date_paid: {
        month: monthList()[new Date(payment.date_paid).getMonth()],
        date: new Date(payment.date_paid).getDate(),
        year: new Date(payment.date_paid).getFullYear()
      },
      allow_submit: true,
      backend: {
        processing: false,
        status: null,
        message: null
      }
    }
  };
}

function allowPaymentsEditFieldsSubmit(fields) {
  return !fields.amount.value.toString().length
  || fields.amount.errors.length? false : true;
}

function alterPaymentEditFields(loan_payments, target_index, fields) {
  return loan_payments.map((payment, index) => target_index == index? ({
    ...payment,
    edit: fields.amount?
      {
        ...payment.edit,
        amount: {
          ...payment.edit.amount,
          ...fields.amount
        }
      }
    : fields.date_paid?
      {
        ...payment.edit,
        date_paid: {
          ...payment.edit.date_paid,
          ...fields.date_paid
        }
      }
    : fields.period?
      {
        ...payment.edit,
        period: {
          ...payment.edit.period,
          ...fields.period
        }
      }
    : fields.backend?
      {
        ...payment.edit,
        backend: {
          ...payment.edit.backend,
          ...fields.backend
        }
      }
    : {
      ...payment.edit,
      ...fields
    }
  }): ({...payment}));
}

function getInitialLoanEditFields(loan) {
  let loan_date = new Date(loan.loan_date);

  return {
    shown: false,
    amount_loan: {
      condition: loan.condition_applied,
      value: loan.amount,
      errors: []
    },
    months_to_pay: {
      value: loan.months_to_pay,
      errors: []
    },
    interest_rate: {
      type: loan.interest_type,
      value: loan.interest_rate,
      errors: []
    },
    payment_method: {
      value: loan.payment_method,
      errors: []
    },
    loan_date: {
      month: monthList()[loan_date.getMonth()],
      date: loan_date.getDate(),
      year: loan_date.getFullYear(),
      errors: []
    },
    backend: {
      allow_submit: true,
      processing: false,
      status: null,
      message: null
    }
  }
}

function alterLoanEditFields(loans, target_index, fields) {
  return loans.map((loan, loan_index) => loan_index == target_index ? {
    ...loan,
    edit: fields.shown? {
      ...loan.edit,
      shown: fields.shown
    } : fields.amount_loan? {
      ...loan.edit,
      amount_loan: {
        ...loan.edit.amount_loan,
        ...fields.amount_loan
      }
    } : fields.months_to_pay? {
      ...loan.edit,
      months_to_pay: {
        ...loan.edit.months_to_pay,
        ...fields.months_to_pay
      }
    } : fields.interest_rate? {
      ...loan.edit,
      interest_rate: {
        ...loan.edit.interest_rate,
        ...fields.interest_rate
      }
    } : fields.payment_method? {
      ...loan.edit,
      payment_method: {
        ...loan.edit.payment_method,
        ...fields.payment_method
      }
    } : fields.loan_date? {
      ...loan.edit,
      loan_date: {
        ...loan.edit.loan_date,
        ...fields.loan_date
      }
    } : fields.backend? {
      ...loan.edit,
      backend: {
        ...loan.edit.backend,
        ...fields.backend
      }
    } : {
      ...loan.edit,
      ...fields
    }
  } : {...loan});
}

function allowLoanEditSubmit(new_state) {
  if(new_state.amount_loan.condition == 'due-date-only') {
    return new_state.backend.processing
      || !new_state.amount_loan.value.length
      || new_state.amount_loan.errors.length
      || new_state.loan_date.errors.length
      || !new_state.months_to_pay.value.length
      || new_state.months_to_pay.errors.length? false : true;
  } else if(new_state.amount_loan.condition == 'interest-only') {
    return new_state.backend.processing
      || !new_state.amount_loan.value.length
      || new_state.amount_loan.errors.length
      || new_state.loan_date.errors.length
      || !new_state.interest_rate.value.length
      || new_state.interest_rate.errors.length? false : true;
  } else if(new_state.amount_loan.condition == 'no-due-date-and-interest') {
    return new_state.backend.processing
      || !new_state.amount_loan.value.length
      || new_state.amount_loan.errors.length
      || new_state.loan_date.errors.length? false : true;
  }

  return new_state.backend.processing
    || !new_state.amount_loan.value.length
    || new_state.amount_loan.errors.length
    || new_state.loan_date.errors.length
    || !new_state.interest_rate.value.length
    || new_state.interest_rate.errors.length
    || !new_state.months_to_pay.value.length
    || new_state.months_to_pay.errors.length? false : true;
}

function getInitialPenaltyFields() {
  return {
    shown: false,
    amount: {
      value: '',
      errors: []
    },
    remarks: {
      value: '',
      errors: []
    },
    date_given: {
      month: monthList()[new Date().getMonth()],
      date: new Date().getDate(),
      year: new Date().getFullYear()
    },
    allow_submit: false,
    backend: {
      processing: false,
      status: null,
      message: null
    }
  }
}

function alterPenaltyFields(loans, target_index, fields) {
  return loans.map((loan, loan_index) => loan_index == target_index? ({
    ...loan,
    penalty_fields: fields.amount? {
      ...loan.penalty_fields,
      amount: {
        ...loan.penalty_fields.amount,
        ...fields.amount
      }
    } : fields.remarks? {
      ...loan.penalty_fields,
      remarks: {
        ...loan.penalty_fields.remarks,
        ...fields.remarks
      }
    } : fields.date_given? {
      ...loan.penalty_fields,
      date_given: {
        ...loan.penalty_fields.date_given,
        ...fields.date_given
      }
    } : fields.backend? {
      ...loan.penalty_fields,
      backend: {
        ...loan.penalty_fields.backend,
        ...fields.backend
      }
    } : {
      ...loan.penalty_fields,
      ...fields
    }
  }) : {...loan});
}

function allowPenaltyFormSubmit(fields) {
  return fields.amount.value.toString().length
    && !fields.amount.errors.length
    && fields.remarks.value.length
    && !fields.remarks.errors.length? true: false;
}

function getInitialPenaltyPaymentFields() {
  return {
    shown: false,
    allow_submit: false,
    amount: {
      value: '',
      errors: []
    },
    date_paid: {
      month: monthList()[new Date().getMonth()],
      date: new Date().getDate(),
      year: new Date().getFullYear()
    },
    backend: {
      processing: false,
      status: null,
      message: null
    }
  }
}

function alterPenaltyPaymentFields(penalties, target_index, fields) {
  return penalties.map((penalty, penalty_index) => penalty_index == target_index? ({
    ...penalty,
    penalty_payment_fields: fields.amount? {
      ...penalty.penalty_payment_fields,
      amount: {
        ...penalty.penalty_payment_fields.amount,
        ...fields.amount
      }
    } : fields.date_paid? {
      ...penalty.penalty_payment_fields,
      date_paid: {
        ...penalty.penalty_payment_fields.date_paid,
        ...fields.date_paid
      }
    } : {
      ...penalty.penalty_payment_fields,
      ...fields
    }
  }): {...penalty});
}

function allowPenaltyPaymentFormSubmit(fields) {
  return fields.amount.value.toString().length
    && !fields.amount.errors.length? true: false;
}

function getPenaltySummary(penalty) {
  let total_amount_paid = penalty.penalty_payments.sum('amount');

  return {
    total_amount_paid,
    remaining_balance: penalty.amount - total_amount_paid
  }
}

function getInitialPenaltyEditFields(penalty) {
  return {
    shown: false,
    amount: {
      value: penalty.amount,
      errors: []
    },
    remarks: {
      value: penalty.remarks,
      errors: []
    },
    date_given: {
      month: monthList()[new Date(penalty.date_given).getMonth()],
      date: new Date(penalty.date_given).getDate(),
      year: new Date(penalty.date_given).getFullYear()
    },
    allow_submit: true,
    backend: {
      processing: false,
      status: null,
      message: null
    }
  }
}

function alterPenaltyEditFields(penalties, target_index, fields) {
  return penalties.map((penalty, penalty_index) => penalty_index == target_index? ({
    ...penalty,
    edit: fields.amount? {
      ...penalty.edit,
      amount: {
        ...penalty.edit.amount,
        ...fields.amount
      }
    } : fields.remarks? {
      ...penalty.edit,
      remarks: {
        ...penalty.edit.remarks,
        ...fields.remarks
      }
    } : fields.date_given? {
      ...penalty.edit,
      date_given: {
        ...penalty.edit.date_given,
        ...fields.date_given
      }
    } : {
      ...penalty.edit,
      ...fields
    }
  }) : {...penalty});
}

function getInitialPenaltyPaymentEditFields(penalty_payments, target_index) {
  if(penalty_payments.constructor == Array) {
    return penalty_payments.map(penalty_payment => ({
      ...penalty_payment,
      edit: {
        shown: false,
        allow_submit: true,
        amount: {
          value: penalty_payment.amount,
          errors: []
        },
        date_paid: {
          month: monthList()[new Date(penalty_payment.date_paid).getMonth()],
          date: new Date(penalty_payment.date_paid).getDate(),
          year: new Date(penalty_payment.date_paid).getFullYear()
        },
        backend: {
          processing: false,
          message: null,
          status: null
        }
      }
    }));
  }

  return {
    shown: false,
    allow_submit: true,
    amount: {
      value: penalty_payments.amount,
      errors: []
    },
    date_paid: {
      month: monthList()[new Date(penalty_payments.date_paid).getMonth()],
      date: new Date(penalty_payments.date_paid).getDate(),
      year: new Date(penalty_payments.date_paid).getFullYear()
    },
    backend: {
      processing: false,
      message: null,
      status: null
    }
  }
}

function alterPenaltyPaymentEditFields(penalties, target_penalty, target_payment, fields) {
  return penalties.map((penalty, penalty_index) => penalty_index == target_penalty? ({
    ...penalty,
    penalty_payments: penalty.penalty_payments.map((penalty_payment, penalty_payment_index) => penalty_payment_index == target_payment? ({
      ...penalty_payment,
      edit: fields.amount? {
        ...penalty_payment.edit,
        amount: {
          ...penalty_payment.edit.amount,
          ...fields.amount
        }
      } : fields.date_paid? {
        ...penalty_payment.edit,
        date_paid: {
          ...penalty_payment.edit.date_paid,
          ...fields.date_paid
        }
      } : {
        ...penalty_payment.edit,
        ...fields
      }
    }) : {...penalty_payment})
  }): ({...penalty}));
}

export default function borrower_profile(state = initial_state, action) {
  let new_state;

  switch(action.type) {
    case '_BORROWER_PROFILE_FETCH':
      return {
        ...state,
        backend: {
          processing: true,
          status: null,
          message: null
        }
      }
    case 'BORROWER_PROFILE_FETCH_SUCCESSFUL':
      return {
        ...state,
        data: {
          ...action.data,
          loans: action.data.loans.map(loan => ({
            ...loan,
            edit: getInitialLoanEditFields(loan),
            payment_fields: getInitialPaymentFields(loan),
            penalty_fields: getInitialPenaltyFields(),
            penalties: loan.penalties.map(penalty => ({
              ...penalty,
              edit: getInitialPenaltyEditFields(penalty),
              summary: getPenaltySummary(penalty),
              penalty_payment_fields: getInitialPenaltyPaymentFields(),
              penalty_payments: getInitialPenaltyPaymentEditFields(penalty.penalty_payments)
            })),
            summary: getLoanSummary(loan),
            loan_payments: loan.loan_payments.map(payment => getInitialPaymentEditFields(payment))
          }))
        },
        backend: {
          processing: false,
          status: 'successful',
          message: null
        }
      }
    case 'BORROWER_PROFILE_FETCH_FAILED':
      return {
        ...state,
        backend: {
          processing: false,
          status: 'failed',
          message: action.message
        }
      }
    case 'BORROWER_PROFILE_TPF':
      if(!action.visibility) {
        return {
          ...state,
          data: {
            ...state.data,
            loans: alterPaymentFields(state.data.loans, action.index, {
              payment_fields: getInitialPaymentFields(state.data.loans[action.index])
            })
          }
        }
      }

      new_state = {
        ...state,
        data: {
          ...state.data,
          loans: alterPaymentFields(state.data.loans, action.index, {
            payment_fields: {
              shown: true
            }
          })
        }
      }

      return {
        ...new_state,
        data: {
          ...new_state.data,
          loans: alterPaymentFields(new_state.data.loans, action.index, {
            allow_submit: allowLoanPaymentFieldsSubmit(new_state.data.loans[action.index].payment_fields)
          })
        }
      }
    case 'BORROWER_PROFILE_CPM':
      new_state = {
        ...state,
        data: {
          ...state.data,
          loans: alterPaymentFields(state.data.loans, action.index, {
            period: {
              month: action.month,
              date: 1,
              errors: validateAmountPaid(action.value, 1, state.data.loans[action.index].payment_fields.period.year)
            }
          })
        }
      }

      return {
        ...new_state,
        data: {
          ...new_state.data,
          loans: alterPaymentFields(new_state.data.loans, action.index, {
            allow_submit: allowLoanPaymentFieldsSubmit(new_state.data.loans[action.index].payment_fields)
          })
        }
      }
    case 'BORROWER_PROFILE_CPY':
      new_state = {
        ...state,
        data: {
          ...state.data,
          loans: alterPaymentFields(state.data.loans, action.index, {
            period: {
              year: action.year,
              errors: validateAmountPaid(state.data.loans[action.index].payment_fields.period.year, 1, action.value)
            }
          })
        }
      }

      return {
        ...new_state,
        data: {
          ...state.data,
          loans: alterPaymentFields(new_state.data.loans, action.index, {
            allow_submit: allowLoanPaymentFieldsSubmit(new_state.data.loans[action.index].payment_fields)
          })
        }
      }
    case 'BORROWER_PROFILE_CPQ':
      new_state = {
        ...state,
        data: {
          ...state.data,
          loans: alterPaymentFields(state.data.loans, action.index, {
            period: {
              quarter: action.quarter
            }
          })
        }
      }

      return {
        ...new_state,
        data: {
          ...state.data,
          loans: alterPaymentFields(new_state.data.loans, action.index, {
            allow_submit: allowLoanPaymentFieldsSubmit(new_state.data.loans[action.index].payment_fields)
          })
        }
      }
    case 'BORROWER_PROFILE_CAP':
      new_state = {
        ...state,
        data: {
          ...state.data,
          loans: alterPaymentFields(state.data.loans, action.index, {
            amount: {
              value: action.value,
              errors: validateAmountPaid(action.value)
            }
          })
        }
      }

      return {
        ...new_state,
        data: {
          ...new_state.data,
          loans: alterPaymentFields(new_state.data.loans, action.index, {
            allow_submit: allowLoanPaymentFieldsSubmit(new_state.data.loans[action.index].payment_fields)
          })
        }
      }
    case 'BORROWER_PROFILE_CPT':
      new_state = {
        ...state,
        data: {
          ...state.data,
          loans: alterPaymentFields(state.data.loans, action.index, {
            amount: {
              type: action.payment_type,
              errors: validatePaymentType(action.payment_type)
            }
          })
        }
      }

      return {
        ...new_state,
        data: {
          ...new_state.data,
          loans: alterPaymentFields(new_state.data.loans, action.index, {
            allow_submit: allowLoanPaymentFieldsSubmit(new_state.data.loans[action.index].payment_fields)
          })
        }
      }
    case 'BORROWER_PROFILE_CPDM':
      new_state = {
        ...state,
        data: {
          ...state.data,
          loans: alterPaymentFields(state.data.loans, action.index, {
            date_paid: {
              month: action.value,
              date: 1
            }
          })
        }
      }

      return {
        ...new_state,
        data: {
          ...new_state.data,
          loans: alterPaymentFields(new_state.data.loans, action.index, {
            allow_submit: allowLoanPaymentFieldsSubmit(new_state.data.loans[action.index].payment_fields)
          })
        }
      }
    case 'BORROWER_PROFILE_CPDD':
      new_state = {
        ...state,
        data: {
          ...state.data,
          loans: alterPaymentFields(state.data.loans, action.index, {
            date_paid: {
              date: action.value
            }
          })
        }
      }

      return {
        ...new_state,
        data: {
          ...new_state.data,
          loans: alterPaymentFields(new_state.data.loans, action.index, {
            allow_submit: allowLoanPaymentFieldsSubmit(new_state.data.loans[action.index].payment_fields)
          })
        }
      }
    case 'BORROWER_PROFILE_CPDY':
      new_state = {
        ...state,
        data: {
          ...state.data,
          loans: alterPaymentFields(state.data.loans, action.index, {
            date_paid: {
              year: action.value
            }
          })
        }
      }

      return {
        ...new_state,
        data: {
          ...new_state.data,
          loans: alterPaymentFields(new_state.data.loans, action.index, {
            allow_submit: allowLoanPaymentFieldsSubmit(new_state.data.loans[action.index].payment_fields)
          })
        }
      }
    case '_BORROWER_PROFILE_SEND_PAYMENT':
      new_state = {
        ...state,
        data: {
          ...state.data,
          loans: alterPaymentFields(state.data.loans, action.index, {
            backend: {
              processing: true,
              message: null,
              status: null
            }
          })
        }
      }

      return {
        ...new_state,
        data: {
          ...new_state.data,
          loans: alterPaymentFields(new_state.data.loans, action.index, {
            allow_submit: allowLoanPaymentFieldsSubmit(new_state.data.loans[action.index].payment_fields)
          })
        }
      }
    case 'BORROWER_PROFILE_SEND_PAYMENT_SUCCESSFUL':
      new_state = {
        ...state,
        data: {
          ...state.data,
          loans: alterPaymentFields(state.data.loans, action.index, {
            payment_fields: getInitialPaymentFields(state.data.loans[action.index]),
            loan_payments: state.data.loans[action.index].loan_payments.addFirst(action.payment).map(payment => getInitialPaymentEditFields(payment))
          })
        }
      }

      new_state = {
        ...new_state,
        data: {
          ...new_state.data,
          loans: alterPaymentFields(new_state.data.loans, action.index, {
            summary: getLoanSummary(new_state.data.loans[action.index])
          })
        }
      }

      return {
        ...new_state,
        data: {
          ...new_state.data,
          loans: alterPaymentFields(new_state.data.loans, action.index, {
            backend: {
              processing: false,
              message: null,
              status: 'successful'
            }
          })
        }
      }
    case 'BORROWER_PROFILE_SEND_PAYMENT_FAILED':
      return {
        ...state,
        data: {
          ...state.data,
          loans: alterPaymentFields(state.data.loans, action.index, {
            payment_fields: getInitialPaymentFields(state.data.loans[action.index]),
            backend: {
              status: 'failed',
              processing: false,
              message: action.message
            }
          })
        }
      }
    case 'BORROWER_PROFILE_EPI':
      if(!action.visibility) {
        return {
          ...state,
          data: {
            ...state.data,
            loans: state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
              ...loan,
              loan_payments: loan.loan_payments.map((payment, payment_index) => payment_index == action.payment_index? getInitialPaymentEditFields(payment): ({...payment}))
            }): ({...loan}))
          }
        }
      }

      return {
        ...state,
        data: {
          ...state.data,
          loans: state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            loan_payments: alterPaymentEditFields(loan.loan_payments, action.payment_index, {
              shown: true
            })
          }): ({...loan}))
        }
      }
    case 'BORROWER_PROFILE_EPIA':
      new_state = {
        ...state,
        data: {
          ...state.data,
          loans: state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            loan_payments: alterPaymentEditFields(loan.loan_payments, action.payment_index, {
              amount: {
                value: action.value,
                errors: validateAmountPaid(action.value)
              }
            })
          }): ({...loan}))
        }
      }

      return {
        ...new_state,
        data: {
          ...new_state.data,
          loans: new_state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            loan_payments: alterPaymentEditFields(loan.loan_payments, action.payment_index, {
              allow_submit: allowPaymentsEditFieldsSubmit(loan.loan_payments.filter((payment, payment_index) => payment_index == action.payment_index)[0].edit)
            })
          }): ({...loan}))
        }
      }
    case 'BORROWER_PROFILE_EPIPY':
      new_state = {
        ...state,
        data: {
          ...state.data,
          loans: state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            loan_payments: alterPaymentEditFields(loan.loan_payments, action.payment_index, {
              period: {
                year: action.value
              }
            })
          }): ({...loan}))
        }
      }

      return {
        ...new_state,
        data: {
          ...new_state.data,
          loans: new_state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            loan_payments: alterPaymentEditFields(loan.loan_payments, action.payment_index, {
              allow_submit: allowPaymentsEditFieldsSubmit(loan.loan_payments.filter((payment, payment_index) => payment_index == action.payment_index)[0].edit)
            })
          }): ({...loan}))
        }
      }
    case 'BORROWER_PROFILE_EPIPM':
      new_state = {
        ...state,
        data: {
          ...state.data,
          loans: state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            loan_payments: alterPaymentEditFields(loan.loan_payments, action.payment_index, {
              period: {
                month: action.value,
                date: 1
              }
            })
          }): ({...loan}))
        }
      }

      return {
        ...new_state,
        data: {
          ...new_state.data,
          loans: new_state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            loan_payments: alterPaymentEditFields(loan.loan_payments, action.payment_index, {
              allow_submit: allowPaymentsEditFieldsSubmit(loan.loan_payments.filter((payment, payment_index) => payment_index == action.payment_index)[0].edit)
            })
          }): ({...loan}))
        }
      }
    case 'BORROWER_PROFILE_EPIPT':
      new_state = {
        ...state,
        data: {
          ...state.data,
          loans: state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            loan_payments: alterPaymentEditFields(loan.loan_payments, action.payment_index, {
              amount: {
                type: action.value
              }
            })
          }): ({...loan}))
        }
      }

      return {
        ...new_state,
        data: {
          ...new_state.data,
          loans: new_state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            loan_payments: alterPaymentEditFields(loan.loan_payments, action.payment_index, {
              allow_submit: allowPaymentsEditFieldsSubmit(loan.loan_payments.filter((payment, payment_index) => payment_index == action.payment_index)[0].edit)
            })
          }): ({...loan}))
        }
      }
    case 'BORROWER_PROFILE_EPIPDY':
      new_state = {
        ...state,
        data: {
          ...state.data,
          loans: state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            loan_payments: alterPaymentEditFields(loan.loan_payments, action.payment_index, {
              date_paid: {
                year: action.value
              }
            })
          }): ({...loan}))
        }
      }

      return {
        ...new_state,
        data: {
          ...new_state.data,
          loans: new_state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            loan_payments: alterPaymentEditFields(loan.loan_payments, action.payment_index, {
              allow_submit: allowPaymentsEditFieldsSubmit(loan.loan_payments.filter((payment, payment_index) => payment_index == action.payment_index)[0].edit)
            })
          }): ({...loan}))
        }
      }
    case 'BORROWER_PROFILE_EPIPDD':
      new_state = {
        ...state,
        data: {
          ...state.data,
          loans: state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            loan_payments: alterPaymentEditFields(loan.loan_payments, action.payment_index, {
              date_paid: {
                date: action.value
              }
            })
          }): ({...loan}))
        }
      }

      return {
        ...new_state,
        data: {
          ...new_state.data,
          loans: new_state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            loan_payments: alterPaymentEditFields(loan.loan_payments, action.payment_index, {
              allow_submit: allowPaymentsEditFieldsSubmit(loan.loan_payments.filter((payment, payment_index) => payment_index == action.payment_index)[0].edit)
            })
          }): ({...loan}))
        }
      }
    case 'BORROWER_PROFILE_EPIPDM':
      new_state = {
        ...state,
        data: {
          ...state.data,
          loans: state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            loan_payments: alterPaymentEditFields(loan.loan_payments, action.payment_index, {
              date_paid: {
                month: action.value
              }
            })
          }): ({...loan}))
        }
      }

      return {
        ...new_state,
        data: {
          ...new_state.data,
          loans: new_state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            loan_payments: alterPaymentEditFields(loan.loan_payments, action.payment_index, {
              allow_submit: allowPaymentsEditFieldsSubmit(loan.loan_payments.filter((payment, payment_index) => payment_index == action.payment_index)[0].edit)
            })
          }): ({...loan}))
        }
      }
    case '_BORROWER_PROFILE_EPI_SEND':
      return {
        ...state,
        data: {
          ...state.data,
          loans: state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            loan_payments: alterPaymentEditFields(loan.loan_payments, action.payment_index, {
              backend: {
                processing: true,
                message: null,
                status: null
              }
            })
          }): ({...loan}))
        }
      }
    case 'BORROWER_PROFILE_EPI_SEND_SUCCESSFUL':
      new_state = {
        ...state,
        data: {
          ...state.data,
          loans: state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            loan_payments: alterPaymentEditFields(loan.loan_payments.map((payment, payment_index) => payment_index == action.payment_index? getInitialPaymentEditFields(action.data) : ({...payment})), action.payment_index, {
              backend: {
                status: 'successful',
                processing: false,
                message: null
              }
            })
          }): ({...loan}))
        }
      }

      new_state = {
        ...new_state,
        data: {
          ...new_state.data,
          loans: new_state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            summary: getLoanSummary(loan)
          }): ({...loan}))
        }
      }

      return {...new_state}
    case 'BORROWER_PROFILE_EPI_SEND_FAILED':
      return {
        ...state,
        data: {
          ...state.data,
          loans: state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            loan_payments: alterPaymentEditFields(loan.loan_payments, action.payment_index, {
              backend: {
                processing: false,
                status: 'failed',
                message: action.message
              }
            })
          }): ({...loan}))
        }
      }
    case 'BORROWER_PROFILE_ELIT':
      if(!action.visibility) {
        return {
          ...state,
          data: {
            ...state.data,
            loans: state.data.loans.map(loan => ({
              ...loan,
              edit: getInitialLoanEditFields(loan)
            }))
          }
        }
      }

      return {
        ...state,
        data: {
          ...state.data,
          loans: alterLoanEditFields(state.data.loans, action.loan_index, {
            shown: action.visibility
          })
        }
      }
    case 'BORROWER_PROFILE_ELIA':
      new_state = {
        ...state,
        data: {
          ...state.data,
          loans: alterLoanEditFields(state.data.loans, action.loan_index, {
            amount_loan: {
              value: action.value,
              errors: validateAmountLoan(action.value)
            }
          })
        }
      }

      return {
        ...new_state,
        data: {
          ...new_state.data,
          loans: alterLoanEditFields(new_state.data.loans, action.loan_index, {
            allow_submit: allowLoanEditSubmit(new_state.data.loans[action.loan_index].edit)
          })
        }
      }
    case 'BORROWER_PROFILE_ELIC':
      new_state = {
        ...state,
        data: {
          ...state.data,
          loans: alterLoanEditFields(state.data.loans, action.loan_index, {
            amount_loan: {
              condition: action.value
            }
          })
        }
      }

      return {
        ...new_state,
        data: {
          ...new_state.data,
          loans: alterLoanEditFields(new_state.data.loans, action.loan_index, {
            allow_submit: allowLoanEditSubmit(new_state.data.loans[action.loan_index].edit)
          })
        }
      }
    case 'BORROWER_PROFILE_ELIIR':
      new_state = {
        ...state,
        data: {
          ...state.data,
          loans: alterLoanEditFields(state.data.loans, action.loan_index, {
            interest_rate: {
              value: action.value,
              errors: validateInterestRate(action.value)
            }
          })
        }
      }

      return {
        ...new_state,
        data: {
          ...new_state.data,
          loans: alterLoanEditFields(new_state.data.loans, action.loan_index, {
            allow_submit: allowLoanEditSubmit(new_state.data.loans[action.loan_index].edit)
          })
        }
      }
    case 'BORROWER_PROFILE_ELIIT':
      new_state = {
        ...state,
        data: {
          ...state.data,
          loans: alterLoanEditFields(state.data.loans, action.loan_index, {
            interest_rate: {
              type: action.value
            }
          })
        }
      }

      return {
        ...new_state,
        data: {
          ...new_state.data,
          loans: alterLoanEditFields(new_state.data.loans, action.loan_index, {
            allow_submit: allowLoanEditSubmit(new_state.data.loans[action.loan_index].edit)
          })
        }
      }
    case 'BORROWER_PROFILE_ELIMTP':
      new_state = {
        ...state,
        data: {
          ...state.data,
          loans: alterLoanEditFields(state.data.loans, action.loan_index, {
            months_to_pay: {
              value: action.value,
              errors: validateMonthsToPay(action.value)
            }
          })
        }
      }

      return {
        ...new_state,
        data: {
          ...new_state.data,
          loans: alterLoanEditFields(new_state.data.loans, action.loan_index, {
            allow_submit: allowLoanEditSubmit(new_state.data.loans[action.loan_index].edit)
          })
        }
      }
    case 'BORROWER_PROFILE_ELIDLM':
      new_state = {
        ...state,
        data: {
          ...state.data,
          loans: alterLoanEditFields(state.data.loans, action.loan_index, {
            loan_date: {
              month: action.value,
              date: 1,
              errors: validateLoanDate(action.value, state.data.loans[action.loan_index].edit.loan_date.date, state.data.loans[action.loan_index].edit.loan_date.year)
            }
          })
        }
      }

      return {
        ...new_state,
        data: {
          ...new_state.data,
          loans: alterLoanEditFields(new_state.data.loans, action.loan_index, {
            allow_submit: allowLoanEditSubmit(new_state.data.loans[action.loan_index].edit)
          })
        }
      }
    case 'BORROWER_PROFILE_ELIDLD':
      new_state = {
        ...state,
        data: {
          ...state.data,
          loans: alterLoanEditFields(state.data.loans, action.loan_index, {
            loan_date: {
              date: action.value,
              errors: validateLoanDate(state.data.loans[action.loan_index].edit.loan_date.month, action.value, state.data.loans[action.loan_index].edit.loan_date.year)
            }
          })
        }
      }

      return {
        ...new_state,
        data: {
          ...new_state.data,
          loans: alterLoanEditFields(new_state.data.loans, action.loan_index, {
            allow_submit: allowLoanEditSubmit(new_state.data.loans[action.loan_index].edit)
          })
        }
      }
    case 'BORROWER_PROFILE_ELIDY':
      new_state = {
        ...state,
        data: {
          ...state.data,
          loans: alterLoanEditFields(state.data.loans, action.loan_index, {
            loan_date: {
              year: action.value,
              errors: validateLoanDate(state.data.loans[action.loan_index].edit.loan_date.month, state.data.loans[action.loan_index].edit.loan_date.date, action.value)
            }
          })
        }
      }

      return {
        ...new_state,
        data: {
          ...new_state.data,
          loans: alterLoanEditFields(new_state.data.loans, action.loan_index, {
            allow_submit: allowLoanEditSubmit(new_state.data.loans[action.loan_index].edit)
          })
        }
      }
    case 'BORROWER_PROFILE_ELIPM':
      new_state = {
        ...state,
        data: {
          ...state.data,
          loans: alterLoanEditFields(state.data.loans, action.loan_index, {
            payment_method: {
              value: action.value,
              errors: validatePaymentMethod(action.value)
            }
          })
        }
      }

      return {
        ...new_state,
        data: {
          ...new_state.data,
          loans: alterLoanEditFields(new_state.data.loans, action.loan_index, {
            allow_submit: allowLoanEditSubmit(new_state.data.loans[action.loan_index].edit)
          })
        }
      }
    case '_BORROWER_PROFILE_ELI_SEND':
      return {
        ...state,
        data: {
          ...state.data,
          loans: alterLoanEditFields(state.data.loans, action.loan_index, {
            backend: {
              processing: true,
              message: null,
              status: null
            }
          })
        }
      }
    case 'BORROWER_PROFILE_ELI_SEND_SUCCESSFUL':
      new_state = {
        ...state,
        data: {
          ...state.data,
          loans: state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            ...action.data,
            summary: getLoanSummary({...action.data}),
            edit: getInitialLoanEditFields(action.data)
          }) : {...loans})
        }
      }

      return {
        ...new_state,
        data: {
          ...new_state.data,
          loans: alterLoanEditFields(new_state.data.loans, action.loan_index, {
            backend: {
              processing: false,
              message: null,
              status: 'successful'
            }
          })
        }
      }
    case 'BORROWER_PROFILE_ELI_SEND_FAILED':
      return {
        ...state,
        data: {
          ...state.data,
          loans: alterLoanEditFields(state.data.loans, action.loan_index, {
            backend: {
              processing: false,
              message: action.message,
              status: 'failed'
            }
          })
        }
      }
    case 'BORROWER_PROFILE_PENALTYFIELD_TOGGLE':
      if(!action.visibility) {
        return {
          ...state,
          data: {
            ...state.data,
            loans: state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
              ...loan,
              penalty_fields: getInitialPenaltyFields()
            }) : {...loan})
          }
        }
      }

      return {
        ...state,
        data: {
          ...state.data,
          loans: alterPenaltyFields(state.data.loans, action.loan_index, {
            shown: true
          })
        }
      }
    case 'BORROWER_PROFILE_PENALTYFIELD_AMOUNT':
      new_state = {
        ...state,
        data: {
          ...state.data,
          loans: alterPenaltyFields(state.data.loans, action.loan_index, {
            amount: {
              value: action.value,
              errors: validateAmount(action.value)
            }
          })
        }
      }

      return {
        ...new_state,
        data: {
          ...new_state.data,
          loans: alterPenaltyFields(new_state.data.loans, action.loan_index, {
            allow_submit: allowPenaltyFormSubmit(new_state.data.loans[action.loan_index].penalty_fields)
          })
        }
      }
    case 'BORROWER_PROFILE_PENALTYFIELD_REMARKS':
      new_state = {
        ...state,
        data: {
          ...state.data,
          loans: alterPenaltyFields(state.data.loans, action.loan_index, {
            remarks: {
              value: action.value,
              errors: validateRemarks(action.value)
            }
          })
        }
      }

      return {
        ...new_state,
        data: {
          ...new_state.data,
          loans: alterPenaltyFields(new_state.data.loans, action.loan_index, {
            allow_submit: allowPenaltyFormSubmit(new_state.data.loans[action.loan_index].penalty_fields)
          })
        }
      }
    case 'BORROWER_PROFILE_PENALTYFIELD_DATE':
      new_state = {
        ...state,
        data: {
          ...state.data,
          loans: alterPenaltyFields(state.data.loans, action.loan_index, {
            date_given: {
              date: action.value
            }
          })
        }
      }

      return {
        ...new_state,
        data: {
          ...new_state.data,
          loans: alterPenaltyFields(new_state.data.loans, action.loan_index, {
            allow_submit: allowPenaltyFormSubmit(new_state.data.loans[action.loan_index].penalty_fields)
          })
        }
      }
    case 'BORROWER_PROFILE_PENALTYFIELD_MONTH':
      new_state = {
        ...state,
        data: {
          ...state.data,
          loans: alterPenaltyFields(state.data.loans, action.loan_index, {
            date_given: {
              month

              : action.value
            }
          })
        }
      }

      return {
        ...new_state,
        data: {
          ...new_state.data,
          loans: alterPenaltyFields(new_state.data.loans, action.loan_index, {
            allow_submit: allowPenaltyFormSubmit(new_state.data.loans[action.loan_index].penalty_fields)
          })
        }
      }
    case 'BORROWER_PROFILE_PENALTYFIELD_YEAR':
      new_state = {
        ...state,
        data: {
          ...state.data,
          loans: alterPenaltyFields(state.data.loans, action.loan_index, {
            date_given: {
              year: action.value
            }
          })
        }
      }

      return {
        ...new_state,
        data: {
          ...new_state.data,
          loans: alterPenaltyFields(new_state.data.loans, action.loan_index, {
            allow_submit: allowPenaltyFormSubmit(new_state.data.loans[action.loan_index].penalty_fields)
          })
        }
      }
    case '_BORROWER_PROFILE_PENALTYFIELD_CREATE':
      return {
        ...state,
        data: {
          ...state.data,
          loans: alterPenaltyFields(state.data.loans, action.loan_index, {
            backend: {
              status: null,
              message: null,
              processing: true
            }
          })
        }
      }
    case 'BORROWER_PROFILE_PENALTYFIELD_CREATE_SUCCESSFUL':
      new_state = {
        ...state,
        data: {
          ...state.data,
          loans: state.data.loans.map((loan, loan_index) => action.loan_index == loan_index? ({
            ...loan,
            penalty_fields: getInitialPenaltyFields(),
            penalties: loan.penalties.addFirst(action.data).map((penalty, penalty_index) => penalty_index == 0? ({
              ...penalty,
              edit: getInitialPenaltyEditFields(penalty),
              summary: getPenaltySummary(penalty),
              penalty_payment_fields: getInitialPenaltyPaymentFields(),
              penalty_payments: []
            }): {...penalty})
          }): {...loan})
        }
      }

      return {
        ...new_state,
        data: {
          ...new_state.data,
          loans: alterPenaltyFields(new_state.data.loans, action.loan_index, {
            backend: {
              status: 'successful',
              message: null,
              processing: false
            }
          })
        }
      }
    case 'BORROWER_PROFILE_PENALTYFIELD_CREATE_FAILED':
      return {
        ...state,
        data: {
          ...state.data,
          loans: alterPenaltyFields(state.data.loans, action.loan_index, {
            backend: {
              status: 'failed',
              message: action.message,
              processing: false
            }
          })
        }
      }
    case 'BORROWER_PROFILE_PENALTYPAYMENTFORM_TOGGLE':
      if(!action.visibility) {
        return {
          ...state,
          data: {
            ...state.data,
            loans: state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
              ...loan,
              penalties: loan.penalties.map((penalty, penalty_index) => penalty_index == action.penalty_index? ({
                ...penalty,
                penalty_payment_fields: getInitialPenaltyPaymentFields()
              }): {...penalty})
            }): {...loan})
          }
        }
      }

      return {
        ...state,
        data: {
          ...state.data,
          loans: state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            penalties: alterPenaltyPaymentFields(loan.penalties, action.penalty_index, {
              shown: true
            })
          }): {...loan})
        }
      }
    case 'BORROWER_PROFILE_PENALTYPAYMENTFORM_AMOUNT':
      new_state = {
        ...state,
        data: {
          ...state.data,
          loans: state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            penalties: alterPenaltyPaymentFields(loan.penalties, action.penalty_index, {
              amount: {
                value: action.value
              }
            })
          }): {...loan})
        }
      }

      return {
        ...new_state,
        data: {
          ...new_state.data,
          loans: new_state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            penalties: alterPenaltyPaymentFields(loan.penalties, action.penalty_index, {
              allow_submit: allowPenaltyPaymentFormSubmit(loan.penalties[action.penalty_index].penalty_payment_fields)
            })
          }): {...loan})
        }
      }
    case 'BORROWER_PROFILE_PENALTYPAYMENTFORM_MONTH':
      new_state = {
        ...state,
        data: {
          ...state.data,
          loans: state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            penalties: alterPenaltyPaymentFields(loan.penalties, action.penalty_index, {
              date_paid: {
                month: action.value
              }
            })
          }): {...loan})
        }
      }

      return {
        ...new_state,
        data: {
          ...new_state.data,
          loans: new_state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            penalties: alterPenaltyPaymentFields(loan.penalties, action.penalty_index, {
              allow_submit: allowPenaltyPaymentFormSubmit(loan.penalties[action.penalty_index].penalty_payment_fields)
            })
          }): {...loan})
        }
      }
    case 'BORROWER_PROFILE_PENALTYPAYMENTFORM_DATE':
      new_state = {
        ...state,
        data: {
          ...state.data,
          loans: state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            penalties: alterPenaltyPaymentFields(loan.penalties, action.penalty_index, {
              date_paid: {
                date: action.value
              }
            })
          }): {...loan})
        }
      }

      return {
        ...new_state,
        data: {
          ...new_state.data,
          loans: new_state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            penalties: alterPenaltyPaymentFields(loan.penalties, action.penalty_index, {
              allow_submit: allowPenaltyPaymentFormSubmit(loan.penalties[action.penalty_index].penalty_payment_fields)
            })
          }): {...loan})
        }
      }
    case 'BORROWER_PROFILE_PENALTYPAYMENTFORM_YEAR':
      new_state = {
        ...state,
        data: {
          ...state.data,
          loans: state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            penalties: alterPenaltyPaymentFields(loan.penalties, action.penalty_index, {
              date_paid: {
                year: action.value
              }
            })
          }): {...loan})
        }
      }

      return {
        ...new_state,
        data: {
          ...new_state.data,
          loans: new_state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            penalties: alterPenaltyPaymentFields(loan.penalties, action.penalty_index, {
              allow_submit: allowPenaltyPaymentFormSubmit(loan.penalties[action.penalty_index].penalty_payment_fields)
            })
          }): {...loan})
        }
      }
    case '_BORROWER_PROFILE_PENALTYPAYMENTFORM_CREATE':
      return {
        ...state,
        data: {
          ...state.data,
          loans: state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            penalties: alterPenaltyPaymentFields(loan.penalties, action.penalty_index, {
              backend: {
                processing: true,
                status: null,
                message: null
              }
            })
          }): {...loan})
        }
      }
    case 'BORROWER_PROFILE_PENALTYPAYMENTFORM_CREATE_SUCCESSFUL':
      new_state = {
        ...state,
        data: {
          ...state.data,
          loans: state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            penalties: loan.penalties.map((penalty, penalty_index) => penalty_index == action.penalty_index? ({
              ...penalty,
              penalty_payment_fields: getInitialPenaltyPaymentFields(),
              penalty_payments: penalty.penalty_payments.addFirst(action.data)
            }) : {...penalty})
          }): {...loan})
        }
      }

      new_state = {
        ...new_state,
        data: {
          ...new_state.data,
          loans: new_state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            penalties: loan.penalties.map((penalty, penalty_index) => penalty_index == action.penalty_index? ({
              ...penalty,
              summary: getPenaltySummary(penalty),
              penalty_payments: getInitialPenaltyPaymentEditFields(penalty.penalty_payments)
            }) : {...penalty})
          }): {...loan})
        }
      }

      return {
        ...new_state,
        data: {
          ...new_state.data,
          loans: new_state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            penalties: alterPenaltyPaymentFields(loan.penalties, action.penalty_index, {
              backend: {
                processing: false,
                status: 'successful',
                message: null
              }
            })
          }): {...loan})
        }
      }
    case 'BORROWER_PROFILE_PENALTYPAYMENTFORM_CREATE_FAILED':
      return {
        ...state,
        data: {
          ...state.data,
          loans: state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            penalties: alterPenaltyPaymentFields(loan.penalties, action.penalty_index, {
              backend: {
                processing: false,
                status: 'failed',
                message: action.message
              }
            })
          }): {...loan})
        }
      }
    case 'BORROWER_PROFILE_EDITPENALTYFORM_TOGGLE':
      if(!action.visibility) {
        return {
          ...state,
          data: {
            ...state.data,
            loans: state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
              ...loan,
              penalties: loan.penalties.map((penalty, penalty_index) => penalty_index == action.penalty_index? ({
                ...penalty,
                edit: getInitialPenaltyEditFields(penalty)
              }) : {...penalty})
            }) : {...loan})
          }
        }
      }

      return {
        ...state,
        data: {
          ...state.data,
          loans: state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            penalties: alterPenaltyEditFields(loan.penalties, action.penalty_index, {
              shown: true
            })
          }) : {...loan})
        }
      }
    case 'BORROWER_PROFILE_EDITPENALTYFORM_AMOUNT':
      new_state = {
        ...state,
        data: {
          ...state.data,
          loans: state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            penalties: alterPenaltyEditFields(loan.penalties, action.penalty_index, {
              amount: {
                value: action.value,
                errors: validateAmount(action.value)
              }
            })
          }) : {...loan})
        }
      }

      return {
        ...new_state,
        data: {
          ...new_state.data,
          loans: new_state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            penalties: alterPenaltyEditFields(loan.penalties, action.penalty_index, {
              allow_submit: allowPenaltyFormSubmit(loan.penalties[action.penalty_index].edit)
            })
          }) : {...loan})
        }
      }
    case 'BORROWER_PROFILE_EDITPENALTYFORM_REMARKS':
      new_state = {
        ...state,
        data: {
          ...state.data,
          loans: state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            penalties: alterPenaltyEditFields(loan.penalties, action.penalty_index, {
              remarks: {
                value: action.value,
                errors: validateRemarks(action.value)
              }
            })
          }) : {...loan})
        }
      }

      return {
        ...new_state,
        data: {
          ...new_state.data,
          loans: new_state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            penalties: alterPenaltyEditFields(loan.penalties, action.penalty_index, {
              allow_submit: allowPenaltyFormSubmit(loan.penalties[action.penalty_index].edit)
            })
          }) : {...loan})
        }
      }
    case 'BORROWER_PROFILE_EDITPENALTYFORM_MONTH':
      new_state = {
        ...state,
        data: {
          ...state.data,
          loans: state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            penalties: alterPenaltyEditFields(loan.penalties, action.penalty_index, {
              date_given: {
                month: action.value
              }
            })
          }) : {...loan})
        }
      }

      return {
        ...new_state,
        data: {
          ...new_state.data,
          loans: new_state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            penalties: alterPenaltyEditFields(loan.penalties, action.penalty_index, {
              allow_submit: allowPenaltyFormSubmit(loan.penalties[action.penalty_index].edit)
            })
          }) : {...loan})
        }
      }
    case 'BORROWER_PROFILE_EDITPENALTYFORM_DATE':
      new_state = {
        ...state,
        data: {
          ...state.data,
          loans: state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            penalties: alterPenaltyEditFields(loan.penalties, action.penalty_index, {
              date_given: {
                date: action.value
              }
            })
          }) : {...loan})
        }
      }

      return {
        ...new_state,
        data: {
          ...new_state.data,
          loans: new_state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            penalties: alterPenaltyEditFields(loan.penalties, action.penalty_index, {
              allow_submit: allowPenaltyFormSubmit(loan.penalties[action.penalty_index].edit)
            })
          }) : {...loan})
        }
      }
    case 'BORROWER_PROFILE_EDITPENALTYFORM_YEAR':
      new_state = {
        ...state,
        data: {
          ...state.data,
          loans: state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            penalties: alterPenaltyEditFields(loan.penalties, action.penalty_index, {
              date_given: {
                year: action.value
              }
            })
          }) : {...loan})
        }
      }

      return {
        ...new_state,
        data: {
          ...new_state.data,
          loans: new_state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            penalties: alterPenaltyEditFields(loan.penalties, action.penalty_index, {
              allow_submit: allowPenaltyFormSubmit(loan.penalties[action.penalty_index].edit)
            })
          }) : {...loan})
        }
      }
    case '_BORROWER_PROFILE_EDITPENALTYFORM_SAVE':
      return {
        ...state,
        data: {
          ...state.data,
          loans: state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            penalties: alterPenaltyEditFields(loan.penalties, action.penalty_index, {
              backend: {
                status: null,
                message: null,
                processing: true
              }
            })
          }) : {...loan})
        }
      }
    case 'BORROWER_PROFILE_EDITPENALTYFORM_SAVE_SUCCESSFUL':
      new_state = {
        ...state,
        data: {
          ...state.data,
          loans: state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            penalties: loan.penalties.map((penalty, penalty_index) => penalty_index == action.penalty_index? ({
              ...penalty,
              ...action.data,
              edit: getInitialPenaltyEditFields(action.data),
              summary: getPenaltySummary({
                ...penalty,
                ...action.data
              })
            }) : {...penalty})
          }) : {...loan})
        }
      }

      return {
        ...new_state,
        data: {
          ...new_state.data,
          loans: new_state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            penalties: alterPenaltyEditFields(loan.penalties, action.penalty_index, {
              backend: {
                status: 'successful',
                message: null,
                processing: false
              }
            })
          }) : {...loan})
        }
      }
    case 'BORROWER_PROFILE_EDITPENALTYFORM_SAVE_FAILED':
      return {
        ...new_state,
        data: {
          ...new_state.data,
          loans: new_state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            penalties: alterPenaltyEditFields(loan.penalties, action.penalty_index, {
              backend: {
                status: 'failed',
                message: action.message,
                processing: false
              }
            })
          }) : {...loan})
        }
      }
    case 'BORROWER_PROFILE_EDITPENALTYPAYMENT':
      if(!action.visibility) {
        return {
          ...state,
          data: {
            ...state.data,
            loans: state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
              ...loan,
              penalties: loan.penalties.map((penalty, penalty_index) => penalty_index == action.penalty_index? ({
                ...penalty,
                penalty_payments: getInitialPenaltyPaymentEditFields(penalty.penalty_payments)
              }) : {...penalty})
            }) : {...loan})
          }
        }
      }

      return {
        ...state,
        data: {
          ...state.data,
          loans: state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            penalties: alterPenaltyPaymentEditFields(loan.penalties, action.penalty_index, action.penalty_payment_index, {
              shown: true
            })
          }) : {...loan})
        }
      }
    case 'BORROWER_PROFILE_EDITPENALTYPAYMENT_AMOUNT':
      new_state = {
        ...state,
        data: {
          ...state.data,
          loans: state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            penalties: alterPenaltyPaymentEditFields(loan.penalties, action.penalty_index, action.penalty_payment_index, {
              amount: {
                value: action.value,
                errors: validateAmount(action.value)
              }
            })
          }) : {...loan})
        }
      }

      return {
        ...new_state,
        data: {
          ...new_state.data,
          loans: new_state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            penalties: alterPenaltyPaymentEditFields(loan.penalties, action.penalty_index, action.penalty_payment_index, {
              allow_submit: allowPenaltyPaymentFormSubmit(loan.penalties[action.penalty_index].penalty_payments[action.penalty_payment_index].edit)
            })
          }) : {...loan})
        }
      }
    case 'BORROWER_PROFILE_EDITPENALTYPAYMENT_DATE':
      new_state = {
        ...state,
        data: {
          ...state.data,
          loans: state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            penalties: alterPenaltyPaymentEditFields(loan.penalties, action.penalty_index, action.penalty_payment_index, {
              date_paid: {
                date: action.value
              }
            })
          }) : {...loan})
        }
      }

      return {
        ...new_state,
        data: {
          ...new_state.data,
          loans: new_state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            penalties: alterPenaltyPaymentEditFields(loan.penalties, action.penalty_index, action.penalty_payment_index, {
              allow_submit: allowPenaltyPaymentFormSubmit(loan.penalties[action.penalty_index].penalty_payments[action.penalty_payment_index].edit)
            })
          }) : {...loan})
        }
      }
    case 'BORROWER_PROFILE_EDITPENALTYPAYMENT_MONTH':
      new_state = {
        ...state,
        data: {
          ...state.data,
          loans: state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            penalties: alterPenaltyPaymentEditFields(loan.penalties, action.penalty_index, action.penalty_payment_index, {
              date_paid: {
                month: action.value
              }
            })
          }) : {...loan})
        }
      }

      return {
        ...new_state,
        data: {
          ...new_state.data,
          loans: new_state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            penalties: alterPenaltyPaymentEditFields(loan.penalties, action.penalty_index, action.penalty_payment_index, {
              allow_submit: allowPenaltyPaymentFormSubmit(loan.penalties[action.penalty_index].penalty_payments[action.penalty_payment_index].edit)
            })
          }) : {...loan})
        }
      }
    case 'BORROWER_PROFILE_EDITPENALTYPAYMENT_YEAR':
      new_state = {
        ...state,
        data: {
          ...state.data,
          loans: state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            penalties: alterPenaltyPaymentEditFields(loan.penalties, action.penalty_index, action.penalty_payment_index, {
              date_paid: {
                year: action.value
              }
            })
          }) : {...loan})
        }
      }

      return {
        ...new_state,
        data: {
          ...new_state.data,
          loans: new_state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            penalties: alterPenaltyPaymentEditFields(loan.penalties, action.penalty_index, action.penalty_payment_index, {
              allow_submit: allowPenaltyPaymentFormSubmit(loan.penalties[action.penalty_index].penalty_payments[action.penalty_payment_index].edit)
            })
          }) : {...loan})
        }
      }
    case '_BORROWER_PROFILE_EDITPENALTYPAYMENT_SAVE':
      return {
        ...state,
        data: {
          ...state.data,
          loans: state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            penalties: alterPenaltyPaymentEditFields(loan.penalties, action.penalty_index, action.penalty_payment_index, {
              backend: {
                processing: true,
                message: null,
                status: null
              }
            })
          }) : {...loan})
        }
      }
    case 'BORROWER_PROFILE_EDITPENALTYPAYMENT_SAVE_SUCCESSFUL':
      new_state = {
        ...state,
        data: {
          ...state.data,
          loans: state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            penalties: loan.penalties.map((penalty, penalty_index) => penalty_index == action.penalty_index? ({
              ...penalty,
              penalty_payments: penalty.penalty_payments.map((penalty_payment, penalty_payment_index) => penalty_payment_index == action.penalty_payment_index? ({
                ...penalty_payment,
                ...action.data,
                edit: getInitialPenaltyPaymentEditFields(action.data)
              }) : {...penalty_payment})
            }) : {...penalty})
          }) : {...loan})
        }
      }

      new_state = {
        ...new_state,
        data: {
          ...new_state.data,
          loans: new_state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            penalties: loan.penalties.map((penalty, penalty_index) => penalty_index == action.penalty_index? ({
              ...penalty,
              summary: getPenaltySummary(penalty)
            }) : {...penalty})
          }) : {...loan})
        }
      }

      return {
        ...new_state,
        data: {
          ...new_state.data,
          loans: new_state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            penalties: alterPenaltyPaymentEditFields(loan.penalties, action.penalty_index, action.penalty_payment_index, {
              backend: {
                status: 'successful',
                message: null,
                processing: false
              }
            })
          }) : {...loan})
        }
      }
    case 'BORROWER_PROFILE_EDITPENALTYPAYMENT_SAVE_FAILED':
      return {
        ...state,
        data: {
          ...state.data,
          loans: state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            penalties: alterPenaltyPaymentEditFields(loan.penalties, action.penalty_index, action.penalty_payment_index, {
              backend: {
                status: 'failed',
                message: action.message,
                processing: false
              }
            })
          }) : {...loan})
        }
      }
    case 'BORROWER_PROFILE_HASH_PUT':
      return {
        ...state,
        hash: {
          value: action.value,
          removed: false
        }
      }
    case 'BORROWER_PROFILE_HASH_REMOVE':
      return {
        ...state,
        hash: {
          value: state.hash.value,
          removed: true
        }
      }
    case 'BORROWER_PROFILE_RESET':
      return {
        ...initial_state
      }
    default:
      return {
        ...state
      }
  }
}