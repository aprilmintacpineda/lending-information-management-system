import { ipcMain } from 'electron';
import path from 'path';
import PasswordHash from 'password-hash';
import Admin from '../../../models/admin';
import { uniqueId } from '../../helpers/generators';
import { ucfirst } from '../../helpers/strings';
import Database from '../../Database';

ipcMain.on('SETUP_SUBMIT', (event, arg) => {
  const DB = new Database;

  Admin.findAll().then(admins => {
    if(admins.length) {
      DB.closeConnection();

      event.sender.send('SETUP_SUBMIT_FAILED', {
        message: 'An account already exists.'
      });
    } else {
      let birth_date = new Date(arg.setup.birth_date.month + ' ' + arg.setup.birth_date.date + ', ' + arg.setup.birth_date.year);
      birth_date = birth_date.toISOString();
      let created_at = new Date();
      let updated_at = created_at = created_at.toISOString();

      Admin.create({
        id: uniqueId(),
        password: PasswordHash.generate(arg.setup.password.value),
        firstname: ucfirst(arg.setup.firstname.value),
        middlename: ucfirst(arg.setup.middlename.value),
        surname: ucfirst(arg.setup.surname.value),
        gender: arg.setup.gender.value,
        birth_date,
        created_at,
        updated_at
      })
      .then(() => {
        DB.closeConnection();
        event.sender.send('SETUP_SUBMIT_SUCCESSFUL');
      })
      .catch(err => {
        DB.closeConnection();
        event.sender.send('SETUP_SUBMIT_FAILED', {
          message: 'An unexpected error occured. `' + err.original.errno + ':' + err.original.code + '`'
        });
      });
    }
  });
});