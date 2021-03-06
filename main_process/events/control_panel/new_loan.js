import { ipcMain } from 'electron';
import models from '../../../models';

import { uniqueId } from '../../helpers/generators';

ipcMain.on('BORROWERNEWLOAN_SUBMIT', (event, args) => {
  let created_at;
  let updated_at = created_at = new Date().toISOString();

  models.loans.create({
    id: uniqueId(),
    borrower_id: args.borrower_id,
    loan_date: args.date_loan,
    amount: Number(args.amount_loan),
    interest: args.computed_interest,
    profit: args.computed_profit,
    interest_rate: Number(args.interest_rate),
    interest_type: args.interest_type,
    months_to_pay: Number(args.months_to_pay),
    expected_date_of_payment: args.expected_date_of_payment,
    payment_method: args.payment_method,
    per_month: Math.ceil(args.monthly),
    per_day: Math.ceil(args.daily),
    per_semi_month: Math.ceil(args.semi_monthly),
    condition_applied: args.condition_applied,
    created_at,
    updated_at
  })
  .then(() => event.sender.send('BORROWERNEWLOAN_SUBMIT_SUCCESSFUL'))
  .catch(error => event.sender.send('BORROWERNEWLOAN_SUBMIT_FAILED', {
    message: error.message
  }));
});