import { ipcMain } from 'electron';
import models from '../../../models';

ipcMain.on('INCOMEEXPENSEREPORT_FETCH_ALL', (event, args) => {
  models.borrowers.all({
    include: [
      {
        model: models.loans,
        include: [
          {
            model: models.loan_payments
          },
          {
            model: models.penalties,
            include: [
              {
                model: models.penalty_payments
              }
            ]
          }
        ]
      }
    ]
  })
  .then(borrowers => event.sender.send('INCOMEEXPENSEREPORT_FETCH_ALL_SUCCESSFUL', {
    data: borrowers.map(borrower => ({
      ...borrower.dataValues,
      loans: borrower.loans.map(loan => ({
        ...loan.dataValues,
        loan_payments: loan.loan_payments.map(loan_payment => ({
          ...loan_payment.dataValues
        })),
        penalties: loan.penalties.map(penalty => ({
          ...penalty.dataValues,
          penalty_payments: penalty.penalty_payments.map(penalty_payment => ({
            ...penalty_payment.dataValues
          }))
        }))
      }))
    }))
  }))
  .catch(err => event.sender.send('INCOMEEXPENSEREPORT_FETCH_ALL_FAILED', {
    message: err.message
  }));
});