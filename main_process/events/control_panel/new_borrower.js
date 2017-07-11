import { ipcMain, app } from 'electron';
import path from 'path';
import Database from '../../Database';
import Borrower from '../../../models/borrower';
import Loan from '../../../models/loan';

ipcMain.on('NEWBORROWER_SUBMIT', (event, arg) => {
  console.log(arg);
});