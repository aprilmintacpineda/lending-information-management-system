import { ipcMain } from 'electron';
import Borrower from '../../../models/borrower';
import ContactNumber from '../../../models/contactNumber';
import LoanPayment from '../../../models/loan_payment';
import Loan from '../../../models/loan';
import Penalty from '../../../models/penalty';
import PenaltyPayment from '../../../models/penalty_payment';
import Sequelize from 'sequelize';

ipcMain.on('BORROWERS_LIST_FETCH', (event, arg) => {
  Borrower.findAll({
    include: [
      {
        model: ContactNumber,
        order: [ 'created_at', 'desc' ]
      },
      {
        model: Loan,
        include: [
          {
            model: LoanPayment,
            order: [ 'created_at', 'asc' ]
          },
          {
            model: Penalty,
            order: [ 'created_at', 'asc' ],
            include: [ PenaltyPayment ]
          }
        ],
        order: [
          [ LoanPayment, 'created_at' ]
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