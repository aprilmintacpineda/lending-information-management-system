import { ipcMain, app } from 'electron';
import path from 'path';
import Database from '../../Database';
import Borrower from '../../../models/borrower';
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
  }).then(new_borrower => Loan.create({
    id: uniqueId(),
    borrower_id: new_borrower.dataValues.id,
    amount: Number(arg.amount_loan),
    loan_date,
    interest_rate: Number(arg.interest_rate),
    months_to_pay: Number(arg.months_to_pay),
    per_month: arg.per_month,
    per_day: arg.per_day,
    apply_interest: arg.apply_interest,
    interest: arg.interest,
    profit: arg.profit,
    created_at,
    updated_at
  })).then(() => {
    event.sender.send('NEWBORROWER_SUBMIT_SUCCESSFUL', {
      id: new_borrower_id
    });
  }).catch((err) => {
    event.sender.send('NEWBORROWER_SUBMIT_FAILED', {
      message: err.message
    });
  });
});