import Sequelize from "sequelize";

import Foobar from "../app/models/Foobar";

import databaseConfig from "../config/database";

const models = [Foobar];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
