import { ipcMain } from 'electron';
import LoanPayment from '../../../models/loan_payment';
import { uniqueId } from '../../helpers/generators';

ipcMain.on('BORROWER_PROFILE_SEND_PAYMENT', (event, arg) => {
  let created_at;
  let updated_at = created_at = new Date().toISOString();

  LoanPayment.create({
    id: uniqueId(),
    loan_id: arg.loan_id,
    amount: arg.amount,
    quarter: arg.quarter,
    payment_coverage: arg.payment_coverage,
    period_paid: arg.period_paid,
    date_paid: arg.date_paid,
    created_at,
    updated_at
  })
  .then(new_payment => event.sender.send('BORROWER_PROFILE_SEND_PAYMENT_SUCCESSFUL', {
    payment: {...new_payment.dataValues},
    index: arg.index
  }))
  .catch(err => event.sender.send('BORROWER_PROFILE_SEND_PAYMENT_FAILED', {
    message: err.message,
    index: arg.index
  }));
});