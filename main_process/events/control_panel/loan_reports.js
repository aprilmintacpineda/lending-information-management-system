import { ipcMain } from 'electron';
import models from '../../../models';

ipcMain.on('LOANREPORTS_INITIAL_FETCH', (event, args) => {
  models.loans.find({
    where: {
      id: args.id
    },
    include: [
      {
        model: models.borrowers,
        include: [{
          model: models.contact_numbers,
          order: [ 'created_at', 'desc' ]
        }]
      },
      {
        model: models.loan_payments,
        order: [ 'date_paid', 'desc' ]
      },
      {
        model: models.penalties,
        order: [ 'created_at', 'desc' ],
        include: [{
          model: models.penalty_payments,
          order: [ 'date_paid', 'desc' ]
        }]
      }
    ]
  })
  .then(loan => event.sender.send('LOANREPORTS_INITIAL_FETCH_SUCCESSFUL', {
    data: {
      ...loan.dataValues,
      loan_payments: loan.loan_payments.reverse().map(loan_payment => ({
        ...loan_payment.dataValues
      })),
      penalties: loan.penalties.map(penalty => ({
        ...penalty.dataValues,
        penalty_payments: penalty.penalty_payments.reverse().map(penalty_payment => ({
          ...penalty_payment.dataValues
        }))
      })),
      borrower: {
        ...loan.borrower.dataValues,
        contact_numbers: loan.borrower.contact_numbers.map(contact_number => ({
          ...contact_number.dataValues
        }))
      }
    }
  }))
  .catch(err => event.sender.send('LOANREPORTS_INITIAL_FETCH_FAILED', {
    message: err.message
  }));
});