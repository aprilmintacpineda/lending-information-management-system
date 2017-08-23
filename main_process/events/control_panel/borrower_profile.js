import { ipcMain } from 'electron';
import Borrower from '../../../models/borrower';
import ContactNumber from '../../../models/contact_number';
import Loan from '../../../models/loan';
import LoanPayment from '../../../models/loan_payment';
import Penalty from '../../../models/penalty';
import PenaltyPayment from '../../../models/penalty_payment';

ipcMain.on('BORROWER_PROFILE_FETCH', (event, args) => {
  Borrower.findOne({
    where: {
      id: args.id
    },
    order: [
      [ Loan, 'loan_date', 'desc' ]
    ],
    include: [
      // contact numbers
      {
        model: ContactNumber,
        order: [ 'created_at', 'desc' ]
      },
      // loans
      {
        model: Loan,
        order: [
          [ 'loan_date', 'desc' ]
        ],
        include: [
          {
            model: LoanPayment,
            order: [ 'created_at', 'desc' ]
          },
          // penalties
          {
            model: Penalty,
            order: [ 'created_at', 'desc' ],
            include: [
              // penalty_payments
              {
                model: PenaltyPayment,
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
    }
  }))
  .catch(err => event.sender.send('BORROWER_PROFILE_FETCH_FAILED', {
    message: err.message
  }));
});