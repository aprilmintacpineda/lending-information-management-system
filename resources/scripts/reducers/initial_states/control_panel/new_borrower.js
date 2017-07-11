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
  loan_date: {
    month: 'January',
    date: 1,
    year: current_year - 10,
    errors: []
  },
  apply_interest: true,
  backend: {
    processing: false,
    status: null,
    message: null
  }
}