import { ipcMain } from 'electron';
import Penalty from '../../../models/penalty';
import { uniqueId } from '../../helpers/generators';

ipcMain.on('BORROWER_PROFILE_PENALTYFIELD_CREATE', (event, args) => {
  let id = uniqueId();

  let created_at = new Date;
  let updated_at = created_at = created_at.toISOString();

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
    where: { id }
  }))
  .then(penalty => event.sender.send('BORROWER_PROFILE_PENALTYFIELD_CREATE_SUCCESSFUL', {
    data: {...penalty.dataValues},
    loan_index: args.loan_index
  }))
  .catch(error => event.sender.send('BORROWER_PROFILE_PENALTYFIELD_CREATE_FAILED', {
    message: error.message,
    loan_index: args.loan_index
  }))
});