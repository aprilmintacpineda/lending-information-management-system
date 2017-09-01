import { ipcMain } from 'electron';
import models from '../../../models';

import { uniqueId } from '../../helpers/generators';

ipcMain.on('BORROWER_PROFILE_SEND_PAYMENT', (event, arg) => {
  let created_at;
  let updated_at = created_at = new Date().toISOString();

  models.loan_payments.create({
    id: uniqueId(),
    loan_id: arg.loan_id,
    amount: arg.amount,
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