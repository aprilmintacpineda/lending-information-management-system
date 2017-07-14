import { ipcMain, app } from 'electron';
import path from 'path';
import Database from '../../Database';
import Borrower from '../../../models/borrower';
import ContactNumber from '../../../models/contactNumber';
import Loan from '../../../models/loan';
import { uniqueId } from '../../helpers/generators';

ipcMain.on('NEWBORROWER_SUBMIT', (event, arg) => {
  const DB = new Database;

  // created_at and updated_at
  let created_at = new Date();
  let updated_at = created_at = created_at.toISOString();

  let new_borrower_id = uniqueId();
  let loan_date = new Date(arg.loan_date);
  loan_date = loan_date.toISOString();

  Borrower.create({
    id: new_borrower_id,
    firstname: arg.firstname,
    middlename: arg.middlename,
    surname: arg.surname,
    gender: arg.gender,
    created_at,
    updated_at
  })
  .then(new_borrower => Loan.create({
    id: uniqueId(),
    borrower_id: new_borrower_id,
    loan_date,
    amount: Number(arg.amount_loan),
    interest: arg.interest,
    profit: arg.profit,
    interest_rate: Number(arg.interest_rate),
    months_to_pay: arg.apply_due_date? Number(arg.months_to_pay) : null,
    payment_method: arg.payment_method,
    per_month: arg.per_month,
    per_day: arg.per_day,
    terms_applied: arg.terms_applied,
    created_at,
    updated_at
  }))
  .then(() => {
    if(arg.contact_numbers[0].value.length) {
      return ContactNumber.bulkCreate(arg.contact_numbers.map(contact_number => ({
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
  .catch((err) => {
    DB.close();

    event.sender.send('NEWBORROWER_SUBMIT_FAILED', {
      message: err.message
    });
  });
});