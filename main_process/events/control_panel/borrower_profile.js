import { ipcMain } from 'electron';
import Borrower from '../../../models/borrower';
import ContactNumber from '../../../models/ContactNumber';
import Loan from '../../../models/loan';
import Payment from '../../../models/payment';

ipcMain.on('BORROWER_PROFILE_FETCH', (event, args) => {
  Borrower.findOne({
    where: {
      id: args.id
    },
    include: [
      // contact numbers
      ContactNumber,
      // loans
      {
        model: Loan,
        include: {
          model: Payment,
          order: [ 'created_at', 'desc' ]
        },
        order: [
          [ 'loan_date', 'desc' ]
        ]
      }
    ],
    order: [
      [ ContactNumber, 'created_at' ],
      [ Loan, 'loan_date' ]
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
        payments: loan.payments.map(payment => ({
          ...payment.dataValues
        }))
      }))
    }
  }))
  .catch(err => event.sender.send('BORROWER_PROFILE_FETCH_FAILED', {
    message: err.message
  }));
});