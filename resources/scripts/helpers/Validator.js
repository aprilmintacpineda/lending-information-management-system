import { monthMaxdays, monthList, maxYear, minYear } from './DateTime';

/**
 * validates mode of payments
 * @param  value, number
 * @return array errors
 *
 * 1 = daily
 * 2 = weekly
 * 3 = monthly
 * 4 = trianually
 * 5 = quarterly
 * 6 = semianually
 * 7 = anually
 */
export function validateModeOfPayment(value) {
  let errors = [];

  if(value != 1 && value != 2
  && value != 3 && value != 4
  && value != 5 && value != 6) {
    errors.push('Invalid mode of payment.');
  }

  return errors;
}

/**
 * validates interest rate
 * @param  value, number
 * @return array errors
 */
export function validateInterestRate(value) {
  let errors = [];

  if(!isNaN(value) && Number(value) < 0) {
    errors.push('Invalid interest rate.');
  }

  return errors;
}

/**
 * validates months to pay
 * @param  value, number
 * @return array, errors
 */
export function validateTimesToPay(value) {
  let errors = [];

  if(!isNaN(value) && Number(value) < 0) {
    errors.push('Invalid times to pay.');
  }

  return errors;
}

/**
 * validates the amount of loan
 * @param  value, number
 * @return array, errors
 */
export function validateAmountLoan(value) {
  let errors = [];

  if(!isNaN(value) && Number(value) < 0) {
    errors.push('Invalid loan amount.');
  }

  return errors;
}

/**
 * validates the birthdate
 * @param  str month, int date, int year
 * @return array      error list
 */
export function validateBirthdates(month, date, year) {
  let errors = [];
  let max_days_in_month = monthMaxdays(month, year);
  let month_list = monthList();
  let max_year = maxYear();
  let min_year = minYear();

  if(date > max_days_in_month
  || month_list.indexOf(month) < 0
  || isNaN(year)
  || isNaN(date)
  || year > max_year
  || year < min_year) {
    errors.push('Invalid birthdate.');
  }

  return errors;
}

/**
 * validates gender, 1 = male, 0 = female
 * @param  integer gender
 * @return array      error list
 */
export function validateGender(gender) {
  let errors = [];

  if(gender != 1 && gender != 0) {
    errors.push('Invalid gender.');
  }

  return errors;
}

/**
 * validates name
 * @param  string what name type, i.e. first name, middle name
 * @param  string name value
 * @return array      error list
 */
export function validateName(what, name) {
  let errors = [],
      names = name.split(' '),
      excessiveSpaces = false,
      invalidName = false;

  if(!name.trim().length) {
    errors.push(what + ' is required.');
  } else {
    for(let substr of names) {
      if(!substr.length || /( {2,})/.test(substr)) {
        if(!excessiveSpaces) {
          errors.push(what + ' contains excessive spaces.');
          excessiveSpaces = true;
        }
      } else if(!/^[a-zA-Z ]+$/.test(substr) || substr.length <= 2 || substr.length > 75) {
        if(!invalidName) {
          errors.push(what + ' is invalid.');
          invalidName = true;
        }
      }
    }
  }

  return errors;
}

/**
 * validates password in accordance to password again
 * for sign up/registration only
 * @param  string password      value of password
 * @param  string passwordAgain value of password again
 * @return array               error list
 */
export function validatePasswords(password, passwordAgain) {
  let errors = [];

  if((!password.trim().length && passwordAgain.trim().length) || !password.trim().length) {
    errors.push('Password is required.');
  } else if(password.length < 6) {
    errors.push('Password is too weak.');
  } else if(password.length > 255) {
    errors.push('Password is too long.');
  } else if(password != passwordAgain) {
    errors.push('Passwords do not match.');
  }

  return errors;
}

/**
 * validate password again in accordance to password
 * for sign up/registration only
 * @param  string password      value of password
 * @param  string passwordAgain value of password again
 * @return array               error list
 */
export function validatePasswordAgain(password, passwordAgain) {
  let errors = [];

  if(password.trim().length) {
    if(!passwordAgain.trim().length) {
      errors.push('Enter your password again.');
    } else if(password != passwordAgain) {
      errors.push('Passwords do not match.');
    }
  }

  return errors;
}

/**
 * validates password with no password again
 * @param  string password value of password
 * @return array          error list
 */
export function validatePassword(password) {
  let errors = [];

  if(!password.trim().length) {
    errors.push('Password is required.');
  }

  return errors;
}