import { ipcMain } from 'electron';
import models from '../../../models';

import { uniqueId } from '../../helpers/generators';

ipcMain.on('BORROWER_PROFILE_PENALTYPAYMENTFORM_CREATE', (event, args) => {
  let id = uniqueId();
  
  let created_at;
  let updated_at = created_at = new Date().toISOString();

  models.penalty_payments.create({
    id,
    penalty_id: args.penalty_id,
    amount: args.amount,
    date_paid: args.date_paid,
    created_at,
    updated_at
  })
  .then(new_payment => event.sender.send('BORROWER_PROFILE_PENALTYPAYMENTFORM_CREATE_SUCCESSFUL', {
    data: new_payment.dataValues,
    loan_index: args.loan_index,
    penalty_index: args.penalty_index
  }))
  .catch(error => event.sender.send('BORROWER_PROFILE_PENALTYPAYMENTFORM_CREATE_FAILED', {
    message: error.message
  }));
});