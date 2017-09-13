import { ipcMain } from 'electron';
import PasswordHash from 'password-hash';
import { uniqueId } from '../../helpers/generators';
import { ucfirst } from '../../helpers/strings';
import models from '../../../models';

ipcMain.on('SETUP_SUBMIT', (event, arg) => {
  models.admins.findAll().then(admins => {
    if(admins.length) {
      event.sender.send('SETUP_SUBMIT_FAILED', {
        message: 'An account already exists.'
      });
    } else {
      let birth_date = new Date(arg.setup.birth_date.month + ' ' + arg.setup.birth_date.date + ', ' + arg.setup.birth_date.year).toISOString();

      let created_at;
      let updated_at = created_at = new Date().toISOString();

      models.admins.create({
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
        event.sender.send('SETUP_SUBMIT_SUCCESSFUL');
      })
      .catch(err => {
        event.sender.send('SETUP_SUBMIT_FAILED', {
          message: 'An unexpected error occured. `' + err.original.errno + ':' + err.original.code + '`'
        });
      });
    }
  });
});