import { ipcMain } from 'electron';
import models from '../../../models';

ipcMain.on('BORROWERREPORTS_INITIAL_FETCH', (event, args) => {
  models.borrowers.find({
    where: {
      id: args.id
    },
    include: [
      {
        model: models.loans,
        order: [ 'loan_date', 'desc' ],
        include: [
          {
            model: models.loan_payments,
            order: [ 'date_paid', 'desc' ]
          },
          {
            model: models.penalties,
            order: [ 'date_given', 'desc' ],
            include: [{
              model: models.penalty_payments,
              order: [ 'date_paid', 'desc' ]
            }]
          }
        ]
      },
      {
        model: models.contact_numbers,
        order: [ 'created_at', 'desc' ]
      }
    ]
  })
  .then(borrower => event.sender.send('BORROWERREPORTS_INITIAL_FETCH_SUCCESSFUL', {
    data: {
      ...borrower.dataValues,
      contact_numbers: borrower.contact_numbers.map(contact_number => ({
        ...contact_number.dataValues
      })),
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
    }
  }))
  .catch(err => event.sender.send('BORROWERREPORTS_INITIAL_FETCH_FAILED', {
    message: err.message
  }));
});