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
  password: {
    value: '',
    errors: []
  },
  confirm_password: {
    value: '',
    errors: []
  },
  birth_date: {
    month: 'January',
    date: 1,
    year: current_year - 100,
    errors: []
  },
  backend: {
    processing: false,
    message: null,
    status: null
  }
}