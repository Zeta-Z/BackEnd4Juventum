'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('historials', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      score: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      waves: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      enemies: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      nodamage: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      powerup: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      bullets: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      user_fk: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { // User belongsTo Company 1:1
          model: 'users',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('historials');
  }
};