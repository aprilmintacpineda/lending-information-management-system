import { ipcMain, app } from 'electron';
import models from '../../../models';

import { uniqueId } from '../../helpers/generators';

ipcMain.on('NEWBORROWER_SUBMIT', (event, arg) => {
  // created_at and updated_at
  let created_at;
  let updated_at = created_at = new Date().toISOString();

  let new_borrower_id = uniqueId();
  let loan_date = new Date(arg.loan_date).toISOString();

  models.borrowers.create({
    id: new_borrower_id,
    firstname: arg.firstname,
    middlename: arg.middlename,
    surname: arg.surname,
    gender: arg.gender,
    address: arg.address,
    created_at,
    updated_at
  })
  .then(new_borrower => models.loans.create({
    id: uniqueId(),
    borrower_id: new_borrower_id,
    loan_date,
    amount: Number(arg.amount_loan),
    interest: arg.computed_interest,
    profit: arg.computed_profit,
    interest_rate: Number(arg.interest_rate),
    interest_type: arg.interest_type,
    months_to_pay: Number(arg.months_to_pay),
    payment_method: arg.payment_method,
    expected_date_of_payment: new Date(arg.expected_date_of_payment).toISOString(),
    per_month: Math.ceil(arg.monthly),
    per_day: Math.ceil(arg.daily),
    per_semi_month: Math.ceil(arg.semi_monthly),
    condition_applied: arg.condition_applied,
    created_at,
    updated_at
  }))
  .then(() => {
    if(arg.contact_numbers.filter(contact_number => contact_number.value.length).length > 0) {
      return models.contact_numbers.bulkCreate(arg.contact_numbers.filter(contact_number => contact_number.value.length).map(contact_number => ({
        id: uniqueId(),
        borrower_id: new_borrower_id,
        number: contact_number.value,
        created_at,
        updated_at
      })));
    }

    event.sender.send('NEWBORROWER_SUBMIT_SUCCESSFUL', {
      id: new_borrower_id
    });
  })
  .then(() => event.sender.send('NEWBORROWER_SUBMIT_SUCCESSFUL', {
    id: new_borrower_id
  }))
  .catch(err => {
    event.sender.send('NEWBORROWER_SUBMIT_FAILED', {
      message: err.message
    });
  });
});