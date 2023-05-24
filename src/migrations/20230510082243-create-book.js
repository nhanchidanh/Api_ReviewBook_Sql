"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Books", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      available: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      description: {
        type: Sequelize.TEXT,
      },
      categoryId: {
        type: Sequelize.INTEGER,
      },
      image: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    await queryInterface.addColumn("Books", "fileName", Sequelize.STRING);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Books");
    await queryInterface.removeColumn("Books", "fileName");
  },
};
