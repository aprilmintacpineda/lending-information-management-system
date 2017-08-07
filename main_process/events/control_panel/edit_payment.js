import { ipcMain } from 'electron';
import LoanPayment from '../../../models/loan_payment';

ipcMain.on('BORROWER_PROFILE_EPI_SEND', (event, arg) => {
  LoanPayment.update({
    amount: arg.amount,
    quarter: arg.quarter,
    payment_coverage: arg.payment_coverage,
    period_paid: arg.period_paid,
    date_paid: arg.date_paid,
    updated_at: new Date().toISOString()
  }, {
    where: {
      id: arg.payment_id
    }
  })
  .then(() => LoanPayment.findOne({
    where: {
      id: arg.payment_id
    }
  }))
  .then(payment => event.sender.send('BORROWER_PROFILE_EPI_SEND_SUCCESSFUL', {
    data: {...payment.dataValues},
    loan_index: arg.loan_index,
    payment_index: arg.payment_index
  }))
  .catch(err => event.sender.send('BORROWER_PROFILE_EPI_SEND_FAILED', {
    loan_index: arg.loan_index,
    payment_index: arg.payment_index,
    message: err.message
  }));
});