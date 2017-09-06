import { ipcMain } from 'electron';
import models from '../../../models';

ipcMain.on('BORROWER_PROFILE_FETCH', (event, args) => {
  models.borrowers.findOne({
    where: {
      id: args.id
    },
    include: [
      // contact numbers
      {
        model: models.contact_numbers,
        order: [ 'created_at', 'desc' ]
      },
      // loans
      {
        model: models.loans,
        order: [ 'loan_date', 'desc' ],
        include: [
          {
            model: models.loan_payments,
            order: [ 'date_paid', 'desc' ]
          },
          // penalties
          {
            model: models.penalties,
            order: [ 'created_at', 'desc' ],
            include: [
              // penalty_payments
              {
                model: models.penalty_payments,
                order: [ 'created_at', 'desc' ]
              }
            ]
          }
        ]
      }
    ]
  })
  .then(borrower => event.sender.send('BORROWER_PROFILE_FETCH_SUCCESSFUL', {
    data: {
      ...borrower.dataValues,
      contact_numbers: borrower.contact_numbers.map(contact_number => ({
        ...contact_number.dataValues
      })),
      loans: borrower.loans.map(loan => ({
        ...loan.dataValues,
        loan_payments: loan.loan_payments.reverse().map(payment => ({
          ...payment.dataValues
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
  .catch(err => event.sender.send('BORROWER_PROFILE_FETCH_FAILED', {
    message: err.message
  }));
});