import { ipcMain } from 'electron';
import Penalty from '../../../models/penalty';
import PenaltyPayment from '../../../models/penalty_payment';
import { uniqueId } from '../../helpers/generators';

ipcMain.on('BORROWER_PROFILE_PENALTYFIELD_CREATE', (event, args) => {
  let id = uniqueId();

  let created_at;
  let updated_at = created_at = new Date().toISOString();

  Penalty.create({
    id,
    loan_id: args.loan_id,
    amount: args.amount,
    remarks: args.remarks,
    date_given: args.date_given,
    created_at,
    updated_at
  })
  .then(() => Penalty.findOne({
    where: { id },
    include: [
      // penalty_payments
      {
        model: PenaltyPayment,
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