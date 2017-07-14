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
    value: '',
    errors: []
  },
  months_to_pay: {
    value: '',
    errors: []
  },
  interest_rate: {
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
  contact_numbers: [
    {
      value: '',
      errors: []
    }
  ],
  apply_due_date_interest: true,
  apply_interest_only: false,
  apply_due_date_only: false,
  no_due_date_no_interest: false,
  backend: {
    processing: false,
    status: null,
    message: null
  }
}