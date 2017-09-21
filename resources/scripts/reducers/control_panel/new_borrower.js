import initial_state from '../initial_states/control_panel/new_borrower';

import * as calculator from '../../helpers/Calculator';

import {
  validateName,
  validateGender,
  validateAmountLoan,
  validateMonthsToPay,
  validateInterestRate,
  validateLoanDate,
  validatePaymentMethod,
  validatePhoneNumber,
  validateAddress
} from '../../helpers/Validator';

function allowSubmit(new_state) {
  if(new_state.amount_loan.condition == 'due-date-only') {
    return new_state.backend.processing
      || !new_state.address.value.length
      || new_state.address.errors.length
      || !new_state.firstname.value.length
      || new_state.firstname.errors.length
      || !new_state.middlename.value.length
      || new_state.middlename.errors.length
      || !new_state.surname.value.length
      || new_state.surname.errors.length
      || !new_state.amount_loan.value.length
      || new_state.amount_loan.errors.length
      || new_state.gender.errors.length
      || new_state.loan_date.errors.length
      || ((!new_state.months_to_pay.value.length && new_state.months_to_pay.errors.length) || new_state.payment_method == 4)? false : true;
  } else if(new_state.amount_loan.condition == 'interest-only') {
    return new_state.backend.processing
      || !new_state.address.value.length
      || new_state.address.errors.length
      || !new_state.firstname.value.length
      || new_state.firstname.errors.length
      || !new_state.middlename.value.length
      || new_state.middlename.errors.length
      || !new_state.surname.value.length
      || new_state.surname.errors.length
      || !new_state.amount_loan.value.length
      || new_state.amount_loan.errors.length
      || new_state.gender.errors.length
      || new_state.loan_date.errors.length
      || !new_state.interest_rate.value.length
      || new_state.interest_rate.errors.length? false : true;
  } else if(new_state.amount_loan.condition == 'no-due-date-and-interest') {
    return new_state.backend.processing
      || !new_state.address.value.length
      || new_state.address.errors.length
      || !new_state.firstname.value.length
      || new_state.firstname.errors.length
      || !new_state.middlename.value.length
      || new_state.middlename.errors.length
      || !new_state.surname.value.length
      || new_state.surname.errors.length
      || !new_state.amount_loan.value.length
      || new_state.amount_loan.errors.length
      || new_state.gender.errors.length
      || new_state.loan_date.errors.length? false : true;
  }

  return new_state.backend.processing
    || !new_state.address.value.length
    || new_state.address.errors.length
    || !new_state.firstname.value.length
    || new_state.firstname.errors.length
    || !new_state.middlename.value.length
    || new_state.middlename.errors.length
    || !new_state.surname.value.length
    || new_state.surname.errors.length
    || !new_state.amount_loan.value.length
    || new_state.amount_loan.errors.length
    || new_state.gender.errors.length
    || new_state.loan_date.errors.length
    || !new_state.interest_rate.value.length
    || new_state.interest_rate.errors.length
    || ((!new_state.months_to_pay.value.length && new_state.months_to_pay.errors.length) || new_state.payment_method == 4)? false : true;
}

function calculatedValues(new_state) {
  let computed_interest = 0;
  let computed_profit = 0;
  let monthly = 0;
  let semi_monthly = 0;
  let daily = 0;
  let interest_percentage = 0;

  if(new_state.amount_loan.condition == 'interest-only'
  && new_state.amount_loan.value.length
  && !new_state.amount_loan.errors.length) {
    /**
      * applying of interest only
      * will compute and add the interest
      * but will not compute for a monthly payment
     */
    interest_percentage = calculator.computeInterestPercentage(new_state.interest_rate.value, new_state.interest_rate.type);
    computed_interest = calculator.computeInterest(new_state.amount_loan.value, interest_percentage, new_state.interest_rate.type, new_state.interest_rate.value);
    
    if(new_state.payment_method == 4) {
      computed_profit = computed_interest;
    } else {
      computed_profit = calculator.computeProfit(computed_interest, new_state.months_to_pay.value);
    }

  } else if(new_state.amount_loan.condition == 'due-date-only'
  && new_state.amount_loan.value.length
  && ((new_state.months_to_pay.value.length && !new_state.months_to_pay.errors.length)
    || (new_state.payment_method.value == 4))
  && !new_state.amount_loan.errors.length) {
    /**
     * applying of due date only
     * will compute the monthly, half monthly and daily payment
     * but will not compute for the interest
     */
    
    if(new_state.payment_method.value != 4) {
      monthly = calculator.computePerMonth(new_state.amount_loan.condition, new_state.amount_loan.value, new_state.months_to_pay.value, computed_profit);
      semi_monthly = calculator.computePerHalfMonth(monthly);
      daily = calculator.computePerDay(monthly);
    }
  } else if(new_state.amount_loan.condition == 'due-date-and-interest'
  && new_state.amount_loan.value.length
  && !new_state.amount_loan.errors.length
  && ((new_state.months_to_pay.value.length && !new_state.months_to_pay.errors.length)
    || (new_state.payment_method.value == 4))
  && new_state.interest_rate.value.length
  && !new_state.interest_rate.errors.length) {
    /**
     * apply due date and interest
     * will compute for the monthly, half monthly and daily payments
     * will compute for the interest
     */
    
    interest_percentage = calculator.computeInterestPercentage(new_state.interest_rate.value, new_state.interest_rate.type);
    computed_interest = calculator.computeInterest(new_state.amount_loan.value, interest_percentage, new_state.interest_rate.type, new_state.interest_rate.value);

    if(new_state.payment_method.value == 4) {
      computed_profit = calculator.computeProfit(interest_percentage, new_state.amount_loan.value);
    } else {
      computed_profit = calculator.computeProfit(computed_interest, new_state.months_to_pay.value);
      monthly = calculator.computePerMonth(new_state.amount_loan.condition, new_state.amount_loan.value, new_state.months_to_pay.value, computed_profit);
      semi_monthly = calculator.computePerHalfMonth(monthly);
      daily = calculator.computePerDay(monthly);
    }
  }
  
  return {
    computed_interest,
    computed_profit,
    monthly,
    semi_monthly,
    daily
  }
}

