import { ipcMain } from 'electron';
import models from '../../../models';

import * as calculator from '../../helpers/calculator';

ipcMain.on('BORROWER_PROFILE_ELI_SEND', (event, args) => {
  let interest_percentage = calculator.computeInterestPercentage(args.interest_rate, args.interest_type);
  let interest = calculator.computeInterest(args.amount, interest_percentage, args.interest_type, args.interest_rate);
  let profit = calculator.computeProfit(interest, args.months_to_pay);
  let per_month = calculator.computePerMonth(args.condition_applied, args.amount, args.months_to_pay, profit);
  let per_semi_month = calculator.computePerHalfMonth(per_month);
  let per_day = calculator.computePerDay(per_month);

  models.loans.update({
    amount: args.amount,
    condition_applied: args.condition_applied,
    loan_date: args.date_loan,
    interest_rate: args.interest_rate,
    interest_type: args.interest_type,
    months_to_pay: args.months_to_pay,
    payment_method: args.payment_method,
    profit,
    interest,
    per_month,
    per_day,
    per_semi_month,
    updated_at: new Date().toISOString()
  }, {
    where: {
      id: args.id
    }
  })
  .then(() => models.loans.findOne({
    where: {
      id: args.id
    },
    include: [{
      model: models.loan_payments,
      order: [ 'created_at', 'desc' ]
    }]
  }))
  .then(data => event.sender.send('BORROWER_PROFILE_ELI_SEND_SUCCESSFUL', {
    data: {
      ...data.dataValues,
      loan_payments: data.loan_payments.map(payment => payment.dataValues)
    },
    loan_index: args.loan_index
  }))
  .catch(err => event.sender.send('BORROWER_PROFILE_ELI_SEND_FAILED', {
    message: err.message,
    loan_index: args.loan_index
  }));
});