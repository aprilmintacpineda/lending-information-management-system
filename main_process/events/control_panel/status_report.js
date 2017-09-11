import { ipcMain } from 'electron';
import models from '../../../models';

ipcMain.on('STATUSREPORT_FETCH_DATA', (event, args) => {
  models.borrowers.all({
    include: [{
      model: models.loans,
      include: [
        {
          model: models.loan_payments
        },
        {
          model: models.penalties,
          include: [{
            model: models.penalty_payments
          }]
        }
      ]
    }]
  })
  .then(borrowers => event.sender.send('STATUSREPORT_FETCH_DATA_SUCCESSFUL', {
    data: borrowers.map(borrower => ({
      ...borrower.dataValues,
      loans: borrower.loans.reverse().map(loan => ({
        ...loan.dataValues,
        loan_payments: loan.loan_payments.reverse().map(loan_payment => ({
          ...loan_payment.dataValues
        })),
        penalties: loan.penalties.reverse().map(penalty => ({
          ...penalty.dataValues,
          penalty_payments: penalty.penalty_payments.reverse().map(penalty_payment => ({
            ...penalty_payment.dataValues
          }))
        }))
      }))
    }))
  }))
  .catch(err => event.sender.send('STATUSREPORT_FETCH_DATA_FAILED', {
    message: err.message
  }));
});