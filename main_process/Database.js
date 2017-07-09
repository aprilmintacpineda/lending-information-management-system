import path from 'path';
import Sequelize from 'sequelize';

class Database {
  constructor() {
    this.DB = new Sequelize({
      storage: path.join(__dirname, '../database/main.sqlite'),
      dialect: 'sqlite'
    });
  }

  closeConnection() {
    return this.DB.close();
  }

  checkConnection() {
    return this.DB.authenticate();
  }

  createModel(name = '', fields = {}, options = {}) {
    return this.DB.define(name, {...fields}, {...options});
  }

  sync() {
    return this.DB.sync();
  }
}

export default Database;