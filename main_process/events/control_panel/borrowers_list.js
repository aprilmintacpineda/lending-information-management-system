import { ipcMain } from 'electron';
import Sequelize from 'sequelize';
import models from '../../../models';

ipcMain.on('BORROWERS_LIST_FETCH', (event, arg) => {
  models.borrowers.findAll({
    include: [
      {
        model: models.contact_numbers,
        order: [ 'created_at', 'desc' ]
      },
      {
        model: models.loans,
        include: [
          {
            model: models.loan_payments,
            order: [ 'date_paid', 'desc' ]
          },
          {
            model: models.penalties,
            order: [ 'created_at', 'desc' ],
            include: [{
              model: models.penalty_payments,
              order: [ 'created_at', 'desc' ]
            }]
          }
        ],
        order: [ 'loan_date', 'desc' ]
      }
    ]
  })
  .then(borrowers => event.sender.send('BORROWERS_LIST_FETCH_SUCCESSFUL', {
    list: borrowers.map(borrower => ({
      ...borrower.dataValues,
      contact_numbers: borrower.contact_numbers.map(contact_number => ({
        ...contact_number.dataValues
      })),
      loans: borrower.loans.map(loan => ({
        ...loan.dataValues,
        loan_payments: loan.loan_payments.map(payment => ({
          ...payment.dataValues
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
  .catch(err => event.sender.send('BORROWERS_LIST_FETCH_FAILED', { message: err.message }));
});