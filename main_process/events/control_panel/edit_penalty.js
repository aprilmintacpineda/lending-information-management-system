import { ipcMain } from 'electron';
import Penalty from '../../../models/penalty';

ipcMain.on('BORROWER_PROFILE_EDITPENALTYFORM_SAVE', (event, args) => {
  Penalty.update({
    amount: args.amount,
    remarks: args.remarks,
    date_given: args.date_given
  }, {
    where: {
      id: args.penalty_id
    }
  })
  .then(() => Penalty.findOne({
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