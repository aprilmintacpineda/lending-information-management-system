import { ipcMain } from 'electron';
import Borrower from '../../../models/borrower';
import ContactNumber from '../../../models/contact_number';
import { uniqueId } from '../../helpers/generators';

ipcMain.on('EDITBORROWERPROFILE_FETCH', (event, arg) => {
  Borrower.findOne({
    where: {
      id: arg.id
    },
    include: [ ContactNumber ]
  })
  .then(borrower => event.sender.send('EDITBORROWERPROFILE_FETCH_SUCCESSFUL', {
    data: {
      ...borrower.dataValues,
      contact_numbers: borrower.dataValues.contact_numbers.map(contact_number => ({
        ...contact_number.dataValues
      }))
    }
  }))
  .catch(err => event.sender.send('EDITBORROWERPROFILE_FETCH_FAILED', {
    message: err.message
  }));
});

ipcMain.on('EDITBORRWOERPROFILE_SEND', (event, arg) => {
  Borrower.update({
    firstname: arg.firstname,
    middlename: arg.middlename,
    surname: arg.surname,
    gender: arg.gender,
    updated_at: new Date().toISOString()
  }, {
    where: {
      id: arg.id
    }
  })
  .then(() => ContactNumber.findAll({
    where: {
      borrower_id: arg.id
    }
  }))
  .then(borrower_contact_numbers => {
    let promises = [];
    let ids_found = [];

    borrower_contact_numbers = borrower_contact_numbers.map(contact_number => ({
      ...contact_number.dataValues
    }));

    arg.contact_numbers
    .filter(contact_number => contact_number.value.length)
    .forEach(contact_number => {
      promises.push(new Promise((resolve, reject) => {
        if(!contact_number.id) {
          let created_at = new Date();
          let updated_at = created_at = created_at.toISOString();

          ContactNumber.create({
            id: uniqueId(),
            borrower_id: arg.id,
            number: contact_number.value,
            created_at,
            updated_at
          })
          .then(() => resolve());
        } else {
          ids_found.push(contact_number.id);

          ContactNumber.update({
            number: contact_number.value,
            updated_at
          }, {
            where: {
              id: contact_number.id
            }
          })
          .then(() => resolve())
        }
      }));
    });

    if(ids_found.length) {
      borrower_contact_numbers
      .filter(contact_number => ids_found.indexOf(contact_number.id) < 0 && contact_number.id)
      .forEach(contact_number => {
        promises.push(new Promise((resolve, reject) => {
          ContactNumber.findOne({
            where: {
              id: contact_number.id,
              borrower_id: arg.id
            }
          })
          .then(target => target.destroy())
          .then(() => resolve());
        }));
      });
    }

    return Promise.all(promises);
  })
  .then(() => Borrower.findOne({
    where: {
      id: arg.id
    },
    include: {
      model: ContactNumber,
      order: [ 'created_at', 'desc' ]
    }
  }))
  .then(borrower => event.sender.send('EDITBORRWOERPROFILE_SEND_SUCCESSFUL', {
    data: {
      ...borrower.dataValues,
      contact_numbers: borrower.contact_numbers.map(contact_number => ({ ...contact_number.dataValues }))
    }
  }))
  .catch(err => event.sender.send('EDITBORRWOERPROFILE_SEND_FAILED', {
    message: err.message
  }));
});