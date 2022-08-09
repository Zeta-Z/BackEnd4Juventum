'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class historial extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user,{ foreignKey: 'user_fk'});
    }
  }
  historial.init({
    score: DataTypes.INTEGER,
    waves: DataTypes.INTEGER,
    enemies: DataTypes.INTEGER,
    nodamage: DataTypes.INTEGER,
    powerup: DataTypes.INTEGER,
    bullets: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'historial',
  });
  return historial;
};