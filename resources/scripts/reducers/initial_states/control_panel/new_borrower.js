import { monthList } from '../../../helpers/DateTime';

let current_date = new Date();
let current_year = current_date.getFullYear();

export default {
  firstname: {
    value: '',
    errors: []
  },
  middlename: {
    value: '',
    errors: []
  },
  surname: {
    value: '',
    errors: []
  },
  gender: {
    value: 1,
    errors: []
  },
  amount_loan: {
    condition: 'due-date-and-interest',
    value: '',
    errors: []
  },
  months_to_pay: {
    value: '',
    errors: []
  },
  interest_rate: {
    type: 'percentage',
    value: '',
    errors: []
  },
  payment_method: {
    value: '1',
    errors: []
  },
  loan_date: {
    month: monthList()[current_date.getMonth()],
    date: current_date.getDate(),
    year: current_year,
    errors: []
  },
  calculated_values: {
    computed_interest: 0,
    computed_profit: 0,
    monthly: 0,
    semi_monthly: 0,
    daily: 0
  },
  contact_numbers: [
    {
      id: new Date().getTime(),
      value: '',
      errors: []
    }
  ],
  backend: {
    allow_submit: false,
    processing: false,
    status: null,
    message: null
  }
}