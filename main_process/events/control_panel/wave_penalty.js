import { ipcMain } from 'electron';
import models from '../../../models';

ipcMain.on('BORROWER_PROFILE_WAVE_SUBMIT', (event, args) => {
  let current_date = new Date().toISOString();

  models.penalties.update({
    was_waved: true,
    date_waved: current_date,
    updated_at: current_date,
    wave_remarks: args.wave_remarks
  }, {
    where: {
      id: args.penalty_id
    }
  })
  .then(() => models.penalties.findOne({
    where: {
      id: args.penalty_id
    },
    include: [
      {
        model: models.penalty_payments,
        order: [ 'date_paid', 'desc' ]
      }
    ]
  }))
  .then(updated_penalty => event.sender.send('BORROWER_PROFILE_WAVE_SUBMIT_SUCCESSFUL', {
    updated_penalty: {
      ...updated_penalty.dataValues,
      penalty_payments: updated_penalty.penalty_payments.map(penalty_payment => ({
        ...penalty_payment.dataValues
      }))
    },
    loan_index: args.loan_index,
    penalty_index: args.penalty_index
  }))
  .catch(err => event.sender.send('BORROWER_PROFILE_WAVE_SUBMIT_FAILED', {
    message: err.message,
    loan_index: args.loan_index,
    penalty_index: args.penalty_index
  }));
})