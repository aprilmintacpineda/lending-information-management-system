import { ipcMain } from 'electron';
import Loan from '../../../models/loan';
import Payment from '../../../models/payment';

import * as calculator from '../../helpers/calculator';

ipcMain.on('BORROWER_PROFILE_ELI_SEND', (event, args) => {
  let computed_interest = calculator.computeInterestPercentage(args.interest_rate, args.interest_type);
  let profit = calculator.computeProfit(computed_interest, args.months_to_pay);
  let interest = calculator.computeInterest(args.amount, computed_interest, args.interest_type, args.interest_rate);
  let per_month = calculator.computePerMonth(args.condition_applied, args.amount, args.months_to_pay, profit);
  let per_day = calculator.computePerDay(per_month);
  let per_semi_month = calculator.computePerHalfMonth(per_month);

  Loan.update({
    amount: args.amount,
    condition_applied: args.condition_applied,
    date_loan: args.date_loan,
    interest_rate: args.interest_rate,
    interest_type: args.interest_type,
    months_to_pay: args.months_to_pay,
    payment_method: args.payment_method,
    profit,
    interest,
    per_month,
    per_day,
    per_semi_month
  }, {
    where: {
      id: args.id
    }
  })
  .then(() => Loan.findOne({
    where: {
      id: args.id
    },
    include: [{
      model: Payment,
      order: [ 'created_at', 'desc' ]
    }]
  }))
  .then(data => event.sender.send('BORROWER_PROFILE_ELI_SEND_SUCCESSFUL', {
    data: {
      ...data.dataValues,
      payments: data.payments.map(payment => payment.dataValues)
    },
    loan_index: args.loan_index
  }))
  .catch(err => event.sender.send('BORROWER_PROFILE_ELI_SEND_FAILED', {
    message: err.message,
    loan_index: args.loan_index
  }));
});