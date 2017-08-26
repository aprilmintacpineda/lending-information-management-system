import { ipcMain } from 'electron';
import models from '../../../models';

ipcMain.on('BORROWER_PROFILE_EDITPENALTYPAYMENT_SAVE', (event, args) => {
  models.penalty_payments.update({
    amount: args.amount,
    date_paid: args.date_paid,
    updated_at: new Date().toISOString()
  }, {
    where: {
      id: args.id
    }
  })
  .then(() => models.penalty_payments.findOne({
    where: {
      id: args.id
    }
  }))
  .then(penalty_payment => event.sender.send('BORROWER_PROFILE_EDITPENALTYPAYMENT_SAVE_SUCCESSFUL', {
    data: {...penalty_payment.dataValues},
    loan_index: args.loan_index,
    penalty_index: args.penalty_index,
    penalty_payment_index: args.penalty_payment_index
  }))
  .catch(error => event.sender.send('BORROWER_PROFILE_EDITPENALTYPAYMENT_SAVE_FAILED', {
    message: error.message,
    loan_index: args.loan_index,
    penalty_index: args.penalty_index,
    penalty_payment_index: args.penalty_payment_index
  }));
});