import { ipcMain } from 'electron';
import models from '../../../models';

function spreadLoans(loans) {
  return loans.map(loan => ({
    ...loan.dataValues,
    loan_payments: loan.loan_payments.map(loan_payment => ({
      ...loan_payment.dataValues
    })),
    borrower: {
      ...loan.borrower.dataValues,
      contact_numbers: loan.borrower.contact_numbers.map(contact_number => ({
        ...contact_number.dataValues
      }))
    }
  }));
}

function getLoans() {
  return models.loans.all({
    include: [
      {
        model: models.loan_payments,
        order: [ 'date_paid', 'desc' ]
      },
      {
        model: models.borrowers,
        include: [{
          model: models.contact_numbers,
          order: [ 'created_at', 'desc' ]
        }]
      }
    ]
  });
}

ipcMain.on('DASHBOARD_GET_DUEDATES_TOMORROW', (event, args) => {
  getLoans()
  .then(loans => {
    loans = spreadLoans(loans);

    let due_dates_tomorrow = [];

    loans.forEach(loan => {
      let last_date;
      let today = new Date();

      if(!loan.loan_payments.length) {
        last_date = new Date(loan.loan_date);
      } else {
        last_date = new Date(loan.loan_payments[0].date_paid);
      }

      if(today.getMonth() - last_date.getMonth() == 1 && last_date.getDate() - today.getDate() == 1) {
        due_dates_tomorrow.push(loan);
      }
    });

    event.sender.send('DASHBOARD_GET_DUEDATES_TOMORROW_SUCCESSFUL', {
      data: [...due_dates_tomorrow]
    });
  })
  .catch(err => event.sender.send('DASHBOARD_GET_DUEDATES_TOMORROW_FAILED', {
    message: err.message
  }));
});

ipcMain.on('DASHBOARD_GET_DUEDATES_TODAY', (event, args) => {
  getLoans()
  .then(loans => {
    loans = spreadLoans(loans);

    let due_dates_today = [];

    loans.forEach(loan => {
      let last_date;
      let today = new Date();

      if(!loan.loan_payments.length) {
        last_date = new Date(loan.loan_date);
      } else {
        last_date = new Date(loan.loan_payments[0].date_paid);
      }

      if(today.getMonth() - last_date.getMonth() == 1 && last_date.getDate() - today.getDate() == 0) {
        due_dates_today.push(loan);
      }
    });

    event.sender.send('DASHBOARD_GET_DUEDATES_TODAY_SUCCESSFUL', {
      data: [...due_dates_today]
    });
  })
  .catch(err => event.sender.send('DASHBOARD_GET_DUEDATES_TODAY_FAILED', {
    message: err.message
  }));
});

ipcMain.on('DASHBOARD_GET_DUEDATES_THISMONTH', (event, args) => {
  getLoans()
  .then(loans => {
    loans = spreadLoans(loans);

    let due_dates_this_month = [];

    loans.forEach(loan => {
      let last_date;
      let today = new Date();

      if(!loan.loan_payments.length) {
        last_date = new Date(loan.loan_date);
      } else {
        last_date = new Date(loan.loan_payments[0].date_paid);
      }

      if(today.getMonth() - last_date.getMonth() == 1 && last_date.getDate() - today.getDate() > 1) {
        due_dates_this_month.push({
          ...loan,
          due_date: new Date((last_date.getMonth() + 2) + '-' + last_date.getDate() + '-' + last_date.getFullYear())
        });
      }
    });

    event.sender.send('DASHBOARD_GET_DUEDATES_THISMONTH_SUCCESSFUL', {
      data: [...due_dates_this_month]
    });
  })
  .catch(err => event.sender.send('DASHBOARD_GET_DUEDATES_THISMONTH_FAILED', {
    message: err.message
  }));
})

ipcMain.on('DASHBOARD_GET_PASTDUEDATES', (event, args) => {
  getLoans()
  .then(loans => {
    loans = spreadLoans(loans);

    let past_due_dates = [];

    loans.forEach(loan => {
      let last_date;
      let today = new Date();

      if(!loan.loan_payments.length) {
        last_date = new Date(loan.loan_date);
      } else {
        last_date = new Date(loan.loan_payments[0].date_paid);
      }

      if(today.getMonth() - last_date.getMonth() < 0 || (today.getMonth() - last_date.getMonth() == 0 && last_date.getDate() - today.getDate() < 0)) {
        past_due_dates.push({
          ...loan,
          due_date: new Date((last_date.getMonth() + 2) + '-' + last_date.getDate() + '-' + last_date.getFullYear())
        });
      }
    });

    event.sender.send('DASHBOARD_GET_PASTDUEDATES_SUCCESSFUL', {
      data: [...past_due_dates]
    });
  })
  .catch(err => event.sender.send('DASHBOARD_GET_PASTDUEDATES_FAILED', {
    message: err.message
  }));
});