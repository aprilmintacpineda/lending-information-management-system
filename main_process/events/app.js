import { ipcMain, app } from 'electron';

ipcMain.on('APPLICATION_EXIT', (event, arg) => {
  app.quit();
});