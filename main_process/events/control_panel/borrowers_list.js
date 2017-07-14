import { ipcMain } from 'electron';
import Borrower from '../../../models/borrower';
import ContactNumbers from '../../../models/contactNumber';
import Payment from '../../../models/payment';
import Loan from '../../../models/loan';

ipcMain.on('BORROWERS_LIST_FETCH', (event, arg) => {
  Borrower.findAll({
    include: [
      ContactNumbers,
      {
        model: Loan,
        include: [ Payment ],
        order: [
          [
            Payment,
            'created_at'
          ]
        ]
      }
    ],
    order: [
      [
        ContactNumbers,
        'created_at'
      ],
      [
        Loan,
        'loan_date'
      ]
    ]
  })
  .then(borrowers => event.sender.send('BORROWERS_LIST_FETCH_SUCCESSFUL', {
    list: borrowers
  }))
  .catch(err => event.sender.send('BORROWERS_LIST_FETCH_FAILED', { message: err.message }));
});