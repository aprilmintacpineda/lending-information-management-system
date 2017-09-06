export function getDueDate(loan) {
  let date;

  if(loan.loan_payments.length) {
    date = new Date(loan.loan_payments[loan.loan_payments.length - 1].date_paid);
  } else {
    date = new Date(loan.loan_date);
  }

  if(loan.payment_method == 2) {
    // semi monthly
    return new Date(date.getTime() + 1296000000);
  } else if(loan.payment_method == 1) {
    // monthly
    return new Date((date.getMonth() + 2) + '-' + date.getDate() + '-' + date.getFullYear());
  } else {
    // daily
    return new Date(date.getTime() + 86400000);
  }
}