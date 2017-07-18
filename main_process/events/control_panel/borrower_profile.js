import { ipcMain } from 'electron';
import Borrower from '../../../models/borrower';

ipcMain.on('BORROWER_PROFILE_FETCH', (event, args) => {
  Borrower.findOne({
    where: {
      id: args.id
    }
  })
  .then(borrower => event.sender.send('BORROWER_PROFILE_FETCH_SUCCESSFUL', {
    data: {...borrower.dataValues}
  }))
  .catch(err => event.sender.send('BORROWER_PROFILE_FETCH_FAILED', {
    message: err.message
  }));
});