export default function new_borrower(state = initial_state, action) {
  let new_state;

  switch(action.type) {
    case 'NEWBORROWER_CAV':
      new_state = {
        ...state,
        address: {
          errors: validateAddress(action.value),
          value: action.value
        }
      }

      return {
        ...new_state,
        backend: {
          ...new_state.backend,
          allow_submit: allowSubmit(new_state)
        },
      }
    case 'NEWBORROWER_CFN':
      new_state = {
        ...state,
        firstname: {
          errors: validateName('First name', action.value),
          value: action.value
        }
      }

      return {
        ...new_state,
        backend: {
          ...new_state.backend,
          allow_submit: allowSubmit(new_state)
        },
      }
    case 'NEWBORROWER_CMN':
      new_state = {
        ...state,
        middlename: {
          errors: validateName('Middle name', action.value),
          value: action.value
        }
      }

      return {
        ...new_state,
        backend: {
          ...new_state.backend,
          allow_submit: allowSubmit(new_state)
        },
      }
    case 'NEWBORROWER_CSN':
      new_state = {
        ...state,
        surname: {
          errors: validateName('Surname', action.value),
          value: action.value
        }
      }

      return {
        ...new_state,
        backend: {
          ...new_state.backend,
          allow_submit: allowSubmit(new_state)
        },
      }
    case 'NEWBORROWER_CGD':
      new_state = {
        ...state,
        gender: {
          errors: validateGender(action.value),
          value: action.value
        }
      }

      return {
        ...new_state,
        backend: {
          ...new_state.backend,
          allow_submit: allowSubmit(new_state)
        },
      }
    case 'NEWBORROWER_CAL':
      new_state = {
        ...state,
        amount_loan: {
          ...state.amount_loan,
          errors: validateAmountLoan(action.value),
          value: action.value
        }
      }

      return {
        ...new_state,
        calculated_values: calculatedValues(new_state),
        backend: {
          ...new_state.backend,
          allow_submit: allowSubmit(new_state)
        },
      }
    case 'NEWBORROWER_CMP':
      new_state = {
        ...state,
        months_to_pay: {
          ...state.months_to_pay,
          errors: validateMonthsToPay(action.value),
          value: action.value
        }
      }

      return {
        ...new_state,
        calculated_values: calculatedValues(new_state),
        backend: {
          ...new_state.backend,
          allow_submit: allowSubmit(new_state)
        },
      }
    case 'NEWBORROWER_CIR':
      new_state = {
        ...state,
        interest_rate: {
          ...state.interest_rate,
          errors: validateInterestRate(action.value),
          value: action.value
        }
      }

      return {
        ...new_state,
        calculated_values: calculatedValues(new_state),
        backend: {
          ...new_state.backend,
          allow_submit: allowSubmit(new_state)
        },
      }
    case 'NEWBORROWER_CIT':
      new_state = {
        ...state,
        interest_rate: {
          ...state.interest_rate,
          type: action.value
        }
      }

      return {
        ...new_state,
        calculated_values: calculatedValues(new_state),
        backend: {
          ...new_state.backend,
          allow_submit: allowSubmit(new_state)
        },
      }
    case 'NEWBORROWER_CLC':
      new_state = {
        ...state,
        amount_loan: {
          ...state.amount_loan,
          condition: action.value
        },
        interest_rate: action.value == 'due-date-only' || action.value == 'no-due-date-and-interest'? {
          ...state.interest_rate,
          value: '',
          errors: []
        } : {
          ...state.interest_rate
        }
      }

      return {
        ...new_state,
        calculated_values: calculatedValues(new_state),
        backend: {
          ...new_state.backend,
          allow_submit: allowSubmit(new_state)
        },
      }
    case 'NEWBORROWER_CLY':
      new_state = {
        ...state,
        loan_date: {
          ...state.loan_date,
          year: action.value,
          errors: validateLoanDate(state.loan_date.month, state.loan_date.date, action.value)
        }
      }

      return {
        ...new_state,
        backend: {
          ...new_state.backend,
          allow_submit: allowSubmit(new_state)
        },
      }
    case 'NEWBORROWER_CLD':
      new_state = {
        ...state,
        loan_date: {
          ...state.loan_date,
          date: action.value,
          errors: validateLoanDate(state.loan_date.month, action.value, state.loan_date.year)
        }
      }

      return {
        ...new_state,
        backend: {
          ...new_state.backend,
          allow_submit: allowSubmit(new_state)
        },
      }
    case 'NEWBORROWER_CLM':
      new_state = {
        ...state,
        loan_date: {
          ...state.loan_date,
          month: action.value,
          date: 1,
          errors: validateLoanDate(action.value, state.loan_date.date, state.loan_date.year)
        }
      }

      return {
        ...new_state,
        backend: {
          ...new_state.backend,
          allow_submit: allowSubmit(new_state)
        },
      }
    case 'NEWBORROWER_AMCN':
      new_state = {
        ...state,
        contact_numbers: state.contact_numbers.concat({
          id: new Date().getTime(),
          value: '',
          errors: []
        })
      }

      return {
        ...new_state,
        backend: {
          ...new_state.backend,
          allow_submit: allowSubmit(new_state)
        },
      }
    case 'NEWBORROWER_RCN':
      if(state.contact_numbers.length == 1) {
        return {
          ...state,
          contact_numbers: [{
            id: new Date().getTime(),
            value: '',
            errors: []
          }]
        }
      }

      new_state = {
        ...state,
        contact_numbers: state.contact_numbers.filter((contact_number, index) => index != action.index)
      }

      return {
        ...new_state,
        backend: {
          ...new_state.backend,
          allow_submit: allowSubmit(new_state)
        },
      }
    case 'NEWBORROWER_CCN':
      new_state = {
        ...state,
        contact_numbers: state.contact_numbers.map((contact_number, index) => (
          index == action.index? {
            ...contact_number,
            value: action.value,
            errors: validatePhoneNumber(action.value)
          } : contact_number
        ))
      }

      return {
        ...new_state,
        backend: {
          ...new_state.backend,
          allow_submit: allowSubmit(new_state)
        },
      }
    case 'NEWBORROWER_CPM':
      new_state = {
        ...state,
        payment_method: {
          value: action.value,
          errors: validatePaymentMethod(action.value)
        },
        months_to_pay: action.value == 4? {
          ...state.months_to_pay,
          errors: [],
          value: ''
        } : {
          ...state.months_to_pay
        },
        interest_rate: {
          ...state.interest_rate,
          errors: validateInterestRate(state.interest_rate.value),
        }
      }

      return {
        ...new_state,
        calculated_values: calculatedValues(new_state),
        backend: {
          ...new_state.backend,
          allow_submit: allowSubmit(new_state)
        },
      }
    case 'NEWBORROWER_CEDOPM':
      return {
        ...state,
        date_of_payment: {
          ...state.date_of_payment,
          month: action.value,
          date: 1
        }
      }
    case 'NEWBORROWER_CEDOPD':
      return {
        ...state,
        date_of_payment: {
          ...state.date_of_payment,
          date: action.value
        }
      }
    case 'NEWBORROWER_CEDOPY':
      return {
        ...state,
        date_of_payment: {
          ...state.date_of_payment,
          year: action.value
        }
      }
    case '_NEWBORROWER_SUBMIT':
      return {
        ...state,
        backend: {
          allow_submit: state.backend.allow_submit,
          processing: true,
          status: null,
          message: null
        }
      }
    case 'NEWBORROWER_SUBMIT_FAILED':
      return {
        ...state,
        backend: {
          allow_submit: state.backend.allow_submit,
          processing: false,
          status: 'failed',
          message: action.message
        }
      }
    case 'NEWBORROWER_SUBMIT_SUCCESSFUL':
      return {
        ...state,
        id: action.id,
        backend: {
          allow_submit: state.backend.allow_submit,
          processing: false,
          status: 'successful',
          message: null
        }
      }
    case 'NEWBORROWER_RESET':
      return {...initial_state}
    default:
      return {...state}
  }
}