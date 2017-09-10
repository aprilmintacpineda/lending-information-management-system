import initial_state from '../initial_states/control_panel/borrower_new_loan';
import * as calculator from '../../helpers/Calculator';

import {
  validateAmountLoan,
  validateMonthsToPay,
  validateInterestRate,
  validateLoanDate,
  validatePaymentMethod,
  validatePaymentType
} from '../../helpers/Validator';

function allowSubmit(new_state) {
  if(new_state.amount_loan.condition == 'due-date-only') {
    return new_state.backend.processing
      || !new_state.amount_loan.value.length
      || new_state.amount_loan.errors.length
      || ((!new_state.months_to_pay.value.length && new_state.months_to_pay.errors.length) || new_state.payment_method == 4 )? false : true;
  } else if(new_state.amount_loan.condition == 'interest-only') {
    return new_state.backend.processing
      || !new_state.amount_loan.value.length
      || new_state.amount_loan.errors.length
      || !new_state.interest_rate.value.length
      || new_state.interest_rate.errors.length? false : true;
  } else if(new_state.amount_loan.condition == 'no-due-date-and-interest') {
    return new_state.backend.processing
      || !new_state.amount_loan.value.length
      || new_state.amount_loan.errors.length? false : true;
  }

  return new_state.backend.processing
    || !new_state.amount_loan.value.length
    || new_state.amount_loan.errors.length
    || !new_state.interest_rate.value.length
    || new_state.interest_rate.errors.length
    || ((!new_state.months_to_pay.value.length && new_state.months_to_pay.errors.length) || new_state.payment_method == 4 )? false : true;
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

export default function borrower_new_loan(state = initial_state, action) {
  let new_state;

  switch(action.type) {
    case 'BORROWERNEWLOAN_CHANGE_AMOUNT':
      new_state = {
        ...state,
        amount_loan: {
          ...state.amount_loan,
          value: action.value,
          errors: validateAmountLoan(action.value)
        }
      }

      return {
        ...new_state,
        calculated_values: calculatedValues(new_state),
        allow_submit: allowSubmit(new_state)
      }
    case 'BORROWERNEWLOAN_CHANGE_INTEREST_RATE':
      new_state = {
        ...state,
        interest_rate: {
          ...state.interest_rate,
          value: action.value,
          errors: validateInterestRate(action.value)
        }
      }

      return {
        ...new_state,
        calculated_values: calculatedValues(new_state),
        allow_submit: allowSubmit(new_state)
      }
    case 'BORROWERNEWLOAN_CHANGE_INTEREST_TYPE':
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
        allow_submit: allowSubmit(new_state)
      }
    case 'BORROWERNEWLOAN_CHANGE_PAYMENT_METHOD':
      new_state = {
        ...state,
        payment_method: {
          ...state.payment_method,
          value: action.value,
          errors: validatePaymentMethod(action.value)
        },
        months_to_pay: action.value == 4? {
          ...state.months_to_pay,
          value: '',
          errors: []
        } : {...months_to_pay}
      }

      return {
        ...new_state,
        calculated_values: calculatedValues(new_state),
        allow_submit: allowSubmit(new_state)
      }
    case 'BORROWERNEWLOAN_CHANGE_MONTHS_TO_PAY':
      new_state = {
        ...state,
        months_to_pay: {
          ...state.months_to_pay,
          value: action.value,
          errors: validateMonthsToPay(action.value)
        }
      }

      return {
        ...new_state,
        calculated_values: calculatedValues(new_state),
        allow_submit: allowSubmit(new_state)
      }
    case 'BORROWERNEWLOAN_CHANGE_LOAN_CONDITION':
      new_state = {
        ...state,
        amount_loan: {
          ...state.amount_loan,
          condition: action.value
        }
      }

      return {
        ...new_state,
        calculated_values: calculatedValues(new_state),
        allow_submit: allowSubmit(new_state)
      }
    case 'BORROWERNEWLOAN_CHANGE_DATELOAN_DATE':
      new_state = {
        ...state,
        date_loan: {
          ...state.date_loan,
          date: action.value,
          errors: validateLoanDate(state.date_loan.month, action.value, state.date_loan.year)
        }
      }

      return {
        ...new_state,
        allow_submit: allowSubmit(new_state)
      }
    case 'BORROWERNEWLOAN_CHANGE_DATELOAN_MONTH':
      new_state = {
        ...state,
        date_loan: {
          ...state.date_loan,
          month: action.value,
          errors: validateLoanDate(action.value, state.date_loan.date, state.date_loan.year)
        }
      }

      return {
        ...new_state,
        allow_submit: allowSubmit(new_state)
      }
    case 'BORROWERNEWLOAN_CHANGE_DATELOAN_YEAR':
      new_state = {
        ...state,
        date_loan: {
          ...state.date_loan,
          year: action.value,
          errors: validateLoanDate(state.date_loan.month, state.date_loan.date, action.value)
        }
      }

      return {
        ...new_state,
        allow_submit: allowSubmit(new_state)
      }
    case 'BORROWERNEWLOAN_CHANGE_DOP_MONTH':
      return {
        ...state,
        date_of_payment: {
          ...state.date_of_payment,
          month: action.value,
        }
      }
    case 'BORROWERNEWLOAN_CHANGE_DOP_DATE':
      return {
        ...state,
        date_of_payment: {
          ...state.date_of_payment,
          date: action.value,
        }
      }
    case 'BORROWERNEWLOAN_CHANGE_DOP_YEAR':
      return {
        ...state,
        date_of_payment: {
          ...state.date_of_payment,
          year: action.value,
        }
      }
    case '_BORROWERNEWLOAN_SUBMIT':
      return {
        ...state,
        backend: {
          processing: true,
          status: null,
          message: null
        }
      }
    case 'BORROWERNEWLOAN_SUBMIT_SUCCESSFUL':
      return {
        ...state,
        backend: {
          processing: false,
          status: 'successful',
          message: null
        }
      }
    case 'BORROWERNEWLOAN_SUBMIT_FAILED':
      return {
        ...state,
        backend: {
          processing: false,
          status: 'failed',
          message: action.message
        }
      }
    case 'BORROWERNEWLOAN_RESET':
      return {...initial_state}
    default:
      return {...state}
  }

  return state;
}