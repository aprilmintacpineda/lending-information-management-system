import Sequelize from 'sequelize';
import path from 'path';

let sequelize = new Sequelize({
  storage: path.join(__dirname, '../database/main.sqlite'),
  dialect: 'sqlite'
});

export default sequelize;