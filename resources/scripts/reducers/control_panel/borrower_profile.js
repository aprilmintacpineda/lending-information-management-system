import initial_state from '../initial_states/control_panel/borrower_profile';

import { monthList } from '../../helpers/DateTime';

import {
  validateAmountPaid,
  validatePaymentType
} from '../../helpers/Validator';

function allowSubmit(fields) {
  return !fields.amount.value.length
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
    } : fields.payment_fields? {
      ...loan.payment_fields,
      ...fields.payment_fields
    } : {
      ...loan.payment_fields,
      ...fields
    }
  }) : loan );
}

function getInitialPaymentFields(loan) {
  return {
    shown: false,
    period: {
      month: loan.payments.length? monthList()[new Date(loan.payments[0].period_paid).getMonth() + 1] : monthList()[new Date(loan.loan_date).getMonth() + 1],
      year: new Date().getFullYear(),
      quarter: loan.payments.length && loan.payments[0].quarter == 'q1'? 'q2' : 'q1'
    },
    amount: {
      value: '',
      type: 'period-only',
      errors: []
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
            payment_fields: getInitialPaymentFields(loan),
            summary: getLoanSummary(loan)
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
            allow_submit: allowSubmit(new_state.data.loans[action.index].payment_fields)
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
              month: action.month
            }
          })
        }
      }

      return {
        ...new_state,
        data: {
          ...new_state.data,
          loans: alterPaymentFields(new_state.data.loans, action.index, {
            allow_submit: allowSubmit(new_state.data.loans[action.index].payment_fields)
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
              year: action.year
            }
          })
        }
      }

      return {
        ...new_state,
        data: {
          ...state.data,
          loans: alterPaymentFields(new_state.data.loans, action.index, {
            allow_submit: allowSubmit(new_state.data.loans[action.index].payment_fields)
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
            allow_submit: allowSubmit(new_state.data.loans[action.index].payment_fields)
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
              value: action.value
            }
          })
        }
      }

      return {
        ...new_state,
        data: {
          ...new_state.data,
          loans: alterPaymentFields(new_state.data.loans, action.index, {
            allow_submit: allowSubmit(new_state.data.loans[action.index].payment_fields)
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
            allow_submit: allowSubmit(new_state.data.loans[action.index].payment_fields)
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
            allow_submit: allowSubmit(new_state.data.loans[action.index].payment_fields)
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
            payments: state.data.loans[action.index].payments.addFirst(action.payment)
          })
        }
      }
    case 'BORROWER_PROFILE_SEND_PAYMENT_FAILED':
      return {
        ...state
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