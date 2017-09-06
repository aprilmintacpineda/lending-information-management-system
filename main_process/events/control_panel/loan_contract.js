import { ipcMain } from 'electron';
import models from '../../../models';

ipcMain.on('LOANCONTRACT_INITIAL_FETCH', (event, args) => {
  models.loans.find({
    where: {
      id: args.id
    },
    include: [
      {
        model: models.borrowers
      }
    ]
  })
  .then(loan => event.sender.send('LOANCONTRACT_INITIAL_FETCH_SUCCESSFUL', {
    data: {
      ...loan.dataValues,
      loan_payments: [],
      borrower: {
        ...loan.borrower.dataValues
      }
    }
  }))
  .catch(err => event.sender.send('LOANCONTRACT_INITIAL_FETCH_FAILED', {
    message: err.message
  }));
});