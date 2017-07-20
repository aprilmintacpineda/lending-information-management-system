import { ipcMain } from 'electron';
import Payment from '../../../models/payment';
import { uniqueId } from '../../helpers/generators';

ipcMain.on('BORROWER_PROFILE_SEND_PAYMENT', (event, arg) => {
  let created_at = new Date();
  let updated_at = created_at = created_at.toISOString();

  let period_paid = new Date(arg.period_paid);
  period_paid = period_paid.toISOString();

  Payment.create({
    id: uniqueId(),
    loan_id: arg.loan_id,
    amount: arg.amount,
    quarter: arg.quarter,
    payment_coverage: arg.payment_coverage,
    period_paid,
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