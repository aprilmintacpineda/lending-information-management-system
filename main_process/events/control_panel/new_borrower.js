import { ipcMain, app } from 'electron';

ipcMain.on('NEWBORROWER_SUBMIT', (event, arg) => {
  console.log(arg);
});