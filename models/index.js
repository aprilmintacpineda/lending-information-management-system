import fs from 'fs';
import path from 'path';
import sequelize from '../main_process/Database';
import Sequelize from 'sequelize';

import admins from './admins';
import borrowers from './borrowers';
import contact_numbers from './contact_numbers';
import loan_payments from './loan_payments';
import loans from './loans';
import penalties from './penalties';
import penalty_payments from './penalty_payments';

let db = {};

db.admins = admins(sequelize, Sequelize.DataTypes);
db.borrowers = borrowers(sequelize, Sequelize.DataTypes);
db.contact_numbers = contact_numbers(sequelize, Sequelize.DataTypes);
db.loan_payments = loan_payments(sequelize, Sequelize.DataTypes);
db.loans = loans(sequelize, Sequelize.DataTypes);
db.penalties = penalties(sequelize, Sequelize.DataTypes);
db.penalty_payments = penalty_payments(sequelize, Sequelize.DataTypes);

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
