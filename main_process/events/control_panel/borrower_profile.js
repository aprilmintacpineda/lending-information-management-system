import { ipcMain } from 'electron';
import Borrower from '../../../models/borrower';

ipcMain.on('BORROWER_PROFILE_FETCH', (event, args) => {
  Borrower.findOne({
    where: {
      id: args.id
    }
  })
  .then(borrower => events.sender.send('BORROWER_PROFILE_FETCH_SUCCESSFUL', borrower))
  .catch(err => events.sender.send('BORROWER_PROFILE_FETCH_FAILED', err.message));
});