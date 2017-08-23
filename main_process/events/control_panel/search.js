import { ipcMain } from 'electron';
import Borrower from '../../../models/borrower';
import ContactNumber from '../../../models/contact_number';
import Loan from '../../../models/loan';
import Penalty from '../../../models/penalty';
import LoanPayment from '../../../models/loan_payment';
import PenaltyPayment from '../../../models/penalty_payment';

ipcMain.on('SEARCH_SUBMIT', (event, args) => {
  switch(args.at) {
    case 'borrower':
      Borrower.findAll({
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
      Loan.findAll({
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

    case 'penalty':
      Penalty.findAll({
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

    case 'loan-payment':
      Penalty.findAll({
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

    case 'penalty-payment':
      Penalty.findAll({
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
    default:
      event.sender.send('SEARCH_SUBMIT_FAILED', {
        message: 'Unknown search type.'
      });
    break
  }
});