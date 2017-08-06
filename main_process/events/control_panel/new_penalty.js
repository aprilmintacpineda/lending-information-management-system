import { ipcMain } from 'electron';

ipcMain.on('BORROWER_PROFILE_PENALTYFIELD_CREATE', (event, args) => {
  event.sender.send('BORROWER_PROFILE_PENALTYFIELD_CREATE_SUCCESSFUL', {
    loan_index: args.loan_index
  });
});