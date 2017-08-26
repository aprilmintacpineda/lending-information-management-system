import { ipcMain } from 'electron';
import models from '../../../models';

import { uniqueId } from '../../helpers/generators';

ipcMain.on('BORROWER_PROFILE_PENALTYFIELD_CREATE', (event, args) => {
  let id = uniqueId();

  let created_at;
  let updated_at = created_at = new Date().toISOString();

  models.penalties.create({
    id,
    loan_id: args.loan_id,
    amount: args.amount,
    remarks: args.remarks,
    date_given: args.date_given,
    created_at,
    updated_at
  })
  .then(() => models.penalties.findOne({
    where: { id },
    include: [
      // penalty_payments
      {
        model: models.penalty_payments,
        order: [ 'created_at', 'desc' ]
      }
    ]
  }))
  .then(penalty => event.sender.send('BORROWER_PROFILE_PENALTYFIELD_CREATE_SUCCESSFUL', {
    data: {
      ...penalty.dataValues,
      penalty_payments: penalty.penalty_payments.map(penalty_payment => ({
        ...penalty_payment.dataValues
      }))
    },
    loan_index: args.loan_index
  }))
  .catch(error => event.sender.send('BORROWER_PROFILE_PENALTYFIELD_CREATE_FAILED', {
    message: error.message,
    loan_index: args.loan_index
  }))
});