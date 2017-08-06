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
  validatePhoneNumber
} from '../../helpers/Validator';

function allowLoanPaymentFieldsSubmit(fields) {
  return !fields.amount.value.toString().length
  || fields.amount.errors.length? false : true;
}

function alterPaymentFields(loans, target_index, fields) {
  return loans.map((loan, index) => index == target_index? ({
    ...loan,
    payments: fields.payments? fields.payments : loan.payments,
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
      month: loan.payments.length? monthList()[new Date(loan.payments[0].period_paid).getMonth() + 1] : monthList()[new Date(loan.loan_date).getMonth() + 1],
      year: new Date().getFullYear(),
      quarter: loan.payment_method != 2? null : loan.payments[0].quarter == 'q1'? 'q2' : 'q1'
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
  let total_amount_paid = loan.payments.sum('amount');
  let payable_balance = Number(loan.amount) + Number(loan.profit) - total_amount_paid;

  return {
    total_amount_paid,
    payable_balance,
    months_left: payable_balance / loan.per_month
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

function alterPaymentEditFields(payments, target_index, fields) {
  return payments.map((payment, index) => target_index == index? ({
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
  return fields.amount.value.length
    && !fields.amount.errors.length
    && fields.remarks.value.length
    && !fields.remarks.errors.length? true: false;
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
            summary: getLoanSummary(loan),
            payments: loan.payments.map(payment => getInitialPaymentEditFields(payment))
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
      return {
        ...state,
        data: {
          ...state.data,
          loans: alterPaymentFields(state.data.loans, action.index, {
            payment_fields: getInitialPaymentFields(state.data.loans[action.index]),
            payments: state.data.loans[action.index].payments.addFirst(action.payment).map(payment => getInitialPaymentEditFields(payment))
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
              payments: loan.payments.map((payment, payment_index) => payment_index == action.payment_index? getInitialPaymentEditFields(payment): ({...payment}))
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
            payments: alterPaymentEditFields(loan.payments, action.payment_index, {
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
            payments: alterPaymentEditFields(loan.payments, action.payment_index, {
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
            payments: alterPaymentEditFields(loan.payments, action.payment_index, {
              allow_submit: allowPaymentsEditFieldsSubmit(loan.payments.filter((payment, payment_index) => payment_index == action.payment_index)[0].edit)
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
            payments: alterPaymentEditFields(loan.payments, action.payment_index, {
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
            payments: alterPaymentEditFields(loan.payments, action.payment_index, {
              allow_submit: allowPaymentsEditFieldsSubmit(loan.payments.filter((payment, payment_index) => payment_index == action.payment_index)[0].edit)
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
            payments: alterPaymentEditFields(loan.payments, action.payment_index, {
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
            payments: alterPaymentEditFields(loan.payments, action.payment_index, {
              allow_submit: allowPaymentsEditFieldsSubmit(loan.payments.filter((payment, payment_index) => payment_index == action.payment_index)[0].edit)
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
            payments: alterPaymentEditFields(loan.payments, action.payment_index, {
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
            payments: alterPaymentEditFields(loan.payments, action.payment_index, {
              allow_submit: allowPaymentsEditFieldsSubmit(loan.payments.filter((payment, payment_index) => payment_index == action.payment_index)[0].edit)
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
            payments: alterPaymentEditFields(loan.payments, action.payment_index, {
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
            payments: alterPaymentEditFields(loan.payments, action.payment_index, {
              allow_submit: allowPaymentsEditFieldsSubmit(loan.payments.filter((payment, payment_index) => payment_index == action.payment_index)[0].edit)
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
            payments: alterPaymentEditFields(loan.payments, action.payment_index, {
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
            payments: alterPaymentEditFields(loan.payments, action.payment_index, {
              allow_submit: allowPaymentsEditFieldsSubmit(loan.payments.filter((payment, payment_index) => payment_index == action.payment_index)[0].edit)
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
            payments: alterPaymentEditFields(loan.payments, action.payment_index, {
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
            payments: alterPaymentEditFields(loan.payments, action.payment_index, {
              allow_submit: allowPaymentsEditFieldsSubmit(loan.payments.filter((payment, payment_index) => payment_index == action.payment_index)[0].edit)
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
            payments: alterPaymentEditFields(loan.payments, action.payment_index, {
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
            payments: alterPaymentEditFields(loan.payments.map((payment, payment_index) => payment_index == action.payment_index? getInitialPaymentEditFields(action.data) : ({...payment})), action.payment_index, {
              backend: {
                status: 'successful'
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
            payments: alterPaymentEditFields(loan.payments, action.payment_index, {
              shown: true
            })
          }): ({...loan}))
        }
      }
    case 'BORROWER_PROFILE_EPI_SEND_FAILED':
      return {
        ...state,
        data: {
          ...state.data,
          loans: state.data.loans.map((loan, loan_index) => loan_index == action.loan_index? ({
            ...loan,
            payments: alterPaymentEditFields(loan.payments, action.payment_index, {
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
    case 'BORROWER_PROFILE_RESET':
      return {
        ...initial_state
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
              value: action.value
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
              value: action.value
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
    default:
      return {
        ...state
      }
  }
}