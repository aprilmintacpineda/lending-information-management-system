import { ipcMain } from 'electron';
import models from '../../../models';

ipcMain.on('SEARCH_SUBMIT', (event, args) => {
  switch(args.at) {
    case 'borrower':
      models.borrowers.findAll({
        where: {
          $or: [
            {
              id: {
                $like: '%'+ args.search_query +'%'
              }
            },
            {
              firstname: {
                $like: '%'+ args.search_query +'%'
              }
            },
            {
              middlename: {
                $like: '%'+ args.search_query +'%'
              }
            },
            {
              surname: {
                $like: '%'+ args.search_query +'%'
              }
            }
          ]
        }
      })
      .catch(err => event.sender.send('SEARCH_SUBMIT_FAILED', {
        message: err.message
      }))
      .then(search_results => {
        if(search_results.length) {
          event.sender.send('SEARCH_SUBMIT_SUCCESSFUL', {
            search_results: search_results.map(search_result => ({
              ...search_result.dataValues
            }))
          });
        } else {
          event.sender.send('SEARCH_SUBMIT_FAILED', {
            message: 'No results was found.'
          });
        }
      });
    break;

    case 'loan':
      models.loans.findAll({
        where: {
          $or: [
            {
              id: {
                $like: '%'+ args.search_query +'%'
              }
            },
            {
              borrower_id: {
                $like: '%'+ args.search_query +'%'
              }
            }
          ]
        },
        include: [
          // loan payments
          {
            model: models.loan_payments,
            order: [
              ['created_at', 'desc']
            ]
          },
          // penalties
          {
            model: models.penalties,
            order: [
              ['created_at', 'desc']
            ],
            include: [
              // penalty_payments
              {
                model: models.penalty_payments,
                order: [ 'created_at', 'desc' ]
              }
            ]
          },
          // borrowers
          {
            model: models.borrowers
          }
        ]
      })
      .catch(err => event.sender.send('SEARCH_SUBMIT_FAILED', {
        message: err.message
      }))
      .then(search_results => {
        if(search_results.length) {
          event.sender.send('SEARCH_SUBMIT_SUCCESSFUL', {
            search_results: search_results.map(search_result => ({
              ...search_result.dataValues,
              borrower: { ...search_result.borrower.dataValues },
              loan_payments: search_result.loan_payments.map(loan_payment => ({
                ...loan_payment.dataValues
              })),
              penalties: search_result.penalties.map(penalty => ({
                ...penalty.dataValues,
                penalty_payments: penalty.penalty_payments.map(penalty_payment => ({
                  ...penalty_payment.dataValues
                }))
              }))
            }))
          });
        } else {
          event.sender.send('SEARCH_SUBMIT_FAILED', {
            message: 'No results was found.'
          });
        }
      });
    break;

    case 'penalty':
      models.penalties.findAll({
        where: {
          $or: [
            {
              id: {
                $like: '%'+ args.search_query +'%'
              }
            },
            {
              loan_id: {
                $like: '%'+ args.search_query +'%'
              }
            },
            {
              remarks: {
                $like: '%'+ args.search_query +'%'
              }
            }
          ]
        },
        include: [
          {
            model: models.loans,
            include: [
              {
                model: models.loan_payments,
                order: [ 'date_given', 'desc' ]
              },
              {
                model: models.borrowers
              }
            ]
          },
          {
            model: models.penalty_payments,
            order: [ 'date_paid', 'desc' ]
          }
        ]
      })
      .catch(err => event.sender.send('SEARCH_SUBMIT_FAILED', {
        message: err.message
      }))
      .then(search_results => {
        if(search_results.length) {
          event.sender.send('SEARCH_SUBMIT_SUCCESSFUL', {
            search_results: search_results.map(search_result => ({
              ...search_result.dataValues,
              penalty_payments: search_result.penalty_payments.map(penalty_payment => ({
                ...penalty_payment.dataValues
              })),
              loan: {
                ...search_result.loan.dataValues,
                borrower: { ...search_result.loan.borrower.dataValues },
                loan_payments: search_result.loan.loan_payments.map(loan_payment => ({
                  ...loan_payment.dataValues
                }))
              }
            }))
          });
        } else {
          event.sender.send('SEARCH_SUBMIT_FAILED', {
            message: 'No results was found.'
          });
        }
      });
    break;

    case 'loan-payment':
      models.loan_payments.findAll({
        where: {
          $or: [
            {
              id: {
                $like: '%'+ args.search_query +'%'
              }
            },
            {
              loan_id: {
                $like: '%'+ args.search_query +'%'
              }
            }
          ]
        },
        include: [{
          model: models.loans,
          include: [
            {
              model: models.loan_payments,
              order: [ 'date_paid', 'desc' ]
            },
            {
              model: models.penalties,
              order: [ 'date_given', 'desc' ],
              include: [{
                model: models.penalty_payments,
                order: [ 'date_paid', 'desc' ]
              }]
            },
            {
              model: models.borrowers
            }
          ]
        }]
      })
      .catch(err => event.sender.send('SEARCH_SUBMIT_FAILED', {
        message: err.message
      }))
      .then(search_results => {
        if(search_results.length) {
          event.sender.send('SEARCH_SUBMIT_SUCCESSFUL', {
            search_results: search_results.map(search_result => ({
              ...search_result.dataValues,
              loan: {
                ...search_result.loan.dataValues,
                penalties: search_result.loan.penalties.map(penalty => ({
                  ...penalty.dataValues,
                  penalty_payments: penalty.penalty_payments.map(penalty_payment => ({
                    ...penalty_payment.dataValues
                  }))
                })),
                loan_payments: search_result.loan.loan_payments.map(loan_payment => ({
                  ...loan_payment.dataValues
                })),
                borrower: { ...search_result.loan.borrower.dataValues }
              }
            }))
          });
        } else {
          event.sender.send('SEARCH_SUBMIT_FAILED', {
            message: 'No results was found.'
          });
        }
      });
    break;

    case 'penalty-payment':
      models.penalty_payments.findAll({
        where: {
          $or: [
            {
              id: {
                $like: '%'+ args.search_query +'%'
              }
            },
            {
              penalty_id: {
                $like: '%'+ args.search_query +'%'
              }
            }
          ]
        },
        include: [{
          model: models.penalties,
          include: [
            {
              model: models.loans,
              include: [
                {
                  model: models.loan_payments,
                  order: [ 'date_paid', 'desc' ]
                },
                {
                  model: models.penalties,
                  order: [ 'date_given', 'desc' ],
                  include: [{
                    model: models.penalty_payments,
                    order: [ 'date_paid', 'desc' ]
                  }]
                },
                {
                  model: models.borrowers
                }
              ]
            },
            {
              model: models.penalty_payments,
              order: [ 'date_paid', 'desc' ]
            }
          ]
        }]
      })
      .catch(err => event.sender.send('SEARCH_SUBMIT_FAILED', {
        message: err.message
      }))
      .then(search_results => {
        if(search_results.length) {
          event.sender.send('SEARCH_SUBMIT_SUCCESSFUL', {
            search_results: search_results.map(search_result => ({
              ...search_result.dataValues,
              penalty: {
                ...search_result.penalty.dataValues,
                penalty_payments: search_result.penalty.penalty_payments.map(penalty_payment => ({
                  ...penalty_payment.dataValues
                })),
                loan: {
                  ...search_result.penalty.loan.dataValues,
                  borrower: { ...search_result.penalty.loan.borrower.dataValues },
                  loan_payments: search_result.penalty.loan.loan_payments.map(loan_payment => ({
                    ...loan_payment.dataValues
                  })),
                  penalties: search_result.penalty.loan.penalties.map(penalty => ({
                    ...penalty.dataValues,
                    penalty_payments: penalty.penalty_payments.map(penalty_payment => ({
                      ...penalty_payment.dataValues
                    }))
                  }))
                }
              }
            }))
          });
        } else {
          event.sender.send('SEARCH_SUBMIT_FAILED', {
            message: 'No results was found.'
          });
        }
      });
    break;
    default:
      event.sender.send('SEARCH_SUBMIT_FAILED', {
        message: 'Unknown search type.'
      });
    break
  }
});