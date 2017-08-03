import { monthList } from '../../../helpers/DateTime';

let current_date = new Date();

export default {
  amount_loan: {
    value: '',
    condition: 'due-date-and-interest',
    errors: []
  },
  date_loan: {
    month: monthList()[current_date.getMonth()],
    date: current_date.getDate(),
    year: current_date.getFullYear(),
    errors: []
  },
  interest_rate: {
    value: '',
    type: 'percentage',
    errors: []
  },
  months_to_pay: {
    value: '',
    errors: []
  },
  payment_method: {
    value: '',
    errors: []
  },
  allow_submit: false,
  backend: {
    processing: false,
    status: null,
    message: null
  }
}