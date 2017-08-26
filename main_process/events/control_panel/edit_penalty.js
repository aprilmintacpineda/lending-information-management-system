import { ipcMain } from 'electron';
import models from '../../../models';

ipcMain.on('BORROWER_PROFILE_EDITPENALTYFORM_SAVE', (event, args) => {
  models.penalties.update({
    amount: args.amount,
    remarks: args.remarks,
    date_given: args.date_given,
    updated_at: new Date().toISOString()
  }, {
    where: {
      id: args.penalty_id
    }
  })
  .then(() => models.penalties.findOne({
    where: {
      id: args.penalty_id
    }
  }))
  .then(updated_penalty => event.sender.send('BORROWER_PROFILE_EDITPENALTYFORM_SAVE_SUCCESSFUL', {
    data: {...updated_penalty.dataValues},
    loan_index: args.loan_index,
    penalty_index: args.penalty_index
  }))
  .catch(error => event.sender.send('BORROWER_PROFILE_EDITPENALTYFORM_SAVE_FAILED', {
    message: error.message,
    loan_index: args.loan_index,
    penalty_index: args.penalty_index
  }));
});