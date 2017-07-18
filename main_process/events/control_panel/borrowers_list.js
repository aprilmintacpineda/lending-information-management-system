import { ipcMain } from 'electron';
import Borrower from '../../../models/borrower';
import ContactNumbers from '../../../models/contactNumber';
import Payment from '../../../models/payment';
import Loan from '../../../models/loan';
import Sequelize from 'sequelize';

ipcMain.on('BORROWERS_LIST_FETCH', (event, arg) => {
  Borrower.findAll({
    include: [
      ContactNumbers,
      {
        model: Loan,
        include: [ Payment ],
        order: [
          [ Payment, 'created_at' ]
        ]
      }
    ],
    order: [
      [ Loan, 'loan_date', 'desc' ]
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
        payments: loan.payments.map(payment => ({
          ...payment.dataValues
        }))
      }))
    }))
  }))
  .catch(err => event.sender.send('BORROWERS_LIST_FETCH_FAILED', { message: err.message }));
});